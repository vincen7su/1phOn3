export const statusBarComponent = {
  template: `
    <div class="status-bar text-white">
      <div class="left-part">
        <div class="signal">
          <div class="signal-dot"
            v-for="i in maxSignal"
            :class="{ 'has-signal': signal >= i }"></div>
        </div>
        <div class="signal-provider">{{ signalProvider }}</div>
        <div class="network-signal">4G</div>
      </div>
      <div class="clock">{{ currentTime }}</div>
      <div class="right-part">
        <div class="battery">
          <div class="battery-quantity" ref="batteryQuantity"></div>
        </div>
      </div>
    </div>
  `,
  data() {
    return { currentTimestamp: Date.now() };
  },
  mounted() {
    window.setInterval(() => {
        this.currentTimestamp = Date.now();
    }, 1000);
    this.$refs.batteryQuantity.style.width = this.battery + '%';
  },
  computed: {
    store() {
      return this.$store.state.statusBar;
    },
    signal() {
      return this.store.signal;
    },
    maxSignal() {
      return this.store.maxSignal;
    },
    signalProvider() {
      return this.store.signalProvider;
    },
    battery() {
      return this.store.battery;
    },
    currentTime() {
      let now = new Date(this.currentTimestamp);
      let hours = now.getHours();
      let minutes = now.getMinutes();
      let ampm = hours >= 12 ? '下午' : '上午';
      hours = hours % 12;
      hours = hours ? hours : 12;
      minutes = minutes < 10 ? '0' + minutes : minutes;
      return ampm + hours + ':' + minutes;
    }
  }
};