import { iOS } from 'store';
import { statusBarComponent } from 'components/statusBarComponent';
import { desktopComponent } from 'components/desktopComponent';
import { appComponent } from 'components/appComponent';
import { modalComponent } from 'components/modalComponent';
import { assistiveTouchComponent } from 'components/assistiveTouchComponent';

new Vue ({
  el: '#iphone',
  store: iOS,
  data: {
    screenRatio: {
      width: 320,
      height: 568
    },
    navigationIndex: 2,
    modalData: {
      show: false,
      title: '',
      content: '',
      buttonSetting: [
        {
          class: '',
          text: '',
          value: ''
        }
      ]
    }
  },
  components: {
    'status-bar': statusBarComponent,
    'desktop': desktopComponent,
    'app': appComponent,
    'modal': modalComponent,
    'assistive-touch': assistiveTouchComponent
  },
  mounted() {
    // this._setScreenSize();
    this.$on('deleteApp', this._showConfirmModal);
    this.$on('homeScreen', this._appDeleteModeOff);
    this.$on('destopIndexChange', this._destopIndexChange);
  },
  computed: {
    statusBarData() {
      return this.$store.state.statusBar;
    },
    appManager() {
      return this.$store.state.appManager;
    },
    isDeleteMode() {
      return this.appManager.isDeleteMode;
    },
    desktop() {
      return this.appManager.desktop;
    },
    desktopNavigationDots() {
      return this.desktop.length + 1;
    },
    dock() {
      return this.appManager.dock;
    },
    apps() {
      return this.appManager.apps;
    }
  },
  methods: {
    _setScreenSize() {
      let screenWidth = window.innerWidth;
      let screenHeight = window.innerHeight;
      let screenWidthAsRatioBase = screenWidth / this.screenRatio.width * this.screenRatio.height;
      let screenHeightAsRatioBase = screenHeight / this.screenRatio.height * this.screenRatio.width;
      if (screenHeightAsRatioBase <= screenWidth) {
        this.$el.style.width = screenHeightAsRatioBase + 'px';
      } else {
        this.$el.style.height = screenWidthAsRatioBase + 'px';
      }
    },
    _showConfirmModal(appName) {
      this.modalData.title = '要刪除 「' + appName + '」 嗎 ?';
      this.modalData.content = '刪除此 App 也會刪除其資料。';
      this.$set(this.modalData, 'buttonSetting', [
        { class: 'text-blue', text: '取消', value: false },
        { class: 'text-red', text: '刪除', value: true }
      ]);
      this.$once('modalButtonClick', (result) => {
        this.modalData.show = false;
      });
      this.modalData.show = true;
    },
    _appDeleteModeOff() {
      this.$store.commit('appManager/deleteModeOff');
    },
    _destopIndexChange(index) {
      let indexShift = 2;
      this.navigationIndex = index + indexShift;
    }
  }
});