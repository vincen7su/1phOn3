import { appComponent } from 'components/appComponent';

const ICON_SIZE = 57;
const WINDOW_WIDTH = 320;
const PADDING = 4;
const POSITION_SHIFT = ICON_SIZE / 2;
const POSITION_SHIFT_WIDTH_MAX = WINDOW_WIDTH - POSITION_SHIFT;


export const desktopComponent = {
  template: `
    <div class="desktop"
      @mousedown="touchStart"
      @mousemove="move">
      <div class="app-container"
        v-for="appList in desktop">
        <app
          v-for="(appName, index) in appList"
          :key="index"
          :app-name="appName"
          :app-data="apps[appName]"
          :is-delete-mode="isDeleteMode"></app>
      </div>
    </div>
  `,
  components: {
    'app': appComponent
  },
  props: ['desktop', 'apps', 'isDeleteMode'],
  data() {
    return {
      isTouchStart: false,
      isFastSwipe: false,
      fastSwipeTimer: false,
      desktopIndex: 0,
      position: 0,
      mouseMovePosition: 0,
      mouseUpPosition: 0
    };
  },
  mounted() {
    document.addEventListener('mouseup', this.touchEnd);
  },
  computed: {
    maxDesktopIndex() {
      return this.desktop.length - 1;
    }
  },
  methods: {
    _getMousePosition(e) {
      let rect = this.$root.$el.getBoundingClientRect();
      return (e.pageX !== undefined) ? e.pageX - rect.left : event.touches[0].pageX;
    },
    touchStart(e) {
      if (e.target.classList.contains('app-container')) {
        this.isTouchStart = true;
        this.mouseMovePosition = this._getMousePosition(e);
        this.mouseUpPosition = this._getMousePosition(e);
        this.isFastSwipe = true;
        this.fastSwipeTimer = setTimeout(() => { this.isFastSwipe = false; }, 300);
      }
    },
    move(e) {
      if (this.isTouchStart && e.target.classList.contains('app-container')) {
        let isMouseEvent = e.pageX !== undefined;
        let position = isMouseEvent ? e.layerX : e.touches[0].pageX;
        let positionShift = isMouseEvent ? 0 : POSITION_SHIFT;
        let widthMax = isMouseEvent ? POSITION_SHIFT_WIDTH_MAX : POSITION_SHIFT_WIDTH_MAX;
        let currentMousePosition = position > positionShift ? ((position < widthMax) ? position : widthMax) : positionShift;
        let mouseMove = currentMousePosition - this.mouseMovePosition;
        this.position += mouseMove;
        this.mouseMovePosition = currentMousePosition;
        this.$el.style.transform = 'translate3d(' + this.position + 'px, 0, 0)';
      }
    },
    touchEnd(e) {
      let currentMousePosition = this._getMousePosition(e);
      if (this.isTouchStart && currentMousePosition !== this.mouseUpPosition) {
        let desktopIndexBackup = this.desktopIndex;
        if (this.isFastSwipe) {
          clearTimeout(this.fastSwipeTimer);
          this.isFastSwipe = false;
          this.desktopIndex = (this.mouseUpPosition > currentMousePosition) ? this.desktopIndex - 1 : this.desktopIndex + 1;
        } else {
          this.desktopIndex = Math.round(this.position / WINDOW_WIDTH);
        }

        if (this.desktopIndex < -this.maxDesktopIndex || this.desktopIndex > 0) {
          this.desktopIndex = desktopIndexBackup;
        }
        this.position = this.desktopIndex * WINDOW_WIDTH;
        this.$el.classList.add('auto-move');
        this.$el.style.transform = 'translate3d(' + this.position + 'px, 0, 0)';
        setTimeout(() => {
          this.$el.classList.remove('auto-move');
          this.$root.$emit('destopIndexChange', Math.abs(this.desktopIndex));
        }, 300);
      }
      this.isTouchStart = false;
    }
  }
};