// Utility functions for specialty search with acronym mapping
import specialtyAcronymMap from './specialtyAcronymMap';

// Helper to resolve acronyms to specialty names
export function resolveSpecialtyAcronym(term) {
  if (!term) return term;
  // If term is not a string, return as-is (should only be string from input)
  if (typeof term !== "string") return term;
  const lower = term.trim().toLowerCase();
  const mapped = specialtyAcronymMap[lower];
  if (Array.isArray(mapped)) {
    return mapped;
  }
  return mapped || term;
}

// Enhanced specialty filtering that includes acronym mapping
export function filterSpecialtiesWithAcronyms(inputValue, availableSpecialties) {
  if (!inputValue || !inputValue.trim()) {
    return [];
  }

  const searchTerm = inputValue.toLowerCase().trim();
  
  // Get all possible specialties from acronym mapping
  const mappedSpecialties = [];
  
  // Check if the search term matches any key in the acronym map
  // Use word boundaries to prevent false matches (e.g., "Hassler" shouldn't match "er")
  for (const [key, value] of Object.entries(specialtyAcronymMap)) {
    // Only match if:
    // 1. Search term exactly equals the key
    // 2. Search term starts with the key followed by a space
    // 3. Key is a word in the search term (surrounded by spaces or at boundaries)
    const isExactMatch = searchTerm === key;
    const isWordMatch = new RegExp(`\\b${key}\\b`).test(searchTerm);
    
    if (isExactMatch || isWordMatch) {
      if (Array.isArray(value)) {
        mappedSpecialties.push(...value);
      } else {
        mappedSpecialties.push(value);
      }
    }
  }

  // Filter available specialties using both direct matching and acronym mapping
  const filtered = availableSpecialties.filter(specialty => {
    if (!specialty) return false;
    
    const specialtyLower = specialty.toLowerCase();
    
    // Direct match
    if (specialtyLower.includes(searchTerm)) {
      return true;
    }
    
    // Acronym mapping match
    if (mappedSpecialties.some(mapped => specialtyLower.includes(mapped.toLowerCase()))) {
      return true;
    }
    
    return false;
  });

  // Remove duplicates and return
  return [...new Set(filtered)];
}

// Function to get all related specialties for a search term
export function getRelatedSpecialties(searchTerm) {
  if (!searchTerm) return [];
  
  const lower = searchTerm.toLowerCase().trim();
  const mapped = specialtyAcronymMap[lower];
  
  if (Array.isArray(mapped)) {
    return mapped;
  } else if (mapped) {
    return [mapped];
  }
  
  // Check for word-based matches in acronym map keys
  // Use word boundaries to prevent false matches (e.g., "Hassler" shouldn't match "er")
  const partialMatches = [];
  for (const [key, value] of Object.entries(specialtyAcronymMap)) {
    const isExactMatch = lower === key;
    const isWordMatch = new RegExp(`\\b${key}\\b`).test(lower);
    
    if (isExactMatch || isWordMatch) {
      if (Array.isArray(value)) {
        partialMatches.push(...value);
      } else {
        partialMatches.push(value);
      }
    }
  }
  
  return [...new Set(partialMatches)];
}

// Enhanced suggestions that include both available specialties and user input option
export function getSpecialtySuggestions(inputValue, availableSpecialties = []) {
  if (!inputValue || !inputValue.trim()) {
    return [];
  }

  const searchTerm = inputValue.toLowerCase().trim();
  const suggestions = [];
  
  // 1. Get filtered available specialties (if any provided)
  if (availableSpecialties.length > 0) {
    const filteredSpecialties = filterSpecialtiesWithAcronyms(inputValue, availableSpecialties);
    suggestions.push(...filteredSpecialties);
  }
  
  // 2. Check if user input maps to something specific (existing logic)
  const directMapping = specialtyAcronymMap[searchTerm];
  if (directMapping) {
    const mappedValues = Array.isArray(directMapping) ? directMapping : [directMapping];
    // Add mapped values that aren't already in suggestions
    mappedValues.forEach(mapped => {
      if (!suggestions.some(s => s.toLowerCase() === mapped.toLowerCase())) {
        suggestions.push(mapped);
      }
    });
  }
  
  // 3. Enhanced fuzzy search: Check for partial matches in both keys and values of acronym map
  for (const [key, value] of Object.entries(specialtyAcronymMap)) {
    // Check if search term is a word match in the key (fixed to prevent substring false positives)
    const isExactMatch = searchTerm === key;
    const isWordMatch = new RegExp(`\\b${key}\\b`).test(searchTerm);
    
    if (isExactMatch || isWordMatch) {
      const mappedValues = Array.isArray(value) ? value : [value];
      mappedValues.forEach(mapped => {
        if (!suggestions.some(s => s.toLowerCase() === mapped.toLowerCase())) {
          suggestions.push(mapped);
        }
      });
    }
    
    // NEW: Check if search term is contained in any of the specialty values
    const mappedValues = Array.isArray(value) ? value : [value];
    mappedValues.forEach(mapped => {
      if (mapped.toLowerCase().includes(searchTerm) && 
          !suggestions.some(s => s.toLowerCase() === mapped.toLowerCase())) {
        suggestions.push(mapped);
      }
    });
  }
  
  // 4. Search through all unique specialty values for partial matches
  const allSpecialtyValues = new Set();
  Object.values(specialtyAcronymMap).forEach(value => {
    if (Array.isArray(value)) {
      value.forEach(v => allSpecialtyValues.add(v));
    } else {
      allSpecialtyValues.add(value);
    }
  });
  
  // Add specialty values that contain the search term but aren't already included
  allSpecialtyValues.forEach(specialty => {
    if (specialty.toLowerCase().includes(searchTerm) && 
        !suggestions.some(s => s.toLowerCase() === specialty.toLowerCase())) {
      suggestions.push(specialty);
    }
  });
  
  // 5. If user typed something that could be a specialty search term, add it as an option
  // This allows users to search for terms like "primary care", "heart" etc. even if not in available specialties
  // BUT don't add this if the search term is a known acronym that already resolved to suggestions
  const hasExactMatch = suggestions.some(s => s.toLowerCase() === searchTerm);
  const hasAcronymMapping = specialtyAcronymMap[searchTerm] !== undefined;
  
  if (!hasExactMatch && !hasAcronymMapping && searchTerm.length > 2 && suggestions.length === 0) {
    // Only add "Search for" option if there are no other suggestions and it's not a known acronym
    const capitalizedInput = searchTerm.split(' ').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
    suggestions.unshift(`Search for "${capitalizedInput}"`);
  }
  
  // Remove duplicates and return, sorted by relevance (exact matches first, then partial)
  const uniqueSuggestions = [...new Set(suggestions)];
  
  // Sort by relevance: exact matches first, then starts with, then contains
  return uniqueSuggestions.sort((a, b) => {
    const aLower = a.toLowerCase();
    const bLower = b.toLowerCase();
    
    // Don't sort "Search for" options, keep them at the top
    if (a.startsWith('Search for "')) return -1;
    if (b.startsWith('Search for "')) return 1;
    
    // Exact match
    if (aLower === searchTerm && bLower !== searchTerm) return -1;
    if (bLower === searchTerm && aLower !== searchTerm) return 1;
    
    // Starts with search term
    if (aLower.startsWith(searchTerm) && !bLower.startsWith(searchTerm)) return -1;
    if (bLower.startsWith(searchTerm) && !aLower.startsWith(searchTerm)) return 1;
    
    // Alphabetical for the rest
    return a.localeCompare(b);
  });
}