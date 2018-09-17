<style lang="scss">
.MyRelease {
  background-color: #f4f4f4;
  .scroller {
    margin-bottom: 8rem;
  }
  .avatar-box {
    background: -webkit-linear-gradient(
      left,
      #447bba,
      #7a88bd,
      #928dba
    ); /* Safari 5.1 - 6.0 */
    background: linear-gradient(
      to right,
      #447bba,
      #7a88bd,
      #928dba
    ); /* 标准的语法 */
    text-align: center;
    overflow: hidden;
    img {
      width: 7rem;
      height: 7rem;
      border-radius: 50%;
      margin-top: 2rem;
    }
    p {
      font-size: 1.6rem;
      margin-top: 1rem;
      margin-bottom: 2rem;
      color: #fff;
    }
  }
  .box {
    padding: 1rem 1rem;
    background-color: #fff;
    margin-bottom: 10px;
    position: relative;
    .revoke-block {
      position: absolute;
      top: 2rem;
      right: 1.4rem;
      z-index: 100;
      .revoke, .revoked {
        padding: 3px 9px 4px;
        color: #fff;
        border-radius: 3px;
        font-size: 14px;
      }
      .revoke {
        background: #ff9800;
      }
      .revoked {
        background: #898989;
      }
    }
  }
  .reason{
    padding: 0.5rem 0;
    font-size: 1.3rem;
    line-height: 2rem;
    .span{
      font-weight: 700;
    }
  }
}
</style>

<template>
  <div class="MyRelease">
    <x-header :left-options="{backText: ''}" title="我的发布"
              style="background:linear-gradient(to right,#447bba,#7a88bd,#928dba);"></x-header>


          <scroller lock-x height="-46" class="scroller"
            ref="scroller" :scroll-bottom-offset="200"
            :use-pullup="true" :use-pulldown="false"
            @on-pullup-loading="onPullUp()" @on-pulldown-loading="onPullDown()"
              :pulldown-config="{downContent: '下拉刷新', upContent: '释放后更新',loadingContent: '正在刷新...'}"
              :pullup-config="{upContent:'上拉加载更多', downContent: '释放后加载',loadingContent: '加载中...'}">
            <div>
    <div class="avatar-box">
      <img :src="$store.state.base.userInfo.headUrl" alt="">
      <p class="name">{{$store.state.base.userInfo.userName}}</p>
    </div>
    <div class="box" v-for="(item,index) in dbPageList">
      <div class="revoke-block">
        <div class="revoke" v-if="item.revocation" @click="_revoke(item.userScoreOperateId)">撤销</div>
        <div class="revoked" v-if="judgeState(item.state)">已撤销</div>
      </div>
      <ImagesList style="color:#888" :text-content="item.userScoreOperate.operateDesc"
                  :images-list="item.userScoreOperate.userPicURL"></ImagesList>
      <TimeAndPosition :create-date="item.safeUser.createDate"></TimeAndPosition>
       <MemberList :member-list="item.normalUser" :user-score-operate="item.userScoreOperate"></MemberList>
      <div class="reason set-1px-t" v-if="item.state === 2"><span>撤销理由：</span>{{item.revocationDesc}}</div>

    </div>
              <divider v-show="showDivider">{{dbPageList.length==0?"暂无数据":"到底了"}}</divider>
              <br>
            </div>
          </scroller>

  </div>
</template>

<script>
import MemberList from "@/components/MemberList.vue";
import ImagesList from "@/components/ImagesList.vue";
import TimeAndPosition from "@/components/TimeAndPosition.vue";
import { XHeader, Divider, Scroller } from "vux";

export default {
  name: "MyRelease2",
  components: {
    XHeader,
    Scroller,
    MemberList,
    ImagesList,
    TimeAndPosition,
    Divider
  },
  props: {},
  data() {
    return {
      showDivider: false,
      dbPageList: [],
      hasMore: true,
      PAGE_SIZE: 8,
      scrollBottomNum: 0,
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.scroller.reset({ top: 0 });
    });
    this.onPullUp();
  },
  methods: {
    judgeState(value) {
      switch (value) {
        case 1:
          return false;
          break;
        case 2:
          return true;
          break;
      }
    },
    _revoke(id) {
      console.log("revoke");
      const _this = this;
      this.$vux.confirm.prompt('', {
        title: '请填写撤销理由',
        inputAttrs: {
          type: 'text'
        },
        onShow() {
          console.log('promt show');
          _this.$vux.confirm.setInputValue('');
        },
        onHide() {
          console.log('prompt hide')
        },
        onCancel() {
          console.log('prompt cancel')
        },
        onConfirm(msg) {
          console.log(msg);
          if (msg === '') {
            _this.$vux.toast.text('撤销理由不能为空', 'middle');
          } else {
            _this._revokeRequest(msg, id);
          }

        }
      })

    },
    _revokeRequest(msg,id) {
      this.$vux.loading.show({text: "正在撤销"});
      this.$api.mainInterface
        .revokeOperate({
          desc: msg,
          userScoreOprateId: id
        })
        .then(res => {
          this.$vux.loading.hide();
          res = res.data;
          if (res.success) {
            console.log("撤销成功");
            this.$vux.toast.show({type: 'success', text: '撤销成功'});
          } else {
            console.log(res.retMsg);
          }
        }).catch(err => {
        console.error(err);
      });
    },
    //上拉加载更多
    onPullUp() {
      console.log("onPullUp");
      if (this.hasMore === false) {
        this.$refs.scroller.disablePullup();
        this.showDivider = true;
        return false;
      }
      console.log("onPullUp,hasmore = true");

      this.sendRequest();
    },
    //下拉刷新
    onPullDown() {
      console.log("onPullDown");
      this.dbPageList = [];
      this.scrollBottomNum = 0;
      this.hasMore = true;
      this.showDivider = false;
      this.$refs.scroller.donePulldown();
      this.$refs.scroller.donePullup();
      this.sendRequest();
    },

    sendRequest() {
      this.$api.mainInterface
        .listUserScoreOperate({
          pageSize: this.PAGE_SIZE,
          startRow: this.PAGE_SIZE * this.scrollBottomNum,
          userId: this.$store.state.base.userId
        })
        .then(res => {
          if (res.data.success) {
            this.$nextTick(() => {
              this.$refs.scroller.reset();
            });

            if (typeof res.data.data !== "undefined") {
              let dataList = res.data.data.dbPageList;
              if(userType === '3'){
                dataList.forEach((item,index) =>{
                  if(item.state === 2){
                    dataList.splice(index,1);
                  }
                });
              }
              this.dbPageList = this.dbPageList.concat(dataList);
              this.hasMore = res.data.data.hasMore;
            } else {
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
  },
  filters: {

  }
};
</script>

