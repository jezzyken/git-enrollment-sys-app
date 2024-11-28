"use strict";(self["webpackChunkclient"]=self["webpackChunkclient"]||[]).push([[491],{9369:function(t,e,s){s.r(e),s.d(e,{default:function(){return pt}});var r=s(4112),i=s(3740),n=s(3698),o=s(2938),a=s(6092),l=s(3180),c=s(569),d=s(5961),m=s(48),u=s(5054),h=s(5168),p=s(2699),f=s(5803),v=s(4152);function A(t){const e=.501,s=Math.abs(t);return Math.sign(t)*(s/((1/e-2)*(1-s)+1))}function _(t,e,s,r){const i=t.clientWidth,n=s?e.content-t.offsetLeft-i:t.offsetLeft;s&&(r=-r);const o=e.wrapper+r,a=i+n,l=.4*i;return n<=r?r=Math.max(n-l,0):o<=a&&(r=Math.min(r-(o-a-l),e.content-e.wrapper)),s?-r:r}function b(t,e,s){const{offsetLeft:r,clientWidth:i}=t;if(s){const t=e.content-r-i/2-e.wrapper/2;return-Math.min(e.content-e.wrapper,Math.max(0,t))}{const t=r+i/2-e.wrapper/2;return Math.min(e.content-e.wrapper,Math.max(0,t))}}const g=(0,f.A)(m.C,u.A).extend({name:"base-slide-group",directives:{Resize:h.A,Touch:p.A},props:{activeClass:{type:String,default:"v-slide-item--active"},centerActive:Boolean,nextIcon:{type:String,default:"$next"},prevIcon:{type:String,default:"$prev"},showArrows:{type:[Boolean,String],validator:t=>"boolean"===typeof t||["always","never","desktop","mobile"].includes(t)}},data:()=>({isOverflowing:!1,resizeTimeout:0,startX:0,isSwipingHorizontal:!1,isSwiping:!1,scrollOffset:0,widths:{content:0,wrapper:0}}),computed:{canTouch(){return"undefined"!==typeof window},__cachedNext(){return this.genTransition("next")},__cachedPrev(){return this.genTransition("prev")},classes(){return{...m.C.options.computed.classes.call(this),"v-slide-group":!0,"v-slide-group--has-affixes":this.hasAffixes,"v-slide-group--is-overflowing":this.isOverflowing}},hasAffixes(){switch(this.showArrows){case"always":return!0;case"desktop":return!this.isMobile;case!0:return this.isOverflowing||Math.abs(this.scrollOffset)>0;case"mobile":return this.isMobile||this.isOverflowing||Math.abs(this.scrollOffset)>0;case"never":return!1;default:return!this.isMobile&&(this.isOverflowing||Math.abs(this.scrollOffset)>0)}},hasNext(){if(!this.hasAffixes)return!1;const{content:t,wrapper:e}=this.widths;return t>Math.abs(this.scrollOffset)+e},hasPrev(){return this.hasAffixes&&0!==this.scrollOffset}},watch:{internalValue:"setWidths",isOverflowing:"setWidths",scrollOffset(t){this.$vuetify.rtl&&(t=-t);let e=t<=0?A(-t):t>this.widths.content-this.widths.wrapper?-(this.widths.content-this.widths.wrapper)+A(this.widths.content-this.widths.wrapper-t):-t;this.$vuetify.rtl&&(e=-e),this.$refs.content.style.transform=`translateX(${e}px)`}},mounted(){if("undefined"!==typeof ResizeObserver){const t=new ResizeObserver((()=>{this.onResize()}));t.observe(this.$el),t.observe(this.$refs.content),this.$on("hook:destroyed",(()=>{t.disconnect()}))}else{let t=0;this.$on("hook:beforeUpdate",(()=>{var e;t=((null===(e=this.$refs.content)||void 0===e?void 0:e.children)||[]).length})),this.$on("hook:updated",(()=>{var e;t!==((null===(e=this.$refs.content)||void 0===e?void 0:e.children)||[]).length&&this.setWidths()}))}},methods:{onScroll(){this.$refs.wrapper.scrollLeft=0},onFocusin(t){if(this.isOverflowing)for(const e of(0,v.K9)(t))for(const t of this.items)if(t.$el===e)return void(this.scrollOffset=_(t.$el,this.widths,this.$vuetify.rtl,this.scrollOffset))},genNext(){const t=this.$scopedSlots.next?this.$scopedSlots.next({}):(0,v.$c)(this,"next")||this.__cachedNext;return this.$createElement("div",{staticClass:"v-slide-group__next",class:{"v-slide-group__next--disabled":!this.hasNext},on:{click:()=>this.onAffixClick("next")},key:"next"},[t])},genContent(){return this.$createElement("div",{staticClass:"v-slide-group__content",ref:"content",on:{focusin:this.onFocusin}},(0,v.$c)(this))},genData(){return{class:this.classes,directives:[{name:"resize",value:this.onResize}]}},genIcon(t){let e=t;this.$vuetify.rtl&&"prev"===t?e="next":this.$vuetify.rtl&&"next"===t&&(e="prev");const s=`${t[0].toUpperCase()}${t.slice(1)}`,r=this[`has${s}`];return this.showArrows||r?this.$createElement(c.A,{props:{disabled:!r}},this[`${e}Icon`]):null},genPrev(){const t=this.$scopedSlots.prev?this.$scopedSlots.prev({}):(0,v.$c)(this,"prev")||this.__cachedPrev;return this.$createElement("div",{staticClass:"v-slide-group__prev",class:{"v-slide-group__prev--disabled":!this.hasPrev},on:{click:()=>this.onAffixClick("prev")},key:"prev"},[t])},genTransition(t){return this.$createElement(d.mM,[this.genIcon(t)])},genWrapper(){return this.$createElement("div",{staticClass:"v-slide-group__wrapper",directives:[{name:"touch",value:{start:t=>this.overflowCheck(t,this.onTouchStart),move:t=>this.overflowCheck(t,this.onTouchMove),end:t=>this.overflowCheck(t,this.onTouchEnd)}}],ref:"wrapper",on:{scroll:this.onScroll}},[this.genContent()])},calculateNewOffset(t,e,s,r){const i=s?-1:1,n=i*r+("prev"===t?-1:1)*e.wrapper;return i*Math.max(Math.min(n,e.content-e.wrapper),0)},onAffixClick(t){this.$emit(`click:${t}`),this.scrollTo(t)},onResize(){this._isDestroyed||this.setWidths()},onTouchStart(t){const{content:e}=this.$refs;this.startX=this.scrollOffset+t.touchstartX,e.style.setProperty("transition","none"),e.style.setProperty("willChange","transform")},onTouchMove(t){if(this.canTouch){if(!this.isSwiping){const e=t.touchmoveX-t.touchstartX,s=t.touchmoveY-t.touchstartY;this.isSwipingHorizontal=Math.abs(e)>Math.abs(s),this.isSwiping=!0}this.isSwipingHorizontal&&(this.scrollOffset=this.startX-t.touchmoveX,document.documentElement.style.overflowY="hidden")}},onTouchEnd(){if(!this.canTouch)return;const{content:t,wrapper:e}=this.$refs,s=t.clientWidth-e.clientWidth;t.style.setProperty("transition",null),t.style.setProperty("willChange",null),this.$vuetify.rtl?this.scrollOffset>0||!this.isOverflowing?this.scrollOffset=0:this.scrollOffset<=-s&&(this.scrollOffset=-s):this.scrollOffset<0||!this.isOverflowing?this.scrollOffset=0:this.scrollOffset>=s&&(this.scrollOffset=s),this.isSwiping=!1,document.documentElement.style.removeProperty("overflow-y")},overflowCheck(t,e){t.stopPropagation(),this.isOverflowing&&e(t)},scrollIntoView(){if(!this.selectedItem&&this.items.length){const t=this.items[this.items.length-1].$el.getBoundingClientRect(),e=this.$refs.wrapper.getBoundingClientRect();(this.$vuetify.rtl&&e.right<t.right||!this.$vuetify.rtl&&e.left>t.left)&&this.scrollTo("prev")}this.selectedItem&&(0===this.selectedIndex||!this.centerActive&&!this.isOverflowing?this.scrollOffset=0:this.centerActive?this.scrollOffset=b(this.selectedItem.$el,this.widths,this.$vuetify.rtl):this.isOverflowing&&(this.scrollOffset=_(this.selectedItem.$el,this.widths,this.$vuetify.rtl,this.scrollOffset)))},scrollTo(t){this.scrollOffset=this.calculateNewOffset(t,{content:this.$refs.content?this.$refs.content.clientWidth:0,wrapper:this.$refs.wrapper?this.$refs.wrapper.clientWidth:0},this.$vuetify.rtl,this.scrollOffset)},setWidths(){window.requestAnimationFrame((()=>{if(this._isDestroyed)return;const{content:t,wrapper:e}=this.$refs;this.widths={content:t?t.clientWidth:0,wrapper:e?e.clientWidth:0},this.isOverflowing=this.widths.wrapper+1<this.widths.content,this.scrollIntoView()}))}},render(t){return t("div",this.genData(),[this.genPrev(),this.genWrapper(),this.genNext()])}});g.extend({name:"v-slide-group",provide(){return{slideGroup:this}}});var S=s(8743),y=(0,f.A)(g,S.A).extend({name:"v-chip-group",provide(){return{chipGroup:this}},props:{column:Boolean},computed:{classes(){return{...g.options.computed.classes.call(this),"v-chip-group":!0,"v-chip-group--column":this.column}}},watch:{column(t){t&&(this.scrollOffset=0),this.$nextTick(this.onResize)}},methods:{genData(){return this.setTextColor(this.color,{...g.options.methods.genData.call(this)})}}}),w=s(4414),C=s(3449),x=s(3064),F=s(1446),$=s(9483),k=s(174),O=s(6930),I=s(8983),j=s(7296),T=s(2659),E=s(8924),N=s(6237),D=s(8907),M=s(1554),L=s(6355),q=s(6993),B=s(7717),R=s(7515),P=s(7018),Y=s(3381),G=s(8944),z=s(8041);const W=(0,f.A)(B.A,S.A,P.A,(0,R.P)("radioGroup"),Y.A);var U=W.extend().extend({name:"v-radio",inheritAttrs:!1,props:{disabled:{type:Boolean,default:null},id:String,label:String,name:String,offIcon:{type:String,default:"$radioOff"},onIcon:{type:String,default:"$radioOn"},readonly:{type:Boolean,default:null},value:{default:null}},data:()=>({isFocused:!1}),computed:{classes(){return{"v-radio--is-disabled":this.isDisabled,"v-radio--is-focused":this.isFocused,...this.themeClasses,...this.groupClasses}},computedColor(){if(!this.isDisabled)return G.A.options.computed.computedColor.call(this)},computedIcon(){return this.isActive?this.onIcon:this.offIcon},computedId(){return q.A.options.computed.computedId.call(this)},hasLabel:q.A.options.computed.hasLabel,hasState(){return(this.radioGroup||{}).hasState},isDisabled(){var t;return null!==(t=this.disabled)&&void 0!==t?t:!!this.radioGroup&&this.radioGroup.isDisabled},isReadonly(){var t;return null!==(t=this.readonly)&&void 0!==t?t:!!this.radioGroup&&this.radioGroup.isReadonly},computedName(){return this.name||!this.radioGroup?this.name:this.radioGroup.name||`radio-${this.radioGroup._uid}`},rippleState(){return G.A.options.computed.rippleState.call(this)},validationState(){return(this.radioGroup||{}).validationState||this.computedColor}},methods:{genInput(t){return G.A.options.methods.genInput.call(this,"radio",t)},genLabel(){return this.hasLabel?this.$createElement(L.A,{on:{click:G.F},attrs:{for:this.computedId},props:{color:this.validationState,focused:this.hasState}},(0,v.$c)(this,"label")||this.label):null},genRadio(){const{title:t,...e}=this.attrs$;return this.$createElement("div",{staticClass:"v-input--selection-controls__input"},[this.$createElement(c.A,this.setTextColor(this.validationState,{props:{dense:this.radioGroup&&this.radioGroup.dense}}),this.computedIcon),this.genInput({name:this.computedName,value:this.value,...e}),this.genRipple(this.setTextColor(this.rippleState))])},onFocus(t){this.isFocused=!0,this.$emit("focus",t)},onBlur(t){this.isFocused=!1,this.$emit("blur",t)},onChange(){this.isDisabled||this.isReadonly||this.isActive||this.toggle()},onKeydown:()=>{}},render(t){const e={staticClass:"v-radio",class:this.classes,on:(0,z.wf)({click:this.onChange},this.listeners$),attrs:{title:this.attrs$.title}};return t("div",e,[this.genRadio(),this.genLabel()])}});s(5601);const H=(0,f.A)(m.C,q.A);var Z=H.extend({name:"v-radio-group",provide(){return{radioGroup:this}},props:{column:{type:Boolean,default:!0},height:{type:[Number,String],default:"auto"},name:String,row:Boolean,value:null},computed:{classes(){return{...q.A.options.computed.classes.call(this),"v-input--selection-controls v-input--radio-group":!0,"v-input--radio-group--column":this.column&&!this.row,"v-input--radio-group--row":this.row}}},methods:{genDefaultSlot(){return this.$createElement("div",{staticClass:"v-input--radio-group__input",attrs:{id:this.id,role:"radiogroup","aria-labelledby":this.computedId}},q.A.options.methods.genDefaultSlot.call(this))},genInputSlot(){const t=q.A.options.methods.genInputSlot.call(this);return delete t.data.on.click,t},genLabel(){const t=q.A.options.methods.genLabel.call(this);return t?(t.data.attrs.id=this.computedId,delete t.data.attrs.for,t.tag="legend",t):null},onClick:m.C.options.methods.onClick},render(t){const e=q.A.options.render.call(this,t);return this._b(e.data,"div",this.attrs$),e}}),X=s(2756),Q=s(4312),V=s(7150),K=s(1034),J=s(7732),tt=s(7917),et=s(233),st=s(8124),rt=s(7112),it=s(7270),nt=function(){var t=this,e=t._self._c;return e(C.A,{staticClass:"pa-6",attrs:{fluid:""}},[e(D.A,{attrs:{value:t.loading}},[e(M.A,{attrs:{indeterminate:"",size:"64"}})],1),e(k.A,{ref:"form",attrs:{"lazy-validation":""}},[e(J.A,{staticClass:"mb-6 elevation-1",model:{value:t.currentStep,callback:function(e){t.currentStep=e},expression:"currentStep"}},[e(et.vY,[e(st.A,{attrs:{complete:t.currentStep>1,step:"1"}},[t._v(" Student Type "),e("small",[t._v("New or Existing Student")])]),e($.A),e(st.A,{attrs:{complete:t.currentStep>2,step:"2"}},[t._v(" Student Details "),e("small",[t._v("Basic Information")])]),e($.A),e(st.A,{attrs:{complete:t.currentStep>3,step:"3"}},[t._v(" Enrollment Details "),e("small",[t._v("Academic Information")])]),e($.A),e(st.A,{attrs:{step:"4"}},[t._v(" Review "),e("small",[t._v("Verify Details")])])],1),e(et.WV,[e(tt.A,{attrs:{step:"1"}},[e(n.A,{staticClass:"mb-6"},[e(o.ri,{staticClass:"headline primary white--text pa-2"},[t._v(" Select Student Type ")]),e(o.OQ,{staticClass:"pa-6"},[e(Z,{attrs:{mandatory:""},model:{value:t.enrollmentForm.enrollmentType,callback:function(e){t.$set(t.enrollmentForm,"enrollmentType",e)},expression:"enrollmentForm.enrollmentType"}},[e(U,{attrs:{label:"New Student",value:"new"}}),e(U,{attrs:{label:"Existing Student",value:"old"}})],1),e(d.Qo,["old"===t.enrollmentForm.enrollmentType?e("div",[e(n.A,[e("div",{staticClass:"d-flex justify-end pa-4"},[e(rt.A,{staticClass:"search-field",staticStyle:{"max-width":"400px"},attrs:{"prepend-inner-icon":"mdi-magnify",placeholder:"Search students...","hide-details":"","single-line":"",filled:"",rounded:"",dense:""},on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.handleSearch.apply(null,arguments)}},model:{value:t.search,callback:function(e){t.search=e},expression:"search"}})],1),e(x.A,{attrs:{headers:t.studentHeaders,items:t.students,search:t.search,loading:t.loading,"single-select":"","show-select":""},on:{"item-selected":t.handleStudentSelect},scopedSlots:t._u([{key:"item.name",fn:function({item:s}){return[e("div",{staticClass:"d-flex align-center py-2"},[e(r.A,{staticClass:"mr-3",attrs:{color:"primary lighten-4",size:"40"}},[e("span",{staticClass:"primary--text font-weight-medium"},[t._v(" "+t._s(s.name.firstName[0])+t._s(s.name.surname[0])+" ")])]),e("div",{staticClass:"font-weight-medium"},[t._v(" "+t._s(s.name.surname)+", "+t._s(s.name.firstName)+" "+t._s(s.name.middleName?s.name.middleName[0]+".":"")+" "+t._s(s.name.nameExtension||"")+" ")])],1)]}},{key:"item.course",fn:function({item:s}){return[e(l.A,{attrs:{small:"",outlined:"",color:"primary"}},[t._v(" "+t._s(s.course.courseCode)+" ")])]}}],null,!1,192207247)})],1)],1):t._e()])],1)],1)],1),e(tt.A,{attrs:{step:"2"}},["new"===t.enrollmentForm.enrollmentType?e(n.A,{staticClass:"mb-6"},[e(o.ri,{staticClass:"headline primary white--text pa-2"},[t._v(" Student Information ")]),e(o.OQ,{staticClass:"pa-6"},[e(X.A,[e(w.A,{attrs:{cols:"12",md:"3"}},[e(rt.A,{attrs:{label:"Surname*",outlined:"",dense:"",required:""},model:{value:t.studentForm.name.surname,callback:function(e){t.$set(t.studentForm.name,"surname",e)},expression:"studentForm.name.surname"}})],1),e(w.A,{attrs:{cols:"12",md:"3"}},[e(rt.A,{attrs:{label:"First Name*",outlined:"",dense:"",required:""},model:{value:t.studentForm.name.firstName,callback:function(e){t.$set(t.studentForm.name,"firstName",e)},expression:"studentForm.name.firstName"}})],1),e(w.A,{attrs:{cols:"12",md:"3"}},[e(rt.A,{attrs:{label:"Middle Name",outlined:"",dense:"",hint:"Optional","persistent-hint":""},model:{value:t.studentForm.name.middleName,callback:function(e){t.$set(t.studentForm.name,"middleName",e)},expression:"studentForm.name.middleName"}})],1),e(w.A,{attrs:{cols:"12",md:"3"}},[e(rt.A,{attrs:{label:"Name Extension",outlined:"",dense:"",hint:"E.g., Jr., Sr., III","persistent-hint":""},model:{value:t.studentForm.name.nameExtension,callback:function(e){t.$set(t.studentForm.name,"nameExtension",e)},expression:"studentForm.name.nameExtension"}})],1)],1),e(X.A,[e(w.A,{attrs:{cols:"12",md:"3"}},[e(Q.A,{attrs:{items:["Male","Female"],label:"Gender",outlined:"",dense:""},model:{value:t.studentForm.personalInfo.gender,callback:function(e){t.$set(t.studentForm.personalInfo,"gender",e)},expression:"studentForm.personalInfo.gender"}})],1),e(w.A,{attrs:{cols:"12",md:"3"}},[e(N.A,{attrs:{"close-on-content-click":!1,transition:"scale-transition","offset-y":"","min-width":"auto"},scopedSlots:t._u([{key:"activator",fn:function({on:s,attrs:r}){return[e(rt.A,t._g(t._b({attrs:{label:"Date of Birth",readonly:"",outlined:"",dense:"","prepend-inner-icon":"mdi-calendar"},model:{value:t.formattedDateOfBirth,callback:function(e){t.formattedDateOfBirth=e},expression:"formattedDateOfBirth"}},"v-text-field",r,!1),s))]}}],null,!1,330019118),model:{value:t.dateMenu,callback:function(e){t.dateMenu=e},expression:"dateMenu"}},[e(F.A,{on:{input:function(e){t.dateMenu=!1}},model:{value:t.studentForm.dateOfBirth,callback:function(e){t.$set(t.studentForm,"dateOfBirth",e)},expression:"studentForm.dateOfBirth"}})],1)],1),e(w.A,{attrs:{cols:"6"}},[e(rt.A,{attrs:{label:"Home Address",outlined:"",dense:"",placeholder:"Enter complete address","prepend-inner-icon":"mdi-map-marker"},model:{value:t.studentForm.homeAddress,callback:function(e){t.$set(t.studentForm,"homeAddress",e)},expression:"studentForm.homeAddress"}})],1)],1)],1)],1):t._e(),e(n.A,{staticClass:"mb-6"},[e(o.ri,{staticClass:"headline primary white--text pa-2"},[t._v(" Required Documents "),e(K.A),e(it.A,{attrs:{bottom:""},scopedSlots:t._u([{key:"activator",fn:function({on:s,attrs:r}){return[e(O.A,t._g(t._b({attrs:{color:"white"}},"v-icon",r,!1),s),[t._v(" mdi-information ")])]}}])},[e("span",[t._v("Please check documents that have been submitted")])])],1),e(o.OQ,{staticClass:"pa-6"},[e(X.A,[e(w.A,{attrs:{cols:"12",md:"6"}},[e(I.A,[e(j.A,[e(T.A,[e(a.A,{attrs:{color:"primary"},model:{value:t.enrollmentForm.requirements.form137,callback:function(e){t.$set(t.enrollmentForm.requirements,"form137",e)},expression:"enrollmentForm.requirements.form137"}})],1),e(E.pr,[e(E.UZ,[t._v("Form 137")]),e(E.w,[t._v(" Academic records from previous school ")])],1)],1),e(j.A,[e(T.A,[e(a.A,{attrs:{color:"primary"},model:{value:t.enrollmentForm.requirements.goodMoral,callback:function(e){t.$set(t.enrollmentForm.requirements,"goodMoral",e)},expression:"enrollmentForm.requirements.goodMoral"}})],1),e(E.pr,[e(E.UZ,[t._v("Good Moral Certificate")]),e(E.w,[t._v(" Character certification from previous school ")])],1)],1),e(j.A,[e(T.A,[e(a.A,{attrs:{color:"primary"},model:{value:t.enrollmentForm.requirements.birthCertificate,callback:function(e){t.$set(t.enrollmentForm.requirements,"birthCertificate",e)},expression:"\n                            enrollmentForm.requirements.birthCertificate\n                          "}})],1),e(E.pr,[e(E.UZ,[t._v("Birth Certificate")]),e(E.w,[t._v(" PSA/NSO authenticated copy ")])],1)],1)],1)],1),e(w.A,{attrs:{cols:"12",md:"6"}},[e(I.A,[e(j.A,[e(T.A,[e(a.A,{attrs:{color:"primary"},model:{value:t.enrollmentForm.requirements.pictures,callback:function(e){t.$set(t.enrollmentForm.requirements,"pictures",e)},expression:"enrollmentForm.requirements.pictures"}})],1),e(E.pr,[e(E.UZ,[t._v("2x2 Pictures")]),e(E.w,[t._v(" Recent ID photos (white background) ")])],1)],1),e(j.A,[e(T.A,[e(a.A,{attrs:{color:"primary"},model:{value:t.enrollmentForm.requirements.transcriptOfRecords,callback:function(e){t.$set(t.enrollmentForm.requirements,"transcriptOfRecords",e)},expression:"\n                            enrollmentForm.requirements.transcriptOfRecords\n                          "}})],1),e(E.pr,[e(E.UZ,[t._v("Transcript of Records")]),e(E.w,[t._v(" For transferee students only ")])],1)],1)],1)],1)],1)],1)],1)],1),e(tt.A,{attrs:{step:"3"}},[e(n.A,{staticClass:"mb-6"},[e(o.ri,{staticClass:"headline primary white--text pa-2"},[t._v(" Enrollment Information ")]),e(o.OQ,{staticClass:"pa-6"},[e(X.A,[e(w.A,{attrs:{cols:"12",md:"6"}},[e(Q.A,{attrs:{items:t.academicYears,label:"Academic Year*",outlined:"",dense:"",required:""},model:{value:t.enrollmentForm.academicYear,callback:function(e){t.$set(t.enrollmentForm,"academicYear",e)},expression:"enrollmentForm.academicYear"}})],1),e(w.A,{attrs:{cols:"12",md:"6"}},[e(Q.A,{attrs:{items:["First","Second"],label:"Semester*",outlined:"",dense:"",required:""},model:{value:t.enrollmentForm.semester,callback:function(e){t.$set(t.enrollmentForm,"semester",e)},expression:"enrollmentForm.semester"}})],1),e(w.A,{attrs:{cols:"12",md:"6"}},[e(Q.A,{attrs:{items:[1,2,3,4],label:"Year Level*",outlined:"",dense:"",required:""},model:{value:t.enrollmentForm.yearLevel,callback:function(e){t.$set(t.enrollmentForm,"yearLevel",e)},expression:"enrollmentForm.yearLevel"}})],1),e(w.A,{attrs:{cols:"12",md:"6"}},[e(Q.A,{attrs:{items:t.courses,"item-text":"courseName","item-value":"_id",label:"Course*",outlined:"",dense:"","prepend-inner-icon":"mdi-school",required:""},model:{value:t.enrollmentForm.course,callback:function(e){t.$set(t.enrollmentForm,"course",e)},expression:"enrollmentForm.course"}})],1),e(w.A,{attrs:{cols:"12"}},[e(Q.A,{attrs:{items:t.formattedSubjects,loading:t.loading,"item-text":"displayName","item-value":"_id",label:"Select Subject*",outlined:"",dense:""},on:{change:t.addSubject},scopedSlots:t._u([{key:"selection",fn:function({item:s}){return[e("span",[t._v(t._s(s.subject.DescriptiveTitle)+" - "+t._s(s.section)+" - "+t._s(t.formatSchedule(s.schedule)))])]}},{key:"item",fn:function({item:s}){return[e(E.pr,[e(E.UZ,{staticClass:"font-weight-bold"},[t._v(" "+t._s(s.subject.DescriptiveTitle)+" ")]),e(E.w,[e(l.A,{staticClass:"mr-2",attrs:{"x-small":""}},[t._v("Section "+t._s(s.section))]),e(l.A,{attrs:{"x-small":""}},[t._v("Units: "+t._s(s.subject.Units))])],1),e("div",{staticClass:"mt-2"},[e(l.A,{attrs:{small:"",outlined:""}},[t._v(" "+t._s(t.formatSchedule(s.schedule))+" ")])],1)],1)]}}]),model:{value:t.enrollmentForm.subject,callback:function(e){t.$set(t.enrollmentForm,"subject",e)},expression:"enrollmentForm.subject"}}),t.selectedSubjects.length?e(n.A,{staticClass:"mt-3",attrs:{outlined:""}},[e(o.ri,{staticClass:"py-2 px-4 subtitle-1 grey lighten-4"},[e(O.A,{attrs:{left:"",small:"",color:"primary"}},[t._v("mdi-clipboard-list")]),t._v(" Selected Subjects "),e(K.A),e(l.A,{attrs:{small:""}},[t._v(t._s(t.selectedSubjects.length)+" subject(s)")])],1),e(I.A,{attrs:{dense:""}},t._l(t.selectedSubjects,(function(s){return e(j.A,{key:s._id},[e(E.pr,[e(E.UZ,[t._v(" "+t._s(s.subject.DescriptiveTitle)+" "),e(l.A,{staticClass:"ml-2",attrs:{"x-small":"",color:"primary"}},[t._v(t._s(s.subject.catNo))])],1),e(E.w,[t._v(" Section: "+t._s(s.section)+" | Room: "+t._s(s.schedule[0].room)+" | "+t._s(t.formatSchedule(s.schedule))+" ")])],1),e(T.A,[e(i.A,{attrs:{icon:"",small:""},on:{click:function(e){return t.removeSubject(s)}}},[e(O.A,{attrs:{small:"",color:"error"}},[t._v("mdi-delete")])],1)],1)],1)})),1)],1):t._e()],1)],1)],1)],1)],1),e(tt.A,{attrs:{step:"4"}},[e(d.vt,[e("div",{staticClass:"form-section"},[e(n.A,{staticClass:"mb-6"},[e(o.ri,{staticClass:"headline primary white--text d-flex align-center pa-2"},[t._v(" Review Enrollment Details "),e(K.A),e(i.A,{attrs:{color:"white",text:""}},[e(O.A,{attrs:{left:""}},[t._v("mdi-printer")]),t._v(" Print ")],1)],1),e(o.OQ,{staticClass:"review-content py-4"},[e("div",{staticClass:"d-flex align-center mb-6"},[e(r.A,{staticClass:"mr-6",attrs:{size:"120",color:"grey lighten-2"}},[e(O.A,{attrs:{size:"48",color:"grey darken-2"}},[t._v("mdi-account")])],1),e("div",[e("div",{staticClass:"text-h4 primary--text mb-1"},[t._v(" "+t._s("new"===t.enrollmentForm.enrollmentType?`${t.studentForm.name.surname}, ${t.studentForm.name.firstName} ${t.studentForm.name.middleName||""} ${t.studentForm.name.nameExtension||""}`:t.getStudentFullName(t.selectedStudent))+" ")]),e("div",{staticClass:"text-h6 grey--text"},[t._v(" "+t._s(t.getCourseNameById(t.enrollmentForm.course))+" ")])])],1),e("div",{staticClass:"review-section mb-6"},[e("div",{staticClass:"section-header"},[e(O.A,{staticClass:"mr-2",attrs:{color:"primary"}},[t._v("mdi-school")]),e("span",{staticClass:"text-h6"},[t._v("Enrollment Information")]),e(i.A,{staticClass:"float-right",attrs:{text:"",small:"",color:"primary"},on:{click:function(e){return t.editSection(3)}}},[e(O.A,{attrs:{left:"",small:""}},[t._v("mdi-pencil")]),t._v(" Edit ")],1)],1),e($.A,{staticClass:"my-3"}),e(X.A,{attrs:{dense:""}},[e(w.A,{attrs:{cols:"12",sm:"6",md:"4"}},[e("div",{staticClass:"info-item"},[e("div",{staticClass:"info-label"},[t._v("Academic Year")]),e("div",{staticClass:"info-value"},[t._v(" "+t._s(t.enrollmentForm.academicYear)+" ")])])]),e(w.A,{attrs:{cols:"12",sm:"6",md:"4"}},[e("div",{staticClass:"info-item"},[e("div",{staticClass:"info-label"},[t._v("Semester")]),e("div",{staticClass:"info-value"},[t._v(" "+t._s(t.enrollmentForm.semester)+" ")])])]),e(w.A,{attrs:{cols:"12",sm:"6",md:"4"}},[e("div",{staticClass:"info-item"},[e("div",{staticClass:"info-label"},[t._v("Year Level")]),e("div",{staticClass:"info-value"},[t._v(" "+t._s(t.enrollmentForm.yearLevel)+" ")])])])],1)],1),"new"===t.enrollmentForm.enrollmentType?[e("div",{staticClass:"review-section mb-6"},[e("div",{staticClass:"section-header"},[e(O.A,{staticClass:"mr-2",attrs:{color:"primary"}},[t._v("mdi-account-details")]),e("span",{staticClass:"text-h6"},[t._v("Student Information")]),e(i.A,{staticClass:"float-right",attrs:{text:"",small:"",color:"primary"},on:{click:function(e){return t.editSection(2)}}},[e(O.A,{attrs:{left:"",small:""}},[t._v("mdi-pencil")]),t._v(" Edit ")],1)],1),e($.A,{staticClass:"my-3"}),e(X.A,{attrs:{dense:""}},[e(w.A,{attrs:{cols:"12",sm:"6",md:"4"}},[e("div",{staticClass:"info-item"},[e("div",{staticClass:"info-label"},[t._v("Gender")]),e("div",{staticClass:"info-value"},[t._v(" "+t._s(t.studentForm.personalInfo.gender)+" ")])])]),e(w.A,{attrs:{cols:"12",sm:"6",md:"4"}},[e("div",{staticClass:"info-item"},[e("div",{staticClass:"info-label"},[t._v("Date of Birth")]),e("div",{staticClass:"info-value"},[t._v(" "+t._s(t.formattedDateOfBirth)+" ")])])]),e(w.A,{attrs:{cols:"12",sm:"6",md:"4"}},[e("div",{staticClass:"info-item"},[e("div",{staticClass:"info-label"},[t._v("Home Address")]),e("div",{staticClass:"info-value"},[t._v(" "+t._s(t.studentForm.homeAddress)+" ")])])])],1)],1),e("div",{staticClass:"review-section mb-6"},[e("div",{staticClass:"section-header"},[e(O.A,{staticClass:"mr-2",attrs:{color:"primary"}},[t._v("mdi-file-document")]),e("span",{staticClass:"text-h6"},[t._v("Required Documents")]),e(i.A,{staticClass:"float-right",attrs:{text:"",small:"",color:"primary"},on:{click:function(e){return t.editSection(2)}}},[e(O.A,{attrs:{left:"",small:""}},[t._v("mdi-pencil")]),t._v(" Edit ")],1)],1),e($.A,{staticClass:"my-3"}),e(y,{attrs:{column:""}},[t.enrollmentForm.requirements.form137?e(l.A,{attrs:{small:""}},[t._v("Form 137")]):t._e(),t.enrollmentForm.requirements.goodMoral?e(l.A,{attrs:{small:""}},[t._v("Good Moral")]):t._e(),t.enrollmentForm.requirements.birthCertificate?e(l.A,{attrs:{small:""}},[t._v("Birth Certificate")]):t._e(),t.enrollmentForm.requirements.pictures?e(l.A,{attrs:{small:""}},[t._v("2x2 Pictures")]):t._e(),t.enrollmentForm.requirements.transcriptOfRecords?e(l.A,{attrs:{small:""}},[t._v("Transcript")]):t._e()],1)],1)]:t._e(),e("div",{staticClass:"review-section mb-6"},[e("div",{staticClass:"section-header"},[e(O.A,{staticClass:"mr-2",attrs:{color:"primary"}},[t._v("mdi-clipboard-list")]),e("span",{staticClass:"text-h6"},[t._v("Selected Subjects")]),e(i.A,{staticClass:"float-right",attrs:{text:"",small:"",color:"primary"},on:{click:function(e){return t.editSection(3)}}},[e(O.A,{attrs:{left:"",small:""}},[t._v("mdi-pencil")]),t._v(" Edit ")],1)],1),e($.A,{staticClass:"my-3"}),e(n.A,{attrs:{outlined:""}},[e(I.A,{attrs:{dense:""}},[t._l(t.selectedSubjects,(function(s){return e(j.A,{key:s._id},[e(E.pr,[e(E.UZ,[t._v(" "+t._s(s.subject.DescriptiveTitle)+" "),e(l.A,{staticClass:"ml-2",attrs:{"x-small":"",color:"primary"}},[t._v(t._s(s.subject.catNo))]),e(l.A,{staticClass:"ml-2",attrs:{"x-small":""}},[t._v("Units: "+t._s(s.subject.Units))])],1),e(E.w,[t._v(" Section: "+t._s(s.section)+" | Room: "+t._s(s.schedule[0].room)+" | "+t._s(t.formatSchedule(s.schedule))+" ")])],1)],1)})),t.selectedSubjects.length?t._e():e(j.A,[e(E.pr,[e(E.UZ,{staticClass:"text-center grey--text"},[t._v(" No subjects selected ")])],1)],1)],2)],1)],1),e(n.A,{staticClass:"mb-6",attrs:{outlined:""}},[e(o.OQ,[e(a.A,{staticClass:"mt-0",attrs:{color:"primary"},scopedSlots:t._u([{key:"label",fn:function(){return[e("div",[t._v(" I confirm that all the information provided is accurate and complete. "),e("span",{staticClass:"red--text"},[t._v("*")])])]},proxy:!0}]),model:{value:t.confirmEnrollment,callback:function(e){t.confirmEnrollment=e},expression:"confirmEnrollment"}})],1)],1)],2)],1)],1)])],1)],1)],1),e(n.A,{staticClass:"mt-6",attrs:{flat:""}},[e(o.SL,[t.currentStep>1?e(i.A,{attrs:{text:"",color:"primary"},on:{click:t.previousStep}},[e(O.A,{attrs:{left:""}},[t._v("mdi-arrow-left")]),t._v(" Previous ")],1):t._e(),e(K.A),t.currentStep<4?e(i.A,{attrs:{color:"primary"},on:{click:t.nextStep}},[t._v(" Next "),e(O.A,{attrs:{right:""}},[t._v("mdi-arrow-right")])],1):e(i.A,{attrs:{color:"success",disabled:!t.confirmEnrollment,loading:t.loading},on:{click:t.submitEnrollment}},[t._v(" Submit "),e(O.A,{attrs:{right:""}},[t._v("mdi-check")])],1)],1)],1)],1),e(V.A,{attrs:{color:t.snackbar.color,timeout:t.snackbar.timeout},scopedSlots:t._u([{key:"action",fn:function({attrs:s}){return[e(i.A,t._b({attrs:{text:""},on:{click:function(e){t.snackbar.show=!1}}},"v-btn",s,!1),[t._v(" Close ")])]}}]),model:{value:t.snackbar.show,callback:function(e){t.$set(t.snackbar,"show",e)},expression:"snackbar.show"}},[t._v(" "+t._s(t.snackbar.text)+" ")])],1)},ot=[],at=(s(4114),s(5353)),lt=s(5093),ct=s.n(lt),dt=(s(7061),{name:"EnrollmentStepper",data:()=>({search:"",studentHeaders:[{text:"Name",value:"name",template:"item.name"},{text:"Student ID",value:"studentId"},{text:"Course",value:"course",template:"item.course"}],dateMenu:!1,currentStep:1,loading:!1,confirmEnrollment:!1,selectedStudent:null,academicYears:["2023-2024","2024-2025","2025-2026"],studentForm:{name:{surname:"",firstName:"",middleName:"",nameExtension:""},personalInfo:{gender:null},dateOfBirth:null,homeAddress:""},enrollmentForm:{enrollmentType:null,student:null,academicYear:"",semester:"",yearLevel:null,course:null,requirements:{form137:!1,goodMoral:!1,birthCertificate:!1,pictures:!1,transcriptOfRecords:!1}},availableSubjects:[],subjects:[],selectedSubjects:[],snackbar:{show:!1,text:"",color:"success",timeout:5e3}}),computed:{...(0,at.aH)("students",["students"]),...(0,at.aH)("courses",["courses"]),...(0,at.aH)("teacherLoad",["loading"]),formattedDateOfBirth(){return this.studentForm.dateOfBirth?new Date(this.studentForm.dateOfBirth).toLocaleDateString():""},formattedSubjects(){let t=[];return this.subjects.forEach((e=>{console.log(e),e.schedule.forEach((s=>{t.push({_id:`${e._id}-${s.day}-${s.timeStart}`,subject:e.subject,section:e.section,schedule:[s],teacherLoadId:e.teacherLoadId,displayName:`${e.subject.DescriptiveTitle} - Section ${e.section} - ${s.day} ${this.formatTime(s.timeStart)}`})}))})),console.log(t),t}},methods:{...(0,at.i0)("students",["fetchStudents"]),...(0,at.i0)("courses",["fetchCourses"]),...(0,at.i0)("enrollments",["enrollNewStudent","enrollContinuingStudent"]),...(0,at.i0)("teacherLoad",["updateTeacherLoadStudents"]),getStatusColor(t){const e={pending:"warning",evaluated:"info",enrolled:"success"};return e[t]||"warning"},addSubject(){const t=this.formattedSubjects.find((t=>t._id===this.enrollmentForm.subject));t&&!this.selectedSubjects.find((e=>e._id===t._id))&&this.selectedSubjects.push(t),this.enrollmentForm.subject=null},removeSubject(t){this.selectedSubjects=this.selectedSubjects.filter((e=>e._id!==t._id))},nextStep(){this.validateCurrentStep()&&(1===this.currentStep&&"old"===this.enrollmentForm.enrollmentType?this.currentStep=3:this.currentStep++)},editSection(t){this.currentStep=t},getStudentFullName(t){const e=this.students.find((e=>e._id===t));return e?e.fullName:""},getCourseNameById(t){const e=this.courses.find((e=>e._id===t));return e?e.courseName:""},previousStep(){3===this.currentStep&&"old"===this.enrollmentForm.enrollmentType?this.currentStep=1:this.currentStep--},validateCurrentStep(){return!(1===this.currentStep&&"old"===this.enrollmentForm.enrollmentType&&!this.selectedStudent)},handleStudentSelect(t){if(this.selectedStudent=t.item._id,this.selectedStudent){const t=this.students.find((t=>t._id===this.selectedStudent));t?.course&&(this.enrollmentForm.course=t.course)}},formatSchedule(t){return t.map((t=>`${t.day} ${this.formatTime(t.timeStart)}-${this.formatTime(t.timeEnd)}`)).join(", ")},formatTime(t){return ct()(t,"HH:mm").format("h:mm A")},async fetchSubjects(){this.enrollmentForm.academicYear&&this.enrollmentForm.semester&&(this.subjects=await this.$store.dispatch("teacherLoad/fetchAvailableSubjects",{academicYear:this.enrollmentForm.academicYear,semester:this.enrollmentForm.semester}),console.log({subjects:this.subjects}))},async submitEnrollment(){try{this.loading=!0;const t={academicYear:this.enrollmentForm.academicYear,semester:this.enrollmentForm.semester,yearLevel:this.enrollmentForm.yearLevel,course:this.enrollmentForm.course,enrollmentType:this.enrollmentForm.enrollmentType,enrollmentStatus:"enrolled",subjects:this.selectedSubjects.map((t=>({subject:t._id.split("-")[0],section:t.section,teacherLoad:t.teacherLoadId,status:"enrolled"})))};let e;if("new"===this.enrollmentForm.enrollmentType){const s={name:this.studentForm.name,personalInfo:this.studentForm.personalInfo,dateOfBirth:this.studentForm.dateOfBirth,homeAddress:this.studentForm.homeAddress,requirements:this.enrollmentForm.requirements,course:this.enrollmentForm.course};e=await this.enrollNewStudent({studentData:s,enrollmentData:t}),"success"===e.status&&await Promise.all(this.selectedSubjects.map((t=>this.updateTeacherLoadStudents({teacherLoadId:t.teacherLoadId,data:{subjectId:t._id.split("-")[0],studentId:e.data.student._id,action:"add"}}))))}else e=await this.enrollContinuingStudent({studentId:this.selectedStudent,enrollmentData:t}),"success"===e.status&&await Promise.all(this.selectedSubjects.map((t=>this.updateTeacherLoadStudents({teacherLoadId:t.teacherLoadId,data:{subjectId:t._id.split("-")[0],studentId:this.selectedStudent,action:"add"}}))));"success"===e.status&&this.$router.push("/enrollments")}catch(t){console.error("Error submitting enrollment:",t),this.showMessage(t.response.data.message)}finally{this.loading=!1}},showMessage(t,e="success"){this.snackbar.text=t,this.snackbar.color=e,this.snackbar.show=!0}},async created(){try{this.loading=!0,await Promise.all([this.fetchStudents(),this.fetchCourses(),this.fetchSubjects()])}catch(t){console.error("Error fetching initial data:",t)}finally{this.loading=!1}},watch:{"enrollmentForm.academicYear"(){this.fetchSubjects()},"enrollmentForm.semester"(){this.fetchSubjects()}}}),mt=dt,ut=s(1656),ht=(0,ut.A)(mt,nt,ot,!1,null,"07330a6a",null),pt=ht.exports}}]);
//# sourceMappingURL=491.d3c9a501.js.map