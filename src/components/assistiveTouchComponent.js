const ICON_SIZE = 57;
const WINDOW_WIDTH = 320;
const WINDOW_HEIGHT = 568;
const PADDING = 4;
const POSITION_SHIFT = ICON_SIZE / 2;
const POSITION_SHIFT_WIDTH_MAX = WINDOW_WIDTH - POSITION_SHIFT;
const POSITION_SHIFT_HEIGHT_MAX = WINDOW_HEIGHT - POSITION_SHIFT;

export const assistiveTouchComponent = {
  template: `
    <div class="assistive-touch"
      :class="{ active: isActive }"
      @touchstart="touchStart"
      @touchend="touchEnd"
      @mousedown="touchStart">
      <div class="assistive-touch-button"></div>
    </div>
  `,
  data() {
    return {
      isNowPressing: false,
      isActive: false,
      isOpen: false,
      deActiveTimer: false,
      position: {
        x: 4, y: 200
      },
      mousePosition: {
        x: 0, y: 0
      },
      touchStartPosition: {
        x: 0, y: 0
      }
    };
  },
  mounted() {  // out of screen event
    document.addEventListener('touchmove', this.move);
    document.addEventListener('mousemove', this.move);
    document.addEventListener('mouseup', this.touchEnd);
  },
  computed: {
    isTap() {
      return this.isNowPressing && this.touchStartPosition.x === this.mousePosition.x && this.touchStartPosition.y === this.mousePosition.y;
    }
  },
  methods: {
    move(e) {
      if (this.isNowPressing) {
        let rect = this.$root.$el.getBoundingClientRect();
        let isMouseEvent = e.pageX !== undefined;
        let position = {
          x: isMouseEvent ? e.pageX - rect.left : e.touches[0].pageX,
          y: isMouseEvent ? e.pageY - rect.top : e.touches[0].pageY
        };
        let positionShift = isMouseEvent ? 0 : POSITION_SHIFT;
        let widthMax = isMouseEvent ? POSITION_SHIFT_WIDTH_MAX : POSITION_SHIFT_WIDTH_MAX;
        let heightMax = isMouseEvent ? POSITION_SHIFT_HEIGHT_MAX : POSITION_SHIFT_HEIGHT_MAX;
        let currentMousePosition = {
          x: position.x > positionShift ? ((position.x < widthMax) ? position.x : widthMax) : positionShift,
          y: position.y > positionShift ? ((position.y < heightMax) ? position.y : heightMax) : positionShift
        };
        let mouseMove = {
          x: position.x - this.mousePosition.x,
          y: position.y - this.mousePosition.y
        };
        this.position.x += mouseMove.x;
        this.position.y += mouseMove.y;
        this.mousePosition.x = position.x;
        this.mousePosition.y = position.y;
        this.$el.style.transform = 'translate3d(' + this.position.x + 'px, ' + this.position.y + 'px, 0)';
      }
    },
    touchStart(event) {
      clearTimeout(this.deActiveTimer);
      this.isActive = true;
      this.isNowPressing = true;
      let rect = this.$root.$el.getBoundingClientRect();
      let isMouseEvent = event.pageX !== undefined;
      this.mousePosition.x = event.pageX - rect.left || event.touches[0].pageX;
      this.mousePosition.y = event.pageY - rect.top || event.touches[0].pageY;
      this.touchStartPosition.x = this.mousePosition.x;
      this.touchStartPosition.y = this.mousePosition.y;
    },
    touchEnd() {
      if (this.isTap) {
        this.$root.$emit('homeScreen');
      }
      this.isNowPressing = false;
      let newPosition = { x: this.position.x, y: this.position.y };
      let distance = {
        x: (newPosition.x - 0 < WINDOW_WIDTH - newPosition.x - ICON_SIZE) ? newPosition.x - 0 : WINDOW_WIDTH - newPosition.x - ICON_SIZE,
        y: (newPosition.y - 0 < WINDOW_HEIGHT - newPosition.y - ICON_SIZE) ? newPosition.y - 0 : WINDOW_HEIGHT - newPosition.y - ICON_SIZE
      };
      if (distance.x < distance.y) {
        this.position.x = (this.position.x + ICON_SIZE - 0 < WINDOW_WIDTH - this.position.x) ? PADDING : WINDOW_WIDTH - ICON_SIZE - PADDING;
      } else {
        this.position.y = (this.position.y - 0 < WINDOW_HEIGHT - this.position.y) ? PADDING : WINDOW_HEIGHT - ICON_SIZE - PADDING;
      }

      // 超出螢幕範圍矯正
      this.position.x = (this.position.x > PADDING) ? ((this.position.x > WINDOW_WIDTH - ICON_SIZE - PADDING) ? WINDOW_WIDTH - ICON_SIZE - PADDING : this.position.x ) : PADDING ;
      this.position.y = (this.position.y > PADDING) ? ((this.position.y > WINDOW_HEIGHT - ICON_SIZE - PADDING) ? WINDOW_HEIGHT - ICON_SIZE - PADDING : this.position.y ) : PADDING ;

      this.$el.classList.add('auto-move-back');
      this.$el.style.transform = 'translate3d(' + this.position.x + 'px, ' + this.position.y + 'px, 0)';
      setTimeout(() => { this.$el.classList.remove('auto-move-back'); }, 300);
      this.deActiveTimer = setTimeout(() => {
        this.isActive = false;
      }, 4000);
    }
  }
};