import { jsx, jsxs } from "react/jsx-runtime";
import { useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import posthog from "posthog-js";
import { u as useAuth } from "./router-B3M4VGhX.js";
import "@tanstack/react-router-devtools";
import "@tanstack/react-devtools";
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
function BurritoPage() {
  const {
    user,
    incrementBurritoConsiderations
  } = useAuth();
  const navigate = useNavigate();
  const [hasConsidered, setHasConsidered] = useState(false);
  useEffect(() => {
    if (!user) {
      navigate({
        to: "/"
      });
    }
  }, [user, navigate]);
  if (!user) {
    return null;
  }
  const handleConsideration = () => {
    incrementBurritoConsiderations();
    setHasConsidered(true);
    setTimeout(() => setHasConsidered(false), 2e3);
    posthog.capture("burrito_considered", {
      total_considerations: user.burritoConsiderations + 1,
      username: user.username
    });
  };
  return /* @__PURE__ */ jsx("main", { children: /* @__PURE__ */ jsxs("div", { className: "container", children: [
    /* @__PURE__ */ jsx("h1", { children: "Burrito consideration zone" }),
    /* @__PURE__ */ jsx("p", { children: "Take a moment to truly consider the potential of burritos." }),
    /* @__PURE__ */ jsxs("div", { style: {
      textAlign: "center"
    }, children: [
      /* @__PURE__ */ jsx("button", { onClick: handleConsideration, className: "btn-burrito", children: "I have considered the burrito potential" }),
      hasConsidered && /* @__PURE__ */ jsxs("p", { className: "success", children: [
        "Thank you for your consideration! Count:",
        " ",
        user.burritoConsiderations
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "stats", children: [
      /* @__PURE__ */ jsx("h3", { children: "Consideration stats" }),
      /* @__PURE__ */ jsxs("p", { children: [
        "Total considerations: ",
        user.burritoConsiderations
      ] })
    ] })
  ] }) });
}
export {
  BurritoPage as component
};
