<style lang="less">
  .operate {
    .weui-cell__ft {
      color: #000 !important;
    }
    .vux-tab {
      background-color: transparent;
    }
    .header-tab {
      margin: 0 5%;
    }
    .vux-header-title-area, .vux-header .vux-header-title {
      height: 43px !important;
      overflow: none;
    }
    .vux-tab{
      width: 60%;
      margin-left: 20%;
    }
    .vux-tab-item {
      font-size: 16px !important;
    }
    .vux-tab-selected {
      font-weight: bold;
      font-size: 18px !important;
    }
    .header-right {
      background-color: #ff9800;
      color: #fff !important;
      margin: -3px -2px !important;
      padding: 3px 12px !important;
      border-radius: 3px;
    }
    .vux-header-right {
      z-index: 100;
    }
    .weui-textarea{
      font-size: 16px !important;
    }
    .add {
      padding:0 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      text-align: center;
      .add-item {
        display: flex;
        align-items: center;
        background-color: #eee;
        /*font-size: 14px;*/
        .weui-btn_mini{
          padding: 0 0.7em;
        }
        img {
          width: 20px;
          height: 20px;
          vertical-align: middle;
          margin-bottom: 5px;
        }
      }

    }
    .score {
      margin-right:20px;
      text-align: right;
      input {
        width: 15vw;
        border: 1px solid #ddd;
        height: 26px;
        font-size: 16px;
      }
    }
    .member-list {
      .member {
        border-bottom: 1px solid #f2f2f2;
      }
    }
  }

</style>

