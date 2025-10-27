import { jsx, jsxs } from "react/jsx-runtime";
import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
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
function ProfilePage() {
  const {
    user
  } = useAuth();
  const navigate = useNavigate();
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
  const triggerTestError = () => {
    try {
      throw new Error("Test error for PostHog error tracking");
    } catch (err) {
      posthog.captureException(err);
      console.error("Captured error:", err);
      alert("Error captured and sent to PostHog!");
    }
  };
  return /* @__PURE__ */ jsx("main", { children: /* @__PURE__ */ jsxs("div", { className: "container", children: [
    /* @__PURE__ */ jsx("h1", { children: "User Profile" }),
    /* @__PURE__ */ jsxs("div", { className: "stats", children: [
      /* @__PURE__ */ jsx("h2", { children: "Your Information" }),
      /* @__PURE__ */ jsxs("p", { children: [
        /* @__PURE__ */ jsx("strong", { children: "Username:" }),
        " ",
        user.username
      ] }),
      /* @__PURE__ */ jsxs("p", { children: [
        /* @__PURE__ */ jsx("strong", { children: "Burrito Considerations:" }),
        " ",
        user.burritoConsiderations
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { style: {
      marginTop: "2rem"
    }, children: /* @__PURE__ */ jsx("button", { onClick: triggerTestError, className: "btn-primary", style: {
      backgroundColor: "#dc3545"
    }, children: "Trigger Test Error (for PostHog)" }) }),
    /* @__PURE__ */ jsxs("div", { style: {
      marginTop: "2rem"
    }, children: [
      /* @__PURE__ */ jsx("h3", { children: "Your Burrito Journey" }),
      user.burritoConsiderations === 0 ? /* @__PURE__ */ jsx("p", { children: "You haven't considered any burritos yet. Visit the Burrito Consideration page to start!" }) : user.burritoConsiderations === 1 ? /* @__PURE__ */ jsx("p", { children: "You've considered the burrito potential once. Keep going!" }) : user.burritoConsiderations < 5 ? /* @__PURE__ */ jsx("p", { children: "You're getting the hang of burrito consideration!" }) : user.burritoConsiderations < 10 ? /* @__PURE__ */ jsx("p", { children: "You're becoming a burrito consideration expert!" }) : /* @__PURE__ */ jsx("p", { children: "You are a true burrito consideration master! 🌯" })
    ] })
  ] }) });
}
export {
  ProfilePage as component
};
