# codeApp


This project is a coding assessment to create a simple shipping label PDF based on user input. The label is generated dynamically and returned via an Express.js HTTPS endpoint.


## Features

- PDF generation using [`pdfkit`](https://github.com/foliojs/pdfkit)
- Multilingual support (`en`, `nl`) with fallback to Google Translate for others
- Dynamic Express route: `POST /get-label`
- JSDoc comments on key types and routes
- Type-safe TypeScript implementation
- Unit tests with mocked PDF generation

## Implementation Notes

This challenge was well-structured and enjoyable. Here are a few notes and considerations made during the process:

### Known Shortcomings

- Pixel perfection: Due to the time limit, alignment and layout might be slightly off from the sample.
- Text constraints: Long text fields are not dynamically resized or truncated.
- i18n: While implemented, i18n handling could be better modularized.
- JSDoc: Applied on main parts, but not comprehensive across all files.
- PDF Content Validation: Tests currently mock output; full PDF parsing and content validation would be ideal with more time.

### Improvements (given more time)
- Auto-resize fonts or wrap long content more gracefully
- Extract i18n into JSON files or a locales/ structure
- Use pdf-parse or pdf-lib to inspect and validate generated PDF content in tests
- Apply stricter JSDoc and type validation throughout the project