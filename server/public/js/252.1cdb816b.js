"use strict";(self["webpackChunkclient"]=self["webpackChunkclient"]||[]).push([[252],{971:function(e,t,s){s.r(t),s.d(t,{default:function(){return $}});var a=s(3740),o=s(3698),n=s(2938),i=s(3180),r=s(4414),l=s(3449),c=s(3064),d=s(1446),u=s(9991),m=s(174),f=s(6930),h=s(6237),p=s(2756),g=s(5834),v=s(7150),b=s(1034),y=s(7112),A=s(7270),x=function(){var e=this,t=e._self._c;return t(l.A,[t(o.A,{attrs:{elevation:"2"}},[t(n.ri,{staticClass:"d-flex align-center py-3"},[t(f.A,{staticClass:"mr-2",attrs:{large:"",color:"#d2691e"}},[e._v("mdi-account-group")]),t("span",{staticClass:"text-h5"},[e._v("User Management")]),t(b.A),t(a.A,{staticClass:"px-4",attrs:{color:"#d2691e",dark:""},on:{click:e.openCreateDialog}},[t(f.A,{attrs:{left:""}},[e._v("mdi-plus")]),e._v(" Add User ")],1)],1),t(c.A,{staticClass:"elevation-1",attrs:{headers:e.headers,items:e.users,loading:e.loading,options:e.options,"footer-props":{"items-per-page-options":[5,10,25,50],showFirstLastPage:!0}},on:{"update:options":function(t){e.options=t}},scopedSlots:e._u([{key:"item.name.firstName",fn:function({item:t}){return[e._v(" "+e._s(t.name.firstName)+" "+e._s(t.name.middleName?t.name.middleName+" ":"")+" "+e._s(t.name.surname)+" "+e._s(t.name.nameExtension?t.name.nameExtension:"")+" ")]}},{key:"item.accountStatus",fn:function({item:s}){return[t(i.A,{attrs:{color:"active"===s.accountStatus?"success":"error",small:"",label:""}},[e._v(" "+e._s(s.accountStatus)+" ")])]}},{key:"item.role",fn:function({item:s}){return e._l(s.role,(function(s){return t(i.A,{key:s._id,staticClass:"mr-1",attrs:{small:"",color:"primary"}},[e._v(" "+e._s(s.name)+" ")])}))}},{key:"item.actions",fn:function({item:s}){return[t(A.A,{attrs:{bottom:""},scopedSlots:e._u([{key:"activator",fn:function({on:o,attrs:n}){return[t(a.A,e._g(e._b({staticClass:"mr-1",attrs:{icon:"",small:"",color:"primary"},on:{click:function(t){return e.editUser(s)}}},"v-btn",n,!1),o),[t(f.A,{attrs:{small:""}},[e._v("mdi-pencil")])],1)]}}],null,!0)},[t("span",[e._v("Edit User")])]),t(A.A,{attrs:{bottom:""},scopedSlots:e._u([{key:"activator",fn:function({on:o,attrs:n}){return[t(a.A,e._g(e._b({attrs:{icon:"",small:"",color:"error"},on:{click:function(t){return e.confirmDelete(s)}}},"v-btn",n,!1),o),[t(f.A,{attrs:{small:""}},[e._v("mdi-delete")])],1)]}}],null,!0)},[t("span",[e._v("Delete User")])])]}}])})],1),t(u.A,{attrs:{"max-width":"700px",persistent:""},model:{value:e.dialog,callback:function(t){e.dialog=t},expression:"dialog"}},[t(o.A,[t(n.ri,{staticClass:"headline white--text d-flex align-center",staticStyle:{"background-color":"#a52a2a"}},[e._v(" "+e._s(e.editMode?"Edit User":"Create New User")+" "),t(b.A),t(a.A,{attrs:{icon:"",dark:""},on:{click:e.closeDialog}},[t(f.A,[e._v("mdi-close")])],1)],1),t(n.OQ,{staticClass:"pt-6"},[t(m.A,{ref:"form",attrs:{"lazy-validation":""},model:{value:e.valid,callback:function(t){e.valid=t},expression:"valid"}},[t(p.A,[t(r.A,{attrs:{cols:"12",md:"6"}},[t(y.A,{attrs:{rules:e.formRules.required,label:"First Name",required:"",outlined:"",dense:""},model:{value:e.form.name.firstName,callback:function(t){e.$set(e.form.name,"firstName",t)},expression:"form.name.firstName"}})],1),t(r.A,{attrs:{cols:"12",md:"6"}},[t(y.A,{attrs:{rules:e.formRules.required,label:"Last Name",required:"",outlined:"",dense:""},model:{value:e.form.name.surname,callback:function(t){e.$set(e.form.name,"surname",t)},expression:"form.name.surname"}})],1),t(r.A,{attrs:{cols:"12",md:"6"}},[t(y.A,{attrs:{label:"Middle Name",outlined:"",dense:""},model:{value:e.form.name.middleName,callback:function(t){e.$set(e.form.name,"middleName",t)},expression:"form.name.middleName"}})],1),t(r.A,{attrs:{cols:"12",md:"6"}},[t(y.A,{attrs:{label:"Name Extension",outlined:"",dense:""},model:{value:e.form.name.nameExtension,callback:function(t){e.$set(e.form.name,"nameExtension",t)},expression:"form.name.nameExtension"}})],1),t(r.A,{attrs:{cols:"12",md:"6"}},[t(y.A,{attrs:{rules:e.formRules.email,label:"Email",required:"",outlined:"",dense:""},model:{value:e.form.email,callback:function(t){e.$set(e.form,"email",t)},expression:"form.email"}})],1),t(r.A,{attrs:{cols:"12",md:"6"}},[t(y.A,{attrs:{rules:e.formRules.required,label:"Username",required:"",outlined:"",dense:""},model:{value:e.form.username,callback:function(t){e.$set(e.form,"username",t)},expression:"form.username"}})],1),t(r.A,{attrs:{cols:"12",md:"6"}},[t(y.A,{attrs:{rules:e.editMode?[]:e.formRules.required,label:"Password",required:!e.editMode,type:"password",outlined:"",dense:""},model:{value:e.form.password,callback:function(t){e.$set(e.form,"password",t)},expression:"form.password"}})],1),t(r.A,{attrs:{cols:"12",md:"6"}},[t(g.A,{attrs:{items:e.roles,"item-text":"name","item-value":"_id",rules:e.formRules.required,label:"Role",required:"",multiple:"",chips:"",outlined:"",dense:""},model:{value:e.form.role,callback:function(t){e.$set(e.form,"role",t)},expression:"form.role"}})],1),t(r.A,{attrs:{cols:"12",md:"6"}},[t(y.A,{attrs:{label:"Employee ID",outlined:"",dense:""},model:{value:e.form.employeeId,callback:function(t){e.$set(e.form,"employeeId",t)},expression:"form.employeeId"}})],1),t(r.A,{attrs:{cols:"12",md:"6"}},[t(g.A,{attrs:{items:e.departments,"item-text":"name","item-value":"_id",label:"Department",outlined:"",dense:""},model:{value:e.form.academicInfo.department,callback:function(t){e.$set(e.form.academicInfo,"department",t)},expression:"form.academicInfo.department"}})],1),t(r.A,{attrs:{cols:"12",md:"6"}},[t(g.A,{attrs:{items:["full-time","part-time"],label:"Employment Status",outlined:"",dense:""},model:{value:e.form.academicInfo.employmentStatus,callback:function(t){e.$set(e.form.academicInfo,"employmentStatus",t)},expression:"form.academicInfo.employmentStatus"}})],1),t(r.A,{attrs:{cols:"12",md:"6"}},[t(h.A,{attrs:{"close-on-content-click":!1,transition:"scale-transition","offset-y":"","max-width":"290px","min-width":"290px"},scopedSlots:e._u([{key:"activator",fn:function({on:s,attrs:a}){return[t(y.A,e._g(e._b({attrs:{label:"Date Hired",readonly:"",outlined:"",dense:""},model:{value:e.form.academicInfo.dateHired,callback:function(t){e.$set(e.form.academicInfo,"dateHired",t)},expression:"form.academicInfo.dateHired"}},"v-text-field",a,!1),s))]}}]),model:{value:e.dateMenu,callback:function(t){e.dateMenu=t},expression:"dateMenu"}},[t(d.A,{on:{input:function(t){e.dateMenu=!1}},model:{value:e.form.academicInfo.dateHired,callback:function(t){e.$set(e.form.academicInfo,"dateHired",t)},expression:"form.academicInfo.dateHired"}})],1)],1),t(r.A,{attrs:{cols:"12",md:"6"}},[t(g.A,{attrs:{items:["active","inactive"],label:"Account Status",required:"",outlined:"",dense:""},model:{value:e.form.accountStatus,callback:function(t){e.$set(e.form,"accountStatus",t)},expression:"form.accountStatus"}})],1)],1)],1)],1),t(n.SL,[t(b.A),t(a.A,{attrs:{color:"grey darken-1",text:""},on:{click:e.closeDialog}},[e._v(" Cancel ")]),t(a.A,{attrs:{color:"#d2691e",disabled:!e.valid,loading:e.loading,dark:""},on:{click:e.handleSubmit}},[e._v(" "+e._s(e.editMode?"Save":"Create")+" ")])],1)],1)],1),t(u.A,{attrs:{"max-width":"400"},model:{value:e.deleteDialog,callback:function(t){e.deleteDialog=t},expression:"deleteDialog"}},[t(o.A,[t(n.ri,{staticClass:"headline error--text"},[e._v(" Confirm Delete ")]),t(n.OQ,[e._v(" Are you sure you want to delete user "),t("strong",[e._v(e._s(e.userToDelete?.name?.firstName)+" "+e._s(e.userToDelete?.name?.surname))]),e._v("? This action cannot be undone. ")]),t(n.SL,[t(b.A),t(a.A,{attrs:{color:"grey darken-1",text:""},on:{click:function(t){e.deleteDialog=!1}}},[e._v(" Cancel ")]),t(a.A,{attrs:{color:"error",loading:e.loading},on:{click:e.handleDelete}},[e._v(" Delete ")])],1)],1)],1),t(v.A,{attrs:{color:e.snackbarColor,timeout:3e3,top:""},scopedSlots:e._u([{key:"action",fn:function({attrs:s}){return[t(a.A,e._b({attrs:{text:""},on:{click:function(t){e.showSnackbar=!1}}},"v-btn",s,!1),[e._v("Close")])]}}]),model:{value:e.showSnackbar,callback:function(t){e.showSnackbar=t},expression:"showSnackbar"}},[e._v(" "+e._s(e.snackbarText)+" ")])],1)},k=[],_=s(5353),S={name:"UserListView",data:()=>({valid:!1,dialog:!1,deleteDialog:!1,editMode:!1,userToDelete:null,showSnackbar:!1,snackbarText:"",snackbarColor:"success",options:{itemsPerPage:10},form:{name:{firstName:"",surname:"",middleName:"",nameExtension:""},email:"",username:"",password:"",role:[],employeeId:"",accountStatus:"active",academicInfo:{department:null,employmentStatus:"full-time",dateHired:null}},dateMenu:!1,formRules:{required:[e=>!!e||"This field is required"],email:[e=>!!e||"Email is required",e=>/.+@.+\..+/.test(e)||"Email must be valid"]},headers:[{text:"Name",align:"start",value:"name.firstName",sortable:!0},{text:"Email",value:"email"},{text:"Username",value:"username"},{text:"Employee ID",value:"employeeId"},{text:"Roles",value:"role"},{text:"Status",value:"accountStatus"},{text:"Actions",value:"actions",sortable:!1,align:"end"}]}),computed:{...(0,_.aH)("users",["users","loading","error"]),...(0,_.aH)("roles",["roles"]),...(0,_.aH)("departments",["departments"])},methods:{...(0,_.i0)("users",["fetchUsers","createUser","updateUser","deleteUser"]),...(0,_.i0)("roles",["fetchRoles"]),...(0,_.i0)("departments",["fetchDepartments"]),openCreateDialog(){this.dialog=!0,this.editMode=!1,this.$nextTick((()=>{this.$refs.form&&this.$refs.form.reset()}))},closeDialog(){this.dialog=!1,this.editMode=!1,this.form={name:{firstName:"",surname:"",middleName:"",nameExtension:""},email:"",username:"",password:"",role:[],employeeId:"",accountStatus:"active",academicInfo:{department:null,employmentStatus:"full-time",dateHired:null}},this.$refs.form&&this.$refs.form.reset()},editUser(e){console.log(e),this.editMode=!0,this.form={...e,password:"",role:e.role.map((e=>e._id)),academicInfo:{department:e.academicInfo?.department?._id||null,employmentStatus:e.academicInfo?.employmentStatus||"full-time",dateHired:e.academicInfo?.dateHired||null}},this.dialog=!0},async handleSubmit(){if(this.$refs.form.validate())try{this.editMode?(await this.updateUser({id:this.form._id,userData:this.form}),this.showMessage("User updated successfully")):(await this.createUser(this.form),this.showMessage("User created successfully")),this.closeDialog(),await this.fetchUsers()}catch(e){this.showMessage(e.message||"An error occurred","error")}},confirmDelete(e){this.userToDelete=e,this.deleteDialog=!0},async handleDelete(){if(this.userToDelete)try{await this.deleteUser(this.userToDelete._id),this.deleteDialog=!1,this.userToDelete=null,await this.fetchUsers(),this.showMessage("User deleted successfully")}catch(e){this.showMessage(e.message||"An error occurred","error")}},showMessage(e,t="success"){this.snackbarText=e,this.snackbarColor=t,this.showSnackbar=!0}},async created(){try{await Promise.all([this.fetchUsers(),this.fetchRoles(),this.fetchDepartments()])}catch(e){this.showMessage(e.message||"An error occurred","error")}}},w=S,D=s(1656),C=(0,D.A)(w,x,k,!1,null,null,null),$=C.exports},4414:function(e,t,s){s(4114),s(125);var a=s(5471),o=s(8041),n=s(4152);const i=["sm","md","lg","xl"],r=(()=>i.reduce(((e,t)=>(e[t]={type:[Boolean,String,Number],default:!1},e)),{}))(),l=(()=>i.reduce(((e,t)=>(e["offset"+(0,n.Zb)(t)]={type:[String,Number],default:null},e)),{}))(),c=(()=>i.reduce(((e,t)=>(e["order"+(0,n.Zb)(t)]={type:[String,Number],default:null},e)),{}))(),d={col:Object.keys(r),offset:Object.keys(l),order:Object.keys(c)};function u(e,t,s){let a=e;if(null!=s&&!1!==s){if(t){const s=t.replace(e,"");a+=`-${s}`}return"col"!==e||""!==s&&!0!==s?(a+=`-${s}`,a.toLowerCase()):a.toLowerCase()}}const m=new Map;t.A=a.Ay.extend({name:"v-col",functional:!0,props:{cols:{type:[Boolean,String,Number],default:!1},...r,offset:{type:[String,Number],default:null},...l,order:{type:[String,Number],default:null},...c,alignSelf:{type:String,default:null,validator:e=>["auto","start","end","center","baseline","stretch"].includes(e)},tag:{type:String,default:"div"}},render(e,{props:t,data:s,children:a,parent:n}){let i="";for(const o in t)i+=String(t[o]);let r=m.get(i);if(!r){let e;for(e in r=[],d)d[e].forEach((s=>{const a=t[s],o=u(e,s,a);o&&r.push(o)}));const s=r.some((e=>e.startsWith("col-")));r.push({col:!s||!t.cols,[`col-${t.cols}`]:t.cols,[`offset-${t.offset}`]:t.offset,[`order-${t.order}`]:t.order,[`align-self-${t.alignSelf}`]:t.alignSelf}),m.set(i,r)}return e(t.tag,(0,o.Ay)(s,{class:r}),a)}})},2756:function(e,t,s){s(4114),s(125);var a=s(5471),o=s(8041),n=s(4152);const i=["sm","md","lg","xl"],r=["start","end","center"];function l(e,t){return i.reduce(((s,a)=>(s[e+(0,n.Zb)(a)]=t(),s)),{})}const c=e=>[...r,"baseline","stretch"].includes(e),d=l("align",(()=>({type:String,default:null,validator:c}))),u=e=>[...r,"space-between","space-around"].includes(e),m=l("justify",(()=>({type:String,default:null,validator:u}))),f=e=>[...r,"space-between","space-around","stretch"].includes(e),h=l("alignContent",(()=>({type:String,default:null,validator:f}))),p={align:Object.keys(d),justify:Object.keys(m),alignContent:Object.keys(h)},g={align:"align",justify:"justify",alignContent:"align-content"};function v(e,t,s){let a=g[e];if(null!=s){if(t){const s=t.replace(e,"");a+=`-${s}`}return a+=`-${s}`,a.toLowerCase()}}const b=new Map;t.A=a.Ay.extend({name:"v-row",functional:!0,props:{tag:{type:String,default:"div"},dense:Boolean,noGutters:Boolean,align:{type:String,default:null,validator:c},...d,justify:{type:String,default:null,validator:u},...m,alignContent:{type:String,default:null,validator:f},...h},render(e,{props:t,data:s,children:a}){let n="";for(const o in t)n+=String(t[o]);let i=b.get(n);if(!i){let e;for(e in i=[],p)p[e].forEach((s=>{const a=t[s],o=v(e,s,a);o&&i.push(o)}));i.push({"no-gutters":t.noGutters,"row--dense":t.dense,[`align-${t.align}`]:t.align,[`justify-${t.justify}`]:t.justify,[`align-content-${t.alignContent}`]:t.alignContent}),b.set(n,i)}return e(t.tag,(0,o.Ay)(s,{staticClass:"row",class:i}),a)}})},7270:function(e,t,s){s.d(t,{A:function(){return u}});var a=s(5030),o=s(8743),n=s(7391),i=s(2031),r=s(9975),l=s(4152),c=s(6988),d=s(5803),u=(0,d.A)(o.A,n.A,i.A,r.A).extend({name:"v-tooltip",props:{closeDelay:{type:[Number,String],default:0},disabled:Boolean,openDelay:{type:[Number,String],default:0},openOnHover:{type:Boolean,default:!0},openOnFocus:{type:Boolean,default:!0},tag:{type:String,default:"span"},transition:String},data:()=>({calculatedMinWidth:0,closeDependents:!1}),computed:{calculatedLeft(){const{activator:e,content:t}=this.dimensions,s=!this.bottom&&!this.left&&!this.top&&!this.right,a=!1!==this.attach?e.offsetLeft:e.left;let o=0;return this.top||this.bottom||s?o=a+e.width/2-t.width/2:(this.left||this.right)&&(o=a+(this.right?e.width:-t.width)+(this.right?10:-10)),this.nudgeLeft&&(o-=parseInt(this.nudgeLeft)),this.nudgeRight&&(o+=parseInt(this.nudgeRight)),`${this.calcXOverflow(o,this.dimensions.content.width)}px`},calculatedTop(){const{activator:e,content:t}=this.dimensions,s=!1!==this.attach?e.offsetTop:e.top;let a=0;return this.top||this.bottom?a=s+(this.bottom?e.height:-t.height)+(this.bottom?10:-10):(this.left||this.right)&&(a=s+e.height/2-t.height/2),this.nudgeTop&&(a-=parseInt(this.nudgeTop)),this.nudgeBottom&&(a+=parseInt(this.nudgeBottom)),!1===this.attach&&(a+=this.pageYOffset),`${this.calcYOverflow(a)}px`},classes(){return{"v-tooltip--top":this.top,"v-tooltip--right":this.right,"v-tooltip--bottom":this.bottom,"v-tooltip--left":this.left,"v-tooltip--attached":""===this.attach||!0===this.attach||"attach"===this.attach}},computedTransition(){return this.transition?this.transition:this.isActive?"scale-transition":"fade-transition"},offsetY(){return this.top||this.bottom},offsetX(){return this.left||this.right},styles(){return{left:this.calculatedLeft,maxWidth:(0,l.Dg)(this.maxWidth),minWidth:(0,l.Dg)(this.minWidth),top:this.calculatedTop,zIndex:this.zIndex||this.activeZIndex}}},beforeMount(){this.$nextTick((()=>{this.value&&this.callActivate()}))},mounted(){"v-slot"===(0,l.fo)(this,"activator",!0)&&(0,c.yA)("v-tooltip's activator slot must be bound, try '<template #activator=\"data\"><v-btn v-on=\"data.on>'",this)},methods:{activate(){this.updateDimensions(),requestAnimationFrame(this.startTransition)},deactivate(){this.runDelay("close")},genActivatorListeners(){const e=a.A.options.methods.genActivatorListeners.call(this);return this.openOnFocus&&(e.focus=e=>{this.getActivator(e),this.runDelay("open")},e.blur=e=>{this.getActivator(e),this.runDelay("close")}),e.keydown=e=>{e.keyCode===l.uP.esc&&(this.getActivator(e),this.runDelay("close"))},e},genActivatorAttributes(){return{"aria-haspopup":!0,"aria-expanded":String(this.isActive)}},genTransition(){const e=this.genContent();return this.computedTransition?this.$createElement("transition",{props:{name:this.computedTransition}},[e]):e},genContent(){return this.$createElement("div",this.setBackgroundColor(this.color,{staticClass:"v-tooltip__content",class:{[this.contentClass]:!0,menuable__content__active:this.isActive,"v-tooltip__content--fixed":this.activatorFixed},style:this.styles,attrs:this.getScopeIdAttrs(),directives:[{name:"show",value:this.isContentActive}],ref:"content"}),this.getContentSlot())}},render(e){return e(this.tag,{staticClass:"v-tooltip",class:this.classes},[this.showLazyContent((()=>[this.genTransition()])),this.genActivator()])}})}}]);
//# sourceMappingURL=252.1cdb816b.js.map