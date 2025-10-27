import { Link, createRootRoute, HeadContent, Scripts, createFileRoute, lazyRouteComponent, createRouter } from "@tanstack/react-router";
import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { TanStackDevtools } from "@tanstack/react-devtools";
import { useState, useEffect, createContext, useContext } from "react";
import posthog from "posthog-js";
import { PostHog } from "posthog-node";
import { json } from "@tanstack/router-core/ssr/client";
import { c as createServerFn, a as createServerRpc } from "../server.js";
import fs from "node:fs";
function initPostHog() {
  if (typeof window !== "undefined") {
    posthog.init("phc_sBGFIjin7AfcLwLJ4yc79wY84KHkvrTw5SnUeKD0SWE", {
      api_host: "/ingest",
      ui_host: "https://us.posthog.com",
      // Include the defaults option as required by PostHog
      defaults: "2025-05-24",
      // Enables capturing unhandled exceptions via Error Tracking
      capture_exceptions: true,
      // Turn on debug in development mode
      debug: false,
      // Disable in server-side rendering
      loaded: (posthog2) => {
      }
    });
  }
}
const AuthContext = createContext(void 0);
const users = /* @__PURE__ */ new Map();
function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUsername = localStorage.getItem("currentUser");
      if (storedUsername) {
        const existingUser = users.get(storedUsername);
        if (existingUser) {
          setUser(existingUser);
        }
      }
    }
  }, []);
  const login = async (username, password) => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });
      if (response.ok) {
        const { user: userData } = await response.json();
        let localUser = users.get(username);
        if (!localUser) {
          localUser = userData;
          users.set(username, localUser);
        }
        setUser(localUser);
        if (typeof window !== "undefined") {
          localStorage.setItem("currentUser", username);
        }
        posthog.identify(username, {
          username
        });
        posthog.capture("user_logged_in", {
          username
        });
        return true;
      }
      return false;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };
  const logout = () => {
    posthog.capture("user_logged_out");
    posthog.reset();
    setUser(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem("currentUser");
    }
  };
  const incrementBurritoConsiderations = () => {
    if (user) {
      user.burritoConsiderations++;
      users.set(user.username, user);
      setUser({ ...user });
    }
  };
  return /* @__PURE__ */ jsx(
    AuthContext.Provider,
    {
      value: { user, login, logout, incrementBurritoConsiderations },
      children
    }
  );
}
function useAuth() {
  const context = useContext(AuthContext);
  if (context === void 0) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
function Header() {
  const { user, logout } = useAuth();
  return /* @__PURE__ */ jsx("header", { className: "header", children: /* @__PURE__ */ jsxs("div", { className: "header-container", children: [
    /* @__PURE__ */ jsxs("nav", { children: [
      /* @__PURE__ */ jsx(Link, { to: "/", children: "Home" }),
      user && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(Link, { to: "/burrito", children: "Burrito Consideration" }),
        /* @__PURE__ */ jsx(Link, { to: "/profile", children: "Profile" })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "user-section", children: user ? /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsxs("span", { children: [
        "Welcome, ",
        user.username,
        "!"
      ] }),
      /* @__PURE__ */ jsx("button", { onClick: logout, className: "btn-logout", children: "Logout" })
    ] }) : /* @__PURE__ */ jsx("span", { children: "Not logged in" }) })
  ] }) });
}
const appCss = "/assets/styles-CVzJfwEK.css";
const Route$b = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8"
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      },
      {
        title: "TanStack Start Starter"
      }
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss
      }
    ]
  }),
  shellComponent: RootDocument
});
function RootDocument({ children }) {
  useEffect(() => {
    initPostHog();
  }, []);
  return /* @__PURE__ */ jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxs("body", { children: [
      /* @__PURE__ */ jsxs(AuthProvider, { children: [
        /* @__PURE__ */ jsx(Header, {}),
        children,
        /* @__PURE__ */ jsx(
          TanStackDevtools,
          {
            config: {
              position: "bottom-right"
            },
            plugins: [
              {
                name: "Tanstack Router",
                render: /* @__PURE__ */ jsx(TanStackRouterDevtoolsPanel, {})
              }
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
const $$splitComponentImporter$8 = () => import("./profile-DYN_0HRF.js");
const Route$a = createFileRoute("/profile")({
  component: lazyRouteComponent($$splitComponentImporter$8, "component"),
  head: () => ({
    meta: [{
      title: "Profile - Burrito Consideration App"
    }, {
      name: "description",
      content: "Your burrito consideration profile"
    }]
  })
});
const $$splitComponentImporter$7 = () => import("./burrito-DJuqzcgW.js");
const Route$9 = createFileRoute("/burrito")({
  component: lazyRouteComponent($$splitComponentImporter$7, "component"),
  head: () => ({
    meta: [{
      title: "Burrito Consideration - Burrito Consideration App"
    }, {
      name: "description",
      content: "Consider the potential of burritos"
    }]
  })
});
const $$splitComponentImporter$6 = () => import("./index-BedHHz5m.js");
const Route$8 = createFileRoute("/")({
  component: lazyRouteComponent($$splitComponentImporter$6, "component"),
  head: () => ({
    meta: [{
      title: "Burrito Consideration App"
    }, {
      name: "description",
      content: "Consider the potential of burritos"
    }]
  })
});
let posthogClient = null;
function getPostHogClient() {
  if (!posthogClient) {
    posthogClient = new PostHog(
      process.env.VITE_POSTHOG_KEY || "phc_sBGFIjin7AfcLwLJ4yc79wY84KHkvrTw5SnUeKD0SWE",
      {
        host: process.env.VITE_POSTHOG_HOST || "https://us.i.posthog.com",
        flushAt: 1,
        flushInterval: 0
      }
    );
  }
  return posthogClient;
}
const Route$7 = createFileRoute("/api/auth/login")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const body = await request.json();
        const { username, password } = body;
        if (!username || !password) {
          return json(
            { error: "Username and password required" },
            { status: 400 }
          );
        }
        const isNewUser = !username;
        const user = {
          username,
          burritoConsiderations: 0
        };
        const posthog2 = getPostHogClient();
        posthog2.capture({
          distinctId: username,
          event: "server_login",
          properties: {
            username,
            isNewUser,
            source: "api"
          }
        });
        posthog2.identify({
          distinctId: username,
          properties: {
            username,
            createdAt: isNewUser ? (/* @__PURE__ */ new Date()).toISOString() : void 0
          }
        });
        return json({ success: true, user });
      }
    }
  }
});
const $$splitComponentImporter$5 = () => import("./start.server-funcs-DHKFlfjM.js");
const TODOS_FILE = "todos.json";
async function readTodos() {
  return JSON.parse(await fs.promises.readFile(TODOS_FILE, "utf-8").catch(() => JSON.stringify([{
    id: 1,
    name: "Get groceries"
  }, {
    id: 2,
    name: "Buy a new phone"
  }], null, 2)));
}
const getTodos_createServerFn_handler = createServerRpc("bdbf20098c899f8f15707b71f7404b5d1a8669fa34187cef6e302cd57e908d67", (opts, signal) => {
  return getTodos.__executeServer(opts, signal);
});
const getTodos = createServerFn({
  method: "GET"
}).handler(getTodos_createServerFn_handler, async () => await readTodos());
const Route$6 = createFileRoute("/_demo/demo/start/server-funcs")({
  component: lazyRouteComponent($$splitComponentImporter$5, "component"),
  loader: async () => await getTodos()
});
const $$splitComponentImporter$4 = () => import("./start.api-request-DhPN1_Dc.js");
const Route$5 = createFileRoute("/_demo/demo/start/api-request")({
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const Route$4 = createFileRoute("/_demo/demo/api/names")({
  server: {
    handlers: {
      GET: () => json(["Alice", "Bob", "Charlie"])
    }
  }
});
const $$splitComponentImporter$3 = () => import("./start.ssr.index-BmCCCK3g.js");
const Route$3 = createFileRoute("/_demo/demo/start/ssr/")({
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./start.ssr.spa-mode-MfNkPqNi.js");
const Route$2 = createFileRoute("/_demo/demo/start/ssr/spa-mode")({
  ssr: false,
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const getPunkSongs_createServerFn_handler = createServerRpc("f74da881407a186b78a7af058df21dafb0126eb11e5a4d54fd322e8feb5038f1", (opts, signal) => {
  return getPunkSongs.__executeServer(opts, signal);
});
const getPunkSongs = createServerFn({
  method: "GET"
}).handler(getPunkSongs_createServerFn_handler, async () => [{
  id: 1,
  name: "Teenage Dirtbag",
  artist: "Wheatus"
}, {
  id: 2,
  name: "Smells Like Teen Spirit",
  artist: "Nirvana"
}, {
  id: 3,
  name: "The Middle",
  artist: "Jimmy Eat World"
}, {
  id: 4,
  name: "My Own Worst Enemy",
  artist: "Lit"
}, {
  id: 5,
  name: "Fat Lip",
  artist: "Sum 41"
}, {
  id: 6,
  name: "All the Small Things",
  artist: "blink-182"
}, {
  id: 7,
  name: "Beverly Hills",
  artist: "Weezer"
}]);
const $$splitComponentImporter$1 = () => import("./start.ssr.full-ssr-D4pMRONB.js");
const Route$1 = createFileRoute("/_demo/demo/start/ssr/full-ssr")({
  component: lazyRouteComponent($$splitComponentImporter$1, "component"),
  loader: async () => await getPunkSongs()
});
const $$splitComponentImporter = () => import("./start.ssr.data-only-BGCVfwis.js");
const Route = createFileRoute("/_demo/demo/start/ssr/data-only")({
  ssr: "data-only",
  component: lazyRouteComponent($$splitComponentImporter, "component"),
  loader: async () => await getPunkSongs()
});
const ProfileRoute = Route$a.update({
  id: "/profile",
  path: "/profile",
  getParentRoute: () => Route$b
});
const BurritoRoute = Route$9.update({
  id: "/burrito",
  path: "/burrito",
  getParentRoute: () => Route$b
});
const IndexRoute = Route$8.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$b
});
const ApiAuthLoginRoute = Route$7.update({
  id: "/api/auth/login",
  path: "/api/auth/login",
  getParentRoute: () => Route$b
});
const DemoDemoStartServerFuncsRoute = Route$6.update({
  id: "/_demo/demo/start/server-funcs",
  path: "/demo/start/server-funcs",
  getParentRoute: () => Route$b
});
const DemoDemoStartApiRequestRoute = Route$5.update({
  id: "/_demo/demo/start/api-request",
  path: "/demo/start/api-request",
  getParentRoute: () => Route$b
});
const DemoDemoApiNamesRoute = Route$4.update({
  id: "/_demo/demo/api/names",
  path: "/demo/api/names",
  getParentRoute: () => Route$b
});
const DemoDemoStartSsrIndexRoute = Route$3.update({
  id: "/_demo/demo/start/ssr/",
  path: "/demo/start/ssr/",
  getParentRoute: () => Route$b
});
const DemoDemoStartSsrSpaModeRoute = Route$2.update({
  id: "/_demo/demo/start/ssr/spa-mode",
  path: "/demo/start/ssr/spa-mode",
  getParentRoute: () => Route$b
});
const DemoDemoStartSsrFullSsrRoute = Route$1.update({
  id: "/_demo/demo/start/ssr/full-ssr",
  path: "/demo/start/ssr/full-ssr",
  getParentRoute: () => Route$b
});
const DemoDemoStartSsrDataOnlyRoute = Route.update({
  id: "/_demo/demo/start/ssr/data-only",
  path: "/demo/start/ssr/data-only",
  getParentRoute: () => Route$b
});
const rootRouteChildren = {
  IndexRoute,
  BurritoRoute,
  ProfileRoute,
  ApiAuthLoginRoute,
  DemoDemoApiNamesRoute,
  DemoDemoStartApiRequestRoute,
  DemoDemoStartServerFuncsRoute,
  DemoDemoStartSsrDataOnlyRoute,
  DemoDemoStartSsrFullSsrRoute,
  DemoDemoStartSsrSpaModeRoute,
  DemoDemoStartSsrIndexRoute
};
const routeTree = Route$b._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  return createRouter({
    routeTree,
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  Route$6 as R,
  Route$1 as a,
  Route as b,
  getPunkSongs as g,
  router as r,
  useAuth as u
};
