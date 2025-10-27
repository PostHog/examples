import { jsx, jsxs } from "react/jsx-runtime";
import { a as Route } from "./router-B3M4VGhX.js";
import "@tanstack/react-router";
import "@tanstack/react-router-devtools";
import "@tanstack/react-devtools";
import "react";
import "posthog-js";
import "posthog-node";
import "@tanstack/router-core/ssr/client";
import "../server.js";
import "@tanstack/history";
import "@tanstack/router-core";
import "node:async_hooks";
import "@tanstack/router-core/ssr/server";
import "h3-v2";
import "tiny-invariant";
import "seroval";
import "@tanstack/react-router/ssr/server";
import "node:fs";
function RouteComponent() {
  const punkSongs = Route.useLoaderData();
  return /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center min-h-screen bg-gradient-to-br from-zinc-800 to-black p-4 text-white", style: {
    backgroundImage: "radial-gradient(50% 50% at 20% 60%, #1a1a1a 0%, #0a0a0a 50%, #000000 100%)"
  }, children: /* @__PURE__ */ jsxs("div", { className: "w-full max-w-2xl p-8 rounded-xl backdrop-blur-md bg-black/50 shadow-xl border-8 border-black/10", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold mb-6 text-purple-400", children: "Full SSR - Punk Songs" }),
    /* @__PURE__ */ jsx("ul", { className: "space-y-3", children: punkSongs.map((song) => /* @__PURE__ */ jsxs("li", { className: "bg-white/10 border border-white/20 rounded-lg p-4 backdrop-blur-sm shadow-md", children: [
      /* @__PURE__ */ jsx("span", { className: "text-lg text-white font-medium", children: song.name }),
      /* @__PURE__ */ jsxs("span", { className: "text-white/60", children: [
        " - ",
        song.artist
      ] })
    ] }, song.id)) })
  ] }) });
}
export {
  RouteComponent as component
};
