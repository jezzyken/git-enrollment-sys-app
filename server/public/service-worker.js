if(!self.define){let s,l={};const n=(n,i)=>(n=new URL(n+".js",i).href,l[n]||new Promise((l=>{if("document"in self){const s=document.createElement("script");s.src=n,s.onload=l,document.head.appendChild(s)}else s=n,importScripts(n),l()})).then((()=>{let s=l[n];if(!s)throw new Error(`Module ${n} didn’t register its module`);return s})));self.define=(i,e)=>{const r=s||("document"in self?document.currentScript.src:"")||location.href;if(l[r])return;let u={};const c=s=>n(s,r),o={module:{uri:r},exports:u,require:c};l[r]=Promise.all(i.map((s=>o[s]||c(s)))).then((s=>(e(...s),u)))}}define(["./workbox-6567b62a"],(function(s){"use strict";s.setCacheNameDetails({prefix:"client"}),self.addEventListener("message",(s=>{s.data&&"SKIP_WAITING"===s.data.type&&self.skipWaiting()})),s.precacheAndRoute([{url:"/css/103.094eb25d.css",revision:null},{url:"/css/235.803dc098.css",revision:null},{url:"/css/247.dfc1da6d.css",revision:null},{url:"/css/262.6900fc12.css",revision:null},{url:"/css/269.899623c7.css",revision:null},{url:"/css/303.e18e58d4.css",revision:null},{url:"/css/339.1f576fbb.css",revision:null},{url:"/css/350.2396996c.css",revision:null},{url:"/css/364.6c66d7e2.css",revision:null},{url:"/css/373.b5219025.css",revision:null},{url:"/css/394.47e1d5dc.css",revision:null},{url:"/css/413.55a0d6d2.css",revision:null},{url:"/css/415.e7ff96fc.css",revision:null},{url:"/css/493.72b3e4f8.css",revision:null},{url:"/css/516.3fb86192.css",revision:null},{url:"/css/525.3637e8e2.css",revision:null},{url:"/css/57.7f0bb513.css",revision:null},{url:"/css/584.5c363dcf.css",revision:null},{url:"/css/648.5d36a2c8.css",revision:null},{url:"/css/674.8bc0eae7.css",revision:null},{url:"/css/690.a99ef22a.css",revision:null},{url:"/css/822.baa4493a.css",revision:null},{url:"/css/888.788b2890.css",revision:null},{url:"/css/954.b20c1894.css",revision:null},{url:"/css/chunk-vendors.ca977ff1.css",revision:null},{url:"/fonts/materialdesignicons-webfont.0766edc9.eot",revision:null},{url:"/fonts/materialdesignicons-webfont.714a4eee.ttf",revision:null},{url:"/fonts/materialdesignicons-webfont.e659bf56.woff",revision:null},{url:"/fonts/materialdesignicons-webfont.fbaef2a9.woff2",revision:null},{url:"/index.html",revision:"7de89ce03acbaddd44790679e178d2c4"},{url:"/js/103.583c21a1.js",revision:null},{url:"/js/235.2a8704d1.js",revision:null},{url:"/js/247.21cabcdf.js",revision:null},{url:"/js/262.cfc27523.js",revision:null},{url:"/js/269.ea7ad984.js",revision:null},{url:"/js/303.3d2e7715.js",revision:null},{url:"/js/339.8ed6ffa3.js",revision:null},{url:"/js/350.ec99c0aa.js",revision:null},{url:"/js/364.b3567ae5.js",revision:null},{url:"/js/373.4d0963c0.js",revision:null},{url:"/js/394.2756a5ef.js",revision:null},{url:"/js/413.39fa4ac2.js",revision:null},{url:"/js/415.d47a504a.js",revision:null},{url:"/js/480.f256947a.js",revision:null},{url:"/js/493.94b38ef6.js",revision:null},{url:"/js/516.069ef981.js",revision:null},{url:"/js/525.4b96ce66.js",revision:null},{url:"/js/531.a1a3f523.js",revision:null},{url:"/js/57.57b2222f.js",revision:null},{url:"/js/584.c5696555.js",revision:null},{url:"/js/648.bf201e31.js",revision:null},{url:"/js/674.d5f1dfe7.js",revision:null},{url:"/js/690.8560c722.js",revision:null},{url:"/js/710.9efad7a6.js",revision:null},{url:"/js/822.85d2546e.js",revision:null},{url:"/js/838.97f902f2.js",revision:null},{url:"/js/888.4e7041be.js",revision:null},{url:"/js/896.e58b76ab.js",revision:null},{url:"/js/914.63ab5c63.js",revision:null},{url:"/js/93.c1705944.js",revision:null},{url:"/js/954.34f5f3d6.js",revision:null},{url:"/js/987.c847b5ac.js",revision:null},{url:"/js/app.d764140b.js",revision:null},{url:"/js/chunk-vendors.cf5b234a.js",revision:null},{url:"/manifest.json",revision:"8eff00fb23e5046e8587fb699e79e093"},{url:"/robots.txt",revision:"b6216d61c03e6ce0c9aea6ca7808f7ca"}],{})}));
//# sourceMappingURL=service-worker.js.map
