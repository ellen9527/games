(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{382:function(t,e,r){"use strict";r.r(e);r(45),r(158),r(63);var n={name:"Timer",props:{switch:{type:Boolean,default:!1}},data:function(){return{timer:null,time:0}},computed:{formatTime:function(){var t=Number(this.time),e="00",r=this._padzero(Math.floor(t/60));r>=60&&(e=this._padzero(Math.floor(r/60)));var n=this._padzero(t%60);return"".concat(e,":").concat(r,":").concat(n)}},created:function(){this.initTimer()},watch:{switch:function(t){t?this.initTimer():clearInterval(this.timer)}},methods:{initTimer:function(){var t=this;this.timer&&clearInterval(this.timer),this.time=0,this.timer=setInterval((function(){t.time++}),1e3)},restart:function(){this.initTimer()},_padzero:function(t){return t<10?"0".concat(t):t}}},o=r(73),component=Object(o.a)(n,(function(){var t=this;return(0,t._self._c)("div",{staticClass:"timer blue-grey--text blue-grey--darken-2"},[t._v(t._s(t.formatTime))])}),[],!1,null,null,null);e.default=component.exports}}]);