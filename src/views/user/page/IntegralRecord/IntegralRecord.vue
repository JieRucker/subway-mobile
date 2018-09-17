<style lang="scss">
.integralRecord {
  .staff {
    background-color: #f4f4f4;
    .box {
      padding: 1rem 1rem;
      background-color: #fff;
      margin-bottom: 10px;
    }
  }
}
</style>

<template>
    <div class="integralRecord">
        <x-header :left-options="{backText: ''}" title="积分记录" style="background:linear-gradient(to right,#447bba,#7a88bd,#928dba);">
          <!--<a slot="right" style="color: #fff;">切换项目</a>-->
        </x-header>

        <div class="staff">
          <scroller lock-x height="-48"
            ref="scroller" :scroll-bottom-offset="200"
            :use-pullup="true" :use-pulldown="false"
            @on-pullup-loading="onPullUp()" @on-pulldown-loading="onPullDown()"
              :pulldown-config="{downContent: '下拉刷新', upContent: '释放后更新',loadingContent: '正在刷新...'}"
              :pullup-config="{upContent:'上拉加载更多', downContent: '释放后加载',loadingContent: '加载中...'}">
            <div>
              <div class="box" v-for="(item,index) in dbPageList">
                <CreaterInfo :creater-info="item.safeUser"></CreaterInfo>
                <ImagesList :text-content="item.userScoreOperate.operateDesc"
                            :images-list="item.userScoreOperate.userPicURL"></ImagesList>
                <MemberList :member-list="item.normalUser" :user-score-operate="item.userScoreOperate"></MemberList>
              </div>
              <divider v-show="showDivider">{{dbPageList.length==0?"暂无数据":"到底了"}}</divider>
              <br>
            </div>
          </scroller>
        </div>
    </div>
</template>

<script>
import MemberList from "@/components/MemberList.vue";
import ImagesList from "@/components/ImagesList.vue";
import CreaterInfo from "@/components/CreaterInfo.vue";
import { XHeader, Divider, Scroller,PopupPicker  } from "vux";
export default {
  name: "IntegralRecord",
  components: {
    XHeader,
    MemberList,
    ImagesList,
    CreaterInfo,
    Divider,
    Scroller,PopupPicker
  },
  props: {},
  data() {
    return {
      showDivider:false,
      dbPageList: [],
      hasMore: true,
      PAGE_SIZE: 8,
      scrollBottomNum: 0
    };
  },
  computed: {},
  mounted() {
    var that = this;
    this.$nextTick(() => {
      this.$refs.scroller.reset({ top: 0 });
    });
    this.onPullUp();
  },
  methods: {
    //上拉加载更多
    onPullUp() {
      console.log('onPullUp');
      if (this.hasMore == false) {
        this.$refs.scroller.disablePullup();
        this.showDivider = true;
        return false;
      }
      console.log('onPullUp,hasmore = true');

      this.sendRequest();
    },
    //下拉刷新
    onPullDown() {
      console.log('onPullDown');
      this.dbPageList = [];
      this.scrollBottomNum = 0;
      this.hasMore = true;
      this.showDivider = false;
      this.$refs.scroller.donePulldown();
      this.$refs.scroller.donePullup();
      this.sendRequest();
    },
    sendRequest() {
      var that = this;
      this.$api.userInterface.listUserScoreOperate({
          projectId: this.$route.query.projectId,
          pageSize: this.PAGE_SIZE,
          startRow: this.PAGE_SIZE * this.scrollBottomNum,
          userId: this.$route.query.uid
        })
        .then(res => {
          if (res.data.success) {
            this.$nextTick(() => {
              this.$refs.scroller.reset();
            });
              if(typeof res.data.data!='undefined'){
                this.dbPageList = this.dbPageList.concat(res.data.data.dbPageList);
                this.hasMore = res.data.data.hasMore;
              }else{
                this.hasMore = false;
              }
            this.scrollBottomNum++;
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

