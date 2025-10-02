# Physician Search System Documentation

## Overview
The physician search system provides comprehensive search functionality for finding healthcare providers with advanced filtering, location-based sorting, and specialty-specific search capabilities.

## Architecture Overview

### Core Components

#### 1. Main Search Pages
- **`pages/find-care.js`** - Primary physician search interface
- **`wp-templates/single-specialty.js`** - Specialty-specific search pages
- **`components/front-page/search-doctor.js`** - Homepage search form

#### 2. Search Components
- **`components/find-doc/search-form.js`** - Advanced search form with location services
- **`components/find-doc/doctor-search-result.js`** - Results display with distance calculation
- **`components/find-doc/search-filter-sidebar.js`** - Advanced filtering sidebar

#### 3. Utility Components
- **`components/specialtySearchUtils.js`** - Specialty search utilities and acronym mapping
- **`components/specialtyAcronymMap.js`** - Specialty acronym definitions

#### 4. GraphQL Queries
- **`queries/PhysicianQueries.js`** - All physician-related GraphQL queries

## Key Features

### 1. Location-Based Search
- **Geolocation Integration**: Auto-detect user location using browser geolocation API
- **Address Geocoding**: Convert addresses/zip codes to coordinates using Google Geocoding API
- **Distance Calculation**: Haversine formula for accurate distance measurements
- **Distance Sorting**: Sort results by proximity to search location

### 2. Specialty Search System
- **Fuzzy Matching**: Intelligent specialty name matching
- **Acronym Resolution**: Maps common medical acronyms (e.g., "ENT" → "Otolaryngology")
- **Auto-complete**: Real-time specialty suggestions
- **Specialty-Specific Pages**: Dedicated search pages for each specialty

### 3. Advanced Filtering
- **Gender Filter**: Filter by physician gender
- **Language Filter**: Multi-language support
- **Insurance Filter**: Filter by accepted insurance plans
- **Education Filter**: Filter by medical school/education

### 4. Search State Management
- **URL Persistence**: All search parameters maintained in URL
- **Coordinate Persistence**: Location coordinates preserved across navigation
- **Pagination State**: Proper pagination with URL state management

## Technical Implementation

### Location Search Race Condition Fix

**Problem**: Location searches would initially show unsorted results, then "flash" to distance-sorted results.

**Root Cause**: Coordinates weren't immediately available when the search page loaded, causing a delay in distance sorting.

**Solution**: 
1. Geocode location during search form submission
2. Include `searchLat` and `searchLng` in URL parameters
3. Use `useEffect` to immediately restore coordinates from URL
4. Enable instant distance sorting on page load

**Implementation**:
```javascript
// In search forms
const handleSearch = async (searchValue, locationValue, coordinates) => {
  const query = { /* other params */ };
  
  // Persist coordinates in URL
  if (coordinates && coordinates.lat && coordinates.lng) {
    query.searchLat = coordinates.lat.toString();
    query.searchLng = coordinates.lng.toString();
  }
  
  router.push({ pathname: '/find-care', query }, undefined, { shallow: true });
};

// In search result pages  
useEffect(() => {
  if (searchLat && searchLng && !isNaN(searchLat) && !isNaN(searchLng)) {
    setSearchLocation({
      latitude: searchLat,
      longitude: searchLng
    });
  }
}, [searchLat, searchLng]);
```

### Specialty Search Enhancement

**Acronym Mapping System**:
```javascript
// specialtyAcronymMap.js
export default {
  "ent": "Otolaryngology",
  "obgyn": "Obstetrics and Gynecology", 
  "derm": "Dermatology",
  "ortho": "Orthopedic Surgery",
  // ... more mappings
};

// Usage in search
const resolvedSpecialty = resolveSpecialtyAcronym(userInput);
```

**Fuzzy Search Implementation**:
```javascript
export function getSpecialtySuggestions(input, availableSpecialties) {
  if (!input) return [];
  
  const searchTerm = input.toLowerCase().trim();
  
  return availableSpecialties
    .filter(specialty => specialty.toLowerCase().includes(searchTerm))
    .sort((a, b) => {
      // Prioritize exact matches
      const aStarts = a.toLowerCase().startsWith(searchTerm);
      const bStarts = b.toLowerCase().startsWith(searchTerm);
      if (aStarts && !bStarts) return -1;
      if (!aStarts && bStarts) return 1;
      return a.localeCompare(b);
    })
    .slice(0, 10);
}
```

### GraphQL Integration

