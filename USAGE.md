# Quran MCP Server - Usage Guide

This guide shows you how to use the Quran MCP Server with Claude Desktop.

## Table of Contents

- [Quick Start](#quick-start)
- [Using Prompts](#using-prompts)
- [Using Tools](#using-tools)
- [Common Use Cases](#common-use-cases)
- [Performance Tips](#performance-tips)

## Quick Start

After setting up the server in Claude Desktop (see [README.md](README.md)), you can start using it immediately.

### Try Your First Query

Simply ask Claude:
> "Show me a random verse for today's reflection"

Claude will use the `daily-verse` prompt to fetch and display a random verse with translation.

## Using Prompts

The server includes 8 pre-built prompts for common tasks. You can use them by asking Claude naturally:

### 1. Daily Verse for Reflection

**What it does**: Gets a random verse with translation for daily study

**How to use**:
```
"Get me today's verse for reflection"
"Show me a random Quran verse"
"Give me a verse to reflect on using Pickthall translation"
```

**Behind the scenes**: Uses the `random-verse` tool with your preferred translation

---

### 2. Study a Surah

**What it does**: Provides comprehensive information about a specific Surah

**How to use**:
```
"I want to study Surah Al-Fatiha"
"Help me understand Surah 18 (Al-Kahf)"
"Show me Surah Yaseen with translation"
```

**Behind the scenes**: Combines chapter info and verses with translation

---

### 3. Search for a Topic

**What it does**: Searches the Quran for verses related to specific topics

**How to use**:
```
"Find verses about patience"
"Search for verses mentioning prayer"
"Show me what the Quran says about charity"
```

**Behind the scenes**: Uses the search API with your keyword

---

### 4. Compare Verse Translations

**What it does**: Shows a specific verse with multiple translations side-by-side

**How to use**:
```
"Show me verse 2:255 (Ayat al-Kursi) with different translations"
"Compare translations for verse 1:1"
"Show me 112:1-4 in Sahih International, Yusuf Ali, and Pickthall"
```

**Behind the scenes**: Fetches the same verse with multiple translation IDs

---

### 5. Study a Juz

**What it does**: Access verses from a specific Juz for structured reading

**How to use**:
```
"I want to read Juz 1"
"Show me verses from the 15th Juz"
"Help me study Juz Amma (Juz 30)"
```

**Behind the scenes**: Uses the verses-by-juz API endpoint

---

### 6. Get a Famous Verse

**What it does**: Quick access to well-known verses

**How to use**:
```
"Show me Ayat al-Kursi"
"Get the Throne Verse"
"Display the Verse of Light"
```

**Supported famous verses**:
- `ayat-al-kursi` or `throne-verse` → 2:255
- `verse-of-light` → 24:35
- `al-fatiha` → 1:1-7

---

### 7. Browse Available Translations

**What it does**: Lists all available translations by language

**How to use**:
```
"What English translations are available?"
"Show me all Urdu translations"
"List available Quran translations"
```

**Behind the scenes**: Fetches from the translations API with language filter

---

### 8. Memorization Helper

**What it does**: Gets verses from specific Mushaf pages for memorization

**How to use**:
```
"I'm memorizing page 1 of the Quran, show me the verses"
"What verses are on page 604?"
"Help me memorize page 50"
```

**Behind the scenes**: Uses the verses-by-page API endpoint

## Using Tools Directly

You can also ask Claude to use specific tools directly for more control:

### Get Specific Verses

```
"Use the verses-by-chapter tool to get Surah Al-Baqarah verses 1-10"
"Get verse 3:159 with translation ID 131"
```

### Search with Parameters

```
"Search for 'mercy' in the Quran, show 10 results"
"Find verses containing 'believers' in English"
```

### Get Chapter Information

```
"Get information about Surah Ar-Rahman"
"Show me details of chapter 112"
```

## Common Use Cases

### Daily Quran Reading Routine

**Morning Reflection**:
```
User: "Give me today's verse for reflection"
```

**Structured Study**:
```
User: "I want to study one page per day, show me page 1"
[Next day] "Show me page 2"
```

**Topic-Based Learning**:
```
User: "This week I want to learn about gratitude in the Quran"
User: "Search for verses about being thankful"
```

---

### Research and Study

**Comparative Analysis**:
```
User: "Show me verse 2:255 with Sahih International, Yusuf Ali, and Pickthall translations"
User: "Now show me the Tafsir for this verse"
```

**Thematic Study**:
```
User: "Find all verses about the prophets"
User: "Search for verses mentioning Moses"
User: "Now find verses about Abraham"
```

---

### Memorization Support

**Page-by-Page Memorization**:
```
User: "I'm starting to memorize Juz Amma, show me the first page"
User: "Show me page 582 with translation to help me understand"
```

**Verse-by-Verse**:
```
User: "Show me verses 1-7 of Surah Al-Mulk"
User: "Now show me verses 8-14"
```

---

### Teaching and Sharing

**Preparing Lessons**:
```
User: "I'm teaching about Surah Al-Fatiha, give me comprehensive information"
User: "Find verses about patience to share with my students"
```

**Quick References**:
```
User: "Show me Ayat al-Kursi to share"
User: "Get the last two verses of Surah Al-Baqarah"
```

## Performance Tips

### Leverage Caching

The server automatically caches:
- **Chapter lists**: Cached for 1 hour
- **Translations**: Cached for 1 hour
- **Verses**: Cached for 1 hour

**Tip**: Repeated queries for the same content will be much faster (up to 100x)!

### Verbose Mode

Enable verbose mode to see cache hits and API performance:

```json
{
  "env": {
    "VERBOSE_MODE": "true"
  }
}
```

You'll see logs like:
```
source: 'cache', cacheSize: 15  // Cache hit!
source: 'api'                    // Fresh API call
```

### Best Practices

1. **Reuse translation IDs**: Once you find a translation you like, use its ID consistently
   - Sahih International: 131
   - Yusuf Ali: 20
   - Pickthall: 22

2. **Batch related queries**: Ask for related content together
   ```
   "Show me Surah Al-Fatiha, then search for verses about guidance"
   ```

3. **Use specific verse keys**: More efficient than searching
   ```
   Good: "Show me verse 2:255"
   Less efficient: "Find Ayat al-Kursi"
   ```

## Translation IDs Reference

### Popular English Translations
- **131** - Sahih International (modern, clear)
- **20** - Yusuf Ali (classical, poetic)
- **22** - Pickthall (classical)
- **85** - Dr. Mustafa Khattab (The Clear Quran)
- **84** - Mufti Taqi Usmani

### Other Languages
Use the "Browse Available Translations" prompt to see all available translations in your preferred language.

## Troubleshooting

### Slow Responses
- First query is slower (API call), subsequent queries are cached
- Enable verbose mode to see if cache is being used

### Translation Not Found
- Use the translations tool to get the correct translation ID
- Ask: "What translations are available in [language]?"

### No Results from Search
- Try different search terms
- Check spelling
- Try searching in English vs Arabic

## Need More Help?

- Check the [README.md](README.md) for setup instructions
- Review the [CHANGELOG.md](CHANGELOG.md) for recent improvements
- Report issues at: https://github.com/anthropics/claude-code/issues
