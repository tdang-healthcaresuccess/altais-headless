# Development

## Recent Development Updates (October 2025)

### Physician Search System Implementation

#### Major Features Added
- **Enhanced physician search with location-based sorting**
- **Specialty-specific search pages** 
- **Advanced filtering system** (gender, language, insurance, education)
- **Geolocation integration** with Google Geocoding API
- **Specialty acronym mapping system**
- **Homepage search form enhancement**

#### Key Files Modified/Added
- `queries/PhysicianQueries.js` - Enhanced GraphQL queries
- `wp-templates/single-specialty.js` - New specialty-specific search pages
- `components/front-page/search-doctor.js` - Enhanced homepage search
- `components/specialtySearchUtils.js` - New specialty search utilities
- `components/specialtyAcronymMap.js` - Specialty acronym definitions

#### Technical Fixes
- **Location Search Race Condition**: Fixed flashing results issue by persisting coordinates in URL
- **Search State Management**: Improved URL state persistence and coordinate restoration  
- **Distance Calculation**: Implemented Haversine formula for accurate distance measurements
- **Pagination Consistency**: Standardized 10 results per page across all search interfaces

#### Environment Requirements
```bash
# Required for location-based search
GOOGLE_MAPS_API_KEY=your_google_api_key_here
```

#### Known Technical Debt
> ⚠️ **IMPORTANT**: The specialty system currently uses ACF (Advanced Custom Fields) and will need refactoring once the physician plugin is updated to use custom post types for specialties.

**Affected Components When Migrating**:
- All specialty search functionality
- Specialty autocomplete components  
- GraphQL specialty queries
- Specialty page routing

### Development Guidelines

#### Testing Location Features
1. Test geolocation with browser location permission prompts
2. Verify distance calculations with known coordinates
3. Test various zip codes and international addresses
4. Validate URL parameter persistence across navigation

#### Specialty System Testing  
1. Test acronym mapping (e.g., "ENT" → "Otolaryngology")
2. Verify fuzzy search functionality
3. Test autocomplete dropdown behavior
4. Validate specialty-specific page functionality

#### GraphQL Development
- Use `npm run generate` to update possible types after schema changes
- Test queries in GraphQL IDE before implementation
- Monitor query performance with large result sets

## Updating the ACM Blueprint Export

### Importing

1. Create a fresh site in Local or use the FakerPress plugin to wipe your current WordPress database to a fresh install.
2. Install and activate Atlas Content Modeler.
3. From the WP CLI, run `wp acm blueprint import <URL_TO_ZIP>`. You can use the GitHub RAW URL from the repo: https://github.com/wpengine/faust-scaffold/raw/main/acm-blueprint.zip

This will import the ACM Blueprint export into your WordPress database. Make any modifications as necessary.

### Exporting

1. Before exporting, make sure you have deleted any of the initial content that gets created upon a WordPress install (e.g. "Sample Page", "Hello World", any comments, etc.)
2. From the WP CLI, run `wp acm blueprint export --open --wp-options=category_base,permalink_structure,nav_menu_options,theme_mods_twentytwentytwo --post-types=nav_menu_item,post,page,testimonial,project`. This will export the site into the appropriate ACM Blueprint .zip, and also open the location where the .zip was saved. It will also export the Navigational Menus and the CPTs from the ACM models.
3. Replace the existing `acm-blueprint.zip` in the repo with the newly exported `acm-blueprint.zip` and make a PR with the changes.
