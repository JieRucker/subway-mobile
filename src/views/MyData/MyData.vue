<style lang="scss">
  .mydata {
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
  <div class="mydata">
    <x-header :left-options="{backText: ''}" title="我的资料"
              style="background:linear-gradient(to right,#447bba,#7a88bd,#928dba);"></x-header>

    <Group>
      <cell class="cell cell-avatar" title="头像" :border-intent="false">
        <img :src="$store.state.base.userInfo.headUrl" alt="">
      </cell>
      <cell class="cell" title="姓名" :border-intent="false">{{$store.state.base.userInfo.userName}}</cell>
      <cell class="cell" title="职位" :border-intent="false">{{$store.state.base.userType | judgeJob}}</cell>
      <cell class="cell" title="手机号码" :border-intent="false" :link="{path:'/PhoneNumber'}">
        {{$store.state.base.userInfo.phoneNum}}
      </cell>
    </Group>
  </div>
</template>

<script>
  import {Cell, Group, XHeader} from 'vux'

  export default {
    name: "MyData",
    components: {XHeader, Group, Cell},
    props: {},
    data() {
      return {}
    },
    filters: {
      judgeJob(value) {
        switch (value) {
          case 3:
            return '安全员';
            break;
          case 4:
            return '兑换员';
            break;
          case 5:
            return '项目管理员';
            break;
        }
      }
    }
  }
</script>

