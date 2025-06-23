# EventHub Frontend

A professional event booking platform built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 🎯 **Clean Architecture**: Well-organized folder structure with separation of concerns
- 🔐 **Authentication**: Complete login/register system
- 🎨 **Professional UI**: Modern design with purple/blue gradient theme
- 📱 **Responsive Design**: Mobile-first approach
- 🎪 **Event Management**: Support for seminars, concerts, and exhibitions
- 🎫 **Ticket Booking**: Multiple ticket types with quota management
- 📊 **Dashboard**: User dashboard with booking history
- 🔍 **Search & Filter**: Advanced event discovery

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **State Management**: React Context API

## Project Structure

\`\`\`
eventhub-frontend/
├── app/                    # Next.js App Router
│   ├── auth/              # Authentication pages
│   ├── events/            # Event pages
│   ├── dashboard/         # User dashboard
│   └── globals.css        # Global styles
├── components/            # Reusable components
│   ├── auth/             # Authentication components
│   ├── events/           # Event-related components
│   ├── layout/           # Layout components
│   ├── sections/         # Page sections
│   └── ui/               # shadcn/ui components
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions and API client
├── providers/            # React context providers
├── types/                # TypeScript type definitions
└── public/               # Static assets
\`\`\`

## Installation & Setup

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Backend API running (adjust API_URL in .env)

### Step-by-Step Installation

1. **Create new Next.js project**
   \`\`\`bash
   npx create-next-app@latest eventhub-frontend --typescript --tailwind --eslint --app
   cd eventhub-frontend
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install lucide-react class-variance-authority clsx tailwind-merge
   npm install -D @types/node
   \`\`\`

3. **Install shadcn/ui**
   \`\`\`bash
   npx shadcn@latest init
   npx shadcn@latest add button input label card avatar dropdown-menu toast badge
   \`\`\`

4. **Environment Variables**
   Create `.env.local`:
   \`\`\`env
   NEXT_PUBLIC_API_URL=http://localhost:8000/api
   \`\`\`

5. **Copy the code files**
   - Copy all the component files to their respective directories
   - Update `tailwind.config.ts` with the provided configuration
   - Update `app/globals.css` with custom styles

6. **Run the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

## API Integration

The frontend is designed to work with a REST API backend. Key endpoints expected:

- `POST /auth/login` - User authentication
- `POST /auth/register` - User registration
- `GET /events` - List events with filters
- `GET /events/:id` - Get event details
- `POST /bookings` - Create booking
- `GET /bookings/user` - Get user bookings

## Business Rules Implementation

- **BR-1**: Seminar seat selection with no double booking
- **BR-2**: Concert tickets with Regular, VIP, VVIP categories
- **BR-3**: Quota management per ticket category
- **BR-4**: Maximum 5 tickets per concert purchase
- **BR-5**: Exhibition with Regular and VIP access types

## Key Features

### Authentication System
- Secure login/register forms
- JWT token management
- Protected routes
- User session persistence

### Event Management
- Event listing with filters
- Detailed event pages
- Category-based browsing
- Search functionality

### Booking System
- Multi-step booking process
- Ticket quantity selection
- Real-time availability checking
- Booking confirmation

### User Dashboard
- Booking history
- Upcoming events
- Profile management
- Statistics overview

## Customization

### Styling
- Modify `app/globals.css` for global styles
- Update `tailwind.config.ts` for theme customization
- Component-specific styles in individual files

### API Configuration
- Update `lib/api.ts` for different backend endpoints
- Modify authentication flow in `providers/auth-provider.tsx`
- Adjust data types in `types/index.ts`

## Deployment

### Vercel (Recommended)
\`\`\`bash
npm run build
vercel --prod
\`\`\`

### Other Platforms
\`\`\`bash
npm run build
npm start
\`\`\`

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## License

This project is licensed under the MIT License.
