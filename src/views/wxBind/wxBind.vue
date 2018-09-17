<style lang="scss">
  .bind-phone-number {
    /*text-align: center;*/
    /*display: flex;*/
    /*flex-direction: column;*/
    /*.div,*/
    /*.btn-change {*/
      /*margin: 2.5rem 5% 0;*/
    /*}*/
    /*.input1 {*/
      /*width: 100%;*/
      /*height: 35px;*/
      /*border: 1px solid #ddd;*/
      /*padding-left: 1rem;*/
      /*font-size: 1.6rem;*/
    /*}*/
    /*.div2 {*/
      /*display: flex;*/
      /*.input2 {*/
        /*flex: 2;*/
        /*width: 100%;*/
        /*height: 35px;*/
        /*border: 1px solid #ddd;*/
        /*padding-left: 1rem;*/
        /*font-size: 1.6rem;*/
        /*font-weight: bold;*/
      /*}*/
      /*.input2::-webkit-input-placeholder {*/
        /*font-weight: 400;*/
      /*}*/
      /*.btn-get {*/
        /*flex: 1;*/
        /*margin-left: 1rem;*/
        /*background-color: #fff;*/
        /*font-size: 1.4rem;*/
      /*}*/
    /*}*/
    /*.btn-change {*/
      /*width: 94%;*/
      /*margin: 2.5rem auto;*/
    /*}*/
  }
  input {
    outline: none;
  }
</style>
<template>
  <div class="bind-phone-number clearfix">

    <x-header :left-options="{backText: ''}" title="绑定手机号码"
              style="background:linear-gradient(to right, #447bba  , #7a88bd,  #928dba);"></x-header>


    <!--<div class="div div1">-->
    <!--<input type="text" v-model="phoneNum" ref="phoneNum" name="phoneNum" class="input input1" placeholder="请输入新的手机号">-->
    <!--</div>-->
    <!--<div class="div div2">-->
    <!--<input type="text" v-model="inputCode" name="inputCode" class="input input2" placeholder="请输入验证码">-->
    <!--<x-button class="btn-get" :disabled="yzmDisabled" @click.native="getCode">{{yzmNum}}</x-button>-->
    <!--</div>-->

    <group>
      <x-input name="phoneNum" ref="phoneNum" v-model="phoneNum" placeholder="请输入手机号码" keyboard="number"></x-input>
      <x-input name="inputCode" v-model="inputCode" placeholder="请输入验证码" keyboard="number">
        <x-button slot="right" style="width: 100px;" :gradients="['#447bba', '#928dba']" mini :disabled="yzmDisabled" @click.native="getCode">{{yzmNum}}</x-button>
      </x-input>
    </group>
    <div style="margin:30px 15px;">
      <x-button :gradients="['#447bba', '#928dba']" @click.native="confirmBind()">确认绑定</x-button>
    </div>

    <!--<x-button class="btn-change" @click.native="confirmBind()">确认绑定</x-button>-->
  </div>
</template>

<script>
  import {XButton, XInput, Group, XHeader} from "vux";

  export default {
    name: "wxBind",
    components: {XButton, XInput, Group, XHeader},
    props: {},
    data() {
      return {
        phoneNum: "",
        inputCode: "",
        regBox: {
          phone: /^[1][3,4,5,6,7,8,9][0-9]{9}$/ //手机号码第二位不能是1和2
        },
        yzmNum: "获取验证码",
        yzmDisabled: false
      };
    },

    mounted() {
      this.$refs.phoneNum.focus();
    },
    methods: {
      //点击确认绑定
      confirmBind() {
        var that = this;
        console.log('2手机号码' + that.phoneNum);
        console.log('2验证码' + that.inputCode);
        if (!this.regBox.phone.test(this.phoneNum)) {
          this.$vux.toast.text("不是标准的手机号码", "top");
          return false;
        }
        if (that.inputCode === '') {
          this.$vux.toast.text("请填写验证码", "top");
          return false;
        }
        this.$api.loginInterface.bindPhoneNum({
          appId: appId,
          openId: openId,
          phoneNum: that.phoneNum,
          verifyCode: that.inputCode
        }).then(res => {
          if (res.data.success) {
            console.log(res);
            if (res.data.success) {
              window.location.href = subwayEnterUrl;
              // that.$router.push({path: '/wxIndex', query: {turnTo: 'wxIndex'}});
            }
          } else {
            console.log("请求失败2");
            console.log(res);
          }
        }).catch(err => {
          console.error(err)
        })
      },
      //点击获取验证码
      getCode() {
        console.log('2手机号码' + this.phoneNum);
        console.log('2验证码' + this.inputCode);
        var that = this;
        if (!this.regBox.phone.test(this.phoneNum)) {
          this.$vux.toast.text("不是标准的手机号码", "top");
          return false;
        }
        //点击获取验证码发送请求
        this.$api.loginInterface.sendWxBindVerifyCode({
          phoneNum: that.phoneNum
        }).then(res => {
          if (res.data.success) {
            this.$vux.toast.text('发送成功', 'top');
            console.log("请求成功1");
            console.log(res);
          } else {
            return this.$vux.toast.text(res.data.retMsg, 'top');
          }
        }).catch(err => {
          console.error(err)
        })

        this.yzmNum = 60;
        this.yzmDisabled = true;
        this.countDown();
      },
      //倒计时
      countDown() {
        var that = this;
        var yzmNum = this.yzmNum;
        if (yzmNum == 0) {
          (this.yzmNum = "获取验证码"), (this.yzmDisabled = false);
          return false;
        }
        var time = setTimeout(function () {
          that.yzmNum--;
          that.countDown();
        }, 1000);
      },
    }
  };
</script>



