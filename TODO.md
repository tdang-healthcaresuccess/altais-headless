# Project TODO & Future Improvements

## High Priority Items

### 🚨 CRITICAL: Specialty System Refactoring
> **Status**: Pending WordPress Plugin Update  
> **Priority**: HIGH  
> **Estimated Effort**: 2-3 weeks  

**Background**: The current specialty system relies on ACF (Advanced Custom Fields) for specialty data management. This needs to be refactored once the physician plugin is updated to use custom post types for specialties.

**Current Implementation**:
- Specialties stored as ACF fields on physician posts
- Limited specialty metadata capabilities
- Performance limitations with large datasets
- Complex specialty relationship management

**Target Implementation**:
- Custom post type for specialties (`specialty` post type)
- Native WordPress taxonomy for specialty categories
- Enhanced specialty metadata (descriptions, icons, etc.)
- Hierarchical specialty relationships (parent/child)
- Improved performance with native WordPress queries

**Required Changes**:

#### 1. WordPress Backend Changes
- [ ] Create custom post type for specialties
- [ ] Design specialty taxonomy structure  
- [ ] Create specialty metadata fields
- [ ] Build data migration script from ACF to custom post type
- [ ] Update WordPress admin interface for specialty management

#### 2. GraphQL Schema Updates
- [ ] Update WPGraphQL schema for new specialty post type
- [ ] Create new specialty resolvers
- [ ] Add specialty taxonomy queries
- [ ] Implement specialty metadata queries
- [ ] Add specialty hierarchy support

#### 3. Frontend Component Updates
- [ ] Update `queries/PhysicianQueries.js` for new specialty structure
- [ ] Refactor `components/specialtySearchUtils.js` for new data structure
- [ ] Update `components/specialtyAcronymMap.js` if needed
- [ ] Modify all specialty autocomplete components
- [ ] Update specialty-specific page queries in `wp-templates/single-specialty.js`
- [ ] Refactor specialty filters in `components/find-doc/search-filter-sidebar.js`

#### 4. URL & Routing Updates  
- [ ] Review specialty page URL structure
- [ ] Update Next.js routing for specialty pages
- [ ] Ensure SEO optimization for new specialty URLs
- [ ] Add redirects from old to new URLs if needed

#### 5. Testing & Migration
- [ ] Create comprehensive test suite for new specialty system
- [ ] Develop rollback plan in case of issues
- [ ] Plan gradual rollout strategy
- [ ] Document migration process
- [ ] Train content managers on new specialty management interface

**Dependencies**:
- WordPress physician plugin update
- WPGraphQL compatibility verification
- Content team training on new admin interface

**Risk Mitigation**:
- Maintain ACF fields during transition period
- Implement feature flags for gradual rollout
- Create comprehensive backup before migration
- Plan for rollback scenario

---

## Medium Priority Items

### 🔍 Search System Enhancements

#### Enhanced Distance Filtering
- [ ] Add radius-based search options (5mi, 10mi, 25mi, 50mi)
- [ ] Implement server-side distance filtering for better performance
- [ ] Add map-based result visualization
- [ ] Create distance preference user settings

#### Search Analytics & Insights
- [ ] Track popular search terms and patterns
- [ ] Monitor specialty search frequency
- [ ] Analyze location-based search trends
- [ ] Create admin dashboard for search insights

#### Advanced Search Features
- [ ] Add physician availability filtering (accepting new patients)
- [ ] Implement hospital/practice affiliation filters
- [ ] Add board certification filtering
- [ ] Create saved search functionality for users

### 🚀 Performance Optimizations

#### Search Performance
- [ ] Implement search result caching
- [ ] Add GraphQL query optimization
- [ ] Create search result prefetching
- [ ] Optimize image loading for physician photos

#### Location Services
- [ ] Add geolocation caching to reduce API calls
- [ ] Implement fallback for Google API failures
- [ ] Add location preference cookies
- [ ] Create offline location support

---

## Low Priority Items

### 🎨 User Experience Improvements

#### Mobile Optimization
- [ ] Enhance mobile search interface
- [ ] Improve touch interactions for filters
- [ ] Add swipe gestures for result browsing
- [ ] Optimize map view for mobile devices

#### Accessibility Enhancements
- [ ] Add screen reader support for search components
- [ ] Implement keyboard navigation for all search features
- [ ] Add high contrast mode support
- [ ] Create voice search capability

#### Visual Enhancements
- [ ] Add loading skeletons for better perceived performance
- [ ] Create animated transitions between search states
- [ ] Add visual indicators for search quality/relevance
- [ ] Implement dark mode support

### 🔧 Technical Improvements

#### Code Quality
- [ ] Add comprehensive TypeScript support
- [ ] Create unit tests for all search components
- [ ] Add integration tests for search workflows
- [ ] Implement E2E testing for critical user journeys

#### Development Experience
- [ ] Add Storybook for component documentation
- [ ] Create GraphQL code generation tooling
- [ ] Add automated visual regression testing
- [ ] Implement commit message standards

---

## Backlog Items

### Future Feature Considerations
- [ ] Multi-language search support
- [ ] Voice search integration
- [ ] AI-powered search suggestions
- [ ] Real-time physician availability
- [ ] Telemedicine appointment booking integration
- [ ] Insurance verification integration
- [ ] Patient review and rating system
- [ ] Physician scheduling integration

---

## Technical Debt

### Current Known Issues
- [ ] Remove console.log statements from production code
- [ ] Standardize error handling across all components
- [ ] Optimize bundle size for search components
- [ ] Add proper loading states for all async operations
- [ ] Implement proper error boundaries for search components

### Documentation Needs
- [ ] Create component documentation with Storybook
- [ ] Add inline code documentation for complex functions
- [ ] Create troubleshooting guides for common issues
- [ ] Document GraphQL schema changes process
- [ ] Add deployment and rollback procedures

---

## Monitoring & Maintenance

### Regular Maintenance Tasks
- [ ] Monitor Google Geocoding API usage and costs
- [ ] Review search performance metrics monthly
- [ ] Update specialty acronym mappings as needed
- [ ] Test search functionality after WordPress/plugin updates
- [ ] Validate search accuracy with content team quarterly

### Performance Monitoring
- [ ] Set up alerts for search API failures
- [ ] Monitor search response times
- [ ] Track search conversion rates
- [ ] Monitor geolocation success rates

---

*Last Updated: October 2025*  
*Next Review: After specialty system plugin update*