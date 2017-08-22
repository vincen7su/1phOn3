!function(t){function e(s){if(i[s])return i[s].exports;var n=i[s]={i:s,l:!1,exports:{}};return t[s].call(n.exports,n,n.exports,e),n.l=!0,n.exports}var i={};e.m=t,e.c=i,e.d=function(t,i,s){e.o(t,i)||Object.defineProperty(t,i,{configurable:!1,enumerable:!0,get:s})},e.n=function(t){var i=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(i,"a",i),i},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=1)}([function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.appComponent={template:'\n    <div class="app-wrap"\n      :class="{ \'shake-animation\': shakeAnimation, large: largeIcon }">\n      <div class="app"\n        @touchstart.stop="touchStart"\n        @touchend.stop="touchEnd"\n        @mousedown.stop="touchStart"\n        @mouseup.stop="touchEnd"\n        @mouseleave.stop="mouseLeave">\n        <div class="app-icon"\n          v-if="iconHasTemplate"\n          v-html="appData.template()"\n          :class="appData.class"></div>\n        <img class="app-icon-img"\n          v-else\n          :class="{ optimize: ready }"\n          :src="appData.img">\n        <div class="overlay"\n          v-show="appData.isPressTartget"></div>\n      </div>\n      <div class="app-name">{{ appName }}</div>\n      <div class="unread-counter"\n        v-show="hasUnreadNotification">{{ unreadAmount }}</div>\n      <transition name="toggle-delete-button">\n        <div class="delete-button"\n          v-show="isDeleteMode"\n          @click="deleteApp">\n          <div class="cross"></div>\n        </div>\n      </transition>\n    </div>\n  ',props:["appName","appData","isDeleteMode"],data:function(){return{ready:!1,largeIcon:!1,toggleDeleteModeTimer:!1}},mounted:function(){var t=this;setTimeout(function(){t.ready=!0},100)},computed:{iconHasTemplate:function(){return this.appData.hasOwnProperty("template")},hasUnreadNotification:function(){return this.appData.notification>0},unreadAmount:function(){return this.appData.notification>999?"1k+":this.appData.notification>99?"100+":this.appData.notification},shakeAnimation:function(){return this.isDeleteMode&&!this.appData.isPressTartget}},methods:{_commit:function(t,e){this.$store.commit("appManager/"+t,e)},_togglePressTarget:function(){this._commit("togglePressTarget",this.appName)},touchStart:function(){var t=this;this._togglePressTarget(),this.largeIcon=this.isDeleteMode,this.toggleDeleteModeTimer=setTimeout(function(){t._commit("deleteModeOn"),t.largeIcon=!0},700)},touchEnd:function(){this.appData.isPressTartget&&(this._togglePressTarget(),this.largeIcon=!1),clearTimeout(this.toggleDeleteModeTimer)},mouseLeave:function(){this.appData.isPressTartget&&(this._togglePressTarget(),this.largeIcon=!1)},deleteApp:function(){this.$root.$emit("deleteApp",this.appName)}}}},function(t,e,i){"use strict";var s=i(2),n=i(3),o=i(4),a=i(0),r=i(5),c=i(6);new Vue({el:"#iphone",store:s.iOS,data:{screenRatio:{width:320,height:568},navigationIndex:2,modalData:{show:!1,title:"",content:"",buttonSetting:[{class:"",text:"",value:""}]}},components:{"status-bar":n.statusBarComponent,desktop:o.desktopComponent,app:a.appComponent,modal:r.modalComponent,"assistive-touch":c.assistiveTouchComponent},mounted:function(){this.$on("deleteApp",this._showConfirmModal),this.$on("homeScreen",this._appDeleteModeOff),this.$on("destopIndexChange",this._destopIndexChange)},computed:{statusBarData:function(){return this.$store.state.statusBar},appManager:function(){return this.$store.state.appManager},isDeleteMode:function(){return this.appManager.isDeleteMode},desktop:function(){return this.appManager.desktop},desktopNavigationDots:function(){return this.desktop.length+1},dock:function(){return this.appManager.dock},apps:function(){return this.appManager.apps}},methods:{_setScreenSize:function(){var t=window.innerWidth,e=window.innerHeight,i=t/this.screenRatio.width*this.screenRatio.height,s=e/this.screenRatio.height*this.screenRatio.width;s<=t?this.$el.style.width=s+"px":this.$el.style.height=i+"px"},_showConfirmModal:function(t){var e=this;this.modalData.title="要刪除 「"+t+"」 嗎 ?",this.modalData.content="刪除此 App 也會刪除其資料。",this.$set(this.modalData,"buttonSetting",[{class:"text-blue",text:"取消",value:!1},{class:"text-red",text:"刪除",value:!0}]),this.$once("modalButtonClick",function(t){e.modalData.show=!1}),this.modalData.show=!0},_appDeleteModeOff:function(){this.$store.commit("appManager/deleteModeOff")},_destopIndexChange:function(t){this.navigationIndex=t+2}}})},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s={state:{signal:3,maxSignal:5,signalProvider:"中華電信",wifiSignal:5,battery:66,GPSIslocating:!0}},n={namespaced:!0,state:{isDeleteMode:!1,desktop:[["行事曆","天氣","Instagram","Facebook","TV Time","露天拍賣"],["設定"]],dock:["LINE","Skype","Chrome","Messenger"],apps:{"行事曆":{template:function(){var t=["星期日","星期一","星期二","星期三","星期四","星期五","星期六"],e=new Date;return'\n            <div class="weekday">'+t[e.getDay()]+'</div>\n            <div class="day">'+e.getDate()+"</div>\n          "},class:"calander"},"天氣":{template:function(){return'\n            <div class="sun"></div>\n            <div class="cloud">\n              <div class="cloud-wrap">\n                <div class="circle-top"></div>\n                <div class="circle-right"></div>\n                <div class="circle-small"></div>\n                <div class="base"></div>\n              </div>\n            </div>\n          '},class:"weather"},Instagram:{template:function(){return'\n            <div class="camera"></div>\n          '},class:"instagram"},Facebook:{template:function(){return'\n            <div class="logo"></div>\n            <div class="logo-mask"></div>\n          '},class:"facebook",notification:7},Chrome:{template:function(){return'\n            <div class="logo">\n              <div class="red-part">\n                <div class="shade"></div>\n              </div>\n              <div class="yellow-part">\n                <div class="shade"></div>\n              </div>\n              <div class="green-part">\n                <div class="shade"></div>\n              </div>\n              <div class="core-circle"></div>\n            </div>\n          '},class:"chrome"},"TV Time":{template:function(){return'\n            <div class="logo">\n              <div class="row">\n                <div class="cell yellow1"></div>\n                <div class="cell yellow2"></div>\n                <div class="cell yellow3"></div>\n              </div>\n              <div class="row">\n                <div class="cell"></div>\n                <div class="cell yellow4"></div>\n                <div class="cell"></div>\n              </div>\n              <div class="row">\n                <div class="cell"></div>\n                <div class="cell yellow5"></div>\n                <div class="cell"></div>\n              </div>\n            </div>\n          '},class:"tv-time"},"露天拍賣":{img:"img/ruten.png"},"設定":{img:"img/settings.jpg"},Skype:{img:"img/skype.jpg"},LINE:{img:"img/line.jpg",notification:30},Messenger:{img:"img/messenger.png",notification:3}}},mutations:{togglePressTarget:function(t,e){var i=t.apps[e];void 0===i.isPressTartget&&Vue.set(i,"isPressTartget",!1),i.isPressTartget=!i.isPressTartget},deleteModeOn:function(t){t.isDeleteMode=!0},deleteModeOff:function(t){t.isDeleteMode=!1}}},o={state:{notificationQueue:[{app:"露天拍賣",timestamp:1234567890,title:"",content:""}]}};e.iOS=new Vuex.Store({modules:{statusBar:s,appManager:n,notification:o}})},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.statusBarComponent={template:'\n    <div class="status-bar text-white">\n      <div class="left-part">\n        <div class="signal">\n          <div class="signal-dot"\n            v-for="i in maxSignal"\n            :class="{ \'has-signal\': signal >= i }"></div>\n        </div>\n        <div class="signal-provider">{{ signalProvider }}</div>\n        <div class="network-signal">4G</div>\n      </div>\n      <div class="clock">{{ currentTime }}</div>\n      <div class="right-part">\n        <div class="battery">\n          <div class="battery-quantity" ref="batteryQuantity"></div>\n        </div>\n      </div>\n    </div>\n  ',data:function(){return{currentTimestamp:Date.now()}},mounted:function(){var t=this;window.setInterval(function(){t.currentTimestamp=Date.now()},1e3),this.$refs.batteryQuantity.style.width=this.battery+"%"},computed:{store:function(){return this.$store.state.statusBar},signal:function(){return this.store.signal},maxSignal:function(){return this.store.maxSignal},signalProvider:function(){return this.store.signalProvider},battery:function(){return this.store.battery},currentTime:function(){var t=new Date(this.currentTimestamp),e=t.getHours(),i=t.getMinutes(),s=e>=12?"下午":"上午";return e%=12,e=e||12,i=i<10?"0"+i:i,s+e+":"+i}}}},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.desktopComponent=void 0;var s=i(0);e.desktopComponent={template:'\n    <div class="desktop"\n      @mousedown="touchStart"\n      @mousemove="move">\n      <div class="app-container"\n        v-for="appList in desktop">\n        <app\n          v-for="(appName, index) in appList"\n          :key="index"\n          :app-name="appName"\n          :app-data="apps[appName]"\n          :is-delete-mode="isDeleteMode"></app>\n      </div>\n    </div>\n  ',components:{app:s.appComponent},props:["desktop","apps","isDeleteMode"],data:function(){return{isTouchStart:!1,isFastSwipe:!1,fastSwipeTimer:!1,desktopIndex:0,position:0,mouseMovePosition:0,mouseUpPosition:0}},mounted:function(){document.addEventListener("mouseup",this.touchEnd)},computed:{maxDesktopIndex:function(){return this.desktop.length-1}},methods:{_getMousePosition:function(t){var e=this.$root.$el.getBoundingClientRect();return void 0!==t.pageX?t.pageX-e.left:event.touches[0].pageX},touchStart:function(t){var e=this;t.target.classList.contains("app-container")&&(this.isTouchStart=!0,this.mouseMovePosition=this._getMousePosition(t),this.mouseUpPosition=this._getMousePosition(t),this.isFastSwipe=!0,this.fastSwipeTimer=setTimeout(function(){e.isFastSwipe=!1},300))},move:function(t){if(this.isTouchStart&&t.target.classList.contains("app-container")){var e=void 0!==t.pageX,i=e?t.layerX:t.touches[0].pageX,s=e?0:28.5,n=i>s?i<291.5?i:291.5:s,o=n-this.mouseMovePosition;this.position+=o,this.mouseMovePosition=n,this.$el.style.transform="translate3d("+this.position+"px, 0, 0)"}},touchEnd:function(t){var e=this,i=this._getMousePosition(t);if(this.isTouchStart&&i!==this.mouseUpPosition){var s=this.desktopIndex;this.isFastSwipe?(clearTimeout(this.fastSwipeTimer),this.isFastSwipe=!1,this.desktopIndex=this.mouseUpPosition>i?this.desktopIndex-1:this.desktopIndex+1):this.desktopIndex=Math.round(this.position/320),(this.desktopIndex<-this.maxDesktopIndex||this.desktopIndex>0)&&(this.desktopIndex=s),this.position=320*this.desktopIndex,this.$el.classList.add("auto-move"),this.$el.style.transform="translate3d("+this.position+"px, 0, 0)",setTimeout(function(){e.$el.classList.remove("auto-move"),e.$root.$emit("destopIndexChange",Math.abs(e.desktopIndex))},300)}this.isTouchStart=!1}}}},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.modalComponent={template:'\n    <div class="modal-overlay">\n      <div class="modal">\n        <div class="content-wrap">\n          <div class="title">{{ title }}</div>\n          <div class="content">{{ content }}</div>\n        </div>\n        <div class="button-wrap">\n          <button class="button"\n            v-for="buttonData in buttonSetting"\n            :class="buttonData.class"\n            @click="buttonClick(buttonData.value)">{{ buttonData.text }}</button>\n        </div>\n      </div>\n    </div>\n  ',props:["show","title","content","buttonSetting"],methods:{buttonClick:function(t){this.$root.$emit("modalButtonClick",t)}}}},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.assistiveTouchComponent={template:'\n    <div class="assistive-touch"\n      :class="{ active: isActive }"\n      @touchstart="touchStart"\n      @touchend="touchEnd"\n      @mousedown="touchStart">\n      <div class="assistive-touch-button"></div>\n    </div>\n  ',data:function(){return{isTap:!1,isNowPressing:!1,isActive:!1,isOpen:!1,deActiveTimer:!1,position:{x:4,y:200},mousePosition:{x:0,y:0}}},mounted:function(){document.addEventListener("touchmove",this.move),document.addEventListener("mousemove",this.move),document.addEventListener("mouseup",this.touchEnd)},methods:{move:function(t){if(this.isNowPressing){this.isTap=!1;var e=this.$root.$el.getBoundingClientRect(),i=void 0!==t.pageX,s={x:i?t.pageX-e.left:event.touches[0].pageX,y:i?t.pageY-e.top:event.touches[0].pageY},n={x:s.x-this.mousePosition.x,y:s.y-this.mousePosition.y};this.position.x+=n.x,this.position.y+=n.y,this.mousePosition.x=s.x,this.mousePosition.y=s.y,this.$el.style.transform="translate3d("+this.position.x+"px, "+this.position.y+"px, 0)"}},touchStart:function(t){clearTimeout(this.deActiveTimer),this.isActive=!0,this.isNowPressing=!0,this.isTap=!0,this.mousePosition.x=t.layerX||t.touches[0].pageX,this.mousePosition.y=t.layerY||t.touches[0].pageY},touchEnd:function(){var t=this;this.isNowPressing=!1,this.isTap&&(this.isTap=!1,this.$root.$emit("homeScreen"));var e={x:this.position.x,y:this.position.y},i={x:e.x-0<320-e.x-57?e.x-0:320-e.x-57,y:e.y-0<568-e.y-57?e.y-0:568-e.y-57};i.x<i.y?this.position.x=this.position.x+57-0<320-this.position.x?4:259:this.position.y=this.position.y-0<568-this.position.y?4:507,this.position.x=this.position.x>4?this.position.x>259?259:this.position.x:4,this.position.y=this.position.y>4?this.position.y>507?507:this.position.y:4,this.$el.classList.add("auto-move-back"),this.$el.style.transform="translate3d("+this.position.x+"px, "+this.position.y+"px, 0)",setTimeout(function(){t.$el.classList.remove("auto-move-back")},300),this.deActiveTimer=setTimeout(function(){t.isActive=!1},4e3)}}}}]);
//# sourceMappingURL=core.js.map