<style lang="scss">
  .weui-tabbar {
    position: fixed !important;
    z-index: 500;
    background-color: #fff !important;
  }
</style>

<template>
  <tabbar v-model="index">
    <tabbar-item v-show="showIndex" link="./wxIndex">
      <img slot="icon" :src="require('@/assets/images/icon/icon-tab-index.png')">
      <img slot="icon-active" :src="require('@/assets/images/icon/icon-tab-index2.png')">
      <span slot="label">首页</span>
    </tabbar-item>
    <tabbar-item v-show="showOperate" link="./Operate">
      <img slot="icon" :src="require('@/assets/images/icon/icon-tab-add.png')">
      <img slot="icon-active" :src="require('@/assets/images/icon/icon-tab-add2.png')">
      <span slot="label">加减</span>
    </tabbar-item>
    <tabbar-item v-show="showIndexExchange" link="./IndexExchange">
      <img slot="icon" :src="require('@/assets/images/icon/icon-tab-conversion.png')">
      <img slot="icon-active" :src="require('@/assets/images/icon/icon-tab-conversion2.png')">
      <span slot="label">兑换</span>
    </tabbar-item>
    <tabbar-item v-show="showAllExchange" link="./AllExchange">
      <img slot="icon" :src="require('@/assets/images/icon/icon-tab-dingdan.png')">
      <img slot="icon-active" :src="require('@/assets/images/icon/icon-tab-dingdan2.png')">
      <span slot="label">订单</span>
    </tabbar-item>
    <tabbar-item v-show="showExchange" link="./Exchange">
      <img slot="icon" :src="require('@/assets/images/icon/icon-tab-mydingdan.png')">
      <img slot="icon-active" :src="require('@/assets/images/icon/icon-tab-mydingdan2.png')">
      <span slot="label">我的订单</span>
    </tabbar-item>
    <tabbar-item v-show="showRank" link="./Rank">
      <img slot="icon" :src="require('@/assets/images/icon/icon-tab-ranking.png')">
      <img slot="icon-active" :src="require('@/assets/images/icon/icon-tab-ranking2.png')">
      <span slot="label">排名</span>
    </tabbar-item>
    <tabbar-item link="./My">
      <img slot="icon" :src="require('@/assets/images/icon/icon-tab-my.png')">
      <img slot="icon-active" :src="require('@/assets/images/icon/icon-tab-my2.png')">
      <span slot="label">我的</span>
    </tabbar-item>
  </tabbar>
</template>

<script>
  import {Tabbar, TabbarItem} from "vux";

  export default {
    name: "FooterTabbar",
    components: {Tabbar, TabbarItem},
    props: {
      tabbarIndex: {
        default: 0
      }
    },
    data() {
      return {};
    },
    computed: {
      index: {
        get() {
          return this.tabbarIndex;
        },
        set() {
        }
      },
      showIndex() {
        return this.$store.state.base.userType === 3 || this.$store.state.base.userType === 5
      },
      showOperate() {
        return this.$store.state.base.userType === 3 || this.$store.state.base.userType === 5
      },
      showIndexExchange() {
        return this.$store.state.base.userType === 4 || this.$store.state.base.userType === 5
      },
      showAllExchange() {
        return this.$store.state.base.userType === 5
      },
      showExchange() {
        return this.$store.state.base.userType === 4
      },
      showRank() {
        return this.$store.state.base.userType === 3
      }
    }
  };
</script>

