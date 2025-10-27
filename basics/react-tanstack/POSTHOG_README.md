# PostHog TanStack Start Example

This is a [TanStack Start](https://tanstack.com/start) example demonstrating PostHog integration with product analytics, session replay, feature flags, and error tracking.

## Features

- **Product Analytics**: Track user events and behaviors
- **Session Replay**: Record and replay user sessions
- **Error Tracking**: Capture and track errors
- **User Authentication**: Demo login system with PostHog user identification
- **Server-side & Client-side Tracking**: Examples of both tracking methods
- **Reverse Proxy**: PostHog ingestion through Vite proxy

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the root directory:

```bash
VITE_POSTHOG_KEY=your_posthog_project_api_key
VITE_POSTHOG_HOST=https://us.i.posthog.com
```

Get your PostHog API key from your [PostHog project settings](https://app.posthog.com/project/settings).

### 3. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the app.

## Project Structure

```
src/
├── components/
│   └── Header.tsx           # Navigation header with auth state
├── contexts/
│   └── AuthContext.tsx      # Authentication context with PostHog integration
├── lib/
│   ├── posthog-client.ts    # Client-side PostHog initialization
│   └── posthog-server.ts    # Server-side PostHog client
├── routes/
│   ├── __root.tsx           # Root route with AuthProvider
│   ├── index.tsx            # Home page
│   ├── login.tsx            # Login page
│   ├── burrito.tsx          # Demo feature page with event tracking
│   ├── profile.tsx          # User profile with error tracking demo
│   └── api/
│       └── auth/
│           └── login.ts     # Login API with server-side tracking

vite.config.ts               # Vite config with PostHog proxy
```

## Key Integration Points

### Client-side initialization (lib/posthog-client.ts)

```typescript
import posthog from 'posthog-js'

export function initPostHog() {
  if (typeof window !== 'undefined') {
    posthog.init(import.meta.env.VITE_POSTHOG_KEY!, {
      api_host: '/ingest',
      ui_host: 'https://us.posthog.com',
      defaults: '2025-05-24',
      capture_exceptions: true,
      debug: import.meta.env.DEV,
    })
  }
}
```

### Server-side client (lib/posthog-server.ts)

```typescript
import { PostHog } from 'posthog-node'

export function getPostHogClient() {
  if (!posthogClient) {
    posthogClient = new PostHog(
      process.env.VITE_POSTHOG_KEY!,
      {
        host: process.env.VITE_POSTHOG_HOST,
        flushAt: 1,
        flushInterval: 0
      }
    )
  }
  return posthogClient
}
```

### User identification (AuthContext.tsx)

```typescript
posthog.identify(username, {
  username: username,
})
```

### Event tracking (burrito.tsx)

```typescript
posthog.capture('burrito_considered', {
  total_considerations: count,
  username: username,
})
```

### Error tracking (profile.tsx)

```typescript
posthog.captureException(error)
```

### Server-side tracking (api/auth/login.ts)

```typescript
const posthog = getPostHogClient()
posthog.capture({
  distinctId: username,
  event: 'server_login',
  properties: { ... }
})
```

## TanStack Start vs Next.js Differences

This example uses TanStack Start instead of Next.js. Key differences:

1. **File-based routing**: Pages in `src/routes/` with different conventions
2. **Root route**: Uses `__root.tsx` with `shellComponent` for the root document
3. **API Routes**: Located in `src/routes/api/` using `createAPIRoute`
4. **No 'use client'**: Client/server code determined by file location and imports
5. **Router**: Uses `@tanstack/react-router` instead of Next.js router
6. **Head metadata**: Uses `head()` function in route definitions
7. **Vite-based**: Uses Vite instead of Next.js/Turbopack for bundling
8. **Environment variables**: Uses `VITE_` prefix instead of `NEXT_PUBLIC_`

## Vite Proxy Configuration

The proxy configuration in `vite.config.ts` routes PostHog requests through the Vite dev server:

```typescript
server: {
  proxy: {
    '/ingest': {
      target: 'https://us.i.posthog.com',
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/ingest/, ''),
      secure: false,
    },
  },
}
```

This avoids CORS issues and improves data collection reliability.

## Pages

### Login Page (`/login`)
- Simple username/password authentication
- PostHog user identification on successful login
- Server-side and client-side tracking of login events

### Burrito Tracker (`/burrito`)
- Demo page with event tracking
- Click tracking with custom event properties
- Real-time counter display

### Profile Page (`/profile`)
- User profile information
- Error tracking demo
- Displays PostHog user properties

## Events Tracked

1. `user_logged_in` - Client-side login event
2. `server_login` - Server-side login event
3. `user_logged_out` - Client-side logout event
4. `burrito_considered` - Custom feature event

## Learn More

- [PostHog Documentation](https://posthog.com/docs)
- [TanStack Start Documentation](https://tanstack.com/start)
- [TanStack Router Documentation](https://tanstack.com/router)
- [PostHog React Integration](https://posthog.com/docs/libraries/react)

## Deploy

TanStack Start can be deployed to various platforms:

- **Vercel**: Full support with edge functions
- **Netlify**: Supports server-side rendering
- **Cloudflare Workers**: Deploy to the edge
- **Node.js**: Traditional server deployment

Check out the [TanStack Start deployment documentation](https://tanstack.com/start/latest/docs/deployment) for more details.
