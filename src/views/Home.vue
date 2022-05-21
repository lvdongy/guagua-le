<template>
  <div class="page">
    <div class="jl" @click="historyShow = true">中奖记录</div>
    <div class="play" @click="play">
      <img src="../assets/images/gongxi.png" class="play-img">
      <span class="play-text">刮一张</span>
    </div>

    <van-popup v-model="historyShow" transition-appear round>
      <ul class="history">
        <li
          v-for="item in history"
          :key="item.time"
          class="history-item van-hairline--bottom"
        >
          <span>{{ item.money }}</span>
          <span>{{ item.time }}</span>
        </li>
      </ul>
    </van-popup>

    <van-popup v-model="show" class="van-popup-ggl" :close-on-click-overlay="false" :lazy-render="false" transition-appear>
      <div class="ignore-rem-demo">
        <div class="container">
          <div class="header">
            <div class="header-val">{{ hitNum }}</div>
          </div>
          <div 
            v-for="(row, i) in list"
            :key="i"
            class="row"
          >
            <div v-for="(num, index) in row.list" :key="index" class="row-item">{{ num }}</div>
            <div class="row-red">¥{{ row.money }}</div>
          </div>
          
        </div>
        <canvas id="canvas" />
        <van-button class="btn" round color="linear-gradient(to right, #fb744e, #ee0a24)" @click="close">我刮完了</van-button>
      </div>
    </van-popup>
  </div>
</template>

<script>
import ScrapAward from '@/utils/guagua'
import { formatTime } from '@/utils/tools'
export default {
  name: 'Home',

  data() {
    return {
      show: false,
      ggl: null,
      hitNum: '',
      hitMoney: '',
      hitTime: '',
      list: [],
      history: [],
      historyShow: false,

      t: null,
      count: 0
    }
  },

  created() {
    let list = localStorage.getItem('ggl_history')
    if(list && typeof list === 'string') {
      this.history = JSON.parse(list) || []
    }
  },

  methods: {
    play() {
      this.show = true
      this.$nextTick(() => {
        this.renderCanvas()
      })
    },

    close() {
      this.show = false
      this.history.unshift({
        money: this.hitMoney ? '¥ ' + this.hitMoney : '很遗憾，您本次未中奖',
        time: formatTime(Date.now(), 'yyyy-MM-dd HH:mm:ss')
      })
      localStorage.setItem('ggl_history', JSON.stringify(this.history))
      // this.t = setInterval(() => {
      //   this.generateList()
      //   this.count++
      //   if(this.count > 100) {
      //     clearInterval(this.t)
      //   }
      // }, 30)
    },

    renderCanvas() {
      if(this.ggl) {
        this.ggl.restart()
      }else{
        this.ggl = new ScrapAward({
          width: 360,
          height: 480,
          coverImage: {
            url: require('../assets/images/cover.png'),
            width: 360,
            height: 480
          }
        })
      }
      this.list = this.generateList()
    },

    generateList() {
      let options = [
        { ratio: 0.05, money: 500, len: 2 },
        { ratio: 0.1, money: 188, len: 3 },
        { ratio: 0.15, money: 88, len: 4 },
        { ratio: 0.20, money: 50, len: 5 },
        { ratio: 0.4, money: 20, len: 5 }
      ]
      let hitIndex = -1
      let hasNums = []
      let res = options.map((item, index) => {
        // 安排是否中奖
        if(hitIndex === -1) {
          if(this.isHit(item.ratio)) {
            hitIndex = index
          }
        }
        // 填充数字
        let nums = []
        for (let i = 0; i < item.len; i++) {
          let n
          do {
            n = parseInt(Math.random() * 100)            
          } while (hasNums.includes(n))
          nums.push(n)
          hasNums.push(n)
        }
        return {
          list: nums,
          money: item.money
        }
      })
      // 确定中奖数字
      if(hitIndex > -1) {
        // 中奖，从中的奖项list中随机取一个数字当中奖数
        this.hitMoney = res[hitIndex].money
        let list = res[hitIndex].list
        let index = Math.floor(Math.random() * list.length)
        this.hitNum = list[index]
      }else{
        // 没中奖，随机写一个不重复的数字
        this.hitMoney = ''
        let n
        do {
          n = parseInt(Math.random() * 100)            
        } while (hasNums.includes(n))
        this.hitNum = n
      }
      // console.log(hitIndex > -1 ? options[hitIndex].money : '无')
      // console.log(hasNums, this.hitNum)
      return res
    },

    isHit(ratio) {
      return parseInt(Math.random() * 100) < (ratio * 100)
    }    
  }

}
</script>

<style lang='scss' scoped>
.page{
  height: 100%;
  width: 100%;
  position: relative;
}
.jl{
  font-size: 28px;
  color: #fdc733;
  text-decoration: underline;
  text-underline-offset: .3em;
  cursor: pointer;
  @include abs(3vh, auto, 24px);
}
.play{
  width: 300px;
  height: 300px;
  border-radius: 50%;
  // background: #f1ba55;
  background: linear-gradient(to right, #f88e6e, #f1ba55);
  @include abs(30%, 0, 0);
  margin: auto;
  box-shadow: 0 0 20px 10px #be141f;
  animation: scale 2s ease-in-out infinite;
  
  @keyframes scale {
    from{
      transform: scale(1);
    }
    50%{
      transform: scale(1.1);
    }
    to{
      transform: scale(1);
    }
  }
  &-img{
    width: 50%;
    height: auto;
    @include abs(8%, 50%);
    transform: translateX(-50%);
  }
  &-text{
    font-size: 48px;
    font-weight: bold;
    color: #be141f;
    white-space: nowrap;
    @include abs(62%, 50%);
    transform: translateX(-50%);
  }
}
.ignore-rem-demo {
  width: 360px;
  height: 480px;
  position: relative;
  overflow: visible;
}
#canvas{
  @include abs(0, 0);
}
.container{
  padding: 32px 16px;
  .header{
    @include flex(flex-end);
    &-val{
      width: 140px;
      font-size: 50px;      
      font-weight: bold;
      background: #f56c58;
      color: #fdc733;
      text-align: center;
      padding: 16px 16px;
      border-radius: 8px;
      margin-bottom: 48px;
    }
  }
  .row{
    width: 100%;
    margin-bottom: 40px;
    @include flex(flex-end);
    &-red{
      width: 140px;
      flex-shrink: 0;
      // height: 110px;
      // @include bg('../assets/images/hongbao.png');
      object-fit: contain;
      font-size: 46px;      
      font-weight: bold;
      color: #f56c58;
      text-align: center;
      // padding-top: 60px;
      box-sizing: border-box;
      padding-left: 16px;
      @include flex();
    }
    &-item{
      width: 100px;
      height: 100px;
      background: rgb(235, 235, 235);
      border-radius: 50%;
      @include flex();
      font-size: 40px;
      font-weight: bold;
      line-height: 1;
      // margin: 0 16px;
    }
  }
}
.van-popup-ggl{
  overflow: visible;
}
.btn{
  @include abs(auto, 50%, auto, -160px);
  transform: translateX(-50%);
}
.history{
  width: 600px;
  padding: 32px;
  max-height: 70vh;
  overflow: auto;
  &-item{
    font-size: 26px;
    color: #383838;
    padding: 24px 0;
    line-height: 1;
    @include flex(space-between);
  }
}

</style>
