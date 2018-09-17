<style lang="scss">
  .index-exchange {
    height: 100%;
    .shop {
      height: calc(100% - 100px);
      display: flex;
      flex-direction: column;
      /*justify-content: space-evenly;*/
      justify-content: space-between;
      align-items: center;
      padding-top: calc((100% - 150px)/4);
      padding-bottom: calc((100% - 150px)/4);
      .shop-box {
        background: #fff;
        width: 84vw;
        /*margin: 5rem auto;*/
        border-radius: 1.5rem;
        box-shadow: 0 0 30px 5px rgba(68, 123, 186, 0.35);
        text-align: center;
        overflow: hidden;
        /*padding-bottom: 45%;*/
        height: 45vw;
        position: relative;
        img {
          width: 4rem;
          height: 4rem;
          position: absolute;
          top: 27%;
          left: 49%;
          z-index: 2;
          transform: translate(-50%, 0);
        }
        .img2{
          top: 26%;
          left: 47%;
        }
        .yellow {
          width: 3.8rem;
          height: 3.8rem;
          position: absolute;
          top: 31%;
          left: 51%;
          z-index: 1;
          transform: translate(-50%, 0);
          background: -webkit-linear-gradient(left bottom, #fab92e, #f7f681); /* Safari 5.1 - 6.0 */
          background: linear-gradient(to top right, #fab92e, #f7f681); /* 标准的语法 */
        }
        p {
          font-size: 1.6rem;
          position: absolute;
          top: 64%;
          left: 50%;
          z-index: 3;
          transform: translate(-50%, 0);
        }
      }
      .shop-box2 {
        margin-bottom: 0;
      }
    }
  }
</style>

<template>
  <div class="index-exchange">
    <x-header :left-options="{backText: '',showBack:false}" style="background:linear-gradient(to right,#447bba,#7a88bd,#928dba);">
      <span slot="left" style="color: #fff;font-size: 18px;">兑换</span>
      <span slot="right" style="color: #fff;">当前项目：{{$store.state.base.userInfo.projectName}}</span>
    </x-header>
    <div class="shop">
      <div class="shop-box" @click="scanQrcode">
        <img :src="require('@/assets/images/icon/icon-main-conversion.png')" alt="">
        <div class="yellow"></div>
        <p class="name">兑换</p>
      </div>
      <div class="shop-box shop-box2" @click="showSearch">
        <img class="img2" :src="require('@/assets/images/icon/icon-main-query.png')" alt="">
        <div class="yellow"></div>
        <p class="name">查询</p>
      </div>
    </div>
    <FooterTabbar :tabbar-index="2"></FooterTabbar>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import FooterTabbar from '@/components/FooterTabbar.vue'
  import {XHeader,} from 'vux'

  export default {
    name: "IndexExchange",
    components: {FooterTabbar, XHeader},
    props: {},
    data() {
      return {
      }
    },
    computed: {
      ...mapGetters([
        'getSearchType',
        'getSearchKey',
      ]),
    },
    methods: {
      scanQrcode() {
        if (wx && wx !== 'undefined') {
          wx.scanQRCode({
            needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
            scanType: ["qrCode"], // 可以指定扫二维码还是一维码，默认二者都有
            success: (res) => {
              let uid;
              uid = this.$Global.lastIndexOf('\/', res.resultStr);
              this.$store.dispatch('setScanUserId', uid);
              this.$router.push({
                name: 'IntegralExchange'
              });
            }
          });
        }
      },
      showSearch() {
        this.$store.dispatch('setSearchType', 2);
        this.$store.dispatch('setSearchKey', '');
        this.$router.push({
          name: 'SearchMember'
        });
      },

    },
    created() {

    },
    mounted() {

    },

  }
</script>

