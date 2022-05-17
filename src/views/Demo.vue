<template>
  <div class="demo">
    <section class="demo-section">
      <div class="demo-section-title">ABtn使用, 点击召唤AToast</div>
      <a-btn class="btn" src="../assets/images/demo.png" @click="toast" />
      <van-button type="primary" round class="btn" @click="toastSuccess">Success</van-button>
    </section>

    <section class="demo-section">
      <div class="demo-section-title">移动端适配</div>
      <div class="div">css单位直接写px</div>
    </section>

    <section class="demo-section">
      <div class="demo-section-title">i18n多语言</div>
      <select v-model="lang" @change="onChangeLang">
        <option value="zh">中文</option>
        <option value="en">English</option>
      </select>
      <div class="title">{{ $t('text.title') }}</div>
      <li v-for="item in $t('text.list')" :key="item.value" class="list">{{ item.label }}</li>
      <a-btn :src="$t('img.logo')" />
    </section>

    <section class="demo-section">
      <div class="demo-section-title">弹层提示</div>
      <van-button type="primary" round block @click="showTip">微信分享提示</van-button>
    </section>

    <section class="demo-section">
      <div class="demo-section-title">移动端选择框</div>
      <van-button type="primary" round block style="margin-bottom: 16px" @click="selectVisible = true">选择-服务器</van-button>
      <van-button type="primary" round block @click="selectRemoteVisible = true">选择-远程搜索服务器列表</van-button>
    </section>
    <a-select 
      ref="aSelect" 
      v-model="selectVisible" 
      label-key="label" 
      value-key="serverId" 
      filterable
      multiple
      :columns="selectData" 
      @cancel="selectVisible = false" 
      @confirm="onSelect" 
    />
    <!-- 远程搜索 -->
    <a-select 
      ref="aSelect" 
      v-model="selectRemoteVisible" 
      label-key="label" 
      value-key="serverId" 
      filterable
      remote
      :remote-method="onSearchSelectData"
      :remote-loading="remoteLoading"
      :columns="selectRemoteData" 
      @cancel="selectRemoteVisible = false" 
      @confirm="onSelect" 
    />
  </div>
</template>

<script>
export default {
  name: 'Demo',

  data() {
    return {
      lang: '',

      selectVisible: false,
      selectData: [
        { serverId: 's1001', label: '一区大风起兮' },
        { serverId: 's1002', label: '二区大风起兮' },
        { serverId: 's1003', label: '三区大风起兮' },
        { serverId: 's1004', label: '四区大风起兮' },
        { serverId: 's1005', label: '五区大风起兮' },
        { serverId: 's1006', label: '六区大风起兮' },
        { serverId: 's1007', label: '七区大风起兮' }
      ],
      selectRemoteVisible: false,
      selectRemoteData: [],
      remoteLoading: false
    }
  },

  mounted() {
    // 取当前页面的语言版本赋值给lang变量，使语言切换器可以正确显示初始化语言
    this.lang = document.documentElement.lang
  },

  methods: {
    toast() {
      this.$toast('Hello ！最大宽度为屏幕的70%，超出自动换行')
    },

    toastSuccess() {
      this.$toast.success('Success ！')
    },

    onChangeLang() {
      this.$changeLang(this.lang)
    },

    showTip() {
      this.$showTip('wx-share').then((res) => {
        console.log(res)
      })
    },

    onSearchSelectData(word) {
      // 模拟远程搜索函数
      console.log('当前搜索关键词：', word)
      if(!word) {
        this.selectRemoteData = []
        return
      }
      // 显示搜索时的loading
      this.remoteLoading = true
      setTimeout(() => {
        this.remoteLoading = false
        // 取得最终的搜索结果并赋值给selectRemoteData
        this.selectRemoteData = [{ serverId: word, label: word }]
      }, 2000)
    },

    onSelect(selectItem) {
      console.log('选中：', selectItem)
      this.selectVisible = false
      this.selectRemoteVisible = false
    }
  }
}
</script>

<style lang='scss' scoped>
.demo{
    padding: 0 40px;
    &-section{
        padding: 60px 0;
        border-bottom: 1px solid #dddddd;
        &-title{
            font-size: 32px;
            color: #666666;
            margin-bottom: 40px;
        }

        .div{
            width: 300px; // 直接按设计稿上的大小写px单位，会自动转化为rem
            height: 75px;
            margin-top: 40px;
            background-color: rgb(21, 132, 136);
            color: #fff;
            font-size: 20px;
            @include flex(); // 对应函数于/styles/variables.scss里
        }

        .title{
            font-size: 32px;
            font-weight: bold;
            line-height: 2;
        }
        .list{
            color: #999999;
            line-height: 1.5;
        }
    }
    .btn{
        display: inline-block;
        margin: 0 16px;
    }
}
</style>
