<style lang="scss">
  .search-member {
  }
</style>


<template>
  <div class="search-member">
    <search class="search"
            @on-result-click="resultClick"
            :results="results"
            v-model="getSearchKey"
            position="absolute"
            auto-scroll-to-top
            top="0px"
            @on-change="onChange"
            @on-cancel="onCancel"
            @on-submit="onSubmit"
            ref="search"></search>
    <div style="padding-top: 44px">
      <MemberList :member-list="memberList" :user-score-operate="userScoreOperate" :show-score="true" @on-handle-click="onHandleClick"></MemberList>
      <div v-show="showDivider1">
        <br>
        <divider>暂无数据</divider>
        <br>
      </div>
      <div v-show="showDivider2">
        <br>
        <divider>请填写数字</divider>
        <br>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import {Search,Divider} from 'vux'
  import MemberList from '@/components/MemberList.vue'

  export default {
    name: "SearchMember",
    components: {Search,Divider, MemberList},
    props: {},
    data() {
      return {
        // search: '',
        showDivider1:false,
        showDivider2:false,
        results: [],
        memberList: [],
        userScoreOperate:{
          operateType:'',
          score:''
        }
      }
    },
    computed: {
      ...mapGetters([
        'getSearchType',
        'getSearchKey',
        'getUserList'
      ])
    },
    mounted() {
      this.$refs.search.setFocus();
      if (this.getSearchType === 1) {
        this.getUser();
      }
    },
    methods: {
      onChange(value) {
        this.$store.dispatch('setSearchKey', value);
        this.showDivider1 = false;
        this.showDivider2 = false;
      },
      getUserByLoginName() {
        this.memberList = [];
        let reg = /^[\d]+$/;
        if(reg.test(this.getSearchKey) === false){
          this.showDivider2 = true;
          return false;
        }
        this.$api.userInterface.getUserByLoginName({
          userLoginName: this.getSearchKey
        }).then((res) => {
          if (res.data.success) {
            if(typeof res.data.data !== 'undefined'){
              this.memberList.push({
                groupName: res.data.data.groupName,
                headUrl: res.data.data.headUrl,
                loginName: res.data.data.loginName,
                userName: res.data.data.userName,
                userId: res.data.data.userId
              });
              this.userScoreOperate.score = res.data.data.userRemainScore+'分'
            }else{
              this.showDivider1 = true;
            }
          }
        }).catch((err) => {
          console.error(err)
        })
      },
      getUser() {
        this.memberList = [];
        let reg = /^[\d]+$/;
        if(reg.test(this.getSearchKey) === false){
          this.showDivider2 = true;
          return false;
        }
        this.$api.userInterface.getUser({
          userId: this.getSearchKey
        }).then((res) => {
          if (res.data.success) {
            if(typeof res.data.data !== 'undefined'){
              this.memberList.push({
                groupName: res.data.data.groupName,
                headUrl: res.data.data.headUrl,
                loginName: res.data.data.loginName,
                userName: res.data.data.userName,
                userId: res.data.data.userId
              });
              this.userScoreOperate.score = res.data.data.userRemainScore+'分'
            }else{
              this.showDivider1 = true;
            }

          }
        }).catch((err) => {
          console.error(err)
        })
      },
      //确定
      onSubmit() {
        this.$refs.search.setBlur();
        console.log(this.getSearchType);
        // if (this.getSearchType === 0) {
          this.getUserByLoginName();
        // } else {
          // this.getUser();
        // }
      },
      //搜索框点击取消
      onCancel() {
        window.history.go(-1)
      },
      onHandleClick(item) {
        if (this.getSearchType === 1 || this.getSearchType === 0) {
          this.$store.dispatch('setUserList', item);
          this.$router.push({
            name: 'Operate'
          });
        }
      },
      resultClick(item) {
        window.alert('you click the result item: ' + JSON.stringify(item))
      },
    },
    filters: {},
  }
</script>
