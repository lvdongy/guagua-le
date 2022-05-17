import Vue from 'vue'
import App from './App.vue'
import '@/utils/vant.js'
import AToast from '@/components/AToast/AToast.js'
import ABtn from '@/components/ABtn/ABtn'
Vue.use(AToast)
Vue.component(ABtn.name, ABtn)

import '@/styles/index.scss'

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
