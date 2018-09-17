<style lang="scss">
  .exchange-record {
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
    .member {
      position: relative;
      overflow: hidden;
      padding: 0.6rem 0rem;
      position: relative;
      &:active {
        background-color: #f6f6f6;
      }
      .icon-pulldown {
        position: absolute;
        bottom: 0.5rem;
        left: 50%;
        z-index: 1;
        transform: translateX(-50%);
        width: 1.5rem;
        height: 1.5rem;
        opacity: 0.6;
        transition: 0.3s all;
      }
      .iconPulldown2 {
        transform: translateX(-50%) rotate(180deg);
      }

      .member-avatar {
        float: left;
        .member-avatar-img {
          width: 5.5rem !important;
          height: 5.5rem !important;
          margin-left: 0.4rem;
          margin-right: 1.5rem;
          border-radius: 50%;
        }
      }
      .member-desc {
        display: -webkit-flex;
        display: flex;
        overflow: hidden;
        flex-direction: column;
        float: left;
        span {
          overflow: hidden;
          text-overflow: ellipsis;
          margin-top: 0.2rem;
        }
        .name {
          font-size: 1.4rem !important;
          color: #333;
        }
        .group,
        .id {
          color: #333;
          font-size: 1.2rem !important;
        }
        .score {
          position: absolute;
          top: 30%;
          right: 1.5rem;
          z-index: 1;
          font-size: 1.6rem;
          // font-weight: bold;
          // color: #e53935;
          color: #666;
        }
      }
    }
  }

  .content-cell {
    color: #666;
    font-size: 1.3rem;
    .weui-cell__ft {
      color: #333;
    }
    &::before {
      border: none !important;
    }
  }
</style>

<template>
  <div class="exchange-record clearfix">
    <x-header :left-options="{backText: ''}" title="兑换记录"
              style="background:linear-gradient(to right,#447bba,#7a88bd,#928dba);"></x-header>

    <scroller lock-x height="-48"
              ref="scroller" :scroll-bottom-offset="200"
              :use-pullup="true" :use-pulldown="false"
              @on-pullup-loading="onPullUp()" @on-pulldown-loading="onPullDown()"
              :pulldown-config="{downContent: '下拉刷新', upContent: '释放后更新',loadingContent: '正在刷新...'}"
              :pullup-config="{upContent:'上拉加载更多', downContent: '释放后加载',loadingContent: '加载中...'}">
      <div>

        <div class="set-1px-b" v-for="(item,index) in newDbPageList" :key="index">
          <cell
            class="member"
            :border-intent="false"
            @click.native="toggle(item)"
            value-align="left">
            <div>
              <img class="icon-pulldown" :class="item.showContent?'iconPulldown2':''"
                   :src="require('@/assets/images/icon/icon-main-pulldown.png')" alt="">
              <div class="member-avatar">
                <img :src="item.normalUserHeadUrl" class="member-avatar-img" alt="">
              </div>
              <div class="member-desc">
                <span class="name">{{item.normalUserName}}</span>
                <span class="group">{{item.normalUserGroupName}}</span>
                <span class="id">{{item.normalUserLoginName}}</span>
                <span class="score">已经支付</span>
              </div>
            </div>
          </cell>
          <div v-show="item.showContent">
            <cell class="content-cell" :border-intent="false" title="兑换单号：" :value="item.userScoreExchangeId"></cell>
            <cell class="content-cell" :border-intent="false" title="兑换时间：" :value="item.createDate"></cell>
            <cell class="content-cell" :border-intent="false" title="兑换金额：" :value="item.exchangeScore+'元'"></cell>
            <cell class="content-cell" :border-intent="false" title="兑换人员：" :value="item.exchangerUserName"></cell>
            <!--<x-img :src="item.userPicURL" style="width: 100%;height: auto;"></x-img>-->
            <img :src="item.userPicURL" style="width: 60%;margin-left: 20%;margin-bottom:10px;">
          </div>
        </div>
        <divider v-show="showDivider">{{dbPageList.length==0?"暂无数据":"到底了"}}</divider>
        <br>
      </div>
    </scroller>
  </div>
</template>

<script>
  import {XHeader, Group, Cell, CellBox, Scroller, Divider,XImg} from "vux";

  export default {
    name: "ExchangeRecord",
    components: {XHeader, Group, Cell, CellBox, Scroller, Divider,XImg},
    props: {},
    data() {
      return {
        dbPageList: [],
        newDbPageList: "",
        showDivider: false,
        hasMore: true,
        PAGE_SIZE: 15,
        scrollBottomNum: 0
      };
    },
    mounted() {
      var that = this;
      this.$nextTick(() => {
        this.$refs.scroller.reset({top: 0});
      });
      this.onPullUp();
    },
    computed: {},
    methods: {
      toggle(item) {
        item.showContent = !item.showContent;
      },
      //上拉加载更多
      onPullUp() {
        console.log("onPullUp");
        if (this.hasMore == false) {
          this.$refs.scroller.disablePullup();
          this.showDivider = true;
          return false;
        }

        this.sendRequest();
      },
      sendRequest() {
        var that = this;
        this.$api.userInterface
          .listUserDbPageExchangeResult({
            pageSize: this.PAGE_SIZE,
            startRow: this.PAGE_SIZE * this.scrollBottomNum,
            userId: this.$route.query.uid,
            projectId: this.$route.query.projectId,
          })
          .then(res => {
            if (res.data.success) {
              this.$nextTick(() => {
                this.$refs.scroller.reset();
              });
              if (typeof res.data.data !== 'undefined') {
                this.dbPageList = this.dbPageList.concat(res.data.data.dbPageList);
                this.hasMore = res.data.data.hasMore;
              } else {
                this.hasMore = false;
              }
              this.scrollBottomNum++;

              let newList = JSON.parse(JSON.stringify(this.dbPageList));
              newList.forEach(item => {
                item.showContent = false;
              });
              this.newDbPageList = newList;

              this.$refs.scroller.donePullup();
              if (!this.hasMore) {
                this.$refs.scroller.disablePullup();
                this.showDivider = true;
                return false;
              }
            } else {
              console.log("请求失败");
            }
          })
          .catch(err => {
            console.error(err);
          });
      }
    }
  };
</script>

