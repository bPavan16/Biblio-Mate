# 📚 Biblio-Mate

A web application for analyzing books and getting detailed information using AI-powered insights.

## Description
Biblio-Mate leverages advanced AI technology to provide users with in-depth analysis and insights about their favorite books. By simply entering a book's name, users can access a wealth of information including summaries, reviews, and recommendations for similar books. This tool is designed to enhance the reading experience by offering detailed and personalized insights, making it easier for readers to discover new books and understand the ones they love.

## Features

- 🔍 Instant book analysis
- 📊 Comprehensive book details
- 📝 AI-generated summaries
- ⭐ Reviews and ratings
- 📚 Similar book recommendations
- 🎯 Target audience insights

## Technologies

- **Frontend**: Next.js, React, TypeScript
- **Styling**: Tailwind CSS
- **AI Integration**: Google Gemini AI
- **API**: REST APIs

## Sample Screenshots

![Sample Image](images/screenshot1.png)

## Setup

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Google Gemini API key

### Installation

1. Clone the repository:

```bash
git clone https://github.com/bPavan16/biblio-mate.git
cd biblio-mate
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env.local` file in the root directory and add the following environment variables:

```env
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key
```

4. Start the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. Enter a book name in the search field.
2. Click "Search" or press Enter.
3. View comprehensive book analysis including:
   - Basic book information
   - Summary
   - Reviews
   - Similar book recommendations

## API Integration

The application uses Google's Gemini AI API for book analysis. The integration is handled in utils/gemini.ts.

Example API response structure:

```JSON
{
  "book": {
    "Title": "Book Title",
    "Author": "Author Name",
    "Publisher": "Publisher Name",
    "Publication Year": "YYYY",
    "Details": {
      "format": "Format types",
      "ISBN": "ISBN number",
      "pages": "Page count",
      "language": "Language"
    }
  }
}
```

## Contributing

Fork the repository

1. Create your feature branch:
    ```bash
    git checkout -b feature/YourFeature
    ```

2. Commit your changes:
    ```bash
    git commit -m 'Add some feature'
    ```

3. Push to the branch:
    ```bash
    git push origin feature/YourFeature
    ```

4. Submit a pull request

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments
* Google Gemini AI for providing the analysis capabilities
* Next.js team for the amazing framework
* All contributors and users of the application
