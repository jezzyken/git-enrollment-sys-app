"use strict";(self["webpackChunkclient"]=self["webpackChunkclient"]||[]).push([[216],{77648:function(e,t,s){s.r(t),s.d(t,{default:function(){return S}});var r=s(1965),i=s(33740),a=s(3698),l=s(52938),o=s(13180),n=s(54414),c=s(3449),h=s(36930),d=s(98983),u=s(17296),p=s(98924),g=s(51554),m=s(2756),v=s(41034),_=function(){var e=this,t=e._self._c;return t(c.A,{attrs:{fluid:""}},[t(a.A,{staticClass:"my-4",attrs:{elevation:"2"}},[t(l.ri,{staticClass:"d-flex align-center py-4",staticStyle:{"background-color":"#d2691e"}},[t(h.A,{staticClass:"mr-3",attrs:{large:"",color:"white"}},[e._v("mdi-calendar-clock")]),t("div",{staticClass:"white--text"},[t("div",{staticClass:"text-h5"},[e._v("Class Schedule")]),e.teacherName?t("div",{staticClass:"text-subtitle-2"},[e._v(" "+e._s(e.teacherName)+" ")]):e._e()]),t(v.A),t(i.A,{attrs:{color:"white",text:"",loading:e.loading,disabled:e.loading},on:{click:e.loadSchedules}},[t(h.A,{attrs:{left:""}},[e._v("mdi-refresh")]),e._v(" Refresh ")],1)],1),t(l.OQ,{staticClass:"pa-6"},[e.loading||e.error?e._e():t(m.A,e._l(e.weekDays,(function(s){return t(n.A,{key:s,attrs:{cols:"12",md:"6",lg:"4"}},[t(a.A,{staticClass:"day-card",class:{"current-day":e.isCurrentDay(s)},attrs:{outlined:""}},[t(l.ri,{staticClass:"py-3",class:e.getDayHeaderClass(s),style:e.getDayHeaderClass(s)},[t(h.A,{attrs:{left:"",color:"white"}},[e._v(e._s(e.getDayIcon(s)))]),t("span",{staticClass:"white--text"},[e._v(e._s(s))]),e.getSchedulesByDay(s).length?t(o.A,{staticClass:"ml-2",attrs:{"x-small":"",color:"white","text-color":"primary"}},[e._v(" "+e._s(e.getSchedulesByDay(s).length)+" ")]):e._e()],1),t(l.OQ,{staticClass:"pt-4"},[e.getSchedulesByDay(s).length?t(d.A,{attrs:{dense:""}},e._l(e.getSchedulesByDay(s),(function(s){return t(u.A,{key:s._id,staticClass:"mb-2 schedule-item"},[t(p.pr,[t(p.UZ,{staticClass:"font-weight-medium warning--text"},[e._v(" "+e._s(s.subject.subjectName.toUpperCase())+" ")]),t(p.w,{staticClass:"mt-1"},[t(h.A,{attrs:{small:"",color:"grey darken-1"}},[e._v("mdi-clock-outline")]),t("span",{staticClass:"ml-1"},[e._v(e._s(e.formatTime(s.startTime))+" - "+e._s(e.formatTime(s.endTime)))])],1),t(p.w,{staticClass:"mt-1"},[t(h.A,{attrs:{small:"",color:"grey darken-1"}},[e._v("mdi-school")]),t("span",{staticClass:"ml-1"},[e._v(e._s(s.course.courseName))])],1),t(p.w,{staticClass:"mt-1"},[t(h.A,{attrs:{small:"",color:"grey darken-1"}},[e._v("mdi-account-group")]),t("span",{staticClass:"ml-1"},[e._v("Section "+e._s(s.section))])],1)],1)],1)})),1):t(r.A,{attrs:{type:"info",text:"",dense:""}},[e._v(" No classes scheduled ")])],1)],1)],1)})),1),e.loading?t(m.A,{staticStyle:{"min-height":"400px"},attrs:{justify:"center",align:"center"}},[t(n.A,{staticClass:"text-center",attrs:{cols:"12"}},[t(g.A,{attrs:{indeterminate:"",color:"primary",size:"64"}}),t("div",{staticClass:"mt-4 text-subtitle-1 grey--text"},[e._v(" Loading schedule... ")])],1)],1):e._e(),e.error?t(m.A,{attrs:{justify:"center"}},[t(n.A,{attrs:{cols:"12",sm:"8",md:"6"}},[t(r.A,{attrs:{type:"error",text:"",prominent:""}},[t(m.A,{attrs:{align:"center"}},[t(n.A,{staticClass:"grow"},[e._v(" "+e._s(e.error)+" ")]),t(n.A,{staticClass:"shrink"},[t(i.A,{attrs:{color:"error",text:""},on:{click:e.loadSchedules}},[e._v(" Try Again ")])],1)],1)],1)],1)],1):e._e()],1)],1)],1)},y=[],f=s(95353),C=s(95093),b=s.n(C),A={name:"TeacherClassScheduleView",data:()=>({weekDays:["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]}),computed:{...(0,f.aH)("schedules",["loading","error","teacherSchedules"]),...(0,f.L8)("schedules",["getSchedulesByDay","hasSchedules"]),teacherId(){return this.$route.params.id},teacherName(){if(this.teacherSchedules.length>0){const e=this.teacherSchedules[0].teacher;return`${e.user.lastName}, ${e.user.firstName} ${e.user.middleName||""}`}return""}},methods:{...(0,f.i0)("schedules",["fetchTeacherSchedules"]),async loadSchedules(){try{await this.fetchTeacherSchedules(this.teacherId)}catch(e){console.error("Failed to load schedules:",e)}},formatTime(e){return b()(e,"HH:mm").format("h:mm A")},isCurrentDay(e){return b()().format("dddd")===e},getDayHeaderClass(e){return{backgroundColor:this.isCurrentDay(e)?"#f4a460":"#a52a2a"}},getDayIcon(e){return this.isCurrentDay(e)?"mdi-calendar-today":"mdi-calendar"}},created(){this.loadSchedules()},beforeDestroy(){this.$store.commit("schedules/RESET_STATE")}},B=A,k=s(81656),$=(0,k.A)(B,_,y,!1,null,"173791ac",null),S=$.exports},1965:function(e,t,s){s.d(t,{A:function(){return p}});var r=s(9375),i=s(54728),a=s(90569),l=s(30428),o=s(73381),n=s(85471),c=n.Ay.extend({name:"transitionable",props:{mode:String,origin:String,transition:String}}),h=s(95803),d=s(86988),u=s(4152),p=(0,h.A)(r.A,l.A,c).extend({name:"v-alert",props:{border:{type:String,validator(e){return["top","right","bottom","left"].includes(e)}},closeLabel:{type:String,default:"$vuetify.close"},coloredBorder:Boolean,dense:Boolean,dismissible:Boolean,closeIcon:{type:String,default:"$cancel"},icon:{default:"",type:[Boolean,String],validator(e){return"string"===typeof e||!1===e}},outlined:Boolean,prominent:Boolean,text:Boolean,type:{type:String,validator(e){return["info","error","success","warning"].includes(e)}},value:{type:Boolean,default:!0}},computed:{__cachedBorder(){if(!this.border)return null;let e={staticClass:"v-alert__border",class:{[`v-alert__border--${this.border}`]:!0}};return this.coloredBorder&&(e=this.setBackgroundColor(this.computedColor,e),e.class["v-alert__border--has-color"]=!0),this.$createElement("div",e)},__cachedDismissible(){if(!this.dismissible)return null;const e=this.iconColor;return this.$createElement(i.A,{staticClass:"v-alert__dismissible",props:{color:e,icon:!0,small:!0},attrs:{"aria-label":this.$vuetify.lang.t(this.closeLabel)},on:{click:()=>this.isActive=!1}},[this.$createElement(a.A,{props:{color:e}},this.closeIcon)])},__cachedIcon(){return this.computedIcon?this.$createElement(a.A,{staticClass:"v-alert__icon",props:{color:this.iconColor}},this.computedIcon):null},classes(){const e={...r.A.options.computed.classes.call(this),"v-alert--border":Boolean(this.border),"v-alert--dense":this.dense,"v-alert--outlined":this.outlined,"v-alert--prominent":this.prominent,"v-alert--text":this.text};return this.border&&(e[`v-alert--border-${this.border}`]=!0),e},computedColor(){return this.color||this.type},computedIcon(){return!1!==this.icon&&("string"===typeof this.icon&&this.icon?this.icon:!!["error","info","success","warning"].includes(this.type)&&`$${this.type}`)},hasColoredIcon(){return this.hasText||Boolean(this.border)&&this.coloredBorder},hasText(){return this.text||this.outlined},iconColor(){return this.hasColoredIcon?this.computedColor:void 0},isDark(){return!(!this.type||this.coloredBorder||this.outlined)||o.A.options.computed.isDark.call(this)}},created(){this.$attrs.hasOwnProperty("outline")&&(0,d.q4)("outline","outlined",this)},methods:{genWrapper(){const e=[(0,u.$c)(this,"prepend")||this.__cachedIcon,this.genContent(),this.__cachedBorder,(0,u.$c)(this,"append"),this.$scopedSlots.close?this.$scopedSlots.close({toggle:this.toggle}):this.__cachedDismissible],t={staticClass:"v-alert__wrapper"};return this.$createElement("div",t,e)},genContent(){return this.$createElement("div",{staticClass:"v-alert__content"},(0,u.$c)(this))},genAlert(){let e={staticClass:"v-alert",attrs:{role:"alert"},on:this.listeners$,class:this.classes,style:this.styles,directives:[{name:"show",value:this.isActive}]};if(!this.coloredBorder){const t=this.hasText?this.setTextColor:this.setBackgroundColor;e=t(this.computedColor,e)}return this.$createElement("div",e,[this.genWrapper()])},toggle(){this.isActive=!this.isActive}},render(e){const t=this.genAlert();return this.transition?e("transition",{props:{name:this.transition,origin:this.origin,mode:this.mode}},[t]):t}})},54728:function(e,t,s){var r=s(33740);t.A=r.A},3698:function(e,t,s){s(56001);var r=s(9375),i=s(73801),a=s(48418),l=s(95803),o=s(4152);t.A=(0,l.A)(i.A,a.A,r.A).extend({name:"v-card",props:{flat:Boolean,hover:Boolean,img:String,link:Boolean,loaderHeight:{type:[Number,String],default:4},raised:Boolean},computed:{classes(){return{"v-card":!0,...a.A.options.computed.classes.call(this),"v-card--flat":this.flat,"v-card--hover":this.hover,"v-card--link":this.isClickable,"v-card--loading":this.loading,"v-card--disabled":this.disabled,"v-card--raised":this.raised,...r.A.options.computed.classes.call(this)}},styles(){const e={...r.A.options.computed.styles.call(this)};return this.img&&(e.background=`url("${this.img}") center center / cover no-repeat`),e}},methods:{genProgress(){const e=i.A.options.methods.genProgress.call(this);return e?this.$createElement("div",{staticClass:"v-card__progress",key:"progress"},[e]):null}},render(e){const{tag:t,data:s}=this.generateRouteLink();return s.style=this.styles,this.isClickable&&(s.attrs=s.attrs||{},s.attrs.tabindex=0),e(t,this.setBackgroundColor(this.color,s),[this.genProgress(),(0,o.$c)(this)])}})},52938:function(e,t,s){s.d(t,{OQ:function(){return o},SL:function(){return a},ri:function(){return n}});var r=s(3698),i=s(4152);const a=(0,i.Gn)("v-card__actions"),l=(0,i.Gn)("v-card__subtitle"),o=(0,i.Gn)("v-card__text"),n=(0,i.Gn)("v-card__title");r.A},13180:function(e,t,s){s.d(t,{A:function(){return g}});s(44114);var r=s(95803),i=s(45961),a=s(90569),l=s(58743),o=s(37515),n=s(73381),c=s(30428),h=s(48418),d=s(79785),u=s(86988),p=s(4152),g=(0,r.A)(l.A,d.A,h.A,n.A,(0,o.P)("chipGroup"),(0,c.P)("inputValue")).extend({name:"v-chip",props:{active:{type:Boolean,default:!0},activeClass:{type:String,default(){return this.chipGroup?this.chipGroup.activeClass:""}},close:Boolean,closeIcon:{type:String,default:"$delete"},closeLabel:{type:String,default:"$vuetify.close"},disabled:Boolean,draggable:Boolean,filter:Boolean,filterIcon:{type:String,default:"$complete"},label:Boolean,link:Boolean,outlined:Boolean,pill:Boolean,tag:{type:String,default:"span"},textColor:String,value:null},data:()=>({proxyClass:"v-chip--active"}),computed:{classes(){return{"v-chip":!0,...h.A.options.computed.classes.call(this),"v-chip--clickable":this.isClickable,"v-chip--disabled":this.disabled,"v-chip--draggable":this.draggable,"v-chip--label":this.label,"v-chip--link":this.isLink,"v-chip--no-color":!this.color,"v-chip--outlined":this.outlined,"v-chip--pill":this.pill,"v-chip--removable":this.hasClose,...this.themeClasses,...this.sizeableClasses,...this.groupClasses}},hasClose(){return Boolean(this.close)},isClickable(){return Boolean(h.A.options.computed.isClickable.call(this)||this.chipGroup)}},created(){const e=[["outline","outlined"],["selected","input-value"],["value","active"],["@input","@active.sync"]];e.forEach((([e,t])=>{this.$attrs.hasOwnProperty(e)&&(0,u.q4)(e,t,this)}))},methods:{click(e){this.$emit("click",e),this.chipGroup&&this.toggle()},genFilter(){const e=[];return this.isActive&&e.push(this.$createElement(a.A,{staticClass:"v-chip__filter",props:{left:!0}},this.filterIcon)),this.$createElement(i.SM,e)},genClose(){return this.$createElement(a.A,{staticClass:"v-chip__close",props:{right:!0,size:18},attrs:{"aria-label":this.$vuetify.lang.t(this.closeLabel)},on:{click:e=>{e.stopPropagation(),e.preventDefault(),this.$emit("click:close"),this.$emit("update:active",!1)}}},this.closeIcon)},genContent(){return this.$createElement("span",{staticClass:"v-chip__content"},[this.filter&&this.genFilter(),(0,p.$c)(this),this.hasClose&&this.genClose()])}},render(e){const t=[this.genContent()];let{tag:s,data:r}=this.generateRouteLink();r.attrs={...r.attrs,draggable:this.draggable?"true":void 0,tabindex:this.chipGroup&&!this.disabled?0:r.attrs.tabindex},r.directives.push({name:"show",value:this.active}),r=this.setBackgroundColor(this.color,r);const i=this.textColor||this.outlined&&this.color;return e(s,this.setTextColor(i,r),t)}})},41034:function(e,t,s){s(158);var r=s(4152);t.A=(0,r.Gn)("spacer","div","v-spacer")},73801:function(e,t,s){s.d(t,{A:function(){return m}});var r=s(85471),i=s(45961),a=s(11677),l=s(58743),o=s(86763),n=s(24632),c=s(73381),h=s(4152),d=s(95803);const u=(0,d.A)(l.A,(0,o.P)(["absolute","fixed","top","bottom"]),n.A,c.A);var p=u.extend({name:"v-progress-linear",directives:{intersect:a.A},props:{active:{type:Boolean,default:!0},backgroundColor:{type:String,default:null},backgroundOpacity:{type:[Number,String],default:null},bufferValue:{type:[Number,String],default:100},color:{type:String,default:"primary"},height:{type:[Number,String],default:4},indeterminate:Boolean,query:Boolean,reverse:Boolean,rounded:Boolean,stream:Boolean,striped:Boolean,value:{type:[Number,String],default:0}},data(){return{internalLazyValue:this.value||0,isVisible:!0}},computed:{__cachedBackground(){return this.$createElement("div",this.setBackgroundColor(this.backgroundColor||this.color,{staticClass:"v-progress-linear__background",style:this.backgroundStyle}))},__cachedBar(){return this.$createElement(this.computedTransition,[this.__cachedBarType])},__cachedBarType(){return this.indeterminate?this.__cachedIndeterminate:this.__cachedDeterminate},__cachedBuffer(){return this.$createElement("div",{staticClass:"v-progress-linear__buffer",style:this.styles})},__cachedDeterminate(){return this.$createElement("div",this.setBackgroundColor(this.color,{staticClass:"v-progress-linear__determinate",style:{width:(0,h.Dg)(this.normalizedValue,"%")}}))},__cachedIndeterminate(){return this.$createElement("div",{staticClass:"v-progress-linear__indeterminate",class:{"v-progress-linear__indeterminate--active":this.active}},[this.genProgressBar("long"),this.genProgressBar("short")])},__cachedStream(){return this.stream?this.$createElement("div",this.setTextColor(this.color,{staticClass:"v-progress-linear__stream",style:{width:(0,h.Dg)(100-this.normalizedBuffer,"%")}})):null},backgroundStyle(){const e=null==this.backgroundOpacity?this.backgroundColor?1:.3:parseFloat(this.backgroundOpacity);return{opacity:e,[this.isReversed?"right":"left"]:(0,h.Dg)(this.normalizedValue,"%"),width:(0,h.Dg)(Math.max(0,this.normalizedBuffer-this.normalizedValue),"%")}},classes(){return{"v-progress-linear--absolute":this.absolute,"v-progress-linear--fixed":this.fixed,"v-progress-linear--query":this.query,"v-progress-linear--reactive":this.reactive,"v-progress-linear--reverse":this.isReversed,"v-progress-linear--rounded":this.rounded,"v-progress-linear--striped":this.striped,"v-progress-linear--visible":this.isVisible,...this.themeClasses}},computedTransition(){return this.indeterminate?i.mM:i.vt},isReversed(){return this.$vuetify.rtl!==this.reverse},normalizedBuffer(){return this.normalize(this.bufferValue)},normalizedValue(){return this.normalize(this.internalLazyValue)},reactive(){return Boolean(this.$listeners.change)},styles(){const e={};return this.active||(e.height=0),this.indeterminate||100===parseFloat(this.normalizedBuffer)||(e.width=(0,h.Dg)(this.normalizedBuffer,"%")),e}},methods:{genContent(){const e=(0,h.$c)(this,"default",{value:this.internalLazyValue});return e?this.$createElement("div",{staticClass:"v-progress-linear__content"},e):null},genListeners(){const e=this.$listeners;return this.reactive&&(e.click=this.onClick),e},genProgressBar(e){return this.$createElement("div",this.setBackgroundColor(this.color,{staticClass:"v-progress-linear__indeterminate",class:{[e]:!0}}))},onClick(e){if(!this.reactive)return;const{width:t}=this.$el.getBoundingClientRect();this.internalValue=e.offsetX/t*100},onObserve(e,t,s){this.isVisible=s},normalize(e){return e<0?0:e>100?100:parseFloat(e)}},render(e){const t={staticClass:"v-progress-linear",attrs:{role:"progressbar","aria-valuemin":0,"aria-valuemax":this.normalizedBuffer,"aria-valuenow":this.indeterminate?void 0:this.normalizedValue},class:this.classes,directives:[{name:"intersect",value:this.onObserve}],style:{bottom:this.bottom?0:void 0,height:this.active?(0,h.Dg)(this.height):0,top:this.top?0:void 0},on:this.genListeners()};return e("div",t,[this.__cachedStream,this.__cachedBackground,this.__cachedBuffer,this.__cachedBar,this.genContent()])}}),g=p,m=r.Ay.extend().extend({name:"loadable",props:{loading:{type:[Boolean,String],default:!1},loaderHeight:{type:[Number,String],default:2}},methods:{genProgress(){return!1===this.loading?null:(0,h.$c)(this,"progress")||this.$createElement(g,{props:{absolute:!0,color:!0===this.loading||""===this.loading?this.color||"primary":this.loading,height:this.loaderHeight,indeterminate:!0}})}}})},56001:function(){}}]);
//# sourceMappingURL=216.10ee0ae7.js.map