# Welcome to the PostHog example collection

We've got live, working example code that demonstrates PostHog in action. You can run these yourself to see events flow into your PostHog project.

## These are not production-grade

These are more like model airplanes. They're dramatically simplified to make it easy to see PostHog in action. You shouldn't use these as starter projects or put them into production. The authentication is fake!

But the leanness makes these useful for agent-driven development. Use these as context to help your agent make better integration decisions about PostHog.

## Contents

More examples coming soon.

```
examples/
├── basics/
│   ├── next-app-router/              # Next.js 15 with App Router
│   │   ├── src/
│   │   │   ├── app/
│   │   │   │   ├── api/
│   │   │   │   │   └── auth/
│   │   │   │   │       └── login/
│   │   │   │   │           └── route.ts         # Server-side login API
│   │   │   │   ├── burrito/
│   │   │   │   │   └── page.tsx                 # Burrito consideration page
│   │   │   │   ├── profile/
│   │   │   │   │   └── page.tsx                 # User profile page
│   │   │   │   ├── layout.tsx                    # Root layout with providers
│   │   │   │   ├── page.tsx                      # Home/Login page
│   │   │   │   └── globals.css                   # Global styles
│   │   │   ├── components/
│   │   │   │   └── Header.tsx                    # Navigation header
│   │   │   ├── contexts/
│   │   │   │   └── AuthContext.tsx               # Auth context with PostHog
│   │   │   └── lib/
│   │   │       ├── posthog-server.ts             # Server-side PostHog client
│   │   │       └── instrumentation-client.ts     # Client-side PostHog init
│   │   ├── next.config.ts                        # Next.js config with rewrites
│   │   ├── package.json
│   │   └── README.md
│   │
│   └── next-pages-router/            # Next.js 15 with Pages Router
│       ├── src/
│       │   ├── pages/
│       │   │   ├── api/
│       │   │   │   └── auth/
│       │   │   │       └── login.ts              # Server-side login API
│       │   │   ├── _app.tsx                      # App wrapper with providers
│       │   │   ├── _document.tsx                 # Document wrapper
│       │   │   ├── index.tsx                     # Home/Login page
│       │   │   ├── burrito.tsx                   # Burrito consideration page
│       │   │   └── profile.tsx                   # User profile page
│       │   ├── components/
│       │   │   └── Header.tsx                    # Navigation header
│       │   ├── contexts/
│       │   │   └── AuthContext.tsx               # Auth context with PostHog
│       │   ├── lib/
│       │   │   ├── posthog-client.ts             # Client-side PostHog init
│       │   │   └── posthog-server.ts             # Server-side PostHog client
│       │   └── styles/
│       │       └── globals.css                   # Global styles
│       ├── next.config.ts                        # Next.js config with rewrites
│       ├── package.json
│       └── README.md
│
└── README.md                          # This file
```

## Examples

### basics/next-app-router

Next.js 15 with App Router demonstrating:
- Client-side and server-side PostHog initialization
- User identification and authentication
- Event tracking (login, logout, custom events)
- Error tracking with `posthog.captureException()`
- Reverse proxy setup for PostHog ingestion
- Session replay (automatic)

**Key differences:**
- Uses App Router (`src/app/` directory structure)
- Server Components by default
- `'use client'` directive for client components
- Route handlers (`route.ts`) for API routes
- Metadata via `layout.tsx` exports

### basics/next-pages-router

Same functionality as App Router example, but using Pages Router:
- Client-side and server-side PostHog initialization
- User identification and authentication
- Event tracking (login, logout, custom events)
- Error tracking with `posthog.captureException()`
- Reverse proxy setup for PostHog ingestion
- Session replay (automatic)

**Key differences:**
- Uses Pages Router (`src/pages/` directory structure)
- Client-side rendering by default
- No `'use client'` directive needed
- API routes in `src/pages/api/`
- Metadata via `next/head` component
- Custom `_app.tsx` and `_document.tsx`

### basics/react-react-router

Coming soon.

## Getting Started

Each example includes its own README with setup instructions. Generally:

1. Navigate to the example directory
2. Install dependencies: `pnpm install`
3. Create `.env.local` with your PostHog credentials
4. Run the dev server: `pnpm run dev`

See individual example READMEs for detailed instructions.

