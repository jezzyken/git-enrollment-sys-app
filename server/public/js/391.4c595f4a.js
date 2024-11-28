"use strict";(self["webpackChunkclient"]=self["webpackChunkclient"]||[]).push([[391],{2391:function(e,t,s){s.r(t),s.d(t,{default:function(){return $}});var r=s(3698),i=s(2938),a=s(4414),n=s(3449),o=s(6930),l=s(8907),c=s(1554),u=s(2756),d=function(){var e=this,t=e._self._c;return t(n.A,{attrs:{fluid:""}},[t(i.ri,{staticClass:"d-flex align-center py-4"},[t(o.A,{staticClass:"mr-3",attrs:{large:"",color:"#a52a2a"}},[e._v("mdi-view-dashboard")]),t("span",{staticClass:"text-h5"},[e._v("School Dashboard")])],1),t(u.A,[t(a.A,{attrs:{cols:"12",sm:"6",md:"3"}},[t(r.A,{staticClass:"mx-auto",attrs:{color:"#b22222",dark:""}},[t(i.OQ,[t("div",{staticClass:"text-h4 mb-2"},[e._v(e._s(e.totalStudents))]),t("div",{staticClass:"text-subtitle-1"},[e._v("Total Students")]),t(o.A,{staticClass:"dashboard-icon",attrs:{large:""}},[e._v("mdi-account-group")])],1)],1)],1)],1),t(l.A,{attrs:{value:e.isLoading}},[t(c.A,{attrs:{indeterminate:"",size:"64"}})],1)],1)},h=[],g=(s(4114),s(5353)),v=s(5093),p=s.n(v),m=function(){var e=this,t=e._self._c;return t("div",{staticClass:"attendance-chart"},[t("apexchart",{attrs:{type:"line",height:"300",options:e.chartOptions,series:e.series}})],1)},f=[],y=s(7588),b=s.n(y),_={name:"AttendanceChart",components:{apexchart:b()},props:{data:{type:Array,required:!0}},computed:{series(){return[{name:"Attendance Rate",data:this.data.map((e=>({x:p()(e._id).format("ddd"),y:Math.round(e.presentStudents/e.totalStudents*100)})))}]},chartOptions(){return{chart:{type:"line",toolbar:{show:!1}},stroke:{curve:"smooth",width:3},colors:["#1976D2"],xaxis:{type:"category"},yaxis:{labels:{formatter:e=>`${e}%`}},tooltip:{y:{formatter:e=>`${e}%`}}}}}},A=_,C=s(1656),S=(0,C.A)(A,m,f,!1,null,null,null),k=S.exports,w={name:"DashboardView",components:{AttendanceChart:k},data:()=>({search:"",activityHeaders:[{text:"Activity",value:"description"},{text:"User",value:"user"},{text:"Timestamp",value:"timestamp"},{text:"Status",value:"status"}],quickActions:[{title:"Take Attendance",icon:"mdi-checkbox-marked",color:"success",route:"/attendance"},{title:"Add New Student",icon:"mdi-account-plus",color:"primary",route:"/students/new"},{title:"Schedule Class",icon:"mdi-calendar-plus",color:"info",route:"/schedule/new"},{title:"Generate Reports",icon:"mdi-file-chart",color:"warning",route:"/reports"}]}),computed:{...(0,g.L8)("dashboard",["totalStudents","totalTeachers","totalClasses","attendanceRate","isLoading"]),...(0,g.aH)("dashboard",["recentActivities","weeklyAttendance","classDistribution"])},methods:{...(0,g.i0)("dashboard",["fetchDashboardData","fetchRecentActivities","fetchWeeklyAttendance","fetchClassDistribution"]),formatDate(e){return p()(e).format("MMM DD, YYYY HH:mm")},getStatusColor(e){const t={completed:"success",pending:"warning",failed:"error"};return t[e.toLowerCase()]||"grey"},handleQuickAction(e){this.$router.push(e.route)},viewAttendanceDetails(){this.$router.push("/attendance/overview")},viewClassDetails(){this.$router.push("/classes/overview")},async initialize(){try{await Promise.all([this.fetchDashboardData(),this.fetchRecentActivities(),this.fetchWeeklyAttendance(),this.fetchClassDistribution()])}catch(e){console.error("Failed to initialize dashboard:",e)}}},created(){this.initialize()}},x=w,B=(0,C.A)(x,d,h,!1,null,"07d77d7a",null),$=B.exports},3698:function(e,t,s){s(6001);var r=s(9375),i=s(3801),a=s(8418),n=s(5803),o=s(4152);t.A=(0,n.A)(i.A,a.A,r.A).extend({name:"v-card",props:{flat:Boolean,hover:Boolean,img:String,link:Boolean,loaderHeight:{type:[Number,String],default:4},raised:Boolean},computed:{classes(){return{"v-card":!0,...a.A.options.computed.classes.call(this),"v-card--flat":this.flat,"v-card--hover":this.hover,"v-card--link":this.isClickable,"v-card--loading":this.loading,"v-card--disabled":this.disabled,"v-card--raised":this.raised,...r.A.options.computed.classes.call(this)}},styles(){const e={...r.A.options.computed.styles.call(this)};return this.img&&(e.background=`url("${this.img}") center center / cover no-repeat`),e}},methods:{genProgress(){const e=i.A.options.methods.genProgress.call(this);return e?this.$createElement("div",{staticClass:"v-card__progress",key:"progress"},[e]):null}},render(e){const{tag:t,data:s}=this.generateRouteLink();return s.style=this.styles,this.isClickable&&(s.attrs=s.attrs||{},s.attrs.tabindex=0),e(t,this.setBackgroundColor(this.color,s),[this.genProgress(),(0,o.$c)(this)])}})},2938:function(e,t,s){s.d(t,{OQ:function(){return o},SL:function(){return a},ri:function(){return l}});var r=s(3698),i=s(4152);const a=(0,i.Gn)("v-card__actions"),n=(0,i.Gn)("v-card__subtitle"),o=(0,i.Gn)("v-card__text"),l=(0,i.Gn)("v-card__title");r.A},4414:function(e,t,s){s(4114),s(125);var r=s(5471),i=s(8041),a=s(4152);const n=["sm","md","lg","xl"],o=(()=>n.reduce(((e,t)=>(e[t]={type:[Boolean,String,Number],default:!1},e)),{}))(),l=(()=>n.reduce(((e,t)=>(e["offset"+(0,a.Zb)(t)]={type:[String,Number],default:null},e)),{}))(),c=(()=>n.reduce(((e,t)=>(e["order"+(0,a.Zb)(t)]={type:[String,Number],default:null},e)),{}))(),u={col:Object.keys(o),offset:Object.keys(l),order:Object.keys(c)};function d(e,t,s){let r=e;if(null!=s&&!1!==s){if(t){const s=t.replace(e,"");r+=`-${s}`}return"col"!==e||""!==s&&!0!==s?(r+=`-${s}`,r.toLowerCase()):r.toLowerCase()}}const h=new Map;t.A=r.Ay.extend({name:"v-col",functional:!0,props:{cols:{type:[Boolean,String,Number],default:!1},...o,offset:{type:[String,Number],default:null},...l,order:{type:[String,Number],default:null},...c,alignSelf:{type:String,default:null,validator:e=>["auto","start","end","center","baseline","stretch"].includes(e)},tag:{type:String,default:"div"}},render(e,{props:t,data:s,children:r,parent:a}){let n="";for(const i in t)n+=String(t[i]);let o=h.get(n);if(!o){let e;for(e in o=[],u)u[e].forEach((s=>{const r=t[s],i=d(e,s,r);i&&o.push(i)}));const s=o.some((e=>e.startsWith("col-")));o.push({col:!s||!t.cols,[`col-${t.cols}`]:t.cols,[`offset-${t.offset}`]:t.offset,[`order-${t.order}`]:t.order,[`align-self-${t.alignSelf}`]:t.alignSelf}),h.set(n,o)}return e(t.tag,(0,i.Ay)(s,{class:o}),r)}})},2756:function(e,t,s){s(4114),s(125);var r=s(5471),i=s(8041),a=s(4152);const n=["sm","md","lg","xl"],o=["start","end","center"];function l(e,t){return n.reduce(((s,r)=>(s[e+(0,a.Zb)(r)]=t(),s)),{})}const c=e=>[...o,"baseline","stretch"].includes(e),u=l("align",(()=>({type:String,default:null,validator:c}))),d=e=>[...o,"space-between","space-around"].includes(e),h=l("justify",(()=>({type:String,default:null,validator:d}))),g=e=>[...o,"space-between","space-around","stretch"].includes(e),v=l("alignContent",(()=>({type:String,default:null,validator:g}))),p={align:Object.keys(u),justify:Object.keys(h),alignContent:Object.keys(v)},m={align:"align",justify:"justify",alignContent:"align-content"};function f(e,t,s){let r=m[e];if(null!=s){if(t){const s=t.replace(e,"");r+=`-${s}`}return r+=`-${s}`,r.toLowerCase()}}const y=new Map;t.A=r.Ay.extend({name:"v-row",functional:!0,props:{tag:{type:String,default:"div"},dense:Boolean,noGutters:Boolean,align:{type:String,default:null,validator:c},...u,justify:{type:String,default:null,validator:d},...h,alignContent:{type:String,default:null,validator:g},...v},render(e,{props:t,data:s,children:r}){let a="";for(const i in t)a+=String(t[i]);let n=y.get(a);if(!n){let e;for(e in n=[],p)p[e].forEach((s=>{const r=t[s],i=f(e,s,r);i&&n.push(i)}));n.push({"no-gutters":t.noGutters,"row--dense":t.dense,[`align-${t.align}`]:t.align,[`justify-${t.justify}`]:t.justify,[`align-content-${t.alignContent}`]:t.alignContent}),y.set(a,n)}return e(t.tag,(0,i.Ay)(s,{staticClass:"row",class:n}),r)}})},8907:function(e,t,s){s.d(t,{A:function(){return l}});s(4114);var r=s(8743),i=s(3381),a=s(428),n=s(5803),o=s(4152),l=(0,n.A)(r.A,i.A,a.A).extend({name:"v-overlay",props:{absolute:Boolean,color:{type:String,default:"#212121"},dark:{type:Boolean,default:!0},opacity:{type:[Number,String],default:.46},value:{default:!0},zIndex:{type:[Number,String],default:5}},computed:{__scrim(){const e=this.setBackgroundColor(this.color,{staticClass:"v-overlay__scrim",style:{opacity:this.computedOpacity}});return this.$createElement("div",e)},classes(){return{"v-overlay--absolute":this.absolute,"v-overlay--active":this.isActive,...this.themeClasses}},computedOpacity(){return Number(this.isActive?this.opacity:0)},styles(){return{zIndex:this.zIndex}}},methods:{genContent(){return this.$createElement("div",{staticClass:"v-overlay__content"},(0,o.$c)(this))}},render(e){const t=[this.__scrim];return this.isActive&&t.push(this.genContent()),e("div",{staticClass:"v-overlay",on:this.$listeners,class:this.classes,style:this.styles},t)}})},1554:function(e,t,s){s.d(t,{A:function(){return n}});var r=s(1677),i=s(8743),a=s(4152),n=i.A.extend({name:"v-progress-circular",directives:{intersect:r.A},props:{button:Boolean,indeterminate:Boolean,rotate:{type:[Number,String],default:0},size:{type:[Number,String],default:32},width:{type:[Number,String],default:4},value:{type:[Number,String],default:0}},data:()=>({radius:20,isVisible:!0}),computed:{calculatedSize(){return Number(this.size)+(this.button?8:0)},circumference(){return 2*Math.PI*this.radius},classes(){return{"v-progress-circular--visible":this.isVisible,"v-progress-circular--indeterminate":this.indeterminate,"v-progress-circular--button":this.button}},normalizedValue(){return this.value<0?0:this.value>100?100:parseFloat(this.value)},strokeDashArray(){return Math.round(1e3*this.circumference)/1e3},strokeDashOffset(){return(100-this.normalizedValue)/100*this.circumference+"px"},strokeWidth(){return Number(this.width)/+this.size*this.viewBoxSize*2},styles(){return{height:(0,a.Dg)(this.calculatedSize),width:(0,a.Dg)(this.calculatedSize)}},svgStyles(){return{transform:`rotate(${Number(this.rotate)}deg)`}},viewBoxSize(){return this.radius/(1-Number(this.width)/+this.size)}},methods:{genCircle(e,t){return this.$createElement("circle",{class:`v-progress-circular__${e}`,attrs:{fill:"transparent",cx:2*this.viewBoxSize,cy:2*this.viewBoxSize,r:this.radius,"stroke-width":this.strokeWidth,"stroke-dasharray":this.strokeDashArray,"stroke-dashoffset":t}})},genSvg(){const e=[this.indeterminate||this.genCircle("underlay",0),this.genCircle("overlay",this.strokeDashOffset)];return this.$createElement("svg",{style:this.svgStyles,attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:`${this.viewBoxSize} ${this.viewBoxSize} ${2*this.viewBoxSize} ${2*this.viewBoxSize}`}},e)},genInfo(){return this.$createElement("div",{staticClass:"v-progress-circular__info"},(0,a.$c)(this))},onObserve(e,t,s){this.isVisible=s}},render(e){return e("div",this.setTextColor(this.color,{staticClass:"v-progress-circular",attrs:{role:"progressbar","aria-valuemin":0,"aria-valuemax":100,"aria-valuenow":this.indeterminate?void 0:this.normalizedValue},class:this.classes,directives:[{name:"intersect",value:this.onObserve}],style:this.styles,on:this.$listeners}),[this.genSvg(),this.genInfo()])}})},3801:function(e,t,s){s.d(t,{A:function(){return p}});var r=s(5471),i=s(5961),a=s(1677),n=s(8743),o=s(6763),l=s(4632),c=s(3381),u=s(4152),d=s(5803);const h=(0,d.A)(n.A,(0,o.P)(["absolute","fixed","top","bottom"]),l.A,c.A);var g=h.extend({name:"v-progress-linear",directives:{intersect:a.A},props:{active:{type:Boolean,default:!0},backgroundColor:{type:String,default:null},backgroundOpacity:{type:[Number,String],default:null},bufferValue:{type:[Number,String],default:100},color:{type:String,default:"primary"},height:{type:[Number,String],default:4},indeterminate:Boolean,query:Boolean,reverse:Boolean,rounded:Boolean,stream:Boolean,striped:Boolean,value:{type:[Number,String],default:0}},data(){return{internalLazyValue:this.value||0,isVisible:!0}},computed:{__cachedBackground(){return this.$createElement("div",this.setBackgroundColor(this.backgroundColor||this.color,{staticClass:"v-progress-linear__background",style:this.backgroundStyle}))},__cachedBar(){return this.$createElement(this.computedTransition,[this.__cachedBarType])},__cachedBarType(){return this.indeterminate?this.__cachedIndeterminate:this.__cachedDeterminate},__cachedBuffer(){return this.$createElement("div",{staticClass:"v-progress-linear__buffer",style:this.styles})},__cachedDeterminate(){return this.$createElement("div",this.setBackgroundColor(this.color,{staticClass:"v-progress-linear__determinate",style:{width:(0,u.Dg)(this.normalizedValue,"%")}}))},__cachedIndeterminate(){return this.$createElement("div",{staticClass:"v-progress-linear__indeterminate",class:{"v-progress-linear__indeterminate--active":this.active}},[this.genProgressBar("long"),this.genProgressBar("short")])},__cachedStream(){return this.stream?this.$createElement("div",this.setTextColor(this.color,{staticClass:"v-progress-linear__stream",style:{width:(0,u.Dg)(100-this.normalizedBuffer,"%")}})):null},backgroundStyle(){const e=null==this.backgroundOpacity?this.backgroundColor?1:.3:parseFloat(this.backgroundOpacity);return{opacity:e,[this.isReversed?"right":"left"]:(0,u.Dg)(this.normalizedValue,"%"),width:(0,u.Dg)(Math.max(0,this.normalizedBuffer-this.normalizedValue),"%")}},classes(){return{"v-progress-linear--absolute":this.absolute,"v-progress-linear--fixed":this.fixed,"v-progress-linear--query":this.query,"v-progress-linear--reactive":this.reactive,"v-progress-linear--reverse":this.isReversed,"v-progress-linear--rounded":this.rounded,"v-progress-linear--striped":this.striped,"v-progress-linear--visible":this.isVisible,...this.themeClasses}},computedTransition(){return this.indeterminate?i.mM:i.vt},isReversed(){return this.$vuetify.rtl!==this.reverse},normalizedBuffer(){return this.normalize(this.bufferValue)},normalizedValue(){return this.normalize(this.internalLazyValue)},reactive(){return Boolean(this.$listeners.change)},styles(){const e={};return this.active||(e.height=0),this.indeterminate||100===parseFloat(this.normalizedBuffer)||(e.width=(0,u.Dg)(this.normalizedBuffer,"%")),e}},methods:{genContent(){const e=(0,u.$c)(this,"default",{value:this.internalLazyValue});return e?this.$createElement("div",{staticClass:"v-progress-linear__content"},e):null},genListeners(){const e=this.$listeners;return this.reactive&&(e.click=this.onClick),e},genProgressBar(e){return this.$createElement("div",this.setBackgroundColor(this.color,{staticClass:"v-progress-linear__indeterminate",class:{[e]:!0}}))},onClick(e){if(!this.reactive)return;const{width:t}=this.$el.getBoundingClientRect();this.internalValue=e.offsetX/t*100},onObserve(e,t,s){this.isVisible=s},normalize(e){return e<0?0:e>100?100:parseFloat(e)}},render(e){const t={staticClass:"v-progress-linear",attrs:{role:"progressbar","aria-valuemin":0,"aria-valuemax":this.normalizedBuffer,"aria-valuenow":this.indeterminate?void 0:this.normalizedValue},class:this.classes,directives:[{name:"intersect",value:this.onObserve}],style:{bottom:this.bottom?0:void 0,height:this.active?(0,u.Dg)(this.height):0,top:this.top?0:void 0},on:this.genListeners()};return e("div",t,[this.__cachedStream,this.__cachedBackground,this.__cachedBuffer,this.__cachedBar,this.genContent()])}}),v=g,p=r.Ay.extend().extend({name:"loadable",props:{loading:{type:[Boolean,String],default:!1},loaderHeight:{type:[Number,String],default:2}},methods:{genProgress(){return!1===this.loading?null:(0,u.$c)(this,"progress")||this.$createElement(v,{props:{absolute:!0,color:!0===this.loading||""===this.loading?this.color||"primary":this.loading,height:this.loaderHeight,indeterminate:!0}})}}})},428:function(e,t,s){s.d(t,{P:function(){return i}});var r=s(5471);function i(e="value",t="input"){return r.Ay.extend({name:"toggleable",model:{prop:e,event:t},props:{[e]:{required:!1}},data(){return{isActive:!!this[e]}},watch:{[e](e){this.isActive=!!e},isActive(s){!!s!==this[e]&&this.$emit(t,s)}}})}const a=i();t.A=a},6001:function(){}}]);
//# sourceMappingURL=391.4c595f4a.js.map