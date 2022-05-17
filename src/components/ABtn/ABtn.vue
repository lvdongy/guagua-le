
<template>
  <a 
    class="a-btn"
    :href="href ? href : 'javascript:;'"
    :style="{
      width: imgW + 'rem',
      height: imgH + 'rem',
      backgroundImage: 'url('+imgURL+')',
    }"
    @click="handleClick"
  />
</template>

<script>
export default {
  name: 'ABtn',

  props: {
    src: String,
    w: [Number, String],
    h: [Number, String],
    href: String
  },

  data() {
    return {
      imgURL: '',
      imgW: this.w / 75,
      imgH: this.h / 75
    }
  },
    
  watch: {
    src(src) {
      this.init()
    }
  },

  created() {
    this.init()
  },

  methods: {
    init() {
      if(this.isBase64(this.src) || this.isRequired(this.src)) {
        this.imgURL = this.src
      }else{
        this.imgURL = this.getImgUrl(this.src)
      }
      let img = document.createElement('img')
      img.src = this.imgURL
      img.onload = () => {
        if(!this.w) this.imgW = img.width / 75
        if(!this.h) this.imgH = img.height / 75
        img = null
      }
    },

    handleClick(e) {
      this.$emit('click', e)
    },

    // 取路径中'images'的后半部
    getImgUrl(src) {
      let path = src.split('images')[1]
      return require(`@/assets/images${path}`)
    },

    // 检测是否已经require过了，检测依旧就是判断是否图片名称是否有加了哈希标识
    isRequired(path) {
      let fileName = path.split('/').pop()
      return /\.[\da-zA-Z]+\.[png|jpg|jpeg|gif|svg]+$/i.test(fileName)
    },

    // 检测是否是base64的图片字符串
    isBase64(str) {
      if(String.prototype.startsWith.call(str, 'data:')) {
        return true
      }
      return false
    }
  }
}
</script>
<style lang="scss" scoped>
.a-btn{
    display: block;
    text-decoration: none;
    background-size: 100% 100%;
    background-repeat: no-repeat;
}
</style>
