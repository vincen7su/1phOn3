const statusBar = {
  state: {
    signal: 3,
    maxSignal: 5,
    signalProvider: '中華電信',
    wifiSignal: 5,
    battery: 66,
    GPSIslocating: true
  }
};

const appManager = {
  namespaced: true,
  state: {
    isDeleteMode: false,
    desktop: [
      ['行事曆', '天氣', 'Instagram', 'Facebook', 'TV Time', '露天拍賣'],
      ['設定']
    ],
    dock: ['LINE', 'Skype', 'Chrome', 'Messenger'],
    apps: {
      '行事曆': {
        template() {
          const weekdayMap = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'];
          let date = new Date();
          let weekday = date.getDay();
          let day = date.getDate();
          return `
            <div class="weekday">${weekdayMap[weekday]}</div>
            <div class="day">${day}</div>
          `;
        },
        class: 'calander'
      },
      '天氣': {
        template() {
          return `
            <div class="sun"></div>
            <div class="cloud">
              <div class="cloud-wrap">
                <div class="circle-top"></div>
                <div class="circle-right"></div>
                <div class="circle-small"></div>
                <div class="base"></div>
              </div>
            </div>
          `;
        },
        class: 'weather'
      },
      'Instagram': {
        template() {
          return `
            <div class="camera"></div>
          `;
        },
        class: 'instagram'
      },
      'Facebook': {
        template() {
          return `
            <div class="logo"></div>
            <div class="logo-mask"></div>
          `;
        },
        class: 'facebook',
        notification: 7
      },
      'Chrome': {
        template() {
          return `
            <div class="logo">
              <div class="red-part">
                <div class="shade"></div>
              </div>
              <div class="yellow-part">
                <div class="shade"></div>
              </div>
              <div class="green-part">
                <div class="shade"></div>
              </div>
              <div class="core-circle"></div>
            </div>
          `;
        },
        class: 'chrome'
      },
      'TV Time': {
        template() {
          return `
            <div class="logo">
              <div class="row">
                <div class="cell yellow1"></div>
                <div class="cell yellow2"></div>
                <div class="cell yellow3"></div>
              </div>
              <div class="row">
                <div class="cell"></div>
                <div class="cell yellow4"></div>
                <div class="cell"></div>
              </div>
              <div class="row">
                <div class="cell"></div>
                <div class="cell yellow5"></div>
                <div class="cell"></div>
              </div>
            </div>
          `;
        },
        class: 'tv-time'
      },
      '露天拍賣': {
        img: 'img/ruten.png'
      },
      '設定': {
        img: 'img/settings.jpg'
      },
      'Skype': {
        img: 'img/skype.jpg'
      },
      'LINE': {
        img: 'img/line.jpg',
        notification: 30
      },
      'Messenger': {
        img: 'img/messenger.png',
        notification: 3
      }
    }
  },
  mutations: {
    togglePressTarget(state, appKey) {
      let app = state.apps[appKey];
      if (app.isPressTartget === undefined) {
        Vue.set(app, 'isPressTartget', false);
      }
      app.isPressTartget = !app.isPressTartget;
    },
    deleteModeOn(state) {
      state.isDeleteMode = true;
    },
    deleteModeOff(state) {
      state.isDeleteMode = false;
    }
  }
};

const notification = {
  state: {
    notificationQueue: [
      {
        app: '露天拍賣',
        timestamp: 1234567890,
        title: '',
        content: ''
      }
    ]
  }
};

export const iOS = new Vuex.Store({
  modules: {
    statusBar,
    appManager,
    notification
  }
});