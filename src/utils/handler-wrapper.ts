/**
 * Generic handler wrapper to reduce code duplication
 *
 * This utility provides a consistent way to handle MCP tool requests
 * with automatic validation, error handling, and logging.
 */

import { z } from 'zod';
import { verboseLog } from './logger';

/**
 * Generic handler wrapper that handles validation, error handling, and response formatting
 *
 * @param toolName - The name of the tool being executed
 * @param schema - Zod schema for validating arguments
 * @param serviceMethod - The service method to call with validated arguments
 * @returns MCP-formatted response
 */
export async function createHandler<T extends z.ZodType>(
  toolName: string,
  schema: T,
  serviceMethod: (args: z.infer<T>) => Promise<any>
) {
  return async (args: any) => {
    try {
      // Validate arguments
      const validatedArgs = schema.parse(args);

      // Call the service method
      const result = await serviceMethod(validatedArgs);

      // Log the response in verbose mode
      verboseLog('response', {
        tool: toolName,
        success: true
      });

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(result, null, 2)
          }
        ]
      };
    } catch (error) {
      verboseLog('error', {
        tool: toolName,
        error: error instanceof Error ? error.message : String(error)
      });

      if (error instanceof z.ZodError) {
        return {
          content: [{
            type: "text",
            text: `Validation error: ${error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', ')}`
          }],
          isError: true,
        };
      }

      return {
        content: [{
          type: "text",
          text: `Error: ${error instanceof Error ? error.message : "Unknown error"}`
        }],
        isError: true,
      };
    }
  };
}

/**
 * Simplified version for handlers that don't need schema validation
 */
export async function simpleHandler(
  toolName: string,
  serviceMethod: () => Promise<any>
) {
  return async () => {
    try {
      const result = await serviceMethod();

      verboseLog('response', {
        tool: toolName,
        success: true
      });

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(result, null, 2)
          }
        ]
      };
    } catch (error) {
      verboseLog('error', {
        tool: toolName,
        error: error instanceof Error ? error.message : String(error)
      });

      return {
        content: [{
          type: "text",
          text: `Error: ${error instanceof Error ? error.message : "Unknown error"}`
        }],
        isError: true,
      };
    }
  };
}
