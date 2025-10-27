import { a as createServerRpc, c as createServerFn } from "../server.js";
import "@tanstack/history";
import "@tanstack/router-core/ssr/client";
import "@tanstack/router-core";
import "node:async_hooks";
import "@tanstack/router-core/ssr/server";
import "h3-v2";
import "tiny-invariant";
import "seroval";
import "react/jsx-runtime";
import "@tanstack/react-router/ssr/server";
import "@tanstack/react-router";
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
export {
  getPunkSongs_createServerFn_handler
};
