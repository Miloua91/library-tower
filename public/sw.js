if(!self.define){let e,s={};const a=(a,n)=>(a=new URL(a+".js",n).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(n,i)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(s[c])return;let t={};const r=e=>a(e,c),o={module:{uri:c},exports:t,require:r};s[c]=Promise.all(n.map((e=>o[e]||r(e)))).then((e=>(i(...e),t)))}}define(["./workbox-c06b064f"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/Y2osqkq0Ml_rM6T40bDYX/_buildManifest.js",revision:"a1b7599199e2e8c82f2c6bcf8d8aca61"},{url:"/_next/static/Y2osqkq0Ml_rM6T40bDYX/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/0e5ce63c-d14c18da71bb0952.js",revision:"Y2osqkq0Ml_rM6T40bDYX"},{url:"/_next/static/chunks/250-22310e263a96040f.js",revision:"Y2osqkq0Ml_rM6T40bDYX"},{url:"/_next/static/chunks/333-511db527af319ee5.js",revision:"Y2osqkq0Ml_rM6T40bDYX"},{url:"/_next/static/chunks/344-09400e389ecb1614.js",revision:"Y2osqkq0Ml_rM6T40bDYX"},{url:"/_next/static/chunks/430-4b4781849c43ac3c.js",revision:"Y2osqkq0Ml_rM6T40bDYX"},{url:"/_next/static/chunks/587-5c51a69b08a0677a.js",revision:"Y2osqkq0Ml_rM6T40bDYX"},{url:"/_next/static/chunks/673422f7-e474e1fb6bd68353.js",revision:"Y2osqkq0Ml_rM6T40bDYX"},{url:"/_next/static/chunks/775-966cd3b7040efa16.js",revision:"Y2osqkq0Ml_rM6T40bDYX"},{url:"/_next/static/chunks/849-2eedf13418c16735.js",revision:"Y2osqkq0Ml_rM6T40bDYX"},{url:"/_next/static/chunks/a819890f-959f410fba486c5c.js",revision:"Y2osqkq0Ml_rM6T40bDYX"},{url:"/_next/static/chunks/app/_not-found-cf9d71e2456cdf69.js",revision:"Y2osqkq0Ml_rM6T40bDYX"},{url:"/_next/static/chunks/app/layout-e9611cc0bca7c856.js",revision:"Y2osqkq0Ml_rM6T40bDYX"},{url:"/_next/static/chunks/app/library/book/%5Bid%5D/page-49417aa84b51b050.js",revision:"Y2osqkq0Ml_rM6T40bDYX"},{url:"/_next/static/chunks/app/library/page-25ef8a5c438197de.js",revision:"Y2osqkq0Ml_rM6T40bDYX"},{url:"/_next/static/chunks/app/library/read/%5Bid%5D/page-a3b79057d952e9e6.js",revision:"Y2osqkq0Ml_rM6T40bDYX"},{url:"/_next/static/chunks/app/page-2411a5918de06e2d.js",revision:"Y2osqkq0Ml_rM6T40bDYX"},{url:"/_next/static/chunks/app/shelf/page-a98c5d661bec34e2.js",revision:"Y2osqkq0Ml_rM6T40bDYX"},{url:"/_next/static/chunks/dc112a36-3b53e071b07ef314.js",revision:"Y2osqkq0Ml_rM6T40bDYX"},{url:"/_next/static/chunks/fd9d1056-5fb09a6ff93cad18.js",revision:"Y2osqkq0Ml_rM6T40bDYX"},{url:"/_next/static/chunks/framework-8883d1e9be70c3da.js",revision:"Y2osqkq0Ml_rM6T40bDYX"},{url:"/_next/static/chunks/main-3a42b776fd6e8376.js",revision:"Y2osqkq0Ml_rM6T40bDYX"},{url:"/_next/static/chunks/main-app-27c6f1989f88fa16.js",revision:"Y2osqkq0Ml_rM6T40bDYX"},{url:"/_next/static/chunks/pages/_app-98cb51ec6f9f135f.js",revision:"Y2osqkq0Ml_rM6T40bDYX"},{url:"/_next/static/chunks/pages/_error-e87e5963ec1b8011.js",revision:"Y2osqkq0Ml_rM6T40bDYX"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-d3e54bfa73932047.js",revision:"Y2osqkq0Ml_rM6T40bDYX"},{url:"/_next/static/css/7d43ce40e22876da.css",revision:"7d43ce40e22876da"},{url:"/_next/static/css/ef46db3751d8e999.css",revision:"ef46db3751d8e999"},{url:"/_next/static/media/5882425f9484b3d4-s.woff2",revision:"0cdfc52c6c06969f7408eb2294a4decb"},{url:"/_next/static/media/5abc99949809211b-s.woff2",revision:"d911c50eebfb541d700adf6304b7d5ed"},{url:"/_next/static/media/67b57f30a3ef303f-s.woff2",revision:"24ef2a0c67b62378b2eb142d7f108344"},{url:"/_next/static/media/a50f17731f6d6a27-s.woff2",revision:"de2cdcfdbad0b43a1eeb300dc6f27f0e"},{url:"/_next/static/media/a9c5269db9db986d-s.p.woff2",revision:"6e485039a03c0fe72c9c25ab36287a30"},{url:"/_next/static/media/d3400fa2233fbaca-s.woff2",revision:"32d13b7c73b884ba3d15aa9e10b2767e"},{url:"/_next/static/media/db861032277cef27-s.woff2",revision:"527a81b821e2f4f0dc39d201c7763090"},{url:"/android-chrome-192x192.png",revision:"423d879aa4bd0832498bc0abb7c33d05"},{url:"/android-chrome-512x512.png",revision:"1ec291eabf4190867e84eba09dc281d5"},{url:"/apple-touch-icon.png",revision:"3db2612cb6b1b79bdbd0c7897b452c9a"},{url:"/cover.svg",revision:"9a9e45b91cb6bff889f07446e48f806d"},{url:"/favicon-16x16.png",revision:"47824c8212b83fd23c36e3e499af4110"},{url:"/favicon-32x32.png",revision:"53a65de2ac54f47f7ff99bfa869d4729"},{url:"/icon.svg",revision:"bdd14bcb9a26a60b34127669a8e29065"},{url:"/loading.json",revision:"ff8776c0711021bccda768c9723c2f63"},{url:"/manifest.json",revision:"5a1f9075a377445754aba5253ceaeb1f"},{url:"/read.svg",revision:"5a6b0137ff1f99a5248c08f7a6f93896"},{url:"/shelf.svg",revision:"ca84509bdc91f2d0b40e25d092adcbce"}],{ignoreURLParametersMatching:[/^utm_/,/^fbclid$/]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({response:e})=>e&&"opaqueredirect"===e.type?new Response(e.body,{status:200,statusText:"OK",headers:e.headers}):e}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:2592e3})]}),"GET"),e.registerRoute(/\/_next\/static.+\.js$/i,new e.CacheFirst({cacheName:"next-static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4|webm)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:48,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({sameOrigin:e,url:{pathname:s}})=>!(!e||s.startsWith("/api/auth/callback")||!s.startsWith("/api/"))),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({request:e,url:{pathname:s},sameOrigin:a})=>"1"===e.headers.get("RSC")&&"1"===e.headers.get("Next-Router-Prefetch")&&a&&!s.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages-rsc-prefetch",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({request:e,url:{pathname:s},sameOrigin:a})=>"1"===e.headers.get("RSC")&&a&&!s.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages-rsc",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:{pathname:e},sameOrigin:s})=>s&&!e.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({sameOrigin:e})=>!e),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
