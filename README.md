# MCP Server for Quran.com API

MCP server to interact with Quran.com corpus via the official [REST API v4](https://api-docs.quran.com/docs/content_apis_versioned/4.0.0/content-apis).

## Overview

This is a Model Context Protocol (MCP) server generated from the [OpenAPI specification](v4.json).

### ✨ Key Features

- **🚀 Intelligent Caching** - Automatic caching of frequently accessed data (chapters, translations, verses) for faster responses
- **📝 Ready-to-Use Prompts** - 8 pre-built prompts for common Quran study tasks
- **🎯 Comprehensive API Coverage** - Full access to Quran.com v4 API endpoints
- **🔄 Automatic Retries** - Built-in retry logic with exponential backoff for network resilience
- **📊 Verbose Logging** - Detailed request/response logging for debugging and monitoring

## Endpoints

The following endpoints from the API have been made available as tools, that LLMs can use via compatible clients.

### Chapters
* GET /chapters - List Chapters
* GET /chapters/{id} - Get Chapter
* GET /chapters/{chapter_id}/info - Get Chapter Info

### Verses
* GET /verses/by_chapter/{chapter_number} - Get verses by Chapter / Surah number
* GET /verses/by_page/{page_number} - Get all verses of a specific Madani Mushaf page
* GET /verses/by_juz/{juz_number} - Get verses by Juz number
* GET /verses/by_hizb/{hizb_number} - Get verses by Hizb number
* GET /verses/by_rub/{rub_el_hizb_number} - Get verses by Rub el Hizb number
* GET /verses/by_key/{verse_key} - Get verse by key
* GET /verses/random - Get a random verse

### Juzs
* GET /juzs - Get list of all juzs

### Search
* GET /search - Search the Quran for specific terms

### Translations
* GET /resources/translations - Get list of available translations
* GET /resources/translations/{translation_id}/info - Get information of a specific translation

### Tafsirs
* GET /resources/tafsirs - Get list of available tafsirs
* GET /resources/tafsirs/{tafsir_id}/info - Get the information of a specific tafsir
* GET /quran/tafsirs/{tafsir_id} - Get a single tafsir

### Audio
* GET /resources/chapter_reciters - List of Chapter Reciters
* GET /resources/recitation_styles - Get the available recitation styles

### Languages
* GET /resources/languages - Get all languages

## Prompts

The server includes 8 pre-built prompts for common Quran study tasks:

1. **Daily Verse for Reflection** - Get a random verse with translation for daily study
2. **Study a Surah** - Comprehensive information about a specific Surah
3. **Search for a Topic** - Search verses related to specific topics or keywords
4. **Compare Verse Translations** - View multiple translations side-by-side
5. **Study a Juz** - Access verses from a specific Juz for structured reading
6. **Get a Famous Verse** - Quick access to well-known verses (Ayat al-Kursi, etc.)
7. **Browse Available Translations** - List all translations by language
8. **Memorization Helper** - Get verses from specific Mushaf pages

Use these prompts in Claude Desktop to quickly access common Quran study workflows.

## Quick Start

After installation, try these commands in Claude Desktop:

```
"Show me a random verse for today's reflection"
"I want to study Surah Al-Fatiha"
"Find verses about patience"
"Show me Ayat al-Kursi with multiple translations"
```

📖 **For detailed usage examples and guides, see [USAGE.md](USAGE.md)**

## Setup

### Requirements

* Node.js 22+
* Docker

### Building the Docker Image

Before using the Docker-based production mode, you need to build the Docker image:

```bash
# Build the Docker image
docker build -t quran-mcp-server .
```

## Claude Desktop Integration

To use this MCP server with Claude Desktop, add the following configuration to your `claude_desktop_config.json` file (typically located at `~/Library/Application Support/Claude/claude_desktop_config.json` on macOS or `%APPDATA%\Claude\claude_desktop_config.json` on Windows):

### Docker-based Production Mode

```json
{
  "mcpServers": {
    "quran-api": {
      "command": "docker",
      "args": ["run", "-i", "--rm", "--init", "-e", "API_KEY=your_api_key_if_needed", "-e", "VERBOSE_MODE=true", "quran-mcp-server"],
      "disabled": false,
      "autoApprove": []
    }
  }
}
```

### Production Mode (Node.js)

```json
{
  "mcpServers": {
    "quran-api": {
      "command": "node",
      "args": ["/path/to/quran-mcp-server/dist/src/server.js"],
      "env": {
        "API_KEY": "your_api_key_if_needed",
        "VERBOSE_MODE": "true" // Set to "true" to enable verbose logging
      },
      "disabled": false,
      "autoApprove": []
    }
  }
}
```

### Development Mode

```json
{
  "mcpServers": {
    "quran-api": {
      "command": "npx",
      "args": ["ts-node", "/path/to/quran-mcp-server/src/server.ts"],
      "env": {
        "API_KEY": "your_api_key_if_needed",
        "VERBOSE_MODE": "true" // Set to "true" to enable verbose logging
      },
      "disabled": false,
      "autoApprove": []
    }
  }
}
```

**Important Notes:**
- Replace `/path/to/quran-mcp-server` with the actual path to this repository on your system
- You'll need to build the project first with `npm run build` or `docker build -t quran-mcp-server .` if using the production mode configuration
- Replace `your_api_key_if_needed` with an actual API key if required by the Quran.com API
- If you already have other MCP servers configured, add this configuration to the existing `mcpServers` object
- After updating the configuration, restart Claude Desktop for the changes to take effect

## Environment Variables

* `API_KEY`: API key for authentication (if required by Quran.com API)
* `PORT`: Server port (default: 8000 or 3000 depending on language)
* `VERBOSE_MODE`: Set to 'true' to enable verbose logging of API requests, responses, and cache hits (default: false)

## Performance Features

### Intelligent Caching

The server automatically caches frequently accessed data to improve response times and reduce API calls:

- **Chapters**: Cached for 1 hour (max 50 entries)
- **Translations**: Cached for 1 hour (max 100 entries)
- **Verses**: Cached for 1 hour (max 200 entries)

Cache hits are logged when `VERBOSE_MODE` is enabled, showing the source as 'cache' along with current cache size.

### Automatic Retries

Network requests automatically retry up to 3 times with exponential backoff (1s, 2s, 4s) for:
- Network failures
- Server errors (5xx responses)

This ensures reliable operation even with temporary network issues.

## Verbose Mode

When `VERBOSE_MODE` is set to 'true', the server will log detailed information about API requests and responses to the console. This is useful for debugging and monitoring API interactions.

The verbose logging includes:

* **Requests**: Logs the tool name and arguments for each incoming request
* **Responses**: Logs the tool name and result data for each response
* **Errors**: Logs detailed error information including error name, message, and stack trace when available

Each log entry is timestamped and prefixed with the log type (REQUEST, RESPONSE, or ERROR) for easy identification.

## Testing

```bash
# Run tests
npm test
```

## License

This project is licensed under the MIT License.
