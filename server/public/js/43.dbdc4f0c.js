"use strict";(self["webpackChunkclient"]=self["webpackChunkclient"]||[]).push([[43],{8043:function(t,e,i){i.r(e),i.d(e,{default:function(){return y}});var r=i(3740),s=i(3698),a=i(2938),o=i(4414),l=i(3449),n=i(174),d=i(6930),u=i(2756),c=i(7112),h=function(){var t=this,e=t._self._c;return e(l.A,{staticClass:"login-container",attrs:{"fill-height":"",fluid:""}},[e("div",{staticClass:"animated-bg"}),e(u.A,{attrs:{align:"center",justify:"center"}},[e(o.A,{attrs:{cols:"12",sm:"8",md:"4"}},[e(s.A,{staticClass:"login-card"},[e("div",{staticClass:"card-header"},[e("h1",{staticClass:"text-h4 font-weight-bold mb-2"},[t._v("Welcome Back")]),e("p",{staticClass:"text-subtitle-1 grey--text"},[t._v("Sign in to your account")])]),e(a.OQ,[e(n.A,{ref:"form",on:{submit:function(e){return e.preventDefault(),t.handleSubmit.apply(null,arguments)}}},[e(c.A,{staticClass:"input-field",attrs:{label:"Email",outlined:"",rounded:"",dense:"",rules:[t.rules.required,t.rules.email]},scopedSlots:t._u([{key:"prepend",fn:function(){return[e(d.A,{attrs:{color:"primary"}},[t._v("mdi-email")])]},proxy:!0}]),model:{value:t.form.email,callback:function(e){t.$set(t.form,"email",e)},expression:"form.email"}}),e(c.A,{staticClass:"input-field",attrs:{label:"Password",type:t.showPassword?"text":"password",outlined:"",rounded:"",dense:"",rules:[t.rules.required]},scopedSlots:t._u([{key:"prepend",fn:function(){return[e(d.A,{attrs:{color:"primary"}},[t._v("mdi-lock")])]},proxy:!0},{key:"append",fn:function(){return[e(d.A,{on:{click:function(e){t.showPassword=!t.showPassword}}},[t._v(" "+t._s(t.showPassword?"mdi-eye":"mdi-eye-off")+" ")])]},proxy:!0}]),model:{value:t.form.password,callback:function(e){t.$set(t.form,"password",e)},expression:"form.password"}}),e(r.A,{staticClass:"login-btn",attrs:{block:"",color:"primary",height:"44",elevation:"2",loading:t.loading},on:{click:t.handleSubmit}},[t._v(" Sign In ")])],1)],1)],1)],1)],1)],1)},m=[],p=(i(4114),i(5353)),f={name:"LoginView",data(){return{form:{email:"",password:""},showPassword:!1,emailError:"",passwordError:"",rules:{required:t=>!!t||"This field is required",email:t=>/.+@.+\..+/.test(t)||"Please enter a valid email address"},socialLogins:[{provider:"google",icon:"mdi-google",color:"red"},{provider:"facebook",icon:"mdi-facebook",color:"blue"},{provider:"twitter",icon:"mdi-twitter",color:"light-blue"}]}},computed:{...(0,p.aH)("auth",["loading","error"])},methods:{...(0,p.i0)("auth",["login","socialLogin"]),async handleSubmit(){if(this.$refs.form.validate())try{await this.login(this.form)}catch(t){"email"===t.response?.data?.field?this.emailError=t.response.data.message:"password"===t.response?.data?.field?this.passwordError=t.response.data.message:this.error=t.response?.data?.message||"Login failed. Please try again."}},async handleSocialLogin(t){try{await this.socialLogin(t),this.$router.push("/dashboard")}catch(e){this.error=`${t} login failed. Please try again.`}}}},g=f,w=i(1656),v=(0,w.A)(g,h,m,!1,null,"113d2bdc",null),y=v.exports},174:function(t,e,i){i(4114);var r=i(5803),s=i(7717),a=i(7540),o=i(4152);e.A=(0,r.A)(s.A,(0,a.G)("form")).extend({name:"v-form",provide(){return{form:this}},inheritAttrs:!1,props:{disabled:Boolean,lazyValidation:Boolean,readonly:Boolean,value:Boolean},data:()=>({inputs:[],watchers:[],errorBag:{}}),watch:{errorBag:{handler(t){const e=Object.values(t).includes(!0);this.$emit("input",!e)},deep:!0,immediate:!0}},methods:{watchInput(t){const e=t=>t.$watch("hasError",(e=>{this.$set(this.errorBag,t._uid,e)}),{immediate:!0}),i={_uid:t._uid,valid:()=>{},shouldValidate:()=>{}};return this.lazyValidation?i.shouldValidate=t.$watch("shouldValidate",(r=>{r&&(this.errorBag.hasOwnProperty(t._uid)||(i.valid=e(t)))})):i.valid=e(t),i},validate(){return 0===this.inputs.filter((t=>!t.validate(!0))).length},reset(){this.inputs.forEach((t=>t.reset())),this.resetErrorBag()},resetErrorBag(){this.lazyValidation&&setTimeout((()=>{this.errorBag={}}),0)},resetValidation(){this.inputs.forEach((t=>t.resetValidation())),this.resetErrorBag()},register(t){this.inputs.push(t),this.watchers.push(this.watchInput(t))},unregister(t){const e=this.inputs.find((e=>e._uid===t._uid));if(!e)return;const i=this.watchers.find((t=>t._uid===e._uid));i&&(i.valid(),i.shouldValidate()),this.watchers=this.watchers.filter((t=>t._uid!==e._uid)),this.inputs=this.inputs.filter((t=>t._uid!==e._uid)),this.$delete(this.errorBag,e._uid)}},render(t){return t("form",{staticClass:"v-form",attrs:{novalidate:!0,...this.attrs$},on:{submit:t=>this.$emit("submit",t)}},(0,o.$c)(this))}})}}]);
//# sourceMappingURL=43.dbdc4f0c.js.map