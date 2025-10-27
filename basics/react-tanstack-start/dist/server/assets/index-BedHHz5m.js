import { jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { u as useAuth } from "./router-B3M4VGhX.js";
import "@tanstack/react-router";
import "@tanstack/react-router-devtools";
import "@tanstack/react-devtools";
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
function Home() {
  const {
    user,
    login
  } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const success = await login(username, password);
      if (success) {
        setUsername("");
        setPassword("");
      } else {
        setError("Please provide both username and password");
      }
    } catch (err) {
      console.error("Login failed:", err);
      setError("An error occurred during login");
    }
  };
  return /* @__PURE__ */ jsx("main", { children: user ? /* @__PURE__ */ jsxs("div", { className: "container", children: [
    /* @__PURE__ */ jsxs("h1", { children: [
      "Welcome back, ",
      user.username,
      "!"
    ] }),
    /* @__PURE__ */ jsx("p", { children: "You are now logged in. Feel free to explore:" }),
    /* @__PURE__ */ jsxs("ul", { children: [
      /* @__PURE__ */ jsx("li", { children: "Consider the potential of burritos" }),
      /* @__PURE__ */ jsx("li", { children: "View your profile and statistics" })
    ] })
  ] }) : /* @__PURE__ */ jsxs("div", { className: "container", children: [
    /* @__PURE__ */ jsx("h1", { children: "Welcome to Burrito Consideration App" }),
    /* @__PURE__ */ jsx("p", { children: "Please sign in to begin your burrito journey" }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "form", children: [
      /* @__PURE__ */ jsxs("div", { className: "form-group", children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "username", children: "Username:" }),
        /* @__PURE__ */ jsx("input", { type: "text", id: "username", value: username, onChange: (e) => setUsername(e.target.value), placeholder: "Enter any username" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "form-group", children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "password", children: "Password:" }),
        /* @__PURE__ */ jsx("input", { type: "password", id: "password", value: password, onChange: (e) => setPassword(e.target.value), placeholder: "Enter any password" })
      ] }),
      error && /* @__PURE__ */ jsx("p", { className: "error", children: error }),
      /* @__PURE__ */ jsx("button", { type: "submit", className: "btn-primary", children: "Sign In" })
    ] }),
    /* @__PURE__ */ jsx("p", { className: "note", children: "Note: This is a demo app. Use any username and password to sign in." })
  ] }) });
}
export {
  Home as component
};
