"use strict";(self["webpackChunkclient"]=self["webpackChunkclient"]||[]).push([[284],{1284:function(t,s,e){e.r(s),e.d(s,{default:function(){return k}});var a=e(3740),r=e(3698),i=e(2938),o=e(4414),n=e(3449),l=e(9483),d=e(174),c=e(2756),u=e(7150),h=e(1034),p=e(7112),w=function(){var t=this,s=t._self._c;return s(n.A,{staticClass:"py-6"},[s(r.A,{staticClass:"mx-auto",attrs:{"max-width":"700",elevation:"1"}},[s(i.ri,{staticClass:"text-h5 pa-4"},[t._v("Profile Settings")]),s(i.OQ,{staticClass:"pa-4"},[s(d.A,{ref:"form",model:{value:t.valid,callback:function(s){t.valid=s},expression:"valid"}},[s(c.A,[s(o.A,{attrs:{cols:"12"}},[s("div",{staticClass:"text-subtitle-1 mb-4"},[t._v("Account Information")]),"student"!==t.formData.roles?s(p.A,{staticClass:"mb-2",attrs:{label:"Email Address",rules:t.emailRules,type:"email",required:"",outlined:"",dense:""},model:{value:t.formData.email,callback:function(s){t.$set(t.formData,"email",s)},expression:"formData.email"}}):t._e(),s(p.A,{attrs:{label:"Username",required:"",outlined:"",dense:""},model:{value:t.formData.username,callback:function(s){t.$set(t.formData,"username",s)},expression:"formData.username"}})],1),s(o.A,{staticClass:"mt-4",attrs:{cols:"12"}},[s("div",{staticClass:"text-subtitle-1 mb-4"},[t._v("Change Password")]),s(p.A,{staticClass:"mb-2",attrs:{label:"Current Password","append-icon":t.showCurrentPassword?"mdi-eye":"mdi-eye-off",type:t.showCurrentPassword?"text":"password",rules:[t=>!this.passwordData.newPassword||(!!t||"Current password is required")],outlined:"",dense:""},on:{"click:append":function(s){t.showCurrentPassword=!t.showCurrentPassword}},model:{value:t.passwordData.currentPassword,callback:function(s){t.$set(t.passwordData,"currentPassword",s)},expression:"passwordData.currentPassword"}}),s(p.A,{staticClass:"mb-2",attrs:{label:"New Password","append-icon":t.showNewPassword?"mdi-eye":"mdi-eye-off",type:t.showNewPassword?"text":"password",rules:[t=>!this.passwordData.currentPassword||(!!t||"New password is required"),...t.passwordRules],outlined:"",dense:""},on:{"click:append":function(s){t.showNewPassword=!t.showNewPassword}},model:{value:t.passwordData.newPassword,callback:function(s){t.$set(t.passwordData,"newPassword",s)},expression:"passwordData.newPassword"}}),s(p.A,{attrs:{label:"Confirm New Password","append-icon":t.showConfirmPassword?"mdi-eye":"mdi-eye-off",type:t.showConfirmPassword?"text":"password",rules:[t=>!this.passwordData.newPassword||(!!t||"Please confirm your password"),t=>!this.passwordData.newPassword||(t===this.passwordData.newPassword||"Passwords do not match")],outlined:"",dense:""},on:{"click:append":function(s){t.showConfirmPassword=!t.showConfirmPassword}},model:{value:t.passwordData.confirmPassword,callback:function(s){t.$set(t.passwordData,"confirmPassword",s)},expression:"passwordData.confirmPassword"}})],1)],1)],1)],1),s(l.A),s(i.SL,{staticClass:"pa-4"},[s(h.A),s(a.A,{attrs:{color:"primary",disabled:!t.valid,loading:t.loading,"min-width":"120"},on:{click:t.updateProfile}},[t._v(" Save Changes ")])],1)],1),s(u.A,{attrs:{color:t.snackbar.color,timeout:"3000"},scopedSlots:t._u([{key:"action",fn:function({attrs:e}){return[s(a.A,t._b({attrs:{text:""},on:{click:function(s){t.snackbar.show=!1}}},"v-btn",e,!1),[t._v(" Close ")])]}}]),model:{value:t.snackbar.show,callback:function(s){t.$set(t.snackbar,"show",s)},expression:"snackbar.show"}},[t._v(" "+t._s(t.snackbar.text)+" ")])],1)},f=[],m=e(5353),v={name:"UserProfile",data:()=>({valid:!1,loading:!1,showCurrentPassword:!1,showNewPassword:!1,showConfirmPassword:!1,formData:{email:"",username:"",roles:""},passwordData:{currentPassword:"",newPassword:"",confirmPassword:""},snackbar:{show:!1,text:"",color:"success"},emailRules:[t=>!!t||"E-mail is required",t=>/.+@.+\..+/.test(t)||"E-mail must be valid"],passwordRules:[t=>!t||t.length>=8||"Password must be at least 8 characters"]}),mounted(){this.fetchUserData()},methods:{...(0,m.i0)("users",["getUser","updateUser"]),async fetchUserData(){const t=JSON.parse(localStorage.getItem("user"));try{const s=await this.getUser(t._id),{email:e,username:a,roles:r}=s;this.formData={email:e,username:a,roles:r}}catch(s){this.showSnackbar("Error fetching user data","error"),console.error("Error fetching user data:",s)}},async updateProfile(){if(!this.$refs.form.validate())return;const t=JSON.parse(localStorage.getItem("user"));this.loading=!0;try{const s={email:this.formData.email,username:this.formData.username};if(this.passwordData.currentPassword&&this.passwordData.newPassword){if(this.passwordData.newPassword!==this.passwordData.confirmPassword)return void this.showSnackbar("Passwords do not match","error");s.currentPassword=this.passwordData.currentPassword,s.newPassword=this.passwordData.newPassword}else if(this.passwordData.currentPassword||this.passwordData.newPassword)return void this.showSnackbar("Both current and new password are required to change password","error");const e=await this.updateUser({id:t._id,userData:s});this.showSnackbar("Profile updated successfully","success"),this.$emit("profile-updated",e.data),this.passwordData.currentPassword="",this.passwordData.newPassword="",this.passwordData.confirmPassword=""}catch(s){this.showSnackbar(s.response?.data?.message||"Error updating profile","error"),console.error("Error updating profile:",s)}finally{this.loading=!1}},showSnackbar(t,s="success"){this.snackbar.text=t,this.snackbar.color=s,this.snackbar.show=!0}}},g=v,b=e(1656),y=(0,b.A)(g,w,f,!1,null,"0fab60ab",null),k=y.exports},9483:function(t,s,e){e.d(s,{A:function(){return r}});var a=e(3381),r=a.A.extend({name:"v-divider",props:{inset:Boolean,vertical:Boolean},render(t){let s;return this.$attrs.role&&"separator"!==this.$attrs.role||(s=this.vertical?"vertical":"horizontal"),t("hr",{class:{"v-divider":!0,"v-divider--inset":this.inset,"v-divider--vertical":this.vertical,...this.themeClasses},attrs:{role:"separator","aria-orientation":s,...this.$attrs},on:this.$listeners})}})},174:function(t,s,e){e(4114);var a=e(5803),r=e(7717),i=e(7540),o=e(4152);s.A=(0,a.A)(r.A,(0,i.G)("form")).extend({name:"v-form",provide(){return{form:this}},inheritAttrs:!1,props:{disabled:Boolean,lazyValidation:Boolean,readonly:Boolean,value:Boolean},data:()=>({inputs:[],watchers:[],errorBag:{}}),watch:{errorBag:{handler(t){const s=Object.values(t).includes(!0);this.$emit("input",!s)},deep:!0,immediate:!0}},methods:{watchInput(t){const s=t=>t.$watch("hasError",(s=>{this.$set(this.errorBag,t._uid,s)}),{immediate:!0}),e={_uid:t._uid,valid:()=>{},shouldValidate:()=>{}};return this.lazyValidation?e.shouldValidate=t.$watch("shouldValidate",(a=>{a&&(this.errorBag.hasOwnProperty(t._uid)||(e.valid=s(t)))})):e.valid=s(t),e},validate(){return 0===this.inputs.filter((t=>!t.validate(!0))).length},reset(){this.inputs.forEach((t=>t.reset())),this.resetErrorBag()},resetErrorBag(){this.lazyValidation&&setTimeout((()=>{this.errorBag={}}),0)},resetValidation(){this.inputs.forEach((t=>t.resetValidation())),this.resetErrorBag()},register(t){this.inputs.push(t),this.watchers.push(this.watchInput(t))},unregister(t){const s=this.inputs.find((s=>s._uid===t._uid));if(!s)return;const e=this.watchers.find((t=>t._uid===s._uid));e&&(e.valid(),e.shouldValidate()),this.watchers=this.watchers.filter((t=>t._uid!==s._uid)),this.inputs=this.inputs.filter((t=>t._uid!==s._uid)),this.$delete(this.errorBag,s._uid)}},render(t){return t("form",{staticClass:"v-form",attrs:{novalidate:!0,...this.attrs$},on:{submit:t=>this.$emit("submit",t)}},(0,o.$c)(this))}})},4414:function(t,s,e){e(4114),e(125);var a=e(5471),r=e(8041),i=e(4152);const o=["sm","md","lg","xl"],n=(()=>o.reduce(((t,s)=>(t[s]={type:[Boolean,String,Number],default:!1},t)),{}))(),l=(()=>o.reduce(((t,s)=>(t["offset"+(0,i.Zb)(s)]={type:[String,Number],default:null},t)),{}))(),d=(()=>o.reduce(((t,s)=>(t["order"+(0,i.Zb)(s)]={type:[String,Number],default:null},t)),{}))(),c={col:Object.keys(n),offset:Object.keys(l),order:Object.keys(d)};function u(t,s,e){let a=t;if(null!=e&&!1!==e){if(s){const e=s.replace(t,"");a+=`-${e}`}return"col"!==t||""!==e&&!0!==e?(a+=`-${e}`,a.toLowerCase()):a.toLowerCase()}}const h=new Map;s.A=a.Ay.extend({name:"v-col",functional:!0,props:{cols:{type:[Boolean,String,Number],default:!1},...n,offset:{type:[String,Number],default:null},...l,order:{type:[String,Number],default:null},...d,alignSelf:{type:String,default:null,validator:t=>["auto","start","end","center","baseline","stretch"].includes(t)},tag:{type:String,default:"div"}},render(t,{props:s,data:e,children:a,parent:i}){let o="";for(const r in s)o+=String(s[r]);let n=h.get(o);if(!n){let t;for(t in n=[],c)c[t].forEach((e=>{const a=s[e],r=u(t,e,a);r&&n.push(r)}));const e=n.some((t=>t.startsWith("col-")));n.push({col:!e||!s.cols,[`col-${s.cols}`]:s.cols,[`offset-${s.offset}`]:s.offset,[`order-${s.order}`]:s.order,[`align-self-${s.alignSelf}`]:s.alignSelf}),h.set(o,n)}return t(s.tag,(0,r.Ay)(e,{class:n}),a)}})},2756:function(t,s,e){e(4114),e(125);var a=e(5471),r=e(8041),i=e(4152);const o=["sm","md","lg","xl"],n=["start","end","center"];function l(t,s){return o.reduce(((e,a)=>(e[t+(0,i.Zb)(a)]=s(),e)),{})}const d=t=>[...n,"baseline","stretch"].includes(t),c=l("align",(()=>({type:String,default:null,validator:d}))),u=t=>[...n,"space-between","space-around"].includes(t),h=l("justify",(()=>({type:String,default:null,validator:u}))),p=t=>[...n,"space-between","space-around","stretch"].includes(t),w=l("alignContent",(()=>({type:String,default:null,validator:p}))),f={align:Object.keys(c),justify:Object.keys(h),alignContent:Object.keys(w)},m={align:"align",justify:"justify",alignContent:"align-content"};function v(t,s,e){let a=m[t];if(null!=e){if(s){const e=s.replace(t,"");a+=`-${e}`}return a+=`-${e}`,a.toLowerCase()}}const g=new Map;s.A=a.Ay.extend({name:"v-row",functional:!0,props:{tag:{type:String,default:"div"},dense:Boolean,noGutters:Boolean,align:{type:String,default:null,validator:d},...c,justify:{type:String,default:null,validator:u},...h,alignContent:{type:String,default:null,validator:p},...w},render(t,{props:s,data:e,children:a}){let i="";for(const r in s)i+=String(s[r]);let o=g.get(i);if(!o){let t;for(t in o=[],f)f[t].forEach((e=>{const a=s[e],r=v(t,e,a);r&&o.push(r)}));o.push({"no-gutters":s.noGutters,"row--dense":s.dense,[`align-${s.align}`]:s.align,[`justify-${s.justify}`]:s.justify,[`align-content-${s.alignContent}`]:s.alignContent}),g.set(i,o)}return t(s.tag,(0,r.Ay)(e,{staticClass:"row",class:o}),a)}})},1034:function(t,s,e){e(158);var a=e(4152);s.A=(0,a.Gn)("spacer","div","v-spacer")},7150:function(t,s,e){e.d(s,{A:function(){return u}});var a=e(8184),r=e(8743),i=e(3381),o=e(428),n=e(6763),l=e(5803),d=e(4152),c=e(6988),u=(0,l.A)(a.A,r.A,o.A,(0,n.P)(["absolute","bottom","left","right","top"])).extend({name:"v-snackbar",props:{app:Boolean,centered:Boolean,contentClass:{type:String,default:""},multiLine:Boolean,text:Boolean,timeout:{type:[Number,String],default:5e3},transition:{type:[Boolean,String],default:"v-snack-transition",validator:t=>"string"===typeof t||!1===t},vertical:Boolean},data:()=>({activeTimeout:-1}),computed:{classes(){return{"v-snack--absolute":this.absolute,"v-snack--active":this.isActive,"v-snack--bottom":this.bottom||!this.top,"v-snack--centered":this.centered,"v-snack--has-background":this.hasBackground,"v-snack--left":this.left,"v-snack--multi-line":this.multiLine&&!this.vertical,"v-snack--right":this.right,"v-snack--text":this.text,"v-snack--top":this.top,"v-snack--vertical":this.vertical}},hasBackground(){return!this.text&&!this.outlined},isDark(){return this.hasBackground?!this.light:i.A.options.computed.isDark.call(this)},styles(){if(this.absolute||!this.app)return{};const{bar:t,bottom:s,footer:e,insetFooter:a,left:r,right:i,top:o}=this.$vuetify.application;return{paddingBottom:(0,d.Dg)(s+e+a),paddingLeft:(0,d.Dg)(r),paddingRight:(0,d.Dg)(i),paddingTop:(0,d.Dg)(t+o)}}},watch:{isActive:"setTimeout",timeout:"setTimeout"},mounted(){this.isActive&&this.setTimeout()},created(){this.$attrs.hasOwnProperty("auto-height")&&(0,c.rq)("auto-height",this),0==this.timeout&&(0,c.CI)('timeout="0"',"-1",this)},methods:{genActions(){return this.$createElement("div",{staticClass:"v-snack__action "},[(0,d.$c)(this,"action",{attrs:{class:"v-snack__btn"}})])},genContent(){return this.$createElement("div",{staticClass:"v-snack__content",class:{[this.contentClass]:!0},attrs:{role:"status","aria-live":"polite"}},[(0,d.$c)(this)])},genWrapper(){const t=this.hasBackground?this.setBackgroundColor:this.setTextColor,s=t(this.color,{staticClass:"v-snack__wrapper",class:a.A.options.computed.classes.call(this),style:a.A.options.computed.styles.call(this),directives:[{name:"show",value:this.isActive}],on:{pointerenter:()=>window.clearTimeout(this.activeTimeout),pointerleave:this.setTimeout}});return this.$createElement("div",s,[this.genContent(),this.genActions()])},genTransition(){return this.$createElement("transition",{props:{name:this.transition}},[this.genWrapper()])},setTimeout(){window.clearTimeout(this.activeTimeout);const t=Number(this.timeout);this.isActive&&![0,-1].includes(t)&&(this.activeTimeout=window.setTimeout((()=>{this.isActive=!1}),t))}},render(t){return t("div",{staticClass:"v-snack",class:this.classes,style:this.styles},[!1!==this.transition?this.genTransition():this.genWrapper()])}})}}]);
//# sourceMappingURL=284.f41c2323.js.map