**Enhanced Physician Query**:
```graphql
query GetPhysiciansList(
  $search: String
  $specialty: [String]
  $language: String
  $insurance: String
  $education: String
  $gender: [String]
  $orderBy: String
  $order: String
  $offset: Int
  $size: Int
) {
  doctorsList(
    search: $search
    specialty: $specialty
    language: $language
    insurance: $insurance
    education: $education
    gender: $gender
    orderBy: $orderBy
    order: $order
    offset: $offset
    size: $size
  ) {
    items {
      # ... physician fields
    }
    total
  }
}
```

## Configuration

### Required Environment Variables
```bash
# Google Geocoding API (for location services)
GOOGLE_MAPS_API_KEY=your_api_key_here
```

### API Dependencies
- **Google Geocoding API**: Location services and coordinate conversion
- **WPGraphQL**: Backend data queries
- **WordPress REST API**: Fallback for certain data operations

## URL Structure

### Find Care Page
```
/find-care?search=doctor+name&location=90210&searchLat=34.0901&searchLng=-118.4065&specialty=cardiology&page=1
```

### Specialty Pages
```
/specialty/cardiology?location=90210&searchLat=34.0901&searchLng=-118.4065&page=1
```

## Known Issues & Limitations

### Current Limitations
1. **ACF Dependency**: Specialty data currently relies on ACF fields
2. **API Rate Limits**: Google Geocoding API has daily quotas
3. **Browser Compatibility**: Geolocation requires HTTPS in production

### Future Improvements Needed

#### 1. Specialty System Refactoring
> **Priority: HIGH**

**Current State**: Specialties managed through ACF (Advanced Custom Fields)
**Target State**: Custom post type for specialties

**Required Changes**:
- Create custom post type for specialties
- Migrate ACF specialty data to custom post type
- Update GraphQL schema for new specialty structure
- Refactor all specialty-related queries and components
- Add specialty taxonomy support
- Implement specialty hierarchies (parent/child relationships)

**Impact**: 
- Better performance (native WordPress queries vs ACF)
- Improved specialty management in WordPress admin
- Enhanced specialty metadata capabilities
- Better SEO for specialty pages

#### 2. Enhanced Distance Filtering
- Server-side distance filtering for better performance
- Radius-based search options (5mi, 10mi, 25mi, etc.)
- Map-based result visualization

#### 3. Search Analytics
- Track popular search terms
- Monitor specialty search patterns
- Location-based search analytics

## Testing Guidelines

### Location Search Testing
1. Test with various zip codes (US and international)
2. Verify distance calculations accuracy
3. Test geolocation permission handling
4. Validate coordinate persistence across navigation

### Specialty Search Testing
1. Test acronym resolution ("ENT" should find "Otolaryngology")
2. Verify fuzzy matching functionality
3. Test auto-complete behavior
4. Validate specialty-specific page functionality

### Cross-Browser Testing
- Chrome, Firefox, Safari, Edge
- Mobile browsers (iOS Safari, Chrome Mobile)
- Geolocation permission handling varies by browser

### Performance Testing
- Test with large result sets (1000+ physicians)
- Validate pagination performance
- Monitor GraphQL query performance
- Test geocoding API response times

## Troubleshooting

### Common Issues

#### "Location search not working"
1. Check Google API key configuration
2. Verify HTTPS in production (required for geolocation)
3. Check browser geolocation permissions

#### "Specialty search returns no results"  
1. Verify specialty name spelling
2. Check GraphQL specialty data
3. Test acronym mapping functionality

#### "Distance sorting not working"
1. Check if coordinates are in URL (`searchLat`, `searchLng`)
2. Verify coordinate format (numbers, not strings)
3. Check console for geocoding errors

#### "Results flashing/reordering"
1. Ensure coordinate persistence in URL
2. Check `useEffect` dependencies
3. Verify shallow routing implementation

## Migration Notes

### Specialty System Migration (Future)
When migrating from ACF to custom post type:

1. **Data Export**: Export current ACF specialty data
2. **Custom Post Type**: Create specialty post type with proper meta fields
3. **Data Import**: Migrate ACF data to new structure
4. **GraphQL Updates**: Update schema and resolvers
5. **Component Updates**: Update all specialty-related components
6. **URL Structure**: May need to update specialty page URLs
7. **Testing**: Comprehensive testing of all specialty functionality

### Rollback Plan
- Keep ACF fields during transition period
- Feature flags for new vs old specialty system
- Gradual rollout with A/B testing capability