export const modalComponent = {
  template: `
    <div class="modal-overlay">
      <div class="modal">
        <div class="content-wrap">
          <div class="title">{{ title }}</div>
          <div class="content">{{ content }}</div>
        </div>
        <div class="button-wrap">
          <div class="button"
            v-for="buttonData in buttonSetting"
            :class="buttonData.class"
            @click="buttonClick(buttonData.value)">{{ buttonData.text }}</div>
        </div>
      </div>
    </div>
  `,
  props: ['show', 'title', 'content', 'buttonSetting'],
  methods: {
    buttonClick(result) {
      this.$root.$emit('modalButtonClick', result);
    }
  }
};