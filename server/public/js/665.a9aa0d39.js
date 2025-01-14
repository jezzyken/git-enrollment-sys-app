"use strict";(self["webpackChunkclient"]=self["webpackChunkclient"]||[]).push([[665],{9804:function(e,t,a){a.r(t),a.d(t,{default:function(){return A}});var s=a(3740),r=a(3698),n=a(2938),i=a(4414),l=a(3449),o=a(3064),c=a(9991),d=a(174),u=a(6930),h=a(2756),p=a(7150),f=a(1034),m=a(7112),g=function(){var e=this,t=e._self._c;return t(l.A,[t(r.A,{staticClass:"mb-4"},[t(h.A,{attrs:{align:"center","no-gutters":""}},[t(i.A,{attrs:{cols:"12"}},[t("div",{staticClass:"d-flex justify-space-between pa-4"},[t(m.A,{staticClass:"search-field",staticStyle:{"max-width":"300px"},attrs:{"prepend-inner-icon":"mdi-magnify",placeholder:"Search departments...","hide-details":"","single-line":"",filled:"",rounded:"",dense:""},on:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.fetchDepartments.apply(null,arguments)}},model:{value:e.options.search,callback:function(t){e.$set(e.options,"search",t)},expression:"options.search"}}),t(s.A,{attrs:{color:"primary"},on:{click:e.openCreateDialog}},[t(u.A,{attrs:{left:""}},[e._v("mdi-plus")]),e._v(" New Department ")],1)],1)])],1)],1),t(r.A,[t(o.A,{attrs:{headers:e.headers,items:e.departments,loading:e.loading,options:e.options,"server-items-length":e.totalDepartments,"items-per-page":10},on:{"update:options":function(t){e.options=t}},scopedSlots:e._u([{key:"item.actions",fn:function({item:a}){return[t("div",{staticClass:"d-flex justify-end"},[t(s.A,{staticClass:"mr-2",attrs:{icon:"",small:"",color:"primary"},on:{click:function(t){return e.editDepartment(a)}}},[t(u.A,{attrs:{small:""}},[e._v("mdi-pencil")])],1),t(s.A,{attrs:{icon:"",small:"",color:"error"},on:{click:function(t){return e.confirmDelete(a)}}},[t(u.A,{attrs:{small:""}},[e._v("mdi-delete")])],1)],1)]}},{key:"no-data",fn:function(){return[t("div",{staticClass:"pa-8 text-center"},[t(u.A,{attrs:{size:"64",color:"grey lighten-1"}},[e._v("mdi-domain")]),t("div",{staticClass:"text-h6 grey--text text--darken-1 mt-4"},[e._v(" No departments found ")]),t("div",{staticClass:"text-body-2 grey--text mt-2"},[e._v(" Try adjusting your search or add a new department ")])],1)]},proxy:!0}])})],1),t(c.A,{attrs:{"max-width":"500px"},model:{value:e.createDialog,callback:function(t){e.createDialog=t},expression:"createDialog"}},[t(r.A,[t(n.ri,[t("span",{staticClass:"text-h5"},[e._v(e._s(e.editMode?"Edit Department":"New Department"))])]),t(n.OQ,[t(l.A,[t(d.A,{ref:"form",attrs:{"lazy-validation":""},model:{value:e.valid,callback:function(t){e.valid=t},expression:"valid"}},[t(h.A,[t(i.A,{attrs:{cols:"12"}},[t(m.A,{attrs:{rules:e.formRules.name,label:"Department Name",required:""},model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1)],1)],1)],1)],1),t(n.SL,[t(f.A),t(s.A,{attrs:{text:""},on:{click:e.closeCreateDialog}},[e._v("Cancel")]),t(s.A,{attrs:{color:"primary",disabled:!e.valid,loading:e.loading},on:{click:e.handleCreate}},[e._v(" "+e._s(e.editMode?"Save":"Create")+" ")])],1)],1)],1),t(c.A,{attrs:{"max-width":"400"},model:{value:e.deleteDialog,callback:function(t){e.deleteDialog=t},expression:"deleteDialog"}},[t(r.A,[t(n.ri,{staticClass:"error--text"},[t(u.A,{attrs:{left:"",color:"error"}},[e._v("mdi-alert-circle")]),e._v(" Confirm Delete ")],1),t(n.OQ,{staticClass:"pt-4"},[e._v(" Are you sure you want to delete this department? "),t("div",{staticClass:"mt-4 pa-4 grey lighten-4 rounded"},[t("div",{staticClass:"font-weight-medium"},[e._v(" "+e._s(e.departmentToDelete?.name)+" ")])])]),t(n.SL,[t(f.A),t(s.A,{attrs:{text:""},on:{click:function(t){e.deleteDialog=!1}}},[e._v("Cancel")]),t(s.A,{attrs:{color:"error",loading:e.loading},on:{click:e.handleDelete}},[e._v(" Delete ")])],1)],1)],1),t(p.A,{attrs:{color:e.snackbarColor,timeout:3e3,top:"",right:""},scopedSlots:e._u([{key:"action",fn:function({attrs:a}){return[t(s.A,e._b({attrs:{icon:""},on:{click:function(t){e.showSnackbar=!1}}},"v-btn",a,!1),[t(u.A,[e._v("mdi-close")])],1)]}}]),model:{value:e.showSnackbar,callback:function(t){e.showSnackbar=t},expression:"showSnackbar"}},[e._v(" "+e._s(e.snackbarText)+" ")])],1)},y=[],v=a(5353),b={name:"DepartmentListView",data:()=>({valid:!1,options:{page:1,itemsPerPage:10,search:""},createDialog:!1,deleteDialog:!1,departmentToDelete:null,form:{name:""},formRules:{name:[e=>!!e||"Department name is required"]},headers:[{text:"Department Name",align:"start",value:"name"},{text:"Actions",value:"actions",sortable:!1,align:"end"}],editMode:!1,loading:!1,snackbarColor:"",snackbarText:"",showSnackbar:!1}),computed:{...(0,v.aH)("departments",["departments","totalDepartments"])},methods:{...(0,v.i0)("departments",["fetchDepartments","createDepartment","updateDepartment","deleteDepartment"]),openCreateDialog(){this.editMode=!1,this.createDialog=!0,this.form={name:""}},closeCreateDialog(){this.createDialog=!1,this.form={name:""},this.$refs.form&&this.$refs.form.reset()},async handleCreate(){if(this.$refs.form.validate()){this.loading=!0;try{this.editMode?(await this.updateDepartment({id:this.form._id,departmentData:this.form}),this.showSnackbarMessage("Department updated successfully!","success")):(await this.createDepartment(this.form),this.showSnackbarMessage("Department created successfully!","success")),this.fetchDepartments(),this.closeCreateDialog()}catch(e){this.showSnackbarMessage(e.response?.data?.message||"An error occurred!","error")}finally{this.loading=!1}}},editDepartment(e){this.editMode=!0,this.form={...e},this.createDialog=!0},confirmDelete(e){this.departmentToDelete=e,this.deleteDialog=!0},async handleDelete(){this.loading=!0;try{await this.deleteDepartment(this.departmentToDelete._id),this.showSnackbarMessage("Department deleted successfully!","success"),this.fetchDepartments()}catch(e){this.showSnackbarMessage("Failed to delete department!","error")}finally{this.loading=!1,this.deleteDialog=!1}},showSnackbarMessage(e,t){this.snackbarText=e,this.snackbarColor=t,this.showSnackbar=!0},async handleSearch(){this.options.page=1,await this.fetchDepartments()}},created(){this.fetchDepartments()}},D=b,k=a(1656),w=(0,k.A)(D,g,y,!1,null,"2ed0db4d",null),A=w.exports},174:function(e,t,a){a(4114);var s=a(5803),r=a(7717),n=a(7540),i=a(4152);t.A=(0,s.A)(r.A,(0,n.G)("form")).extend({name:"v-form",provide(){return{form:this}},inheritAttrs:!1,props:{disabled:Boolean,lazyValidation:Boolean,readonly:Boolean,value:Boolean},data:()=>({inputs:[],watchers:[],errorBag:{}}),watch:{errorBag:{handler(e){const t=Object.values(e).includes(!0);this.$emit("input",!t)},deep:!0,immediate:!0}},methods:{watchInput(e){const t=e=>e.$watch("hasError",(t=>{this.$set(this.errorBag,e._uid,t)}),{immediate:!0}),a={_uid:e._uid,valid:()=>{},shouldValidate:()=>{}};return this.lazyValidation?a.shouldValidate=e.$watch("shouldValidate",(s=>{s&&(this.errorBag.hasOwnProperty(e._uid)||(a.valid=t(e)))})):a.valid=t(e),a},validate(){return 0===this.inputs.filter((e=>!e.validate(!0))).length},reset(){this.inputs.forEach((e=>e.reset())),this.resetErrorBag()},resetErrorBag(){this.lazyValidation&&setTimeout((()=>{this.errorBag={}}),0)},resetValidation(){this.inputs.forEach((e=>e.resetValidation())),this.resetErrorBag()},register(e){this.inputs.push(e),this.watchers.push(this.watchInput(e))},unregister(e){const t=this.inputs.find((t=>t._uid===e._uid));if(!t)return;const a=this.watchers.find((e=>e._uid===t._uid));a&&(a.valid(),a.shouldValidate()),this.watchers=this.watchers.filter((e=>e._uid!==t._uid)),this.inputs=this.inputs.filter((e=>e._uid!==t._uid)),this.$delete(this.errorBag,t._uid)}},render(e){return e("form",{staticClass:"v-form",attrs:{novalidate:!0,...this.attrs$},on:{submit:e=>this.$emit("submit",e)}},(0,i.$c)(this))}})},4414:function(e,t,a){a(4114),a(125);var s=a(5471),r=a(8041),n=a(4152);const i=["sm","md","lg","xl"],l=(()=>i.reduce(((e,t)=>(e[t]={type:[Boolean,String,Number],default:!1},e)),{}))(),o=(()=>i.reduce(((e,t)=>(e["offset"+(0,n.Zb)(t)]={type:[String,Number],default:null},e)),{}))(),c=(()=>i.reduce(((e,t)=>(e["order"+(0,n.Zb)(t)]={type:[String,Number],default:null},e)),{}))(),d={col:Object.keys(l),offset:Object.keys(o),order:Object.keys(c)};function u(e,t,a){let s=e;if(null!=a&&!1!==a){if(t){const a=t.replace(e,"");s+=`-${a}`}return"col"!==e||""!==a&&!0!==a?(s+=`-${a}`,s.toLowerCase()):s.toLowerCase()}}const h=new Map;t.A=s.Ay.extend({name:"v-col",functional:!0,props:{cols:{type:[Boolean,String,Number],default:!1},...l,offset:{type:[String,Number],default:null},...o,order:{type:[String,Number],default:null},...c,alignSelf:{type:String,default:null,validator:e=>["auto","start","end","center","baseline","stretch"].includes(e)},tag:{type:String,default:"div"}},render(e,{props:t,data:a,children:s,parent:n}){let i="";for(const r in t)i+=String(t[r]);let l=h.get(i);if(!l){let e;for(e in l=[],d)d[e].forEach((a=>{const s=t[a],r=u(e,a,s);r&&l.push(r)}));const a=l.some((e=>e.startsWith("col-")));l.push({col:!a||!t.cols,[`col-${t.cols}`]:t.cols,[`offset-${t.offset}`]:t.offset,[`order-${t.order}`]:t.order,[`align-self-${t.alignSelf}`]:t.alignSelf}),h.set(i,l)}return e(t.tag,(0,r.Ay)(a,{class:l}),s)}})},2756:function(e,t,a){a(4114),a(125);var s=a(5471),r=a(8041),n=a(4152);const i=["sm","md","lg","xl"],l=["start","end","center"];function o(e,t){return i.reduce(((a,s)=>(a[e+(0,n.Zb)(s)]=t(),a)),{})}const c=e=>[...l,"baseline","stretch"].includes(e),d=o("align",(()=>({type:String,default:null,validator:c}))),u=e=>[...l,"space-between","space-around"].includes(e),h=o("justify",(()=>({type:String,default:null,validator:u}))),p=e=>[...l,"space-between","space-around","stretch"].includes(e),f=o("alignContent",(()=>({type:String,default:null,validator:p}))),m={align:Object.keys(d),justify:Object.keys(h),alignContent:Object.keys(f)},g={align:"align",justify:"justify",alignContent:"align-content"};function y(e,t,a){let s=g[e];if(null!=a){if(t){const a=t.replace(e,"");s+=`-${a}`}return s+=`-${a}`,s.toLowerCase()}}const v=new Map;t.A=s.Ay.extend({name:"v-row",functional:!0,props:{tag:{type:String,default:"div"},dense:Boolean,noGutters:Boolean,align:{type:String,default:null,validator:c},...d,justify:{type:String,default:null,validator:u},...h,alignContent:{type:String,default:null,validator:p},...f},render(e,{props:t,data:a,children:s}){let n="";for(const r in t)n+=String(t[r]);let i=v.get(n);if(!i){let e;for(e in i=[],m)m[e].forEach((a=>{const s=t[a],r=y(e,a,s);r&&i.push(r)}));i.push({"no-gutters":t.noGutters,"row--dense":t.dense,[`align-${t.align}`]:t.align,[`justify-${t.justify}`]:t.justify,[`align-content-${t.alignContent}`]:t.alignContent}),v.set(n,i)}return e(t.tag,(0,r.Ay)(a,{staticClass:"row",class:i}),s)}})}}]);
//# sourceMappingURL=665.a9aa0d39.js.map