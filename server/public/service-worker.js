if(!self.define){let s,l={};const n=(n,e)=>(n=new URL(n+".js",e).href,l[n]||new Promise((l=>{if("document"in self){const s=document.createElement("script");s.src=n,s.onload=l,document.head.appendChild(s)}else s=n,importScripts(n),l()})).then((()=>{let s=l[n];if(!s)throw new Error(`Module ${n} didn’t register its module`);return s})));self.define=(e,i)=>{const r=s||("document"in self?document.currentScript.src:"")||location.href;if(l[r])return;let u={};const o=s=>n(s,r),c={module:{uri:r},exports:u,require:o};l[r]=Promise.all(e.map((s=>c[s]||o(s)))).then((s=>(i(...s),u)))}}define(["./workbox-6567b62a"],(function(s){"use strict";s.setCacheNameDetails({prefix:"client"}),self.addEventListener("message",(s=>{s.data&&"SKIP_WAITING"===s.data.type&&self.skipWaiting()})),s.precacheAndRoute([{url:"/css/113.82746a07.css",revision:null},{url:"/css/183.14bc800f.css",revision:null},{url:"/css/213.3637e8e2.css",revision:null},{url:"/css/217.70913c33.css",revision:null},{url:"/css/273.356179e8.css",revision:null},{url:"/css/292.5c3f039e.css",revision:null},{url:"/css/365.658321ad.css",revision:null},{url:"/css/433.71bf03fa.css",revision:null},{url:"/css/438.885334ee.css",revision:null},{url:"/css/450.3eec609f.css",revision:null},{url:"/css/451.dedefc56.css",revision:null},{url:"/css/531.c00fb686.css",revision:null},{url:"/css/569.f0d9bea4.css",revision:null},{url:"/css/73.2afb3b18.css",revision:null},{url:"/css/740.e62ec538.css",revision:null},{url:"/css/762.e99f660a.css",revision:null},{url:"/css/79.2f186858.css",revision:null},{url:"/css/859.f3fd683a.css",revision:null},{url:"/css/926.fc098a19.css",revision:null},{url:"/css/960.04803662.css",revision:null},{url:"/css/961.7b9c10fa.css",revision:null},{url:"/css/993.ef29fa4c.css",revision:null},{url:"/css/chunk-vendors.ca977ff1.css",revision:null},{url:"/fonts/materialdesignicons-webfont.0766edc9.eot",revision:null},{url:"/fonts/materialdesignicons-webfont.714a4eee.ttf",revision:null},{url:"/fonts/materialdesignicons-webfont.e659bf56.woff",revision:null},{url:"/fonts/materialdesignicons-webfont.fbaef2a9.woff2",revision:null},{url:"/index.html",revision:"4309e63c27eee1c91d668755b723949a"},{url:"/js/101.f443cb14.js",revision:null},{url:"/js/11.279f4b05.js",revision:null},{url:"/js/113.28b3ddc7.js",revision:null},{url:"/js/183.879a9ae1.js",revision:null},{url:"/js/213.a8c067ca.js",revision:null},{url:"/js/217.f58dec69.js",revision:null},{url:"/js/273.2f992f47.js",revision:null},{url:"/js/279.5ceeeff1.js",revision:null},{url:"/js/292.3601449b.js",revision:null},{url:"/js/323.2e025aa0.js",revision:null},{url:"/js/354.c167d4b3.js",revision:null},{url:"/js/365.a3a6bb1d.js",revision:null},{url:"/js/373.84238df0.js",revision:null},{url:"/js/422.e11436d3.js",revision:null},{url:"/js/433.9cc0877e.js",revision:null},{url:"/js/438.4bea166a.js",revision:null},{url:"/js/450.bae0e4bd.js",revision:null},{url:"/js/451.924d42c6.js",revision:null},{url:"/js/531.c790c9d4.js",revision:null},{url:"/js/569.6ba28087.js",revision:null},{url:"/js/668.40cf3559.js",revision:null},{url:"/js/73.417bc57e.js",revision:null},{url:"/js/740.96e82879.js",revision:null},{url:"/js/762.39f0c131.js",revision:null},{url:"/js/767.6eeaf363.js",revision:null},{url:"/js/77.aec294d4.js",revision:null},{url:"/js/79.683a749c.js",revision:null},{url:"/js/810.e371052f.js",revision:null},{url:"/js/838.97f902f2.js",revision:null},{url:"/js/859.f4db65a2.js",revision:null},{url:"/js/926.ed0b102d.js",revision:null},{url:"/js/960.54ff55a4.js",revision:null},{url:"/js/961.cbd849bd.js",revision:null},{url:"/js/993.746fe4fe.js",revision:null},{url:"/js/app.b2d6acaf.js",revision:null},{url:"/js/chunk-vendors.681b7322.js",revision:null},{url:"/manifest.json",revision:"8eff00fb23e5046e8587fb699e79e093"},{url:"/robots.txt",revision:"735ab4f94fbcd57074377afca324c813"}],{})}));
//# sourceMappingURL=service-worker.js.map
