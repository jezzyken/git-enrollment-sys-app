if(!self.define){let s,l={};const n=(n,i)=>(n=new URL(n+".js",i).href,l[n]||new Promise((l=>{if("document"in self){const s=document.createElement("script");s.src=n,s.onload=l,document.head.appendChild(s)}else s=n,importScripts(n),l()})).then((()=>{let s=l[n];if(!s)throw new Error(`Module ${n} didn’t register its module`);return s})));self.define=(i,r)=>{const e=s||("document"in self?document.currentScript.src:"")||location.href;if(l[e])return;let u={};const c=s=>n(s,e),o={module:{uri:e},exports:u,require:c};l[e]=Promise.all(i.map((s=>o[s]||c(s)))).then((s=>(r(...s),u)))}}define(["./workbox-6567b62a"],(function(s){"use strict";s.setCacheNameDetails({prefix:"client"}),self.addEventListener("message",(s=>{s.data&&"SKIP_WAITING"===s.data.type&&self.skipWaiting()})),s.precacheAndRoute([{url:"/css/178.89f4a8fe.css",revision:null},{url:"/css/216.fd9e7df3.css",revision:null},{url:"/css/284.1fcb36d5.css",revision:null},{url:"/css/314.2dcb397c.css",revision:null},{url:"/css/32.bf2ef973.css",revision:null},{url:"/css/352.145aba77.css",revision:null},{url:"/css/373.b5219025.css",revision:null},{url:"/css/378.81a0668d.css",revision:null},{url:"/css/391.d28014c9.css",revision:null},{url:"/css/398.0576a606.css",revision:null},{url:"/css/442.04803662.css",revision:null},{url:"/css/448.b10b9fde.css",revision:null},{url:"/css/450.b49adb15.css",revision:null},{url:"/css/452.e0f5cbf5.css",revision:null},{url:"/css/491.f952fbfa.css",revision:null},{url:"/css/497.190a3775.css",revision:null},{url:"/css/51.06fcd488.css",revision:null},{url:"/css/516.3fb86192.css",revision:null},{url:"/css/561.5f714dc2.css",revision:null},{url:"/css/665.cb349691.css",revision:null},{url:"/css/77.dd676342.css",revision:null},{url:"/css/803.44e02de1.css",revision:null},{url:"/css/851.356179e8.css",revision:null},{url:"/css/chunk-vendors.ca977ff1.css",revision:null},{url:"/fonts/materialdesignicons-webfont.0766edc9.eot",revision:null},{url:"/fonts/materialdesignicons-webfont.714a4eee.ttf",revision:null},{url:"/fonts/materialdesignicons-webfont.e659bf56.woff",revision:null},{url:"/fonts/materialdesignicons-webfont.fbaef2a9.woff2",revision:null},{url:"/index.html",revision:"77a227916122d7abfcacf04897e14a5b"},{url:"/js/178.39c7ab3b.js",revision:null},{url:"/js/216.45feb354.js",revision:null},{url:"/js/237.5f38f5f1.js",revision:null},{url:"/js/284.a6c931e9.js",revision:null},{url:"/js/314.2c16f4b4.js",revision:null},{url:"/js/32.18050aac.js",revision:null},{url:"/js/352.7d8e56ad.js",revision:null},{url:"/js/373.4d0963c0.js",revision:null},{url:"/js/378.61404699.js",revision:null},{url:"/js/391.c280a246.js",revision:null},{url:"/js/398.2a52bea2.js",revision:null},{url:"/js/399.853f6179.js",revision:null},{url:"/js/442.46d6ac70.js",revision:null},{url:"/js/448.3080c433.js",revision:null},{url:"/js/450.484bc49b.js",revision:null},{url:"/js/452.04438739.js",revision:null},{url:"/js/491.d3c9a501.js",revision:null},{url:"/js/497.9b404ce2.js",revision:null},{url:"/js/51.e6fc6cd6.js",revision:null},{url:"/js/516.069ef981.js",revision:null},{url:"/js/531.a1a3f523.js",revision:null},{url:"/js/561.a0bc3ded.js",revision:null},{url:"/js/64.b91cc39b.js",revision:null},{url:"/js/665.644334aa.js",revision:null},{url:"/js/77.82b3175c.js",revision:null},{url:"/js/803.a1ea8d57.js",revision:null},{url:"/js/851.a5e0cf4f.js",revision:null},{url:"/js/896.e58b76ab.js",revision:null},{url:"/js/914.63ab5c63.js",revision:null},{url:"/js/93.ff3f344e.js",revision:null},{url:"/js/app.635d282b.js",revision:null},{url:"/js/chunk-vendors.cf5b234a.js",revision:null},{url:"/manifest.json",revision:"8eff00fb23e5046e8587fb699e79e093"},{url:"/robots.txt",revision:"b6216d61c03e6ce0c9aea6ca7808f7ca"}],{})}));
//# sourceMappingURL=service-worker.js.map
