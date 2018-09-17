<style lang="scss">
.rank {
  padding-top: 50px;
  .rank-list {
    padding-bottom: 1rem;
    .rank-li {
      display: -webkit-flex;
      display: flex;
      overflow: hidden;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      background-color: #fff;
      .num {
        flex: 1;
        text-align: center;
        font-weight: bold;
        margin-left: 5px;
      }
      .avatar {
        flex: 2;
        padding:15px 10px 12px;
        img{
          width:70px;
          height:70px;
          border-radius:50%;
        }
      }
      .member-desc {
        flex: 6;
        display: -webkit-flex;
        display: flex;
        overflow: hidden;
        flex-direction: column;
        float: left;
        position: relative;
        span {
          overflow: hidden;
          text-overflow: ellipsis;
          margin-top: 0.2rem;
        }
        .name {
          font-size: 1.5rem !important;
        }
        .group,
        .id {
          color: #888;
          font-size: 1.3rem !important;
        }
        .score {
          position: absolute;
          top: 30%;
          right: 1rem;
          z-index: 1;
          font-size: 1.6rem;
          font-weight: bold;
          color: #e53935;
        }
      }
    }
  }
}

.vux-tab {
  position: fixed !important;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 100;
  height: 50px !important;
  .vux-tab-item {
    line-height: 50px !important;
    height: 50px !important;
    font-size: 16px !important;
  }
}
</style>

<template>
  <div class="rank">
    <tab :line-width="2" active-color="#e53935" bar-active-color="#e53935">
      <tab-item selected @on-item-click="onItemClick">积分从高到低</tab-item>
      <tab-item @on-item-click="onItemClick">积分从低到高</tab-item>
    </tab>

    <scroller lock-x height="scrollerHeight"
              ref="scroller" :scroll-bottom-offset="200"
              :use-pullup="true" :use-pulldown="false"
              @on-pullup-loading="onPullUp()" @on-pulldown-loading="onPullDown()"
              :pulldown-config="{downContent: '下拉刷新', upContent: '释放后更新',loadingContent: '正在刷新...'}"
              :pullup-config="{upContent:'上拉加载更多', downContent: '释放后加载',loadingContent: '加载中...'}">
      <div>
        <ul class="rank-list">
          <li class="rank-li set-1px-b" v-for="(item,index) in dbPageList" :key="index">
            <div class="num">
              <span v-if="showNumText(index)">{{index+1}}</span>
              <img v-if="showNumImg(index)" :src="numImg(index)"></div>
            <div class="avatar"><img :src="item.headUrl" alt=""></div>
            <div class="member-desc">
              <span class="name">{{item.userName}}</span>
              <span class="group">{{item.groupName}}</span>
              <span class="id">{{item.loginName}}</span>
              <span class="score">{{item.userTotalScore}}分</span>
            </div>
          </li>
        </ul>
        <divider v-show="showDivider">{{dbPageList.length==0?"暂无数据":"到底了"}}</divider>
        <br>
      </div>
    </scroller>
    <div v-if="showTabbar">
      <br><br><br>
      <FooterTabbar :tabbar-index="5"></FooterTabbar>
    </div>
  </div>
</template>

<script>
import FooterTabbar from "@/components/FooterTabbar";
import { Tab, TabItem, Divider, Scroller, LoadMore } from "vux";

export default {
  name: "Rank",
  components: { FooterTabbar, Tab, TabItem, Divider, Scroller, LoadMore },
  props: {},
  data() {
    return {
      // scrollerHeight:-100,
      showDivider: false,
      dbPageList: [],
      rankListClone: [],
      rankListReverse: [],
      hasMore: true,
      highOrLow: 0,
      PAGE_SIZE: 15,
      highNum: 0,
      lowNum: 0
    };
  },
  computed: {
    showTabbar(){
      return this.$store.state.base.userType === 3
    },
    scrollerHeight(){
      if(this.$store.state.base.userType === 3) {
        return '-100'
      }else{
        return '-50'
      }
    }
  },
  mounted() {
    var that = this;
    this.$nextTick(() => {
      this.$refs.scroller.reset({ top: 0 });
    });
    console.log("从高到低：");
    this.onPullUp();
  },
  methods: {
    showNumText(index) {
      return !this.showNumImg(index);
    },
    showNumImg(index) {
      if (this.highOrLow == 0 && (index == 0 || index == 1 || index == 2)) {
        return true;
      } else {
        return false;
      }
    },
    numImg(index) {
      switch (index) {
        case 0:
          return require("@/assets/images/icon/No1.png");
          break;
        case 1:
          return require("@/assets/images/icon/No2.png");
          break;
        case 2:
          return require("@/assets/images/icon/No3.png");
          break;
      }
    },
    onItemClick(index) {
      console.log("on item click:", index);
      this.highOrLow = index;
      this.showDivider = false;
      this.dbPageList = [];
      (this.hasMore = true), (this.highNum = 0);
      this.lowNum = 0;
      this.$nextTick(() => {
        this.$refs.scroller.reset({ top: 0 });
      });
      this.$refs.scroller.enablePullup();

      this.onPullUp();
      console.log(this);
    },
    //上拉刷新
    onPullUp() {
      var that = this;
      if (this.hasMore == false) {
        this.$refs.scroller.disablePullup();
        this.showDivider = true;
        return false;
      }
      console.log("onPullUp,hasmore = true");

      this.sendRequest();
    },
    sendRequest() {
      if (this.highOrLow == 0) {
        var number = this.highNum;
      } else {
        var number = this.lowNum;
      }
      this.$api.rankInterface
        .listUserByScore({
          asc: this.highOrLow,
          pageSize: this.PAGE_SIZE,
          startRow: this.PAGE_SIZE * number
        })
        .then(res => {
          if (res.data.success) {
            this.$nextTick(() => {
              this.$refs.scroller.reset();
            });


              if(typeof res.data.data !== 'undefined'){
                this.dbPageList = this.dbPageList.concat(res.data.data.dbPageList);
                this.hasMore = res.data.data.hasMore;
              }else{
                this.hasMore = false;
              }

            if (this.highOrLow == 0) {
              this.highNum++;
            } else {
              this.lowNum++;
            }
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
  },
  filters: {
    num(value) {
      switch (value) {
        case 1:
          return "<img :src='require('@/assets/images/icon/No1.png')'>";
          break;
        case 2:
          return "<img :src='require('@/assets/images/icon/No2.png')'>";
          break;
        case 3:
          return "<img :src='require('@/assets/images/icon/No3.png')'>";
          break;
      }
    }
  }
};
</script>

