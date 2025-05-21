# B2B Campaign Builder

A professional tool for B2B marketers to generate conversion-focused Google Ads campaigns by analyzing target URLs and extracting actionable insights.

## Features

- **URL Analysis**: Extract and analyze content from B2B service websites
- **Keyword Generation**: Create targeted keyword clusters with strong conversion potential
- **Trend Analysis**: Evaluate keyword performance using Google Trends data
- **Campaign Generation**: Build structured Google Ads campaigns optimized for B2B conversions

## 4-Step Process

The application follows a 4-step process for campaign creation:

1. **Analyze URL**: Uses LangChain to extract content from a B2B service website and analyze key topics, selling points, and target audience using OpenRouter.
2. **Extract Keywords**: Generates optimized keyword clusters using OpenRouter API with the deepseek-chat-v3-0324 model.
3. **Analyze Trends**: Evaluates keywords using Google Trends API to identify high-potential terms.
4. **Build Campaign**: Creates a structured Google Ads campaign with ad groups, headlines, and descriptions optimized for B2B conversions using OpenRouter.

## API Endpoints

The application exposes the following API endpoints:

- `POST /api/analyze-url`: Analyzes a URL using LangChain and OpenRouter
- `POST /api/generate-keywords`: Generates keyword clusters using OpenRouter API
- `POST /api/analyze-trends`: Evaluates keywords using Google Trends API
- `POST /api/generate-campaign`: Creates a Google Ads campaign structure using OpenRouter

## Technologies Used

- **Next.js**: React framework for the application
- **LangChain**: For extracting and processing web content
- **OpenRouter API**: For all AI-based analysis and generation, using the deepseek-chat-v3-0324 model
- **Google Trends API**: For analyzing keyword trends and performance

## Setup

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env.local` file with the following variables:
   ```
   OPENROUTER_API_KEY=your_openrouter_api_key_here
   APP_URL=http://localhost:3000
   ```
4. Run the development server:
   ```
   npm run dev
   ```

## Implementation Details

### Unified OpenRouter Integration

All AI-powered endpoints now use OpenRouter instead of the Vercel AI SDK:

- The unified OpenRouter service at `lib/openrouter-service.ts` centralizes API calls and prompts
- Each prompt is carefully optimized for B2B campaign generation
- TypeScript interfaces ensure type safety across the application
- Support for multiple models with the ability to easily switch between them

```typescript
// Example of calling the unified OpenRouter service
import { callOpenRouter, prompts } from "@/lib/openrouter-service";

// Use the service with predefined prompts
const result = await callOpenRouter(prompts.analyzeUrl(pageContent));
```

### API Client

The API client at `lib/api-service.ts` provides:

- Type-safe methods to call each endpoint
- A complete campaign generation flow function
- Error handling and response parsing
- Interface definitions for all API responses

```typescript
// Example of using the API client for the complete flow
import { generateCompleteCampaign } from "@/lib/api-service";

// Generate a complete campaign from a URL
const result = await generateCompleteCampaign("https://example.com");
```

## Usage Flow

1. Submit a B2B service URL for analysis
2. Review extracted insights from the website content
3. Generate and evaluate keyword clusters
4. Analyze keyword trends and performance metrics
5. Generate a structured Google Ads campaign
6. Implement the campaign in Google Ads

## Notes

- The OpenRouter API with the deepseek-chat-v3-0324 model is used for all AI analysis and generation
- You need a valid API key for OpenRouter
- The Google Trends API has rate limiting, so avoid making too many requests in a short time
