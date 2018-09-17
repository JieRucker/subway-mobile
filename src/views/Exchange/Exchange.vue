<style lang="scss">
  .exchange {
    padding-bottom: 7rem;
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
          top: 10%;
          right: 1.4rem;
          z-index: 1;
          font-size: 1.6rem;
          color: #666;
        }
        .revoke-block {
          position: absolute;
          bottom: 10%;
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
  <div class="exchange clearfix">
    <x-header :left-options="{backText: '',showBack:false}" style="background:linear-gradient(to right,#447bba,#7a88bd,#928dba);">
      <span slot="left" style="color: #fff;font-size: 18px;">我的订单</span>
      <span slot="right" style="color: #fff;">当前项目：{{$store.state.base.userInfo.projectName}}</span>
    </x-header>
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
                <span class="score">{{item.state | judgeState}}</span>
                <div class="revoke-block">
                  <div class="revoke" v-if="item.revocation" @click="_revoke(item.userScoreExchangeId)">撤销</div>
                  <!--<div class="revoked" v-if="item.state | judgeState">已撤销</div>-->
                </div>
              </div>
            </div>
          </cell>
          <div v-show="item.showContent">
            <cell class="content-cell" :border-intent="false" title="兑换单号：" :value="item.userScoreExchangeId"></cell>
            <cell class="content-cell" :border-intent="false" title="兑换时间：" :value="item.createDate"></cell>
            <cell class="content-cell" :border-intent="false" title="兑换金额：" :value="item.exchangeScore+'元'"></cell>
            <cell class="content-cell" :border-intent="false" title="撤销理由："  v-if="item.state === 2" :value="item.revocationDesc"></cell>
            <img :src="item.userPicURL" style="width: 60%;margin-left: 20%;margin-bottom:10px;">
          </div>
        </div>
        <divider v-show="showDivider">{{dbPageList.length===0?"暂无数据":"到底了"}}</divider>
        <br>
      </div>
    </scroller>
      <FooterTabbar :tabbar-index="4" v-if="showTabbar"></FooterTabbar>
  </div>
</template>

<script>
import FooterTabbar from '@/components/FooterTabbar'
  import {XHeader, Group, Cell, CellBox, Scroller,Divider} from "vux";
  export default {
    name: "Exchange",
    components: {FooterTabbar,XHeader, Group, Cell, CellBox, Scroller,Divider},
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
      this.$nextTick(() => {
        this.$refs.scroller.reset({top: 0});
      });
      this.onPullUp();
    },
    computed: {
      showTabbar(){
        return this.$store.state.base.userType === 4
      }
    },
    methods: {
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
          .revokeExchange({
            desc: msg,
            exchangeResultId: id
          })
          .then(res => {
            this.$vux.loading.hide();
            res = res.data;
            if (res.success) {
              console.log("撤销成功");
              this.$vux.toast.show({type: 'success', text: '撤销成功'});
              this.$router.replace({name: 'blank', query: {name: 'Exchange'}});
            } else {
              console.log(res.retMsg);
            }
          }).catch(err => {
          console.error(err);
        });
      },
      toggle(item) {
        item.showContent = !item.showContent;
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
      sendRequest() {
        var that = this;
        this.$api.mainInterface
          .listUserDbPageExchangeResult({
            pageSize: this.PAGE_SIZE,
            startRow: this.PAGE_SIZE * this.scrollBottomNum,
            exchangerId: this.$store.state.base.userId
          })
          .then(res => {
            if (res.data.success) {
              this.$nextTick(() => {
                this.$refs.scroller.reset();
              });

              if(typeof res.data.data !== 'undefined'){
                let dataList = res.data.data.dbPageList;
                if(userType === '4'){
                  dataList.forEach((item,index) =>{
                    if(item.state === 2){
                      dataList.splice(index,1);
                    }
                  });
                }
                this.dbPageList = this.dbPageList.concat(dataList);
                this.hasMore = res.data.data.hasMore;
              }else{
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
              console.log(res.data.retMsg);
            }
          })
          .catch(err => {
            console.error(err);
          });
      }
    },
    filters: {
      judgeState(value) {
        switch (value) {
          case 1:
            return "已支付";
            break;
          case 2:
            return "已撤销";
            break;
        }
      }
    }
  };
</script>

