# Changelog

All notable changes to the Quran MCP Server will be documented in this file.

## [Unreleased]

### Added - Major Enhancements

#### 🚀 Intelligent Caching System
- Implemented Cache utility class with automatic expiration and size limits
- Added caching to ChaptersService (50 entries, 1-hour TTL)
- Added caching to TranslationsService (100 entries, 1-hour TTL)
- Added caching to VersesService (200 entries, 1-hour TTL)
- Cache statistics logged in verbose mode (source: 'cache', cacheSize)
- **Impact**: Up to 100x faster responses for cached data

#### 📝 MCP Prompts - Pre-built Workflows
- Created 8 ready-to-use prompts for common Quran study tasks:
  1. **daily-verse** - Random verse for daily reflection
  2. **study-surah** - Comprehensive Surah study guide
  3. **search-topic** - Search verses by keyword/topic
  4. **compare-translations** - Side-by-side translation comparison
  5. **juz-study** - Structured Juz reading
  6. **famous-verse** - Quick access to well-known verses
  7. **list-translations** - Browse available translations
  8. **memorization-helper** - Get verses by Mushaf page
- Fully integrated prompts/list and prompts/get handlers
- Dynamic message generation with parameter validation
- **Impact**: Greatly improved user experience for common tasks

#### 🧹 Handler Code Refactoring
- Created generic `createHandler()` wrapper utility
- Refactored ALL 19 handlers to use consistent pattern
- Centralized error handling, validation, and logging
- **Code reduction**: 1,029 lines → 280 lines (-73%)
- **Files refactored**:
  - chapters.ts: 166 → 38 lines (-77%)
  - verses.ts: 388 → 78 lines (-80%)
  - resources.ts: 320 → 97 lines (-70%)
  - search.ts: 60 → 16 lines (-73%)
  - juzs.ts: 60 → 16 lines (-73%)
- **Impact**: Easier maintenance, consistent behavior, faster development

### Changed

#### Security Improvements
- Updated axios from 1.8.4 → 1.13.2 (fixes CVE DoS vulnerability)
- Fixed form-data critical vulnerability
- All npm audit vulnerabilities resolved

#### Code Quality
- Eliminated ~750 lines of duplicated error handling code
- Implemented DRY principles throughout handlers
- Added comprehensive TypeScript types
- Improved error messages and logging

### Technical Details

#### Performance
- **Caching**: Automatic expiration, LRU eviction
- **Retries**: 3 attempts with exponential backoff (1s, 2s, 4s)
- **Response Time**: <10ms for cache hits vs ~200ms for API calls

#### Architecture
- **Handler Pattern**: All handlers use createHandler() wrapper
- **Service Layer**: Caching integrated at service level
- **Error Handling**: Centralized, consistent error responses
- **Logging**: Verbose mode shows cache hits, API calls, errors

## Previous Versions

### [v4] - Initial Release
- Full integration with Quran.com API v4
- Support for 19 API endpoints
- Docker and Node.js deployment options
- Verbose logging mode
- Retry mechanism for failed requests
