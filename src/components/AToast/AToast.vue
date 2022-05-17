<template>
  <transition :name="animation" appear>
    <div v-if="visible" class="toast">
      <template v-if="!hiddenIcon">
        <svg v-if="type === 'success'" t="1629785287303" class="toast-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3491">
          <path d="M883.2 247.466667c-17.066667-17.066667-44.8-17.066667-59.733333 0L409.6 665.6l-209.066667-204.8c-17.066667-17.066667-44.8-17.066667-59.733333 0-17.066667 17.066667-17.066667 44.8 0 59.733333l238.933333 234.666667c8.533333 8.533333 19.2 12.8 29.866667 12.8 10.666667 0 21.333333-4.266667 29.866667-12.8l443.733333-448c17.066667-17.066667 17.066667-42.666667 0-59.733333z" p-id="3492" fill="#1c9b31" />
        </svg>
        <svg v-if="type === 'error'" t="1629785783299" class="toast-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3878">
          <path d="M571.733333 512l268.8-268.8c17.066667-17.066667 17.066667-42.666667 0-59.733333-17.066667-17.066667-42.666667-17.066667-59.733333 0L512 452.266667 243.2 183.466667c-17.066667-17.066667-42.666667-17.066667-59.733333 0-17.066667 17.066667-17.066667 42.666667 0 59.733333L452.266667 512 183.466667 780.8c-17.066667 17.066667-17.066667 42.666667 0 59.733333 8.533333 8.533333 19.2 12.8 29.866666 12.8s21.333333-4.266667 29.866667-12.8L512 571.733333l268.8 268.8c8.533333 8.533333 19.2 12.8 29.866667 12.8s21.333333-4.266667 29.866666-12.8c17.066667-17.066667 17.066667-42.666667 0-59.733333L571.733333 512z" p-id="3879" fill="#c22219" />
        </svg>
      </template>
      <span class="toast-message">{{ message }}</span>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'AToast',

  data() {
    return {
      message: '', 
      visible: true,
      hiddenIcon: false,
      type: '',
      animation: 'fade'
    }
  }
}
</script>

<style lang='scss' scoped>
.toast{
    // height: 1em;
    width: fit-content;
    max-width: 65%;
    min-width: 160px;
    min-height: 0;
    box-sizing: content-box;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate3d(-50%, -50%, 0);
    font-size: 28px;
    padding: .8em 1em;
    background-color: rgba(0, 0, 0, 0.8);
    border-radius: 8px;
    z-index: 999;
    line-height: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: nowrap;
    // 解决ios13下文字撑不开盒子的问题，原因未知..
    white-space: pre-wrap;
    text-align: center;
    word-break: break-all;

    &-icon{
        height: 1.6em;
        width: auto;
        margin-right: 8px;
        flex-shrink: 0;
    };
    &-message{
        color: #f1f1f1;
        font-size: 28px;
        line-height: 1.5;
        overflow: hidden;
    }
}
.fade-enter-active{
    animation-duration: .28s;
    animation-name: fadeIn;
}
.fade-leave-active{
    animation-duration: .28s;
    animation-name: fadeOut;
}
@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}
@keyframes fadeOut {
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
}
</style>
