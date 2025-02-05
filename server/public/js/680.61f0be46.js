"use strict";(self["webpackChunkclient"]=self["webpackChunkclient"]||[]).push([[680],{97680:function(t,e,s){s.r(e),s.d(e,{default:function(){return $}});var n=s(94112),a=s(33740),l=s(3698),r=s(52938),i=s(13180),o=s(54414),u=s(3449),c=s(93064),d=s(99991),f=s(36930),m=s(98983),g=s(17296),p=s(98924),h=s(46237),y=s(51554),v=s(2756),S=s(37150),b=s(41034),_=s(63307),A=s(34625),C=s(97112),k=function(){var t=this,e=t._self._c;return e(u.A,[e(l.A,{staticClass:"mb-4"},[e(A.A,{attrs:{"background-color":"primary",dark:""},on:{change:t.handleTabChange},model:{value:t.selectedTab,callback:function(e){t.selectedTab=e},expression:"selectedTab"}},[e(_.A,{attrs:{value:"all"}},[t._v("All Students")]),e(_.A,{attrs:{value:"regular"}},[t._v("Regular Students")]),e(_.A,{attrs:{value:"irregular"}},[t._v("Irregular Students")])],1)],1),e(l.A,{staticClass:"mb-4"},[e(v.A,{attrs:{align:"center","no-gutters":""}},[e(o.A,{attrs:{cols:"12"}},[e("div",{staticClass:"d-flex justify-space-between pa-4"},[e(C.A,{staticClass:"search-field",staticStyle:{"max-width":"400px"},attrs:{"prepend-inner-icon":"mdi-magnify",placeholder:"Search students...","hide-details":"","single-line":"",filled:"",rounded:"",dense:""},model:{value:t.search,callback:function(e){t.search=e},expression:"search"}}),e("div",{staticClass:"d-flex"},[e(h.A,{attrs:{"offset-y":""},scopedSlots:t._u([{key:"activator",fn:function({on:s,attrs:n}){return[e(a.A,t._g(t._b({attrs:{color:"primary"}},"v-btn",n,!1),s),[e(f.A,{attrs:{left:""}},[t._v("mdi-plus")]),t._v(" Add Student ")],1)]}}])},[e(m.A,t._l(["New","Existing"],(function(s){return e(g.A,{key:s,attrs:{to:{name:"StudentForm",params:{action:"add"},query:{type:s.toLowerCase()}}}},[e(p.UZ,[t._v(t._s(s)+" Student")])],1)})),1)],1)],1)],1)])],1)],1),e(l.A,[e(c.A,{attrs:{headers:t.headers,items:t.filteredStudents,loading:t.loading,"items-per-page":t.options.itemsPerPage},on:{"update:options":t.handleTableUpdate},scopedSlots:t._u([{key:"item.user.fullName",fn:function({item:s}){return[e("div",{staticClass:"d-flex align-center py-2"},[e(n.A,{staticClass:"mr-3",attrs:{color:"primary lighten-4",size:"40"}},[e("span",{staticClass:"primary--text font-weight-medium"},[t._v(" "+t._s(s.name.firstName[0])+t._s(s.name.surname[0])+" ")])]),e("div",[e("div",{staticClass:"font-weight-medium"},[t._v(" "+t._s(s.name.surname)+", "+t._s(s.name.firstName)+" "+t._s(s.name.middleName?s.name.middleName[0]+".":"")+" "+t._s(s.name.nameExtension||"")+" ")]),e("div",{staticClass:"caption text-medium-emphasis"},[t._v(" "+t._s(s.studentId)+" ")])])],1)]}},{key:"item.studentType",fn:function({item:s}){return[e(i.A,{staticClass:"text-capitalize",attrs:{color:"regular"===s.enrollments?.[0]?.studentType?"success":"warning",small:""}},[t._v(" "+t._s(s.enrollments?.[0]?.studentType||"N/A")+" ")])]}},{key:"item.course",fn:function({item:s}){return[e(i.A,{attrs:{small:"",outlined:"",color:"primary"}},[t._v(" "+t._s(s.course.courseCode)+" ")])]}},{key:"item.enrollmentStatus",fn:function({item:s}){return[e(i.A,{staticClass:"text-capitalize",attrs:{color:t.getStatusColor(s.enrollments?.[0]?.enrollmentStatus),small:""}},[t._v(" "+t._s(s.enrollments?.[0]?.enrollmentStatus||"pending")+" ")])]}},{key:"item.studentStatus",fn:function({item:s}){return[s.enrollments?.[0]?.studentStatus?[e(i.A,{staticClass:"text-capitalize",attrs:{color:t.getStatusColor(s.enrollments[0].studentStatus),small:""}},[t._v(" "+t._s(s.enrollments[0].studentStatus)+" ")])]:t._e()]}},{key:"item.actions",fn:function({item:s}){return[e("div",{staticClass:"d-flex justify-end"},[e(a.A,{attrs:{icon:"",small:"",color:"info"},on:{click:function(e){return t.selectStudent(s)}}},[e(f.A,{attrs:{small:""}},[t._v("mdi-eye")])],1),e(a.A,{attrs:{icon:"",small:"",color:"primary",to:{name:"StudentForm",params:{action:"edit"},query:{studentId:s._id}}}},[e(f.A,{attrs:{small:""}},[t._v("mdi-pencil")])],1),e(a.A,{attrs:{icon:"",small:"",color:"error"},on:{click:function(e){return t.confirmDelete(s)}}},[e(f.A,{attrs:{small:""}},[t._v("mdi-delete")])],1)],1)]}},{key:"no-data",fn:function(){return[e("div",{staticClass:"pa-8 text-center"},[e(f.A,{attrs:{size:"64",color:"grey lighten-1"}},[t._v("mdi-account-school-outline")]),e("div",{staticClass:"text-h6 grey--text text--darken-1 mt-4"},[t._v(" No students found ")]),e("div",{staticClass:"text-body-2 grey--text mt-2"},[t._v(" Try adjusting your search or filters ")])],1)]},proxy:!0},{key:"loading",fn:function(){return[e("div",{staticClass:"pa-8 text-center"},[e(y.A,{attrs:{indeterminate:"",color:"primary",size:"64"}}),e("div",{staticClass:"text-h6 primary--text mt-4"},[t._v("Loading students...")])],1)]},proxy:!0}])})],1),e(d.A,{attrs:{"max-width":"400"},model:{value:t.deleteDialog,callback:function(e){t.deleteDialog=e},expression:"deleteDialog"}},[e(l.A,[e(r.ri,{staticClass:"error--text"},[e(f.A,{attrs:{left:"",color:"error"}},[t._v("mdi-alert-circle")]),t._v(" Confirm Delete ")],1),e(r.OQ,{staticClass:"pt-4"},[t._v(" Are you sure you want to delete this student record? "),e("div",{staticClass:"mt-4 pa-4 grey lighten-4 rounded"},[e("div",{staticClass:"font-weight-medium"},[t._v(" "+t._s(t.studentToDelete?.user?.firstName)+" "+t._s(t.studentToDelete?.user?.lastName)+" ")]),e("div",{staticClass:"caption text-medium-emphasis"},[t._v(" ID: "+t._s(t.studentToDelete?.studentId)+" ")])])]),e(r.SL,[e(b.A),e(a.A,{attrs:{text:""},on:{click:function(e){t.deleteDialog=!1}}},[t._v("Cancel")]),e(a.A,{attrs:{color:"error",loading:t.loading},on:{click:t.handleDelete}},[t._v("Delete")])],1)],1)],1),e(S.A,{attrs:{color:t.snackbarColor,timeout:4e3,top:"",right:""},scopedSlots:t._u([{key:"action",fn:function({attrs:s}){return[e(a.A,t._b({attrs:{icon:""},on:{click:function(e){t.snackbar=!1}}},"v-btn",s,!1),[e(f.A,[t._v("mdi-close")])],1)]}}]),model:{value:t.snackbar,callback:function(e){t.snackbar=e},expression:"snackbar"}},[t._v(" "+t._s(t.snackbarText)+" ")])],1)},x=[],w=(s(44114),s(95353)),T={name:"StudentListView",data:()=>({selectedTab:"all",search:"",filters:{course:null,year:null,section:null},deleteDialog:!1,options:{page:1,itemsPerPage:10,search:"",sortBy:["user.fullName"],sortDesc:[!1]},headers:[{text:"Student Name",value:"user.fullName",sortable:!0},{text:"Student Type",value:"studentType",sortable:!0},{text:"Course",value:"course",sortable:!0},{text:"Enrollment Status",value:"enrollmentStatus",sortable:!0},{text:"Student Status",value:"studentStatus",sortable:!0},{text:"Actions",value:"actions",sortable:!1,align:"end"}],loading:!1,studentToDelete:null,snackbar:!1,snackbarColor:"",snackbarText:""}),computed:{...(0,w.aH)("students",["students","totalStudents"]),...(0,w.L8)("students",["filteredStudent"]),filteredStudents(){return this.filterStudentsByType()}},methods:{...(0,w.i0)("students",["fetchStudents","deleteStudent"]),handleTabChange(){this.filterStudentsByType()},filterStudentsByType(){let t=this.$store.getters["students/filteredStudent"](this.search);switch(this.selectedTab){case 1:return t.filter((t=>"regular"===t.enrollments?.[0]?.studentStatus));case 2:return t.filter((t=>"irregular"===t.enrollments?.[0]?.studentStatus));default:return t}},getStatusColor(t){const e={pending:"warning",evaluated:"info",enrolled:"success",regular:"success",irregular:"warning"};return e[t]||"warning"},handleTableUpdate(t){this.options=t,this.fetchStudents()},resetFilters(){this.filters={course:null,year:null,section:null},this.selectedTab="all",this.fetchStudents()},confirmDelete(t){this.studentToDelete=t,this.deleteDialog=!0},async handleDelete(){this.loading=!0;try{await this.deleteStudent(this.studentToDelete._id),this.showSnackbarMessage("Student deleted successfully!","success"),this.fetchStudents()}catch(t){this.showSnackbarMessage(t.response?.data?.message||"Failed to delete student!","error")}finally{this.loading=!1,this.deleteDialog=!1}},showSnackbarMessage(t,e){this.snackbarText=t,this.snackbarColor=e,this.snackbar=!0},selectStudent(t){this.$router.push({name:"Student Profile",params:{id:t._id}})}},created(){this.fetchStudents()}},D=T,N=s(81656),j=(0,N.A)(D,k,x,!1,null,"61b945ba",null),$=j.exports},54414:function(t,e,s){s(44114),s(40125);var n=s(85471),a=s(18041),l=s(4152);const r=["sm","md","lg","xl"],i=(()=>r.reduce(((t,e)=>(t[e]={type:[Boolean,String,Number],default:!1},t)),{}))(),o=(()=>r.reduce(((t,e)=>(t["offset"+(0,l.Zb)(e)]={type:[String,Number],default:null},t)),{}))(),u=(()=>r.reduce(((t,e)=>(t["order"+(0,l.Zb)(e)]={type:[String,Number],default:null},t)),{}))(),c={col:Object.keys(i),offset:Object.keys(o),order:Object.keys(u)};function d(t,e,s){let n=t;if(null!=s&&!1!==s){if(e){const s=e.replace(t,"");n+=`-${s}`}return"col"!==t||""!==s&&!0!==s?(n+=`-${s}`,n.toLowerCase()):n.toLowerCase()}}const f=new Map;e.A=n.Ay.extend({name:"v-col",functional:!0,props:{cols:{type:[Boolean,String,Number],default:!1},...i,offset:{type:[String,Number],default:null},...o,order:{type:[String,Number],default:null},...u,alignSelf:{type:String,default:null,validator:t=>["auto","start","end","center","baseline","stretch"].includes(t)},tag:{type:String,default:"div"}},render(t,{props:e,data:s,children:n,parent:l}){let r="";for(const a in e)r+=String(e[a]);let i=f.get(r);if(!i){let t;for(t in i=[],c)c[t].forEach((s=>{const n=e[s],a=d(t,s,n);a&&i.push(a)}));const s=i.some((t=>t.startsWith("col-")));i.push({col:!s||!e.cols,[`col-${e.cols}`]:e.cols,[`offset-${e.offset}`]:e.offset,[`order-${e.order}`]:e.order,[`align-self-${e.alignSelf}`]:e.alignSelf}),f.set(r,i)}return t(e.tag,(0,a.Ay)(s,{class:i}),n)}})},2756:function(t,e,s){s(44114),s(40125);var n=s(85471),a=s(18041),l=s(4152);const r=["sm","md","lg","xl"],i=["start","end","center"];function o(t,e){return r.reduce(((s,n)=>(s[t+(0,l.Zb)(n)]=e(),s)),{})}const u=t=>[...i,"baseline","stretch"].includes(t),c=o("align",(()=>({type:String,default:null,validator:u}))),d=t=>[...i,"space-between","space-around"].includes(t),f=o("justify",(()=>({type:String,default:null,validator:d}))),m=t=>[...i,"space-between","space-around","stretch"].includes(t),g=o("alignContent",(()=>({type:String,default:null,validator:m}))),p={align:Object.keys(c),justify:Object.keys(f),alignContent:Object.keys(g)},h={align:"align",justify:"justify",alignContent:"align-content"};function y(t,e,s){let n=h[t];if(null!=s){if(e){const s=e.replace(t,"");n+=`-${s}`}return n+=`-${s}`,n.toLowerCase()}}const v=new Map;e.A=n.Ay.extend({name:"v-row",functional:!0,props:{tag:{type:String,default:"div"},dense:Boolean,noGutters:Boolean,align:{type:String,default:null,validator:u},...c,justify:{type:String,default:null,validator:d},...f,alignContent:{type:String,default:null,validator:m},...g},render(t,{props:e,data:s,children:n}){let l="";for(const a in e)l+=String(e[a]);let r=v.get(l);if(!r){let t;for(t in r=[],p)p[t].forEach((s=>{const n=e[s],a=y(t,s,n);a&&r.push(a)}));r.push({"no-gutters":e.noGutters,"row--dense":e.dense,[`align-${e.align}`]:e.align,[`justify-${e.justify}`]:e.justify,[`align-content-${e.alignContent}`]:e.alignContent}),v.set(l,r)}return t(e.tag,(0,a.Ay)(s,{staticClass:"row",class:r}),n)}})}}]);
//# sourceMappingURL=680.61f0be46.js.map