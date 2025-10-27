import { jsx, jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
function getNames() {
  return fetch("/demo/api/names").then((res) => res.json());
}
function Home() {
  const [names, setNames] = useState([]);
  useEffect(() => {
    getNames().then(setNames);
  }, []);
  return /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center min-h-screen p-4 text-white", style: {
    backgroundColor: "#000",
    backgroundImage: "radial-gradient(ellipse 60% 60% at 0% 100%, #444 0%, #222 60%, #000 100%)"
  }, children: /* @__PURE__ */ jsxs("div", { className: "w-full max-w-2xl p-8 rounded-xl backdrop-blur-md bg-black/50 shadow-xl border-8 border-black/10", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-2xl mb-4", children: "Start API Request Demo - Names List" }),
    /* @__PURE__ */ jsx("ul", { className: "mb-4 space-y-2", children: names.map((name) => /* @__PURE__ */ jsx("li", { className: "bg-white/10 border border-white/20 rounded-lg p-3 backdrop-blur-sm shadow-md", children: /* @__PURE__ */ jsx("span", { className: "text-lg text-white", children: name }) }, name)) })
  ] }) });
}
export {
  Home as component
};
