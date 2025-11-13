/**
 * Search-related handlers for the Quran.com API MCP Server
 */

import { searchService } from '../services';
import { searchSchema } from '../schemas/search';
import { createHandler } from '../utils/handler-wrapper';

/**
 * Handler for the search tool
 */
export const handleSearch = createHandler(
  'search',
  searchSchema,
  (args) => searchService.search(args)
);
