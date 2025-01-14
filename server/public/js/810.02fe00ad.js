"use strict";(self["webpackChunkclient"]=self["webpackChunkclient"]||[]).push([[810],{5951:function(e,t,i){i.r(t),i.d(t,{default:function(){return _e}});var s=i(3740),a=i(3698),r=i(2938),n=i(3180),l=i(4414),o=i(8184),c=(i(4114),i(6993)),h=i(5961),d=i(5803),u=i(3801),f=i(4598),m=i(4152),p=i(6988),g=(0,d.A)(c.A,u.A).extend({name:"v-slider",directives:{ClickOutside:f.A},mixins:[u.A],props:{disabled:Boolean,inverseLabel:Boolean,max:{type:[Number,String],default:100},min:{type:[Number,String],default:0},step:{type:[Number,String],default:1},thumbColor:String,thumbLabel:{type:[Boolean,String],default:void 0,validator:e=>"boolean"===typeof e||"always"===e},thumbSize:{type:[Number,String],default:32},tickLabels:{type:Array,default:()=>[]},ticks:{type:[Boolean,String],default:!1,validator:e=>"boolean"===typeof e||"always"===e},tickSize:{type:[Number,String],default:2},trackColor:String,trackFillColor:String,value:[Number,String],vertical:Boolean},data:()=>({app:null,oldValue:null,thumbPressed:!1,mouseTimeout:-1,isFocused:!1,isActive:!1,noClick:!1,startOffset:0}),computed:{classes(){return{...c.A.options.computed.classes.call(this),"v-input__slider":!0,"v-input__slider--vertical":this.vertical,"v-input__slider--inverse-label":this.inverseLabel}},internalValue:{get(){return this.lazyValue},set(e){e=isNaN(e)?this.minValue:e;const t=this.roundValue(Math.min(Math.max(e,this.minValue),this.maxValue));t!==this.lazyValue&&(this.lazyValue=t,this.$emit("input",t))}},trackTransition(){return this.thumbPressed?this.showTicks||this.stepNumeric?"0.1s cubic-bezier(0.25, 0.8, 0.5, 1)":"none":""},minValue(){return parseFloat(this.min)},maxValue(){return parseFloat(this.max)},stepNumeric(){return this.step>0?parseFloat(this.step):0},inputWidth(){const e=(this.roundValue(this.internalValue)-this.minValue)/(this.maxValue-this.minValue)*100;return isNaN(e)?0:e},trackFillStyles(){const e=this.vertical?"bottom":"left",t=this.vertical?"top":"right",i=this.vertical?"height":"width",s=this.$vuetify.rtl?"auto":"0",a=this.$vuetify.rtl?"0":"auto",r=this.isDisabled?`calc(${this.inputWidth}% - 10px)`:`${this.inputWidth}%`;return{transition:this.trackTransition,[e]:s,[t]:a,[i]:r}},trackStyles(){const e=this.vertical?this.$vuetify.rtl?"bottom":"top":this.$vuetify.rtl?"left":"right",t=this.vertical?"height":"width",i="0px",s=this.isDisabled?`calc(${100-this.inputWidth}% - 10px)`:`calc(${100-this.inputWidth}%)`;return{transition:this.trackTransition,[e]:i,[t]:s}},showTicks(){return this.tickLabels.length>0||!(this.isDisabled||!this.stepNumeric||!this.ticks)},numTicks(){return Math.ceil((this.maxValue-this.minValue)/this.stepNumeric)},showThumbLabel(){return!this.isDisabled&&!(!this.thumbLabel&&!this.$scopedSlots["thumb-label"])},computedTrackColor(){if(!this.isDisabled)return this.trackColor?this.trackColor:this.isDark?this.validationState:this.validationState||"primary lighten-3"},computedTrackFillColor(){if(!this.isDisabled)return this.trackFillColor?this.trackFillColor:this.validationState||this.computedColor},computedThumbColor(){return this.thumbColor?this.thumbColor:this.validationState||this.computedColor}},watch:{min(e){const t=parseFloat(e);t>this.internalValue&&this.$emit("input",t)},max(e){const t=parseFloat(e);t<this.internalValue&&this.$emit("input",t)},value:{handler(e){this.internalValue=e},immediate:!0}},mounted(){this.app=document.querySelector("[data-app]")||(0,p.OP)("Missing v-app or a non-body wrapping element with the [data-app] attribute",this)},methods:{genDefaultSlot(){const e=[this.genLabel()],t=this.genSlider();return this.inverseLabel?e.unshift(t):e.push(t),e.push(this.genProgress()),e},genSlider(){return this.$createElement("div",{class:{"v-slider":!0,"v-slider--horizontal":!this.vertical,"v-slider--vertical":this.vertical,"v-slider--focused":this.isFocused,"v-slider--active":this.isActive,"v-slider--disabled":this.isDisabled,"v-slider--readonly":this.isReadonly,...this.themeClasses},directives:[{name:"click-outside",value:this.onBlur}],on:{click:this.onSliderClick,mousedown:this.onSliderMouseDown,touchstart:this.onSliderMouseDown}},this.genChildren())},genChildren(){return[this.genInput(),this.genTrackContainer(),this.genSteps(),this.genThumbContainer(this.internalValue,this.inputWidth,this.isActive,this.isFocused,this.onFocus,this.onBlur)]},genInput(){return this.$createElement("input",{attrs:{value:this.internalValue,id:this.computedId,disabled:!0,readonly:!0,tabindex:-1,...this.$attrs}})},genTrackContainer(){const e=[this.$createElement("div",this.setBackgroundColor(this.computedTrackColor,{staticClass:"v-slider__track-background",style:this.trackStyles})),this.$createElement("div",this.setBackgroundColor(this.computedTrackFillColor,{staticClass:"v-slider__track-fill",style:this.trackFillStyles}))];return this.$createElement("div",{staticClass:"v-slider__track-container",ref:"track"},e)},genSteps(){if(!this.step||!this.showTicks)return null;const e=parseFloat(this.tickSize),t=(0,m.Sd)(this.numTicks+1),i=this.vertical?"bottom":this.$vuetify.rtl?"right":"left",s=this.vertical?this.$vuetify.rtl?"left":"right":"top";this.vertical&&t.reverse();const a=t.map((t=>{const a=[];this.tickLabels[t]&&a.push(this.$createElement("div",{staticClass:"v-slider__tick-label"},this.tickLabels[t]));const r=t*(100/this.numTicks),n=this.$vuetify.rtl?100-this.inputWidth<r:r<this.inputWidth;return this.$createElement("span",{key:t,staticClass:"v-slider__tick",class:{"v-slider__tick--filled":n},style:{width:`${e}px`,height:`${e}px`,[i]:`calc(${r}% - ${e/2}px)`,[s]:`calc(50% - ${e/2}px)`}},a)}));return this.$createElement("div",{staticClass:"v-slider__ticks-container",class:{"v-slider__ticks-container--always-show":"always"===this.ticks||this.tickLabels.length>0}},a)},genThumbContainer(e,t,i,s,a,r,n="thumb"){const l=[this.genThumb()],o=this.genThumbLabelContent(e);return this.showThumbLabel&&l.push(this.genThumbLabel(o)),this.$createElement("div",this.setTextColor(this.computedThumbColor,{ref:n,key:n,staticClass:"v-slider__thumb-container",class:{"v-slider__thumb-container--active":i,"v-slider__thumb-container--focused":s,"v-slider__thumb-container--show-label":this.showThumbLabel},style:this.getThumbContainerStyles(t),attrs:{role:"slider",tabindex:this.isDisabled?-1:this.$attrs.tabindex?this.$attrs.tabindex:0,"aria-label":this.$attrs["aria-label"]||this.label,"aria-valuemin":this.min,"aria-valuemax":this.max,"aria-valuenow":this.internalValue,"aria-readonly":String(this.isReadonly),"aria-orientation":this.vertical?"vertical":"horizontal"},on:{focus:a,blur:r,keydown:this.onKeyDown}}),l)},genThumbLabelContent(e){return this.$scopedSlots["thumb-label"]?this.$scopedSlots["thumb-label"]({value:e}):[this.$createElement("span",[String(e)])]},genThumbLabel(e){const t=(0,m.Dg)(this.thumbSize),i=this.vertical?`translateY(20%) translateY(${Number(this.thumbSize)/3-1}px) translateX(55%) rotate(135deg)`:"translateY(-20%) translateY(-12px) translateX(-50%) rotate(45deg)";return this.$createElement(h.yX,{props:{origin:"bottom center"}},[this.$createElement("div",{staticClass:"v-slider__thumb-label-container",directives:[{name:"show",value:this.isFocused||this.isActive||"always"===this.thumbLabel}]},[this.$createElement("div",this.setBackgroundColor(this.computedThumbColor,{staticClass:"v-slider__thumb-label",style:{height:t,width:t,transform:i}}),[this.$createElement("div",e)])])])},genThumb(){return this.$createElement("div",this.setBackgroundColor(this.computedThumbColor,{staticClass:"v-slider__thumb"}))},getThumbContainerStyles(e){const t=this.vertical?"top":"left";let i=this.$vuetify.rtl?100-e:e;return i=this.vertical?100-i:i,{transition:this.trackTransition,[t]:`${i}%`}},onSliderMouseDown(e){var t;if(e.preventDefault(),this.oldValue=this.internalValue,this.isActive=!0,null===(t=e.target)||void 0===t?void 0:t.matches(".v-slider__thumb-container, .v-slider__thumb-container *")){this.thumbPressed=!0;const t=e.target.getBoundingClientRect(),i="touches"in e?e.touches[0]:e;this.startOffset=this.vertical?i.clientY-(t.top+t.height/2):i.clientX-(t.left+t.width/2)}else this.startOffset=0,window.clearTimeout(this.mouseTimeout),this.mouseTimeout=window.setTimeout((()=>{this.thumbPressed=!0}),300);const i=!m.AR||{passive:!0,capture:!0},s=!!m.AR&&{passive:!0},a="touches"in e;this.onMouseMove(e),this.app.addEventListener(a?"touchmove":"mousemove",this.onMouseMove,s),(0,m.d7)(this.app,a?"touchend":"mouseup",this.onSliderMouseUp,i),this.$emit("start",this.internalValue)},onSliderMouseUp(e){e.stopPropagation(),window.clearTimeout(this.mouseTimeout),this.thumbPressed=!1;const t=!!m.AR&&{passive:!0};this.app.removeEventListener("touchmove",this.onMouseMove,t),this.app.removeEventListener("mousemove",this.onMouseMove,t),this.$emit("mouseup",e),this.$emit("end",this.internalValue),(0,m.bD)(this.oldValue,this.internalValue)||(this.$emit("change",this.internalValue),this.noClick=!0),this.isActive=!1},onMouseMove(e){"mousemove"===e.type&&(this.thumbPressed=!0),this.internalValue=this.parseMouseMove(e)},onKeyDown(e){if(!this.isInteractive)return;const t=this.parseKeyDown(e,this.internalValue);null==t||t<this.minValue||t>this.maxValue||(this.internalValue=t,this.$emit("change",t))},onSliderClick(e){if(this.noClick)return void(this.noClick=!1);const t=this.$refs.thumb;t.focus(),this.onMouseMove(e),this.$emit("change",this.internalValue)},onBlur(e){this.isFocused=!1,this.$emit("blur",e)},onFocus(e){this.isFocused=!0,this.$emit("focus",e)},parseMouseMove(e){const t=this.vertical?"top":"left",i=this.vertical?"height":"width",s=this.vertical?"clientY":"clientX",{[t]:a,[i]:r}=this.$refs.track.getBoundingClientRect(),n="touches"in e?e.touches[0][s]:e[s];let l=Math.min(Math.max((n-a-this.startOffset)/r,0),1)||0;return this.vertical&&(l=1-l),this.$vuetify.rtl&&(l=1-l),parseFloat(this.min)+l*(this.maxValue-this.minValue)},parseKeyDown(e,t){if(!this.isInteractive)return;const{pageup:i,pagedown:s,end:a,home:r,left:n,right:l,down:o,up:c}=m.uP;if(![i,s,a,r,n,l,o,c].includes(e.keyCode))return;e.preventDefault();const h=this.stepNumeric||1,d=(this.maxValue-this.minValue)/h;if([n,l,o,c].includes(e.keyCode)){const i=this.$vuetify.rtl?[n,c]:[l,c],s=i.includes(e.keyCode)?1:-1,a=e.shiftKey?3:e.ctrlKey?2:1;t+=s*h*a}else if(e.keyCode===r)t=this.minValue;else if(e.keyCode===a)t=this.maxValue;else{const i=e.keyCode===s?1:-1;t-=i*h*(d>100?d/10:10)}return t},roundValue(e){if(!this.stepNumeric)return e;const t=this.step.toString().trim(),i=t.indexOf(".")>-1?t.length-t.indexOf(".")-1:0,s=this.minValue%this.stepNumeric,a=Math.round((e-s)/this.stepNumeric)*this.stepNumeric+s;return parseFloat(Math.min(a,this.maxValue).toFixed(i))}}}),b=i(517),v=i(5471);function k(e){e={...e};const t=(0,b.rF)(e),i=(0,b.WZ)(e),s=(0,b.Ag)(e);return{alpha:e.a,hex:t.substr(0,7),hexa:t,hsla:i,hsva:e,hue:e.h,rgba:s}}function C(e){const t=(0,b.gC)(e),i=(0,b.rF)(t),s=(0,b.Ag)(t);return{alpha:t.a,hex:i.substr(0,7),hexa:i,hsla:e,hsva:t,hue:t.h,rgba:s}}function y(e){const t=(0,b.aZ)(e),i=(0,b.FJ)(e),s=(0,b.WZ)(t);return{alpha:t.a,hex:i.substr(0,7),hexa:i,hsla:s,hsva:t,hue:t.h,rgba:e}}function w(e){const t=(0,b.$q)(e),i=(0,b.WZ)(t),s=(0,b.Ag)(t);return{alpha:t.a,hex:e.substr(0,7),hexa:e,hsla:i,hsva:t,hue:t.h,rgba:s}}function S(e){return w((0,b.jR)(e))}function x(e,t){return t.every((t=>e.hasOwnProperty(t)))}function _(e,t){if(!e)return y({r:255,g:0,b:0,a:1});if("string"===typeof e){if("transparent"===e)return w("#00000000");const i=(0,b.jR)(e);return t&&i===t.hexa?t:w(i)}if("object"===typeof e){if(e.hasOwnProperty("alpha"))return e;const i=e.hasOwnProperty("a")?parseFloat(e.a):1;if(x(e,["r","g","b"]))return t&&e===t.rgba?t:y({...e,a:i});if(x(e,["h","s","l"]))return t&&e===t.hsla?t:C({...e,a:i});if(x(e,["h","s","v"]))return t&&e===t.hsva?t:k({...e,a:i})}return y({r:255,g:0,b:0,a:1})}function $(e,t){if(t){const{a:t,...i}=e;return i}return e}function A(e,t){if(null==t)return e;if("string"===typeof t)return 7===t.length?e.hex:e.hexa;if("object"===typeof t){const i="number"===typeof t.a&&0===t.a?!!t.a:!t.a;if(x(t,["r","g","b"]))return $(e.rgba,i);if(x(t,["h","s","l"]))return $(e.hsla,i);if(x(t,["h","s","v"]))return $(e.hsva,i)}return e}function D(e){return!!e&&("string"===typeof e?e.length>7:"object"===typeof e&&(x(e,["a"])||x(e,["alpha"])))}var M=v.Ay.extend({name:"v-color-picker-preview",props:{color:Object,disabled:Boolean,hideAlpha:Boolean},methods:{genAlpha(){return this.genTrack({staticClass:"v-color-picker__alpha",props:{thumbColor:"grey lighten-2",hideDetails:!0,value:this.color.alpha,step:0,min:0,max:1},style:{backgroundImage:this.disabled?void 0:`linear-gradient(to ${this.$vuetify.rtl?"left":"right"}, transparent, ${(0,b.kH)(this.color.rgba)})`},on:{input:e=>this.color.alpha!==e&&this.$emit("update:color",k({...this.color.hsva,a:e}))}})},genSliders(){return this.$createElement("div",{staticClass:"v-color-picker__sliders"},[this.genHue(),!this.hideAlpha&&this.genAlpha()])},genDot(){return this.$createElement("div",{staticClass:"v-color-picker__dot"},[this.$createElement("div",{style:{background:(0,b.V6)(this.color.rgba)}})])},genHue(){return this.genTrack({staticClass:"v-color-picker__hue",props:{thumbColor:"grey lighten-2",hideDetails:!0,value:this.color.hue,step:0,min:0,max:360},on:{input:e=>this.color.hue!==e&&this.$emit("update:color",k({...this.color.hsva,h:e}))}})},genTrack(e){return this.$createElement(g,{class:"v-color-picker__track",...e,props:{disabled:this.disabled,...e.props}})}},render(e){return e("div",{staticClass:"v-color-picker__preview",class:{"v-color-picker__preview--hide-alpha":this.hideAlpha}},[this.genDot(),this.genSliders()])}}),E=v.Ay.extend({name:"v-color-picker-canvas",props:{color:{type:Object,default:()=>y({r:255,g:0,b:0,a:1})},disabled:Boolean,dotSize:{type:[Number,String],default:10},height:{type:[Number,String],default:150},width:{type:[Number,String],default:300}},data(){return{boundingRect:{width:0,height:0,left:0,top:0}}},computed:{dot(){return this.color?{x:this.color.hsva.s*parseInt(this.width,10),y:(1-this.color.hsva.v)*parseInt(this.height,10)}:{x:0,y:0}}},watch:{"color.hue":"updateCanvas"},mounted(){this.updateCanvas()},methods:{emitColor(e,t){const{left:i,top:s,width:a,height:r}=this.boundingRect;this.$emit("update:color",k({h:this.color.hue,s:(0,m.qE)(e-i,0,a)/a,v:1-(0,m.qE)(t-s,0,r)/r,a:this.color.alpha}))},updateCanvas(){if(!this.color)return;const e=this.$refs.canvas,t=e.getContext("2d");if(!t)return;const i=t.createLinearGradient(0,0,e.width,0);i.addColorStop(0,"hsla(0, 0%, 100%, 1)"),i.addColorStop(1,`hsla(${this.color.hue}, 100%, 50%, 1)`),t.fillStyle=i,t.fillRect(0,0,e.width,e.height);const s=t.createLinearGradient(0,0,0,e.height);s.addColorStop(0,"hsla(0, 0%, 100%, 0)"),s.addColorStop(1,"hsla(0, 0%, 0%, 1)"),t.fillStyle=s,t.fillRect(0,0,e.width,e.height)},handleClick(e){this.disabled||(this.boundingRect=this.$el.getBoundingClientRect(),this.emitColor(e.clientX,e.clientY))},handleMouseDown(e){e.preventDefault(),this.disabled||(this.boundingRect=this.$el.getBoundingClientRect(),window.addEventListener("mousemove",this.handleMouseMove),window.addEventListener("mouseup",this.handleMouseUp))},handleMouseMove(e){this.disabled||this.emitColor(e.clientX,e.clientY)},handleMouseUp(){window.removeEventListener("mousemove",this.handleMouseMove),window.removeEventListener("mouseup",this.handleMouseUp)},genCanvas(){return this.$createElement("canvas",{ref:"canvas",attrs:{width:this.width,height:this.height}})},genDot(){const e=parseInt(this.dotSize,10)/2,t=(0,m.Dg)(this.dot.x-e),i=(0,m.Dg)(this.dot.y-e);return this.$createElement("div",{staticClass:"v-color-picker__canvas-dot",class:{"v-color-picker__canvas-dot--disabled":this.disabled},style:{width:(0,m.Dg)(this.dotSize),height:(0,m.Dg)(this.dotSize),transform:`translate(${t}, ${i})`}})}},render(e){return e("div",{staticClass:"v-color-picker__canvas",style:{width:(0,m.Dg)(this.width),height:(0,m.Dg)(this.height)},on:{click:this.handleClick,mousedown:this.handleMouseDown}},[this.genCanvas(),this.genDot()])}}),V=i(4728),T=i(569);const O={rgba:{inputs:[["r",255,"int"],["g",255,"int"],["b",255,"int"],["a",1,"float"]],from:y},hsla:{inputs:[["h",360,"int"],["s",1,"float"],["l",1,"float"],["a",1,"float"]],from:C},hexa:{from:w}};var j=v.Ay.extend({name:"v-color-picker-edit",props:{color:Object,disabled:Boolean,hideAlpha:Boolean,hideModeSwitch:Boolean,mode:{type:String,default:"rgba",validator:e=>Object.keys(O).includes(e)}},data(){return{modes:O,internalMode:this.mode}},computed:{currentMode(){return this.modes[this.internalMode]}},watch:{mode(e){this.internalMode=e}},created(){this.internalMode=this.mode},methods:{getValue(e,t){return"float"===t?Math.round(100*e)/100:"int"===t?Math.round(e):0},parseValue(e,t){return"float"===t?parseFloat(e):"int"===t&&parseInt(e,10)||0},changeMode(){const e=Object.keys(this.modes),t=e.indexOf(this.internalMode),i=e[(t+1)%e.length];this.internalMode=i,this.$emit("update:mode",i)},genInput(e,t,i,s){return this.$createElement("div",{staticClass:"v-color-picker__input"},[this.$createElement("input",{key:e,attrs:t,domProps:{value:i},on:s}),this.$createElement("span",e.toUpperCase())])},genInputs(){if("hexa"===this.internalMode){const e=this.color.hexa,t=this.hideAlpha&&e.endsWith("FF")?e.substr(0,7):e;return this.genInput("hex",{maxlength:this.hideAlpha?7:9,disabled:this.disabled},t,{change:e=>{const t=e.target;this.$emit("update:color",this.currentMode.from((0,b.jR)(t.value)))}})}{const e=this.hideAlpha?this.currentMode.inputs.slice(0,-1):this.currentMode.inputs;return e.map((([e,t,i])=>{const s=this.color[this.internalMode];return this.genInput(e,{type:"number",min:0,max:t,step:"float"===i?"0.01":"int"===i?"1":void 0,disabled:this.disabled},this.getValue(s[e],i),{input:t=>{const a=t.target,r=this.parseValue(a.value||"0",i);this.$emit("update:color",this.currentMode.from(Object.assign({},s,{[e]:r}),this.color.alpha))}})}))}},genSwitch(){return this.$createElement(V.A,{props:{small:!0,icon:!0,disabled:this.disabled},on:{click:this.changeMode}},[this.$createElement(T.A,"$unfold")])}},render(e){return e("div",{staticClass:"v-color-picker__edit"},[this.genInputs(),!this.hideModeSwitch&&this.genSwitch()])}});const N=Object.freeze({base:"#f44336",lighten5:"#ffebee",lighten4:"#ffcdd2",lighten3:"#ef9a9a",lighten2:"#e57373",lighten1:"#ef5350",darken1:"#e53935",darken2:"#d32f2f",darken3:"#c62828",darken4:"#b71c1c",accent1:"#ff8a80",accent2:"#ff5252",accent3:"#ff1744",accent4:"#d50000"}),I=Object.freeze({base:"#e91e63",lighten5:"#fce4ec",lighten4:"#f8bbd0",lighten3:"#f48fb1",lighten2:"#f06292",lighten1:"#ec407a",darken1:"#d81b60",darken2:"#c2185b",darken3:"#ad1457",darken4:"#880e4f",accent1:"#ff80ab",accent2:"#ff4081",accent3:"#f50057",accent4:"#c51162"}),F=Object.freeze({base:"#9c27b0",lighten5:"#f3e5f5",lighten4:"#e1bee7",lighten3:"#ce93d8",lighten2:"#ba68c8",lighten1:"#ab47bc",darken1:"#8e24aa",darken2:"#7b1fa2",darken3:"#6a1b9a",darken4:"#4a148c",accent1:"#ea80fc",accent2:"#e040fb",accent3:"#d500f9",accent4:"#aa00ff"}),z=Object.freeze({base:"#673ab7",lighten5:"#ede7f6",lighten4:"#d1c4e9",lighten3:"#b39ddb",lighten2:"#9575cd",lighten1:"#7e57c2",darken1:"#5e35b1",darken2:"#512da8",darken3:"#4527a0",darken4:"#311b92",accent1:"#b388ff",accent2:"#7c4dff",accent3:"#651fff",accent4:"#6200ea"}),B=Object.freeze({base:"#3f51b5",lighten5:"#e8eaf6",lighten4:"#c5cae9",lighten3:"#9fa8da",lighten2:"#7986cb",lighten1:"#5c6bc0",darken1:"#3949ab",darken2:"#303f9f",darken3:"#283593",darken4:"#1a237e",accent1:"#8c9eff",accent2:"#536dfe",accent3:"#3d5afe",accent4:"#304ffe"}),L=Object.freeze({base:"#2196f3",lighten5:"#e3f2fd",lighten4:"#bbdefb",lighten3:"#90caf9",lighten2:"#64b5f6",lighten1:"#42a5f5",darken1:"#1e88e5",darken2:"#1976d2",darken3:"#1565c0",darken4:"#0d47a1",accent1:"#82b1ff",accent2:"#448aff",accent3:"#2979ff",accent4:"#2962ff"}),P=Object.freeze({base:"#03a9f4",lighten5:"#e1f5fe",lighten4:"#b3e5fc",lighten3:"#81d4fa",lighten2:"#4fc3f7",lighten1:"#29b6f6",darken1:"#039be5",darken2:"#0288d1",darken3:"#0277bd",darken4:"#01579b",accent1:"#80d8ff",accent2:"#40c4ff",accent3:"#00b0ff",accent4:"#0091ea"}),R=Object.freeze({base:"#00bcd4",lighten5:"#e0f7fa",lighten4:"#b2ebf2",lighten3:"#80deea",lighten2:"#4dd0e1",lighten1:"#26c6da",darken1:"#00acc1",darken2:"#0097a7",darken3:"#00838f",darken4:"#006064",accent1:"#84ffff",accent2:"#18ffff",accent3:"#00e5ff",accent4:"#00b8d4"}),U=Object.freeze({base:"#009688",lighten5:"#e0f2f1",lighten4:"#b2dfdb",lighten3:"#80cbc4",lighten2:"#4db6ac",lighten1:"#26a69a",darken1:"#00897b",darken2:"#00796b",darken3:"#00695c",darken4:"#004d40",accent1:"#a7ffeb",accent2:"#64ffda",accent3:"#1de9b6",accent4:"#00bfa5"}),W=Object.freeze({base:"#4caf50",lighten5:"#e8f5e9",lighten4:"#c8e6c9",lighten3:"#a5d6a7",lighten2:"#81c784",lighten1:"#66bb6a",darken1:"#43a047",darken2:"#388e3c",darken3:"#2e7d32",darken4:"#1b5e20",accent1:"#b9f6ca",accent2:"#69f0ae",accent3:"#00e676",accent4:"#00c853"}),H=Object.freeze({base:"#8bc34a",lighten5:"#f1f8e9",lighten4:"#dcedc8",lighten3:"#c5e1a5",lighten2:"#aed581",lighten1:"#9ccc65",darken1:"#7cb342",darken2:"#689f38",darken3:"#558b2f",darken4:"#33691e",accent1:"#ccff90",accent2:"#b2ff59",accent3:"#76ff03",accent4:"#64dd17"}),q=Object.freeze({base:"#cddc39",lighten5:"#f9fbe7",lighten4:"#f0f4c3",lighten3:"#e6ee9c",lighten2:"#dce775",lighten1:"#d4e157",darken1:"#c0ca33",darken2:"#afb42b",darken3:"#9e9d24",darken4:"#827717",accent1:"#f4ff81",accent2:"#eeff41",accent3:"#c6ff00",accent4:"#aeea00"}),Y=Object.freeze({base:"#ffeb3b",lighten5:"#fffde7",lighten4:"#fff9c4",lighten3:"#fff59d",lighten2:"#fff176",lighten1:"#ffee58",darken1:"#fdd835",darken2:"#fbc02d",darken3:"#f9a825",darken4:"#f57f17",accent1:"#ffff8d",accent2:"#ffff00",accent3:"#ffea00",accent4:"#ffd600"}),X=Object.freeze({base:"#ffc107",lighten5:"#fff8e1",lighten4:"#ffecb3",lighten3:"#ffe082",lighten2:"#ffd54f",lighten1:"#ffca28",darken1:"#ffb300",darken2:"#ffa000",darken3:"#ff8f00",darken4:"#ff6f00",accent1:"#ffe57f",accent2:"#ffd740",accent3:"#ffc400",accent4:"#ffab00"}),Z=Object.freeze({base:"#ff9800",lighten5:"#fff3e0",lighten4:"#ffe0b2",lighten3:"#ffcc80",lighten2:"#ffb74d",lighten1:"#ffa726",darken1:"#fb8c00",darken2:"#f57c00",darken3:"#ef6c00",darken4:"#e65100",accent1:"#ffd180",accent2:"#ffab40",accent3:"#ff9100",accent4:"#ff6d00"}),G=Object.freeze({base:"#ff5722",lighten5:"#fbe9e7",lighten4:"#ffccbc",lighten3:"#ffab91",lighten2:"#ff8a65",lighten1:"#ff7043",darken1:"#f4511e",darken2:"#e64a19",darken3:"#d84315",darken4:"#bf360c",accent1:"#ff9e80",accent2:"#ff6e40",accent3:"#ff3d00",accent4:"#dd2c00"}),K=Object.freeze({base:"#795548",lighten5:"#efebe9",lighten4:"#d7ccc8",lighten3:"#bcaaa4",lighten2:"#a1887f",lighten1:"#8d6e63",darken1:"#6d4c41",darken2:"#5d4037",darken3:"#4e342e",darken4:"#3e2723"}),J=Object.freeze({base:"#607d8b",lighten5:"#eceff1",lighten4:"#cfd8dc",lighten3:"#b0bec5",lighten2:"#90a4ae",lighten1:"#78909c",darken1:"#546e7a",darken2:"#455a64",darken3:"#37474f",darken4:"#263238"}),Q=Object.freeze({base:"#9e9e9e",lighten5:"#fafafa",lighten4:"#f5f5f5",lighten3:"#eeeeee",lighten2:"#e0e0e0",lighten1:"#bdbdbd",darken1:"#757575",darken2:"#616161",darken3:"#424242",darken4:"#212121"}),ee=Object.freeze({black:"#000000",white:"#ffffff",transparent:"transparent"});var te=Object.freeze({red:N,pink:I,purple:F,deepPurple:z,indigo:B,blue:L,lightBlue:P,cyan:R,teal:U,green:W,lightGreen:H,lime:q,yellow:Y,amber:X,orange:Z,deepOrange:G,brown:K,blueGrey:J,grey:Q,shades:ee}),ie=i(3381);function se(e){return Object.keys(e).map((t=>{const i=e[t];return i.base?[i.base,i.darken4,i.darken3,i.darken2,i.darken1,i.lighten1,i.lighten2,i.lighten3,i.lighten4,i.lighten5]:[i.black,i.white,i.transparent]}))}const ae=S("#FFFFFF").rgba,re=S("#000000").rgba;var ne=(0,d.A)(ie.A).extend({name:"v-color-picker-swatches",props:{swatches:{type:Array,default:()=>se(te)},disabled:Boolean,color:Object,maxWidth:[Number,String],maxHeight:[Number,String]},methods:{genColor(e){const t=this.$createElement("div",{style:{background:e}},[(0,m.bD)(this.color,_(e,null))&&this.$createElement(T.A,{props:{small:!0,dark:(0,b.yN)(this.color.rgba,ae)>2&&this.color.alpha>.5,light:(0,b.yN)(this.color.rgba,re)>2&&this.color.alpha>.5}},"$success")]);return this.$createElement("div",{staticClass:"v-color-picker__color",on:{click:()=>this.disabled||this.$emit("update:color",S("transparent"===e?"#00000000":e))}},[t])},genSwatches(){return this.swatches.map((e=>{const t=e.map(this.genColor);return this.$createElement("div",{staticClass:"v-color-picker__swatch"},t)}))}},render(e){return e("div",{staticClass:"v-color-picker__swatches",style:{maxWidth:(0,m.Dg)(this.maxWidth),maxHeight:(0,m.Dg)(this.maxHeight)}},[this.$createElement("div",this.genSwatches())])}}),le=i(3251),oe=(0,d.A)(le.A,ie.A).extend({name:"v-color-picker",props:{canvasHeight:{type:[String,Number],default:150},disabled:Boolean,dotSize:{type:[Number,String],default:10},flat:Boolean,hideCanvas:Boolean,hideSliders:Boolean,hideInputs:Boolean,hideModeSwitch:Boolean,mode:{type:String,default:"rgba",validator:e=>Object.keys(O).includes(e)},showSwatches:Boolean,swatches:Array,swatchesMaxHeight:{type:[Number,String],default:150},value:{type:[Object,String]},width:{type:[Number,String],default:300}},data:()=>({internalValue:y({r:255,g:0,b:0,a:1})}),computed:{hideAlpha(){return!!this.value&&!D(this.value)}},watch:{value:{handler(e){this.updateColor(_(e,this.internalValue))},immediate:!0}},methods:{updateColor(e){this.internalValue=e;const t=A(this.internalValue,this.value);(0,m.bD)(t,this.value)||(this.$emit("input",t),this.$emit("update:color",this.internalValue))},genCanvas(){return this.$createElement(E,{props:{color:this.internalValue,disabled:this.disabled,dotSize:this.dotSize,width:this.width,height:this.canvasHeight},on:{"update:color":this.updateColor}})},genControls(){return this.$createElement("div",{staticClass:"v-color-picker__controls"},[!this.hideSliders&&this.genPreview(),!this.hideInputs&&this.genEdit()])},genEdit(){return this.$createElement(j,{props:{color:this.internalValue,disabled:this.disabled,hideAlpha:this.hideAlpha,hideModeSwitch:this.hideModeSwitch,mode:this.mode},on:{"update:color":this.updateColor,"update:mode":e=>this.$emit("update:mode",e)}})},genPreview(){return this.$createElement(M,{props:{color:this.internalValue,disabled:this.disabled,hideAlpha:this.hideAlpha},on:{"update:color":this.updateColor}})},genSwatches(){return this.$createElement(ne,{props:{dark:this.dark,light:this.light,disabled:this.disabled,swatches:this.swatches,color:this.internalValue,maxHeight:this.swatchesMaxHeight},on:{"update:color":this.updateColor}})}},render(e){return e(o.A,{staticClass:"v-color-picker",class:{"v-color-picker--flat":this.flat,...this.themeClasses,...this.elevationClasses},props:{maxWidth:this.width}},[!this.hideCanvas&&this.genCanvas(),(!this.hideSliders||!this.hideInputs)&&this.genControls(),this.showSwatches&&this.genSwatches()])}}),ce=i(3449),he=i(3064),de=i(9991),ue=i(6930),fe=i(2756),me=i(5834),pe=i(7150),ge=i(1034),be=i(7112),ve=function(){var e=this,t=e._self._c;return t(ce.A,[t(a.A,{staticClass:"mb-4"},[t(fe.A,{attrs:{align:"center","no-gutters":""}},[t(l.A,{attrs:{cols:"12"}},[t("div",{staticClass:"d-flex justify-space-between pa-4"},[t(be.A,{staticClass:"search-field",staticStyle:{"max-width":"400px"},attrs:{"prepend-inner-icon":"mdi-magnify",placeholder:"Search courses...","hide-details":"","single-line":"",filled:"",rounded:"",dense:""},on:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.loadCourses.apply(null,arguments)}},model:{value:e.options.search,callback:function(t){e.$set(e.options,"search",t)},expression:"options.search"}}),t(s.A,{attrs:{color:"primary"},on:{click:e.openCreateDialog}},[t(ue.A,{attrs:{left:""}},[e._v("mdi-plus")]),e._v(" New Course ")],1)],1)])],1)],1),t(a.A,[t(he.A,{attrs:{headers:e.headers,items:e.courses,loading:e.loading,"items-per-page":10,search:e.options.search},scopedSlots:e._u([{key:"item.courseColor",fn:function({item:e}){return[t(n.A,{staticClass:"mr-1",staticStyle:{width:"50px"},attrs:{color:e.courseColor,small:""}})]}},{key:"item.departments",fn:function({item:i}){return e._l(i.departments,(function(i){return t(n.A,{key:i._id,staticClass:"mr-1 mb-1",attrs:{small:""}},[e._v(" "+e._s(i.name)+" ")])}))}},{key:"item.actions",fn:function({item:i}){return[t("div",{staticClass:"d-flex justify-end"},[t(s.A,{staticClass:"mr-2",attrs:{icon:"",small:"",color:"primary"},on:{click:function(t){return e.openEditDialog(i)}}},[t(ue.A,{attrs:{small:""}},[e._v("mdi-pencil")])],1),t(s.A,{attrs:{icon:"",small:"",color:"error"},on:{click:function(t){return e.confirmDelete(i)}}},[t(ue.A,{attrs:{small:""}},[e._v("mdi-delete")])],1)],1)]}},{key:"no-data",fn:function(){return[t("div",{staticClass:"pa-8 text-center"},[t(ue.A,{attrs:{size:"64",color:"grey lighten-1"}},[e._v("mdi-book-outline")]),t("div",{staticClass:"text-h6 grey--text text--darken-1 mt-4"},[e._v(" No courses found ")]),t("div",{staticClass:"text-body-2 grey--text mt-2"},[e._v(" Try adjusting your search or add a new course ")])],1)]},proxy:!0}])})],1),t(de.A,{attrs:{"max-width":"500px"},model:{value:e.dialog,callback:function(t){e.dialog=t},expression:"dialog"}},[t(a.A,[t(r.ri,[t("span",{staticClass:"text-h5"},[e._v(e._s(e.formTitle))])]),t(r.OQ,[t(ce.A,[t(fe.A,[t(l.A,{attrs:{cols:"12"}},[t(be.A,{attrs:{label:"Course Name","error-messages":e.nameError,required:""},model:{value:e.editedItem.courseName,callback:function(t){e.$set(e.editedItem,"courseName",t)},expression:"editedItem.courseName"}})],1),t(l.A,{attrs:{cols:"12"}},[t(be.A,{attrs:{label:"Course Code","error-messages":e.codeError,required:""},model:{value:e.editedItem.courseCode,callback:function(t){e.$set(e.editedItem,"courseCode",t)},expression:"editedItem.courseCode"}})],1),t(l.A,{attrs:{cols:"12"}},[t(oe,{staticClass:"ma-2",attrs:{mode:"hex","hide-mode-switch":"","hide-inputs":"",flat:""},model:{value:e.editedItem.courseColor,callback:function(t){e.$set(e.editedItem,"courseColor",t)},expression:"editedItem.courseColor"}})],1),e.isAdmin?t(l.A,{attrs:{cols:"12"}},[t(me.A,{attrs:{items:e.filteredDepartments,"item-text":"name","item-value":"_id",label:"Departments","error-messages":e.departmentError,multiple:"",chips:"","deletable-chips":"",required:""},model:{value:e.editedItem.departments,callback:function(t){e.$set(e.editedItem,"departments",t)},expression:"editedItem.departments"}})],1):e._e()],1)],1)],1),t(r.SL,[t(ge.A),t(s.A,{attrs:{text:""},on:{click:e.closeDialog}},[e._v("Cancel")]),t(s.A,{attrs:{color:"primary",loading:e.loading},on:{click:e.saveCourse}},[e._v(" Save ")])],1)],1)],1),t(de.A,{attrs:{"max-width":"400"},model:{value:e.deleteDialog,callback:function(t){e.deleteDialog=t},expression:"deleteDialog"}},[t(a.A,[t(r.ri,{staticClass:"error--text"},[t(ue.A,{attrs:{left:"",color:"error"}},[e._v("mdi-alert-circle")]),e._v(" Confirm Delete ")],1),t(r.OQ,{staticClass:"pt-4"},[e._v(" Are you sure you want to delete this course? "),t("div",{staticClass:"mt-4 pa-4 grey lighten-4 rounded"},[t("div",{staticClass:"font-weight-medium"},[e._v(" "+e._s(e.courseToDelete?.courseName)+" ")]),t("div",{staticClass:"caption text-medium-emphasis"},[e._v(" Code: "+e._s(e.courseToDelete?.courseCode)+" ")]),t("div",{staticClass:"caption text-medium-emphasis"},[e._v(" Departments: "),t("div",{staticClass:"mt-1"},e._l(e.courseToDelete?.departments,(function(i){return t(n.A,{key:i._id,staticClass:"mr-1 mb-1",attrs:{"x-small":""}},[e._v(" "+e._s(i.name)+" ")])})),1)])])]),t(r.SL,[t(ge.A),t(s.A,{attrs:{text:""},on:{click:function(t){e.deleteDialog=!1}}},[e._v("Cancel")]),t(s.A,{attrs:{color:"error",loading:e.loading},on:{click:e.handleDelete}},[e._v(" Delete ")])],1)],1)],1),t(pe.A,{attrs:{color:e.snackbarColor,timeout:4e3,top:"",right:""},scopedSlots:e._u([{key:"action",fn:function({attrs:i}){return[t(s.A,e._b({attrs:{icon:""},on:{click:function(t){e.snackbar=!1}}},"v-btn",i,!1),[t(ue.A,[e._v("mdi-close")])],1)]}}]),model:{value:e.snackbar,callback:function(t){e.snackbar=t},expression:"snackbar"}},[e._v(" "+e._s(e.snackbarText)+" ")])],1)},ke=[],Ce=i(5353),ye={name:"CourseListView",data:()=>({dialog:!1,deleteDialog:!1,currentUser:null,options:{search:""},headers:[{text:"Course Name",value:"courseName",sortable:!0},{text:"Course Code",value:"courseCode",sortable:!0},{text:"Color",value:"courseColor",sortable:!1},{text:"Departments",value:"departments",sortable:!1},{text:"Actions",value:"actions",sortable:!1,align:"end"}],editedItem:{courseName:"",courseCode:"",departments:[]},defaultItem:{courseName:"",courseCode:"",departments:[],courseColor:"#b22222"},courseToDelete:null,nameError:"",codeError:"",departmentError:"",snackbar:!1,snackbarColor:"",snackbarText:""}),computed:{...(0,Ce.aH)("courses",["courses","loading"]),...(0,Ce.aH)("departments",["departments"]),...(0,Ce.L8)("departments",["filteredDepartments"]),isAdmin(){return!!this.currentUser&&this.currentUser.role.some((e=>"admin"===e.name))},formTitle(){return this.editedItem._id?"Edit Course":"New Course"}},methods:{...(0,Ce.i0)("courses",["fetchCourses","fetchCoursesByDepartment","createCourse","updateCourse","deleteCourse"]),...(0,Ce.i0)("departments",["fetchDepartments"]),getCurrentUser(){const e=localStorage.getItem("user");if(e)try{const t=JSON.parse(e);this.currentUser=t.user}catch(t){console.error("Error parsing user data:",t),this.currentUser=null,this.showSnackbarMessage("Error loading user data","error")}},async loadCourses(){try{this.isAdmin?await this.fetchCourses():this.currentUser?.department&&await this.fetchCoursesByDepartment(this.currentUser.department)}catch(e){this.showSnackbarMessage("Failed to load courses","error")}},async loadDepartments(){try{await this.fetchDepartments()}catch(e){this.showSnackbarMessage("Failed to load departments","error")}},openCreateDialog(){this.editedItem={...this.defaultItem},!this.isAdmin&&this.currentUser?.department&&(this.editedItem.departments=[this.currentUser.department]),this.dialog=!0},openEditDialog(e){this.editedItem={...e},e.departments&&(this.editedItem.departments=e.departments.map((e=>e._id))),this.dialog=!0},closeDialog(){this.dialog=!1,this.nameError="",this.codeError="",this.departmentError="",this.$nextTick((()=>{this.editedItem={...this.defaultItem}}))},validateForm(){let e=!0;return this.nameError="",this.codeError="",this.departmentError="",this.editedItem.courseName?.trim()||(this.nameError="Course name is required",e=!1),this.editedItem.courseCode?.trim()||(this.codeError="Course code is required",e=!1),this.editedItem.departments?.length||(this.departmentError="At least one department is required",e=!1),e},async saveCourse(){if(this.validateForm())try{const e={...this.editedItem,departments:this.isAdmin?this.editedItem.departments:[this.currentUser.department]};this.editedItem._id?(await this.updateCourse({id:this.editedItem._id,courseData:e}),this.showSnackbarMessage("Course updated successfully!","success")):(await this.createCourse(e),this.showSnackbarMessage("Course created successfully!","success")),this.closeDialog(),this.loadCourses()}catch(e){this.showSnackbarMessage(e.response?.data?.message||"Operation failed!","error")}},confirmDelete(e){this.courseToDelete=e,this.deleteDialog=!0},async handleDelete(){try{await this.deleteCourse(this.courseToDelete._id),this.showSnackbarMessage("Course deleted successfully!","success"),this.loadCourses()}catch(e){this.showSnackbarMessage(e.response?.data?.message||"Failed to delete course!","error")}finally{this.deleteDialog=!1,this.courseToDelete=null}},showSnackbarMessage(e,t){this.snackbarText=e,this.snackbarColor=t,this.snackbar=!0}},async created(){try{this.getCurrentUser(),await Promise.all([this.loadDepartments(),this.loadCourses()])}catch(e){this.showSnackbarMessage("Failed to initialize page","error")}}},we=ye,Se=i(1656),xe=(0,Se.A)(we,ve,ke,!1,null,"652939c2",null),_e=xe.exports},4414:function(e,t,i){i(4114),i(125);var s=i(5471),a=i(8041),r=i(4152);const n=["sm","md","lg","xl"],l=(()=>n.reduce(((e,t)=>(e[t]={type:[Boolean,String,Number],default:!1},e)),{}))(),o=(()=>n.reduce(((e,t)=>(e["offset"+(0,r.Zb)(t)]={type:[String,Number],default:null},e)),{}))(),c=(()=>n.reduce(((e,t)=>(e["order"+(0,r.Zb)(t)]={type:[String,Number],default:null},e)),{}))(),h={col:Object.keys(l),offset:Object.keys(o),order:Object.keys(c)};function d(e,t,i){let s=e;if(null!=i&&!1!==i){if(t){const i=t.replace(e,"");s+=`-${i}`}return"col"!==e||""!==i&&!0!==i?(s+=`-${i}`,s.toLowerCase()):s.toLowerCase()}}const u=new Map;t.A=s.Ay.extend({name:"v-col",functional:!0,props:{cols:{type:[Boolean,String,Number],default:!1},...l,offset:{type:[String,Number],default:null},...o,order:{type:[String,Number],default:null},...c,alignSelf:{type:String,default:null,validator:e=>["auto","start","end","center","baseline","stretch"].includes(e)},tag:{type:String,default:"div"}},render(e,{props:t,data:i,children:s,parent:r}){let n="";for(const a in t)n+=String(t[a]);let l=u.get(n);if(!l){let e;for(e in l=[],h)h[e].forEach((i=>{const s=t[i],a=d(e,i,s);a&&l.push(a)}));const i=l.some((e=>e.startsWith("col-")));l.push({col:!i||!t.cols,[`col-${t.cols}`]:t.cols,[`offset-${t.offset}`]:t.offset,[`order-${t.order}`]:t.order,[`align-self-${t.alignSelf}`]:t.alignSelf}),u.set(n,l)}return e(t.tag,(0,a.Ay)(i,{class:l}),s)}})},2756:function(e,t,i){i(4114),i(125);var s=i(5471),a=i(8041),r=i(4152);const n=["sm","md","lg","xl"],l=["start","end","center"];function o(e,t){return n.reduce(((i,s)=>(i[e+(0,r.Zb)(s)]=t(),i)),{})}const c=e=>[...l,"baseline","stretch"].includes(e),h=o("align",(()=>({type:String,default:null,validator:c}))),d=e=>[...l,"space-between","space-around"].includes(e),u=o("justify",(()=>({type:String,default:null,validator:d}))),f=e=>[...l,"space-between","space-around","stretch"].includes(e),m=o("alignContent",(()=>({type:String,default:null,validator:f}))),p={align:Object.keys(h),justify:Object.keys(u),alignContent:Object.keys(m)},g={align:"align",justify:"justify",alignContent:"align-content"};function b(e,t,i){let s=g[e];if(null!=i){if(t){const i=t.replace(e,"");s+=`-${i}`}return s+=`-${i}`,s.toLowerCase()}}const v=new Map;t.A=s.Ay.extend({name:"v-row",functional:!0,props:{tag:{type:String,default:"div"},dense:Boolean,noGutters:Boolean,align:{type:String,default:null,validator:c},...h,justify:{type:String,default:null,validator:d},...u,alignContent:{type:String,default:null,validator:f},...m},render(e,{props:t,data:i,children:s}){let r="";for(const a in t)r+=String(t[a]);let n=v.get(r);if(!n){let e;for(e in n=[],p)p[e].forEach((i=>{const s=t[i],a=b(e,i,s);a&&n.push(a)}));n.push({"no-gutters":t.noGutters,"row--dense":t.dense,[`align-${t.align}`]:t.align,[`justify-${t.justify}`]:t.justify,[`align-content-${t.alignContent}`]:t.alignContent}),v.set(r,n)}return e(t.tag,(0,a.Ay)(i,{staticClass:"row",class:n}),s)}})}}]);
//# sourceMappingURL=810.02fe00ad.js.map