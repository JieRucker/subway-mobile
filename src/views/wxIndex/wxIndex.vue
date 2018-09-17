<style lang="scss">
  .index {
    .staff {
      background-color: #f4f4f4;
      padding-bottom: 12rem;
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
        .reason{
          padding: 0.5rem 0;
          font-size: 1.3rem;
          line-height: 2rem;
          .span{
            font-weight: 700;
          }
        }
      }
    }
  }
</style>

<template>
  <div class="index">
    <x-header :left-options="{backText: '',showBack:false}"
              style="background:linear-gradient(to right,#447bba,#7a88bd,#928dba);">
      <span slot="left" style="color: #fff;font-size: 18px;">首页</span>
      <span slot="right" style="color: #fff;">当前项目：{{$store.state.base.userInfo.projectName}}</span>
    </x-header>
    <div class="staff">
      <scroller ref="scroller" lock-x height="-92"
                :use-pulldown="false" :use-pullup="true"
                @on-pullup-loading="onPullUp()" @on-pulldown-loading="onPullDown()"
                :pulldown-config="{downContent: '下拉刷新', upContent: '释放后更新',loadingContent: '正在刷新...'}"
                :pullup-config="{upContent:'上拉加载更多', downContent: '释放后加载',loadingContent: '加载中...'}"
                :scroll-bottom-offset="200">
        <div>
          <div class="box" v-for="(item,index) in dbPageList">
            <div class="revoke-block">
              <div class="revoke" v-if="item.revocation" @click="_revoke(item.userScoreOperateId)">撤销</div>
              <div class="revoked" v-if="judgeState(item.state)">已撤销</div>
            </div>
            <CreaterInfo :creater-info="item.safeUser"></CreaterInfo>
            <ImagesList :text-content="item.userScoreOperate.operateDesc"
                        :images-list="item.userScoreOperate.userPicURL"></ImagesList>
            <MemberList :member-list="item.normalUser" :user-score-operate="item.userScoreOperate"></MemberList>
            <div class="reason set-1px-t" v-if="item.state === 2"><span>撤销理由：</span>{{item.revocationDesc}}</div>
          </div>
          <divider v-show="showDivider">{{dbPageList.length==0?"暂无数据":"到底了"}}</divider>
          <br>
        </div>
      </scroller>
    </div>
    <FooterTabbar :tabbar-index="0"></FooterTabbar>
  </div>
</template>

<script>
  import FooterTabbar from '@/components/FooterTabbar.vue'
  import MemberList from '@/components/MemberList.vue'
  import ImagesList from '@/components/ImagesList.vue'
  import CreaterInfo from '@/components/CreaterInfo.vue'
  import {Divider, Scroller, XHeader} from 'vux'

  export default {
    name: "wxIndex",
    components: {FooterTabbar, MemberList, ImagesList, CreaterInfo, XHeader, Divider, Scroller},
    props: {},
    data() {
      return {
        showDivider: false,
        dbPageList: [],
        hasMore: true,
        PAGE_SIZE: 6,
        scrollBottomNum: 0,
        userType: '',
      }
    },
    computed: {},
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
              this.$router.replace({name:'blank',query:{name:'wxIndex'}})
            } else {
              console.log(res.retMsg);
            }
          }).catch(err => {
          console.error(err);
        });
      },
      onPullDown() {
        location.reload();
      },
      onPullUp() {
        if (!this.hasMore) {
          this.$refs.scroller.disablePullup();
          this.showDivider = true;
          return false;
        }
        console.log("onPullUp,hasmore = true");

        this.sendRequest();

      },
      sendRequest() {
        this.$api.mainInterface
          .listUserScoreOperate({
            pageSize: this.PAGE_SIZE,
            startRow: this.PAGE_SIZE * this.scrollBottomNum
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
    mounted() {
      if (userType === "3" || userType === "5") {
        this.$nextTick(() => {
          this.$refs.scroller.reset({top: 0});
        });
        this.onPullUp();
      }

    },
    filters: {

    }
  }
</script>

