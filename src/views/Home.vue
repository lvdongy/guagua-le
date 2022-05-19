<template>
  <div>
    <div class="ignore-rem-demo">
      <div class="value">$99999999999898989898989898989898989898989898989898</div>
      <canvas id="canvas" />
    </div>
  </div>
</template>

<script>
import ScrapAward from '@/utils/guagua'
export default {
  name: 'Home',

  mounted() {
    let scraAward = new ScrapAward({
      width: 320,
      height: 570,
      // backgroundImageUrl: require('../assets/images/suporka_home.jpeg'),
      coverImage: {
        url: require('../assets/images/super.jpeg'),
        // color: 'red',
        width: 320,
        height: 570
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
  width: 320px;
  // margin: 10px auto 20px auto;
  min-height: 300px;
  position: relative
}
#canvas{
  @include abs(0, 0);
}
</style>
