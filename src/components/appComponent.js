export const appComponent = {
  template: `
    <div class="app-wrap"
      :class="{ 'shake-animation': shakeAnimation, large: largeIcon }">
      <div class="app"
        @touchstart.stop="touchStart"
        @touchend.stop="touchEnd"
        @mousedown.stop="touchStart"
        @mouseup.stop="touchEnd"
        @mouseleave.stop="mouseLeave">
        <div class="app-icon"
          v-if="iconHasTemplate"
          v-html="appData.template()"
          :class="appData.class"></div>
        <img class="app-icon-img"
          v-else
          :class="{ optimize: ready }"
          :src="appData.img">
        <div class="overlay"
          v-show="appData.isPressTartget"></div>
      </div>
      <div class="app-name">{{ appName }}</div>
      <div class="unread-counter"
        v-show="hasUnreadNotification">{{ unreadAmount }}</div>
      <transition name="toggle-delete-button">
        <div class="delete-button"
          v-show="isDeleteMode"
          @click="deleteApp">
          <div class="cross"></div>
        </div>
      </transition>
    </div>
  `,
  props: ['appName', 'appData', 'isDeleteMode'],
  data() {
    return {
      ready: false,
      largeIcon: false,
      toggleDeleteModeTimer: false
    };
  },
  mounted() {
    setTimeout(() => { this.ready = true; }, 100);  // Prevent image shrink blur
  },
  computed: {
    iconHasTemplate() {
      return this.appData.hasOwnProperty('template');
    },
    hasUnreadNotification() {
      return this.appData.notification > 0;
    },
    unreadAmount() {
      return (this.appData.notification > 999) ? '1k+' : (this.appData.notification > 99) ? '100+' : this.appData.notification;
    },
    shakeAnimation() {
      return this.isDeleteMode && !this.appData.isPressTartget;
    }
  },
  methods: {
    _commit(commitMethod, payloads) {
      const STORE_MODULE_NAME_PREFIX = 'appManager/';
      this.$store.commit(STORE_MODULE_NAME_PREFIX + commitMethod, payloads);
    },
    _togglePressTarget() {
      this._commit('togglePressTarget', this.appName);
    },
    touchStart() {
      this._togglePressTarget();
      this.largeIcon = this.isDeleteMode;
      this.toggleDeleteModeTimer = setTimeout(() => {
        this._commit('deleteModeOn');
        this.largeIcon = true;
      }, 700);
    },
    touchEnd() {
      if (this.appData.isPressTartget) {
        this._togglePressTarget();
        this.largeIcon = false;
      }
      clearTimeout(this.toggleDeleteModeTimer);
    },
    mouseLeave() {
      if (this.appData.isPressTartget) {
        this._togglePressTarget();
        this.largeIcon = false;
      }
    },
    deleteApp() {
      this.$root.$emit('deleteApp', this.appName);
    }
  }
};