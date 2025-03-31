# codeApp


This project is to create a simple shipping label PDF based on user input. The label is generated dynamically and returned via an Express.js HTTP endpoint.


## Features

- PDF generation using [`pdfkit`](https://github.com/foliojs/pdfkit)
- Multilingual support (`en`, `nl`) with fallback to Google Translate for others
- Dynamic Express route: `POST /get-label`
- JSDoc comments on key types and routes
- Type-safe TypeScript implementation
- Unit tests with mocked PDF generation


## Installation guide

1. Clone the repository:
2. cd codeApp/functions
3. npm install
4. npm run start

The app should be available on the port 3000.

To generate the label: localhost:3000/get-label

The payload should be:
{
    "return_address": {
        "company": "CODE ",
        "address": "Frederik Matthesstraat 30",
        "zip_code": "2613 ZZ",
        "city": "Delft",
        "country": "The Netherlands"
    },
    "order": "CODE-1339",
    "name": "Test User",
    "language": "en"
}


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