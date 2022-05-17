import AToast from './AToast.vue'

let Toast
let instance 
let preToast

function handleToast(options = {}) {
  const { 
    message, 
    hiddenIcon, 
    type, 
    animation
  } = options

  if(!instance) {
    instance = new Toast()
    const el = instance.$mount().$el
    document.body.appendChild(el)
  }
  instance.message = message
  instance.hiddenIcon = !!hiddenIcon
  instance.type = type || ''
  instance.animation = animation || 'fade'
  if(preToast) {
    clearTimeout(preToast)
  }
  instance.visible = true
  preToast = setTimeout(() => {
    instance.visible = false
  }, 2000)
}

function showToast(options) {
  if(isObject(options)) {
    return handleToast(options)
  }

  let message = ''
  let opt = arguments[1]

  if(typeof options === 'string') {
    message = options
  }
  if(opt && isObject(opt)) {
    opt.message = message
    return handleToast(opt)
  }else{
    return handleToast({ message })
  }
}

showToast.success = (message) => {
  return handleToast({ message, type: 'success' })
}

showToast.error = (message) => {
  return handleToast({ message, type: 'error' })
}

function isObject(o) {
  if(!o) return false
  return Object.prototype.toString.call(o) === '[object Object]'
}

export default {
  install(Vue) {
    Toast = Vue.extend(AToast)
    Vue.prototype.$toast = showToast
  }
}
