# Shawty - URL Shortener

A modern, fast, and secure URL shortener built with Next.js, Prisma, and MongoDB.

## Features

- **Instant URL Shortening**: Transform long URLs into short, shareable links in seconds
- **Unique Short Codes**: Generates unique alphanumeric codes for each URL
- **Duplicate Handling**: Reuses existing short codes for duplicate URLs to prevent waste
- **Modern UI**: Dark-mode first design with glassmorphism effects and smooth animations
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **REST API**: Clean API endpoints for integration
- **Toast Notifications**: User-friendly feedback with Sonner toasts

## Tech Stack

- **Frontend**: Next.js 16, React 19, Tailwind CSS, Lucide Icons
- **Backend**: Next.js API Routes
- **Database**: MongoDB with Prisma ORM
- **Styling**: Tailwind CSS with custom gradients and animations
- **Notifications**: Sonner for toast messages
- **Themes**: next-themes for dark/light mode support

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/shawty.git
   cd shawty
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL="your-mongodb-connection-string"
   NEXT_PUBLIC_URL="http://localhost:3000"
   ```

4. **Set up the database**:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the development server**:
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

### Web Interface

1. Enter a long URL in the input field
2. Click "Shorten URL"
3. Copy the generated short URL
4. Share or use the shortened link

### API Usage

#### Shorten a URL
```bash
POST /api/urls
Content-Type: application/json

{
  "url": "https://example.com/very/long/url"
}
```

Response:
```json
{
  "actual_url": "https://example.com/very/long/url",
  "short_url": "AbCdEf",
  "short_full": "http://localhost:3000/AbCdEf",
  "created_at": "2023-01-01T00:00:00.000Z"
}
```

#### Redirect to Original URL
Access `GET /api/urls/{shortCode}` or simply visit `/{shortCode}` to redirect to the original URL.

## Project Structure

```
shawty/
├── app/
│   ├── api/
│   │   └── urls/
│   │       ├── route.ts          # POST /api/urls
│   │       └── [short]/
│   │           └── route.ts      # GET /api/urls/{short}
│   ├── [short]/
│   │   └── page.tsx             # Client-side redirect page
│   ├── layout.tsx               # Root layout with theme provider
│   ├── page.tsx                 # Main UI
│   └── globals.css              # Global styles
├── components/
│   └── ui/                      # Shadcn/ui components
├── lib/
│   └── prisma.ts                # Prisma client
├── prisma/
│   └── schema.prisma            # Database schema
└── README.md
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/urls` | Create a short URL |
| GET | `/api/urls/{short}` | Redirect to original URL |
| GET | `/{short}` | Client-side redirect to original URL |

## Development

- **Linting**: `npm run lint`
- **Type Checking**: Run `npx tsc --noEmit`
- **Database**: Use `npx prisma studio` to view/edit data

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -am 'Add your feature'`
4. Push to branch: `git push origin feature/your-feature`
5. Submit a pull request

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons by [Lucide](https://lucide.dev/)
- Database ORM by [Prisma](https://prisma.io/)
