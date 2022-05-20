<template>
  <div>
    <!-- <div class="ignore-rem-demo">
      <div class="value">$99999999999898989898989898989898989898989898989898</div>
      <canvas id="canvas" />
    </div> -->
    <!-- <img src="../assets/images/cover.png" alt=""> -->

    <van-popup v-model="show" :close-on-click-overlay="false">
      <div class="ignore-rem-demo">
        <div class="container">
          <div class="header">
            <div class="header-val">80</div>
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
      </div>
    </van-popup>
  </div>
</template>

<script>
import ScrapAward from '@/utils/guagua'
export default {
  name: 'Home',

  data() {
    return {
      show: true,
      list: [
        {
          list: [80, 67, 67],
          money: 200
        },
        {
          list: [80, 67, 67],
          money: 200
        },
        {
          list: [80, 67, 67],
          money: 200
        },
        {
          list: [80, 67, 67],
          money: 200
        },
        {
          list: [80, 67, 67, 23,34],
          money: 50
        }
      ]
    }
  },

  mounted() {
    let scraAward = new ScrapAward({
      width: 360,
      height: 480,
      coverImage: {
        url: require('../assets/images/cover.png'),
        width: 360,
        height: 480
      }
      // callback: () => {
      // }
    })
    // document.getElementById('try_again').addEventListener('click', function(e) {
    //   scraAward.restart()
    // })
  }

}
</script>

<style lang='scss' scoped>
.ignore-rem-demo {
  width: 360px;
  height: 480px;
  position: relative
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

</style>
