<template>
  <Teleport v-if="open" to="#teleport-target">
    <div class="teleport-blackout"></div>
    <div class="teleport-modal" @click="this.onOutsideClick">
      <div class="teleport-modal__content" ref="content">
        <button type="button" class="teleport-modal__close" @click="doClose">X</button>
        <slot></slot>
      </div>
    </div>
  </Teleport>
</template>

<script>
import { defineComponent } from 'vue';

let openedCount = 0;
let atleastOneOpen = false;

export default defineComponent({
  props: {
    open: { type: Boolean },
  },
  methods: {
    onOutsideClick($event) {
      if ($event.target !== this.$refs.content && $event.target.contains(this.$refs.content)) {
        this.doClose();
      }
    },
    doClose() {
      this.$emit('update:open', false);
    },
    checkBlackoutState() {
      if (!openedCount) {
        atleastOneOpen = false;
        document.body.style.overflow = null;
        document.body.style.paddingRight = null;
      } else if (!atleastOneOpen && openedCount === 1) {
        atleastOneOpen = true;
        document.body.style.paddingRight = `${window.innerWidth - document.documentElement.clientWidth}px`;
        document.body.style.overflow = 'hidden';
      }
    },
  },
  watch: {
    open: {
      handler(isOpen) {
        if (isOpen) {
          openedCount += 1;
        } else {
          openedCount -= 1;
        }
        this.checkBlackoutState();
      },
    },
  },
  created() {
    if (this.open) {
      openedCount += 1;
      this.checkBlackoutState();
    }
  },
});
</script>

<style scoped>
  .teleport-blackout {
    z-index: 1010;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.75;
    background-color: #000;
  }

  .teleport-modal {
    z-index: 1010;
    overflow: auto;
    overflow-y: scroll;
    position: fixed;
    display: flex;
    justify-content: center;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 20px;
  }

  .teleport-modal__content {
    position: relative;
    max-width: 1000px;
    margin-top: auto;
    margin-bottom: auto;
    padding: 40px;
    background-color: #fff;
  }

  .teleport-modal__close {
    position: absolute;
    top: -1.25em;
    right: -1.25em;
    padding: 10px;
    line-height: 1;
  }
</style>