<template>
  <div class="operate">
    <x-header
      :left-options="{backText: '',showBack:true}"
      title="slot:overwrite-title"
      style="background:linear-gradient(to right, #447bba  , #7a88bd,  #928dba);"
    >
      <div class="header-tab" slot="overwrite-title">
        <tab :line-width="2" default-color="#fff" active-color="#fff" bar-active-color="#e53935">
          <tab-item
            v-for="(item,index) in operateTypeList"
            :key="index"
            :selected="item.select"
            @on-item-click="onItemClick(item.key)">
            {{item.value}}
          </tab-item>
        </tab>
      </div>
      <a class="header-right" @click="confirmBtn" slot="right">发布</a>
    </x-header>
    <!-- text -->
    <x-textarea
      title=""
      placeholder="加减分事由的详细描述......"
      :show-counter="false"
      :height="120"
      :rows="8"
      :cols="25"
      v-model="getOperateDesc"
      @on-change="changeOperateDesc"
    ></x-textarea>

      <!--分数-->
    <div class="score">
      <span v-if="selectOperateType === 1"> 加分值：</span>
      <span v-if="selectOperateType === 2"> 减分值：</span>
      <input type="text" name="score" v-model="score">
    </div>
    <!-- 上传图片 -->
    <wx-uploader ref="wxUploader"></wx-uploader>

    <div class="add">
      <div class="add-item add-photo">
        <x-button type="default" :mini="true" class="btn-confirm" @click.native="takePicture">
          <img :src="require('@/assets/images/icon/icon-main-camera.png')" alt="">添加照片</x-button>
      </div>
      <div class="add-item add-member">
        <x-button type="default" :mini="true" class="btn-confirm" @click.native="editButton">
          <img :src="require('@/assets/images/icon/icon-main-message.png')" alt="">添加员工</x-button>
      </div>
      <div class="add-item add-rule">
        <x-button type="default" :mini="true" class="btn-confirm" @click.native="chooseRule">
          <img :src="require('@/assets/images/icon/icon-main-chooseRule.png')" alt="">选择规则</x-button>
      </div>


    </div>
    <div style="margin-top: 10px">
      <MemberList :member-list="getUserList" :show-score="false" :show-delete="true"
                  @on-handle-delete="onHandleDelete"></MemberList>
    </div>

    <!-- 模态弹出框actionsheet -->
    <actionsheet
      v-model="showActionSheet"
      :menus="actionSheetMenus"
      @on-click-menu="menusButton"
      show-cancel
    ></actionsheet>

    <div v-transfer-dom>
      <popup v-model="showRuleMenus" position="bottom" max-height="60%">
        <!--<group title="">-->
          <!--<x-input title="自定义分值：" v-model="score" placeholder="" keyboard="number">-->
            <!--<x-button slot="right" style="width: 100px;" :gradients="['#447bba', '#928dba']" mini @click.native="showRuleMenus = false">确定</x-button>-->
          <!--</x-input>-->
        <!--</group>-->
        <group title="选择规则：">
          <cell v-for="item in ruleList" :key="item" :title="item.operateDesc" @click.native="saveScore(item.operateDesc,item.score,item.userScoreRuleId)">{{item.score}}</cell>
        </group>
      </popup>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import MemberList from '@/components/MemberList.vue'
  import wxUploader from '@/components/wxUploader/wxUploader.vue';

  import {
    Actionsheet,
    Tab,
    TabItem,
    XHeader,
    ButtonTab,
    ButtonTabItem,
    XInput,
    XButton,
    GroupTitle,
    Group,
    Cell,
    CellBox,
    Checklist,
    Selector,
    Icon,
    XTextarea,
    Confirm,
    Loading,
    Toast,Popup,TransferDom
  } from 'vux'

  export default {
    name: "Operate",
    directives: {
      TransferDom
    },
    components: {
      MemberList,
      wxUploader,
      Actionsheet,
      Tab,
      TabItem,
      ButtonTab,
      ButtonTabItem,
      XHeader,
      XInput,
      XButton,
      GroupTitle,
      Group,
      Cell,
      CellBox,
      Icon,
      Checklist,
      Selector,
      XTextarea,
      Confirm,
      Loading,
      Toast,
      Popup,TransferDom
    },
    computed: {
      ...mapGetters([
        'getSearchType',
        'getSearchKey',
        'getOperateDesc',
        'getUserList',
        'getImageList',
      ])
    },
    data() {
      return {
        userScoreRuleId:'',
        showRuleMenus: false,
        ruleList:[],
        score: 10,// 加、减分
        operateTypeList: [
          {
            key: 1,
            value: '加分',
            select:true
          },
          {
            key: 2,
            value: '减分',
            select:false
          }
        ],
        selectOperateType: 1,
        showActionSheet: false,
        actionSheetMenus: {
          menu1: "输入员工编号",
          menu2: "扫描二维码"
        }
      }
    },
    mounted() {

    },
    methods: {
      chooseRule(){
        this.showRuleMenus = true;
        this.$api.userInterface.listRule({
          projectId: this.$store.state.base.userInfo.projectId,
          operateType:this.selectOperateType,
          startRow: 0,
          pageSize: 10000,
        }).then(res => {
          if (res.data.success){
            let target = [];
            [...res.data.data.dbPageList].map(m => target.push({
              operateDesc:m.operateDesc,
              score:m.score,
              userScoreRuleId:m.userScoreRuleId,
            }));
            this.ruleList = target;
            console.log(this.ruleList);
          }else{
            this.$vux.toast.text(res.data.retMsg, 'top');
          }
        }).catch(err => {
          console.error(err)
        })
      },
      saveScore(desc,score,userScoreRuleId){
        this.$store.dispatch('setOperateDesc', desc);
        this.score = score;
        this.userScoreRuleId = userScoreRuleId;
        console.log(this.getOperateDesc +',,,,,'+this.score+'------'+this.userScoreRuleId);
        this.showRuleMenus = false;
      },
      onHandleDelete(item) {
        let a = item.userId;
        let list = this.getUserList;
        [...list].map((m, i) => {
          if (a === m.userId) list.splice(list[i], 1)
        })
      },
      //菜单的两个按钮
      menusButton(key) {
        console.log(key);//3种情况
        switch (key) {
          case "menu1":
            this.search();
            break;
          case "menu2":
            this.scanQrcode();
            break;
          case "photo1":

            break;
          case "photo2":
            break;
        }
      },
      //搜索
      search() {
        this.$store.dispatch('setSearchType', 0);
        this.$store.dispatch('setSearchKey', '');
        this.$router.push({path: './SearchMember'});
      },
      changeOperateDesc(value) {
        this.$store.dispatch('setOperateDesc', value)
      },
      scanQrcode() {
        if (wx && wx !== 'undefined') {
          wx.scanQRCode({
            needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
            scanType: ["qrCode"], // 可以指定扫二维码还是一维码，默认二者都有
            success: (res) => {
              let uid;
              uid = this.$Global.lastIndexOf('\/', res.resultStr);
              this.$store.dispatch('setSearchType', 1);
              this.$store.dispatch('setSearchKey', uid);
              this.$router.push({
                name: 'SearchMember'
              });
            }
          });
        }
      },
      // 照片上传
      takePicture() {
        this.$refs.wxUploader.chooseImage();
      },
      //点击编辑按钮,从底部弹出模态框
      editButton() {
        this.actionSheetMenus = {
          menu1: "输入员工编号",
          menu2: "扫描二维码"
        };
        this.showActionSheet = true;
      },
      onItemClick(key) {
        this.selectOperateType = key;
      },
      //确定按钮
      confirmBtn() {
        let that = this;
        if (this.$Global.isBlank(this.getOperateDesc)) {
          return this.$vux.toast.text('请输入内容', 'top');
        }

        if (!this.getImageList.length) {
          return this.$vux.toast.text('请选择图片', 'top');
        }

        if (!this.getUserList.length) {
          return this.$vux.toast.text('请添加员工', 'top');
        }
        this.$vux.confirm.show({
          title: '确认发布',
          content: '信息填写完毕，是否确认发布',
          cancelText: '返回修改',
          confirmText: '确认发布',
          onCancel() {
            console.log('plugin cancel')
          },
          onConfirm() {
            let param = (() => {
              let target = new Object(null);
              target.mediaIdJsonArray = (() => {
                let a = [];
                let b = that.getImageList;
                if (b.length) ([...b].map(m => a.push(m.serverId)));
                return JSON.stringify(a);
              })();// 本地文件图片名数组
              target.normalUserList = (() => {
                let a = [];
                let u = that.getUserList;
                if (u.length) {
                  [...u].map(m => {
                    a.push(m.userId)
                  })
                }

                return JSON.stringify(a)
              })();// 加/减分员工Id集合
              target.operateDesc = that.getOperateDesc;// 事项原由详细描述
              target.operateType = that.selectOperateType;// 1 加分 2 减分
              target.score = that.score; // 加/减 分数
              target.userScoreRuleId = that.userScoreRuleId; // 规则id
              return target;
            })();

            that.$vux.loading.show({
              text: '正在提交'
            });

            that.$api.userInterface.operateScore(param).then(res => {
              that.$vux.loading.hide();
              if (res.data.success) {
                that.$store.dispatch('setOperateInfo', {
                  operateDesc: '',
                  userList: [],
                  imageList: []
                });
                that.$vux.toast.text(res.data.data, 'top');
              }else{
                that.$vux.toast.text(res.data.retMsg, 'top');
              }
            }).catch(err => {
              console.error(err)
            })
          }
        })
      }
    }
  }
</script>
