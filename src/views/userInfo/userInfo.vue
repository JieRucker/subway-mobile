<style lang="scss">
.userInfo {
  padding-bottom: 4rem;
  .cell {
    padding-top: 1.2rem;
    padding-bottom: 1.2rem;
    color: #333;
    img {
      display: block;
      margin-right: 10px;
    }
  }
  .cell-avatar {
    padding-top: 5px;
    padding-bottom: 5px;
    padding-right: 5px;
    img {
      width: 60px;
      border-radius: 50%;
    }
  }
  .weui-cells::before {
    border: none !important;
  }
  .weui-cell__ft {
    color: #000 !important;
  }
}
</style>

<template>
  <div class="userInfo">
    <x-header :left-options="{backText: '',showBack:false}" title="员工信息"
              style="background:linear-gradient(to right,#447bba,#7a88bd,#928dba);"></x-header>

    <Group>
      <cell class="cell cell-avatar" title="头像" :border-intent="false">
        <img :src="userInfo.headUrl" alt="">
      </cell>
      <cell class="cell" title="姓名" :border-intent="false">{{userInfo.userName}}</cell>
      <cell class="cell" title="总积分" :border-intent="false">{{userInfo.userTotalScore}} 分</cell>
      <cell class="cell" title="兑换积分" :border-intent="false">{{userInfo.userExchangeScore}} 分</cell>
      <cell class="cell" title="剩余积分" :border-intent="false">{{userInfo.userRemainScore}} 分</cell>
      <cell class="cell" title="积分记录" :link="{path:'./IntegralRecord'}" :border-intent="false"></cell>
      <cell class="cell" title="兑换记录" :link="{path:'./ExchangeRecord'}" :border-intent="false"></cell>
      <cell class="cell" title="身份证号" :border-intent="false">{{userInfo.cardNo}}</cell>
      <cell class="cell" title="籍贯" :border-intent="false">{{userInfo.cityName}}</cell>
      <cell class="cell" title="工种" :border-intent="false">{{userInfo.groupName}}</cell>
      <cell class="cell" title="进场时间" :border-intent="false">{{userInfo.createDate | justDate}}</cell>
      <cell class="cell" title="手机号码" :border-intent="false">{{userInfo.phoneNum}}</cell>
    </Group>
  </div>
</template>

<script>
import { XHeader, Group, Cell } from "vux";

export default {
  name: "userInfo",
  components: { XHeader, Group, Cell },
  props: {},
  data() {
    return {
      userInfo:'',
    };
  },
  mounted() {
    this.$api.loginInterface.getUser({
        userId:this.$store.state.base.userId
      })
      .then(res => {
        if (res.data.success) {
          console.log("1请求成功");
          console.log(res);
          console.log(res.data.data);
          this.userInfo = res.data.data;
          console.log("this.userInfo:-------" + this.userInfo);
        } else {
          console.log("1请求失败");
        }
      })
      .catch(err => {
        console.error(err);
      });
  },
  filters:{
    justDate(value){
      console.log(value);
      if(typeof value != 'undefined'){
        return value.substr(0,10);
      }
    }
  }
};
</script>

