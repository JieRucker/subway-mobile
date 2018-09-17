<style lang="scss">
  .integral-exchange {
    .member {
      position: relative;
      overflow: hidden;
      padding: 0.6rem 0rem;
      margin-top: 50px;
      position: relative;
      &:active {
        background-color: #f6f6f6;
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
          margin-top: .2rem;
        }
        .name {
          font-size: 1.4rem !important;
        }
        .group, .id {
          color: #888;
          font-size: 1.2rem !important;
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
    .p1 {
      margin-top: 30px;
      margin-left: 10px;
      font-size: 1.6rem;
    }
    .p2 {
      width: 92%;
      margin: 20px auto;
      display: flex;
      span {
        font-size: 3.8rem;
      }
      /*input {*/
        /*border: none;*/
        /*outline: none;*/
        /*font-size: 30px;*/
        /*width: 100%;*/
      /*}*/
    }
    .add-photo {
      width: 100px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #eee;
      margin-left: 10px;
      padding: 8px 8px;
      border-radius: 6px;
      font-size: 1.3rem;
      img {
        width: 20px;
        height: 20px;

      }
    }
    .inputScore{
      font-size: 34px;
      width: 100%;
      &:before{
        height: 0px !important;
        border-top: 0px !important;
      }
    }
    /*.btn {*/
      /*width: 80%;*/
      /*background-color: #fff;*/
      /*margin-top: 40px;*/
    /*}*/

  }
</style>

<template>
  <div class="integral-exchange clearfix">
    <x-header :left-options="{backText: '',showBack:true}" title="积分兑换"
              style="background:linear-gradient(to right,#447bba,#7a88bd,#928dba);"></x-header>

    <div class="member" v-for="(item,index) in memberList">
      <div class="member-avatar">
        <img :src="item.headUrl" class="member-avatar-img" alt="">
      </div>
      <div class="member-desc">
        <span class="name">{{item.userName}}</span>
        <span class="group">{{item.groupName}}</span>
        <span class="id">{{item.loginName}}</span>
        <span class="score">{{item.userRemainScore}}分</span>
      </div>
    </div>

    <p class="p1">兑换积分</p>
    <p class="p2 set-1px-b">
      <span>￥</span>
      <!--<input ref="input" type="text" v-model="score">-->
      <x-input class="inputScore" ref="input" keyboard="number" v-model="score"></x-input>

    </p>

    <!-- 上传图片 -->
    <wx-uploader ref="wxUploader" :max-num-limit="1"></wx-uploader>

    <div class="add-photo" @click="chooseImage" v-if="!getImageList.length">
      <img :src="require('@/assets/images/icon/icon-main-camera.png')" alt=""> 添加照片
    </div>

    <div style="margin-top: 10px">
      <MemberList :member-list="getUserList" :show-score="false" :show-delete="true"
                  @on-handle-delete="onHandleDelete"></MemberList>
    </div>
    <div style="margin:30px 15px 0 ;">
      <x-button :gradients="['#447bba', '#928dba']" @click.native="confirmExchange()">确认兑换</x-button>
    </div>
  </div>
</template>

<script>
  import {XButton, XHeader,XInput, Actionsheet} from 'vux';
  import {mapGetters} from 'vuex';
  import MemberList from '@/components/MemberList.vue'
  import wxUploader from '@/components/wxUploader/wxUploader.vue';


  export default {
    name: "IntegralExchange",
    components: {MemberList, wxUploader, XButton, XHeader, XInput, Actionsheet},
    computed: {
      ...mapGetters([
        'getScanUserId',
        'getImageList',
        'getUploadId',
        'getUploader'
      ])
    },
    data() {
      return {
        score: '',// 积分
        memberList: []
      }
    },
    destroyed() {
      this.$store.dispatch('setImageList', []);
    },
    mounted() {
      this.$refs.input.focus();
      this.$store.dispatch('setImageList', []);
      this.$store.dispatch('setUploadId', null);
      this.$store.dispatch('setUploader', null);
      this.getUser();
    },
    methods: {
      getUser() {
        this.$api.userInterface.getUser({
          userId: this.getScanUserId
        }).then(res => {
          if (res.data.success) {
            this.memberList = new Array({
              groupName: res.data.data.groupName,
              headUrl: res.data.data.headUrl,
              loginName: res.data.data.loginName,
              userName: res.data.data.userName,
              userId: res.data.data.userId,
              userRemainScore: res.data.data.userRemainScore
            });
          }
        }).catch(err => {
          console.error(err)
        })
      },
      // 照片上传
      chooseImage() {
        this.$refs.wxUploader.chooseImage();
      },
      onHandleDelete(item) {
        let a = item.userId;
        let list = this.getUserList;
        [...list].map((m, i) => {
          if (a === m.userId) list.splice(list[i], 1)
        })
      },
      //确认兑换
      confirmExchange() {
        if (this.$Global.isBlank(this.score)) {
          return this.$vux.toast.text('请输入积分', 'top');
        }

        if (!this.getImageList.length) {
          return this.$vux.toast.text('请选择图片', 'top');
        }


        // 监听文件上传finish
        let param = (() => {
          let target = new Object(null);
          target.mediaIdJsonArray = (() => {
            let a = [];
            let b = this.getImageList;
            if (b.length) ([...b].map(m => a.push(m.serverId)));
            return JSON.stringify(a);
          })();// 本地文件图片名数组
          target.normalUserId = this.getScanUserId;
          // target.normalUserId = '350969bd7e14003';//TODO test兑换员id
          target.score = this.score;// 兑换使用的积分数量

          return target;
        })();

        this.$vux.loading.show({
          text: '正在提交'
        });

        this.$api.exchangeInterface.scoreExchange(param).then(res => {
          this.$vux.loading.hide();
          if (res.data.success) {
            this.$store.dispatch('setOperateInfo', {
              imageList: []
            });

            this.score = '';
            this.$vux.toast.text(res.data.retMsg, 'top');
          } else {
            this.$vux.toast.text(res.data.retMsg, 'top');
          }
        }).catch(err => {
          console.error(err)
        })


        // this.$router.push({path:'/wxIndex',query:{}});
      },
    }
  }
</script>

