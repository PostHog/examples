import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { AuthProvider } from "@/contexts/AuthContext";
import { initPostHog } from "@/lib/posthog-client";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Initialize PostHog on the client side
    initPostHog();
  }, []);

  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}
