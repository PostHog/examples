import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import { PostHogProvider } from 'posthog-js/react'

import Header from '../components/Header'
import { AuthProvider } from '../contexts/AuthContext'
import posthog from '../lib/posthog-client'

export const Route = createRootRoute({
  component: () => (
    <PostHogProvider client={posthog}>
      <AuthProvider>
        <Header />
        <main>
          <Outlet />
        </main>
        <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
      </AuthProvider>
    </PostHogProvider>
  ),
})
