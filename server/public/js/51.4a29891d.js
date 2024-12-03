"use strict";(self["webpackChunkclient"]=self["webpackChunkclient"]||[]).push([[51],{2415:function(t,e,s){s.r(e),s.d(e,{default:function(){return T}});var a=s(3740),i=s(3698),n=s(2938),r=s(3180),o=s(4414),c=s(3449),l=s(3064),u=s(6930),h=s(2756),m=s(5834),d=s(7150),p=s(1034),v=s(7112),f=function(){var t=this,e=t._self._c;return e(c.A,{attrs:{fluid:""}},[e(i.A,{staticClass:"my-4",attrs:{elevation:"2"}},[e(n.ri,{staticClass:"d-flex align-center py-4"},[e(u.A,{staticClass:"mr-3",attrs:{large:"",color:"primary"}},[t._v("mdi-teach")]),e("span",{staticClass:"text-h5"},[t._v("Teacher Report")]),e(p.A),e(a.A,{staticClass:"px-5 rounded mr-4",attrs:{color:"success"},on:{click:t.generateReport}},[e(u.A,{attrs:{left:""}},[t._v("mdi-file-download")]),t._v(" Generate Report ")],1)],1),e(n.OQ,[e(h.A,[e(o.A,{attrs:{cols:"12",md:"4"}},[e(m.A,{attrs:{items:t.departments,"item-text":"name","item-value":"_id",label:"Filter by Department",outlined:"",dense:"",clearable:"","prepend-inner-icon":"mdi-domain"},model:{value:t.filters.department,callback:function(e){t.$set(t.filters,"department",e)},expression:"filters.department"}})],1),e(o.A,{attrs:{cols:"12",md:"4"}},[e(m.A,{attrs:{items:t.statusOptions,label:"Employment Status",outlined:"",dense:"",clearable:"","prepend-inner-icon":"mdi-account-check"},model:{value:t.filters.isActive,callback:function(e){t.$set(t.filters,"isActive",e)},expression:"filters.isActive"}})],1),e(o.A,{attrs:{cols:"12",md:"4"}},[e(v.A,{attrs:{"prepend-inner-icon":"mdi-magnify",label:"Search teachers...","single-line":"","hide-details":"",outlined:"",dense:""},on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.handleSearch.apply(null,arguments)}},model:{value:t.options.search,callback:function(e){t.$set(t.options,"search",e)},expression:"options.search"}})],1)],1)],1),e(l.A,{staticClass:"elevation-1",attrs:{headers:t.headers,items:t.filteredTeachers,loading:t.loading,options:t.options,"server-items-length":t.totalTeachers,"footer-props":{"items-per-page-options":[5,10,25,50],showFirstLastPage:!0}},on:{"update:options":function(e){t.options=e}},scopedSlots:t._u([{key:"item.user.fullName",fn:function({item:e}){return[t._v(" "+t._s(`${e.user.lastName}, ${e.user.firstName} ${e.user.middleName||""}`)+" ")]}},{key:"item.department",fn:function({item:e}){return[t._v(" "+t._s(e.department.name)+" ")]}},{key:"item.subjects",fn:function({item:s}){return t._l(s.subjects,(function(s){return e(r.A,{key:s._id,staticClass:"mr-1 my-1",attrs:{small:"",color:"#f4a460",dark:""}},[t._v(" "+t._s(s.subjectName)+" ")])}))}},{key:"item.employmentDate",fn:function({item:e}){return[t._v(" "+t._s(t.formatDate(e.employmentDate))+" ")]}},{key:"item.user.isActive",fn:function({item:s}){return[e(r.A,{attrs:{color:s.user.isActive?"success":"grey",small:"","text-color":"white"}},[t._v(" "+t._s(s.user.isActive?"Active":"Inactive")+" ")])]}}])})],1),e(d.A,{attrs:{color:t.snackbarColor,timeout:3e3,top:""},scopedSlots:t._u([{key:"action",fn:function({attrs:s}){return[e(a.A,t._b({attrs:{text:""},on:{click:function(e){t.snackbar=!1}}},"v-btn",s,!1),[t._v("Close")])]}}]),model:{value:t.snackbar,callback:function(e){t.snackbar=e},expression:"snackbar"}},[t._v(" "+t._s(t.snackbarText)+" ")])],1)},g=[],k=s(5353),A={name:"TeacherReportView",data:()=>({options:{page:1,itemsPerPage:10,search:""},filters:{department:null,isActive:null},headers:[{text:"Teacher ID",value:"teacherId"},{text:"Name",value:"user.fullName"},{text:"Department",value:"department.name"},{text:"Descripttive Title",value:"subjects"},{text:"Employment Date",value:"employmentDate"},{text:"Status",value:"user.isActive"}],loading:!1,snackbar:!1,snackbarColor:"",snackbarText:"",statusOptions:[{text:"Active",value:!0},{text:"Inactive",value:!1}]}),computed:{...(0,k.aH)("teachers",["teachers","totalTeachers"]),...(0,k.aH)("departments",["departments"]),filteredTeachers(){let t=[...this.teachers];return this.filters.department&&(t=t.filter((t=>t.department._id===this.filters.department))),null!==this.filters.isActive&&(t=t.filter((t=>t.user.isActive===this.filters.isActive))),t}},methods:{...(0,k.i0)("teachers",["fetchTeachers"]),...(0,k.i0)("departments",["fetchDepartments"]),getStatusColor(t){const e={Active:"success",Inactive:"grey","On Leave":"warning"};return e[t]||"grey"},async generateReport(){this.loading=!0;try{this.showSnackbarMessage("Report generated successfully!","success")}catch(t){this.showSnackbarMessage("Failed to generate report","error")}finally{this.loading=!1}},showSnackbarMessage(t,e){this.snackbarText=t,this.snackbarColor=e,this.snackbar=!0},async handleSearch(){this.options.page=1,await this.fetchTeachers()},formatDate(t){return t?new Date(t).toLocaleDateString():""},async loadInitialData(){try{this.loading=!0,await Promise.all([this.fetchTeachers(),this.fetchDepartments()])}catch(t){this.showSnackbarMessage("Failed to load data","error")}finally{this.loading=!1}}},created(){this.loadInitialData()}},b=A,y=s(1656),_=(0,y.A)(b,f,g,!1,null,null,null),T=_.exports},7150:function(t,e,s){s.d(e,{A:function(){return h}});var a=s(8184),i=s(8743),n=s(3381),r=s(428),o=s(6763),c=s(5803),l=s(4152),u=s(6988),h=(0,c.A)(a.A,i.A,r.A,(0,o.P)(["absolute","bottom","left","right","top"])).extend({name:"v-snackbar",props:{app:Boolean,centered:Boolean,contentClass:{type:String,default:""},multiLine:Boolean,text:Boolean,timeout:{type:[Number,String],default:5e3},transition:{type:[Boolean,String],default:"v-snack-transition",validator:t=>"string"===typeof t||!1===t},vertical:Boolean},data:()=>({activeTimeout:-1}),computed:{classes(){return{"v-snack--absolute":this.absolute,"v-snack--active":this.isActive,"v-snack--bottom":this.bottom||!this.top,"v-snack--centered":this.centered,"v-snack--has-background":this.hasBackground,"v-snack--left":this.left,"v-snack--multi-line":this.multiLine&&!this.vertical,"v-snack--right":this.right,"v-snack--text":this.text,"v-snack--top":this.top,"v-snack--vertical":this.vertical}},hasBackground(){return!this.text&&!this.outlined},isDark(){return this.hasBackground?!this.light:n.A.options.computed.isDark.call(this)},styles(){if(this.absolute||!this.app)return{};const{bar:t,bottom:e,footer:s,insetFooter:a,left:i,right:n,top:r}=this.$vuetify.application;return{paddingBottom:(0,l.Dg)(e+s+a),paddingLeft:(0,l.Dg)(i),paddingRight:(0,l.Dg)(n),paddingTop:(0,l.Dg)(t+r)}}},watch:{isActive:"setTimeout",timeout:"setTimeout"},mounted(){this.isActive&&this.setTimeout()},created(){this.$attrs.hasOwnProperty("auto-height")&&(0,u.rq)("auto-height",this),0==this.timeout&&(0,u.CI)('timeout="0"',"-1",this)},methods:{genActions(){return this.$createElement("div",{staticClass:"v-snack__action "},[(0,l.$c)(this,"action",{attrs:{class:"v-snack__btn"}})])},genContent(){return this.$createElement("div",{staticClass:"v-snack__content",class:{[this.contentClass]:!0},attrs:{role:"status","aria-live":"polite"}},[(0,l.$c)(this)])},genWrapper(){const t=this.hasBackground?this.setBackgroundColor:this.setTextColor,e=t(this.color,{staticClass:"v-snack__wrapper",class:a.A.options.computed.classes.call(this),style:a.A.options.computed.styles.call(this),directives:[{name:"show",value:this.isActive}],on:{pointerenter:()=>window.clearTimeout(this.activeTimeout),pointerleave:this.setTimeout}});return this.$createElement("div",e,[this.genContent(),this.genActions()])},genTransition(){return this.$createElement("transition",{props:{name:this.transition}},[this.genWrapper()])},setTimeout(){window.clearTimeout(this.activeTimeout);const t=Number(this.timeout);this.isActive&&![0,-1].includes(t)&&(this.activeTimeout=window.setTimeout((()=>{this.isActive=!1}),t))}},render(t){return t("div",{staticClass:"v-snack",class:this.classes,style:this.styles},[!1!==this.transition?this.genTransition():this.genWrapper()])}})}}]);
//# sourceMappingURL=51.4a29891d.js.map