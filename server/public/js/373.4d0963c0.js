"use strict";(self["webpackChunkclient"]=self["webpackChunkclient"]||[]).push([[373],{5373:function(e,t,r){r.r(t),r.d(t,{default:function(){return f}});var s=r(3698),i=r(2938),n=r(4414),a=r(3449),l=r(6930),o=r(2756),c=function(){var e=this,t=e._self._c;return t(a.A,{attrs:{fluid:""}},[t(i.ri,{staticClass:"d-flex align-center py-4"},[t(l.A,{staticClass:"mr-3",attrs:{large:"",color:"primary"}},[e._v("mdi-file-chart")]),t("span",{staticClass:"text-h5"},[e._v("Reports")])],1),t(o.A,e._l(e.reportTypes,(function(r){return t(n.A,{key:r.id,attrs:{cols:"12",sm:"6",md:"3"}},[t(s.A,{staticClass:"report-card",class:{selected:e.isSelected(r.id)},on:{click:function(t){return e.selectReport(r)}}},[t(i.OQ,{staticClass:"text-center pa-4"},[t(l.A,{attrs:{"x-large":"",color:r.color}},[e._v(e._s(r.icon))]),t("div",{staticClass:"text-h6 mt-3"},[e._v(e._s(r.title))]),t("div",{staticClass:"text-subtitle-2 grey--text"},[e._v(" "+e._s(r.description)+" ")])],1)],1)],1)})),1),t("router-view")],1)},d=[],u=(r(4114),{name:"Reports",data:()=>({reportTypes:[{id:"teachers",title:"Teacher List",description:"Comprehensive teacher directory with details",icon:"mdi-teach",color:"blue",route:"TeacherReport"},{id:"students",title:"Student List",description:"Complete student enrollment records",icon:"mdi-account-group",color:"green",route:"StudentReport"},{id:"schedules",title:"Class Schedule",description:"Complete class schedules and timetables",icon:"mdi-calendar-clock",color:"purple",route:"ScheduleReport"},{id:"attendance",title:"Attendance List",description:"Student attendance records and statistics",icon:"mdi-account-check",color:"orange",route:"AttendanceReport"}]}),methods:{selectReport(e){const t=`/reports/${e.id}`;this.$route.path!==t&&this.$router.push(t)},isSelected(e){return this.$route.path===`/reports/${e}`}}}),h=u,g=r(1656),p=(0,g.A)(h,c,d,!1,null,"65e333ec",null),f=p.exports},3698:function(e,t,r){r(6001);var s=r(9375),i=r(3801),n=r(8418),a=r(5803),l=r(4152);t.A=(0,a.A)(i.A,n.A,s.A).extend({name:"v-card",props:{flat:Boolean,hover:Boolean,img:String,link:Boolean,loaderHeight:{type:[Number,String],default:4},raised:Boolean},computed:{classes(){return{"v-card":!0,...n.A.options.computed.classes.call(this),"v-card--flat":this.flat,"v-card--hover":this.hover,"v-card--link":this.isClickable,"v-card--loading":this.loading,"v-card--disabled":this.disabled,"v-card--raised":this.raised,...s.A.options.computed.classes.call(this)}},styles(){const e={...s.A.options.computed.styles.call(this)};return this.img&&(e.background=`url("${this.img}") center center / cover no-repeat`),e}},methods:{genProgress(){const e=i.A.options.methods.genProgress.call(this);return e?this.$createElement("div",{staticClass:"v-card__progress",key:"progress"},[e]):null}},render(e){const{tag:t,data:r}=this.generateRouteLink();return r.style=this.styles,this.isClickable&&(r.attrs=r.attrs||{},r.attrs.tabindex=0),e(t,this.setBackgroundColor(this.color,r),[this.genProgress(),(0,l.$c)(this)])}})},2938:function(e,t,r){r.d(t,{OQ:function(){return l},SL:function(){return n},ri:function(){return o}});var s=r(3698),i=r(4152);const n=(0,i.Gn)("v-card__actions"),a=(0,i.Gn)("v-card__subtitle"),l=(0,i.Gn)("v-card__text"),o=(0,i.Gn)("v-card__title");s.A},4414:function(e,t,r){r(4114),r(125);var s=r(5471),i=r(8041),n=r(4152);const a=["sm","md","lg","xl"],l=(()=>a.reduce(((e,t)=>(e[t]={type:[Boolean,String,Number],default:!1},e)),{}))(),o=(()=>a.reduce(((e,t)=>(e["offset"+(0,n.Zb)(t)]={type:[String,Number],default:null},e)),{}))(),c=(()=>a.reduce(((e,t)=>(e["order"+(0,n.Zb)(t)]={type:[String,Number],default:null},e)),{}))(),d={col:Object.keys(l),offset:Object.keys(o),order:Object.keys(c)};function u(e,t,r){let s=e;if(null!=r&&!1!==r){if(t){const r=t.replace(e,"");s+=`-${r}`}return"col"!==e||""!==r&&!0!==r?(s+=`-${r}`,s.toLowerCase()):s.toLowerCase()}}const h=new Map;t.A=s.Ay.extend({name:"v-col",functional:!0,props:{cols:{type:[Boolean,String,Number],default:!1},...l,offset:{type:[String,Number],default:null},...o,order:{type:[String,Number],default:null},...c,alignSelf:{type:String,default:null,validator:e=>["auto","start","end","center","baseline","stretch"].includes(e)},tag:{type:String,default:"div"}},render(e,{props:t,data:r,children:s,parent:n}){let a="";for(const i in t)a+=String(t[i]);let l=h.get(a);if(!l){let e;for(e in l=[],d)d[e].forEach((r=>{const s=t[r],i=u(e,r,s);i&&l.push(i)}));const r=l.some((e=>e.startsWith("col-")));l.push({col:!r||!t.cols,[`col-${t.cols}`]:t.cols,[`offset-${t.offset}`]:t.offset,[`order-${t.order}`]:t.order,[`align-self-${t.alignSelf}`]:t.alignSelf}),h.set(a,l)}return e(t.tag,(0,i.Ay)(r,{class:l}),s)}})},2756:function(e,t,r){r(4114),r(125);var s=r(5471),i=r(8041),n=r(4152);const a=["sm","md","lg","xl"],l=["start","end","center"];function o(e,t){return a.reduce(((r,s)=>(r[e+(0,n.Zb)(s)]=t(),r)),{})}const c=e=>[...l,"baseline","stretch"].includes(e),d=o("align",(()=>({type:String,default:null,validator:c}))),u=e=>[...l,"space-between","space-around"].includes(e),h=o("justify",(()=>({type:String,default:null,validator:u}))),g=e=>[...l,"space-between","space-around","stretch"].includes(e),p=o("alignContent",(()=>({type:String,default:null,validator:g}))),f={align:Object.keys(d),justify:Object.keys(h),alignContent:Object.keys(p)},m={align:"align",justify:"justify",alignContent:"align-content"};function v(e,t,r){let s=m[e];if(null!=r){if(t){const r=t.replace(e,"");s+=`-${r}`}return s+=`-${r}`,s.toLowerCase()}}const y=new Map;t.A=s.Ay.extend({name:"v-row",functional:!0,props:{tag:{type:String,default:"div"},dense:Boolean,noGutters:Boolean,align:{type:String,default:null,validator:c},...d,justify:{type:String,default:null,validator:u},...h,alignContent:{type:String,default:null,validator:g},...p},render(e,{props:t,data:r,children:s}){let n="";for(const i in t)n+=String(t[i]);let a=y.get(n);if(!a){let e;for(e in a=[],f)f[e].forEach((r=>{const s=t[r],i=v(e,r,s);i&&a.push(i)}));a.push({"no-gutters":t.noGutters,"row--dense":t.dense,[`align-${t.align}`]:t.align,[`justify-${t.justify}`]:t.justify,[`align-content-${t.alignContent}`]:t.alignContent}),y.set(n,a)}return e(t.tag,(0,i.Ay)(r,{staticClass:"row",class:a}),s)}})},3801:function(e,t,r){r.d(t,{A:function(){return f}});var s=r(5471),i=r(5961),n=r(1677),a=r(8743),l=r(6763),o=r(4632),c=r(3381),d=r(4152),u=r(5803);const h=(0,u.A)(a.A,(0,l.P)(["absolute","fixed","top","bottom"]),o.A,c.A);var g=h.extend({name:"v-progress-linear",directives:{intersect:n.A},props:{active:{type:Boolean,default:!0},backgroundColor:{type:String,default:null},backgroundOpacity:{type:[Number,String],default:null},bufferValue:{type:[Number,String],default:100},color:{type:String,default:"primary"},height:{type:[Number,String],default:4},indeterminate:Boolean,query:Boolean,reverse:Boolean,rounded:Boolean,stream:Boolean,striped:Boolean,value:{type:[Number,String],default:0}},data(){return{internalLazyValue:this.value||0,isVisible:!0}},computed:{__cachedBackground(){return this.$createElement("div",this.setBackgroundColor(this.backgroundColor||this.color,{staticClass:"v-progress-linear__background",style:this.backgroundStyle}))},__cachedBar(){return this.$createElement(this.computedTransition,[this.__cachedBarType])},__cachedBarType(){return this.indeterminate?this.__cachedIndeterminate:this.__cachedDeterminate},__cachedBuffer(){return this.$createElement("div",{staticClass:"v-progress-linear__buffer",style:this.styles})},__cachedDeterminate(){return this.$createElement("div",this.setBackgroundColor(this.color,{staticClass:"v-progress-linear__determinate",style:{width:(0,d.Dg)(this.normalizedValue,"%")}}))},__cachedIndeterminate(){return this.$createElement("div",{staticClass:"v-progress-linear__indeterminate",class:{"v-progress-linear__indeterminate--active":this.active}},[this.genProgressBar("long"),this.genProgressBar("short")])},__cachedStream(){return this.stream?this.$createElement("div",this.setTextColor(this.color,{staticClass:"v-progress-linear__stream",style:{width:(0,d.Dg)(100-this.normalizedBuffer,"%")}})):null},backgroundStyle(){const e=null==this.backgroundOpacity?this.backgroundColor?1:.3:parseFloat(this.backgroundOpacity);return{opacity:e,[this.isReversed?"right":"left"]:(0,d.Dg)(this.normalizedValue,"%"),width:(0,d.Dg)(Math.max(0,this.normalizedBuffer-this.normalizedValue),"%")}},classes(){return{"v-progress-linear--absolute":this.absolute,"v-progress-linear--fixed":this.fixed,"v-progress-linear--query":this.query,"v-progress-linear--reactive":this.reactive,"v-progress-linear--reverse":this.isReversed,"v-progress-linear--rounded":this.rounded,"v-progress-linear--striped":this.striped,"v-progress-linear--visible":this.isVisible,...this.themeClasses}},computedTransition(){return this.indeterminate?i.mM:i.vt},isReversed(){return this.$vuetify.rtl!==this.reverse},normalizedBuffer(){return this.normalize(this.bufferValue)},normalizedValue(){return this.normalize(this.internalLazyValue)},reactive(){return Boolean(this.$listeners.change)},styles(){const e={};return this.active||(e.height=0),this.indeterminate||100===parseFloat(this.normalizedBuffer)||(e.width=(0,d.Dg)(this.normalizedBuffer,"%")),e}},methods:{genContent(){const e=(0,d.$c)(this,"default",{value:this.internalLazyValue});return e?this.$createElement("div",{staticClass:"v-progress-linear__content"},e):null},genListeners(){const e=this.$listeners;return this.reactive&&(e.click=this.onClick),e},genProgressBar(e){return this.$createElement("div",this.setBackgroundColor(this.color,{staticClass:"v-progress-linear__indeterminate",class:{[e]:!0}}))},onClick(e){if(!this.reactive)return;const{width:t}=this.$el.getBoundingClientRect();this.internalValue=e.offsetX/t*100},onObserve(e,t,r){this.isVisible=r},normalize(e){return e<0?0:e>100?100:parseFloat(e)}},render(e){const t={staticClass:"v-progress-linear",attrs:{role:"progressbar","aria-valuemin":0,"aria-valuemax":this.normalizedBuffer,"aria-valuenow":this.indeterminate?void 0:this.normalizedValue},class:this.classes,directives:[{name:"intersect",value:this.onObserve}],style:{bottom:this.bottom?0:void 0,height:this.active?(0,d.Dg)(this.height):0,top:this.top?0:void 0},on:this.genListeners()};return e("div",t,[this.__cachedStream,this.__cachedBackground,this.__cachedBuffer,this.__cachedBar,this.genContent()])}}),p=g,f=s.Ay.extend().extend({name:"loadable",props:{loading:{type:[Boolean,String],default:!1},loaderHeight:{type:[Number,String],default:2}},methods:{genProgress(){return!1===this.loading?null:(0,d.$c)(this,"progress")||this.$createElement(p,{props:{absolute:!0,color:!0===this.loading||""===this.loading?this.color||"primary":this.loading,height:this.loaderHeight,indeterminate:!0}})}}})},6001:function(){}}]);
//# sourceMappingURL=373.4d0963c0.js.map