<style lang="scss">
  .phone-number {
    text-align: center;
    p {
      margin-top: 30px;
      margin-bottom: 30px;
      font-size: 13px;

    }
    .p2 {
      font-size: 2.8rem;
    }
    /*.btn {*/
      /*width: 70%;*/
      /*background-color: #fff;*/
      /*font-size: 1.6rem;*/
    /*}*/

  }
</style>

<template>
  <div class="phone-number clearfix">
    <x-header :left-options="{backText: ''}" title="手机号码"
              style="background:linear-gradient(to right,#447bba,#7a88bd,#928dba);"></x-header>

    <p class="p1">您已绑定手机号码</p>
    <p class="p2">{{this.$store.state.base.userInfo.phoneNum}}</p>
    <!--<x-button class="btn" @click.native="go()">更换手机号</x-button>-->
    <div style="margin:30px 21px;">
      <x-button :gradients="['#447bba', '#928dba']" @click.native="go()">更换手机号</x-button>
    </div>
  </div>
</template>

<script>
  import FooterTabbar from '@/components/FooterTabbar'
  import {XButton, XHeader} from 'vux'

  export default {
    name: "PhoneNumber",
    components: {XButton, XHeader},
    props: {},
    data() {
      return {}
    },
    methods: {
      go() {
        this.$router.push({path: '/ChangePhoneNumber', query: {}});
      }
    },
  }
</script>

