<style lang="scss">
  .my {
    background: url('../../assets/images/imgs/bg-my.png') no-repeat;
    background-position: top -30px right;
    background-size: contain;
    padding-bottom: 6rem;
    .avatar-box {
      background: #fff url('../../assets/images/imgs/bg-avatar.png') no-repeat;
      background-position: bottom right;
      background-size: contain;
      width: 84%;
      margin: 3rem auto;
      border-radius: 0.6rem;
      box-shadow: 0 5px 20px 5px rgba(68, 123, 186, 0.2);
      box-shadow: 0 0px 30px 5px rgba(68, 123, 186, 0.35);
      text-align: center;
      overflow: hidden;
      padding-bottom: 45%;
      height: 0;
      img {
        width: 6.5rem;
        height: 6.5rem;
        border-radius: 50%;
        margin-top: 5%;
      }
      p {
        font-size: 1.6rem;
        margin-top: 2%;
      }
    }
    .cell {
      padding-top: 1.2rem;
      padding-bottom: 1.2rem;
      color: #333;
      img {
        display: block;
        margin-right: 10px;
      }
    }
    .weui-cells::before {
      border: none !important;
    }
  }
</style>

<template>
  <div class="my clearfix">
    <div class="avatar-box">
      <img :src="$store.state.base.userInfo.headUrl" alt="">
      <p class="name">{{$store.state.base.userInfo.userName}}</p>
    </div>
    <Group>
      <cell class="cell" title="我的资料" :link="{path:'./MyData'}" :border-intent="false">
        <img slot="icon" width="26" :src="require('@/assets/images/icon/icon-main-data.png')">
      </cell>
      <cell class="cell" title="我的发布" v-if="showMyRelease" :link="{path:'./MyRelease'}" :border-intent="false">
        <img slot="icon" width="26" :src="require('@/assets/images/icon/icon-main-publish.png')">
      </cell>
      <!--<cell class="cell" title="添加员工" v-if="showAddStaff" :link="{path:'./AddStaff'}" :border-intent="false">-->
      <!--<img slot="icon" width="26" :src="require('@/assets/images/icon/icon-main-publish.png')">-->
      <!--</cell>-->
      <!--<cell class="cell" title="切换项目" v-if="showSwitchProject" :link="{path:'./SwitchProject'}" :border-intent="false">-->
        <!--<img slot="icon" width="26" :src="require('@/assets/images/icon/icon-main-publish.png')">-->
      <!--</cell>-->
      <cell class="cell" title="我的订单" v-if="showExchange" :link="{path:'./Exchange'}" :border-intent="false">
        <img slot="icon" width="26" :src="require('@/assets/images/icon/icon-tab-mydingdan.png')">
      </cell>
      <cell class="cell" title="积分排名" v-if="showRank" :link="{path:'./Rank'}" :border-intent="false">
        <img slot="icon" width="26" :src="require('@/assets/images/icon/icon-tab-ranking.png')">
      </cell>

      <!-- 设置规则页面暂时不做 -->
      <!-- <cell class="cell" title="设置规则" v-if="showSetRules" :link="{path:'./SetRules'}" :border-intent="false">
          <img slot="icon" width="26" :src="require('@/assets/images/icon/icon-main-rule.png')">
      </cell> -->
      <!-- 员工页面，暂放 -->
      <!--<cell class="cell" title="积分兑换" :link="{path:'./IntegralExchange'}" :border-intent="false">
          <img slot="icon" width="26" :src="require('@/assets/images/icon/icon-main-rule.png')">
      </cell>
      <cell class="cell" title="员工信息" :link="{path:'./userInfo'}" :border-intent="false">
          <img slot="icon" width="26" :src="require('@/assets/images/icon/icon-main-rule.png')">
      </cell>-->
    </Group>
    <FooterTabbar :tabbar-index="6"></FooterTabbar>
  </div>
</template>

<script>
  import FooterTabbar from '@/components/FooterTabbar'
  import {Cell, Group} from 'vux'

  export default {
    name: "My",
    components: {FooterTabbar, Group, Cell},
    props: {},
    data() {
      return {}
    },
    computed: {
      showMyRelease() {
        return this.$store.state.base.userType === 3 || this.$store.state.base.userType === 5
      },
      // showAddStaff() {
      //   return this.$store.state.base.userType === 5
      // },
      // showSetRules() {
      //   return this.$store.state.base.userType === 3 || this.$store.state.base.userType === 5
      // },
      // showSwitchProject() {
      //   return this.$store.state.base.userType === 3 || this.$store.state.base.userType === 5
      // },
      showRank() {
        return this.$store.state.base.userType === 5
      },
      showExchange() {
        return this.$store.state.base.userType === 5
      }
    },
  }
</script>

