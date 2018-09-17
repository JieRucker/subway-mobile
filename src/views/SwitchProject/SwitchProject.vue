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
      /*border: none !important;*/
    }
    .weui-cell__ft {
      color: #000 !important;
    }
  }
</style>

<template>
  <div class="userInfo">
    <x-header :left-options="{backText: '',showBack:true}" title="切换项目"
              style="background:linear-gradient(to right,#447bba,#7a88bd,#928dba);"></x-header>

    <Group title="当前项目">
      <cell class="cell" :title="$store.state.base.userInfo.projectName"></cell>
    </Group>
    <br><br>
    <Group title="所有项目" v-if="projectList">
      <cell class="cell" v-for="(item,index) in projectList" :key="index" :title="item.projectName" @click.native="requestSwitch(item.projectId)" is-link :border-intent="false"></cell>
      <!--<cell class="cell" title="项目二" :link="{path:'./WxIndex',query:{uid:uid}}" :border-intent="false"></cell>-->
    </Group>
  </div>
</template>

<script>
  import {XHeader, Group, Cell} from "vux";

  export default {
    name: "userInfo",
    components: {XHeader, Group, Cell},
    props: {},
    data() {
      return {
        projectList: [],
      };
    },
    mounted() {

      this.$api.userInterface
        .getUserProjectList()
        .then(res => {
          console.log(res);
          if (res.data.success) {
            this.projectList = res.data.data;
          } else {
            this.$vux.toast.show({ type: "cancel", text: "加载其他项目失败" });
          }
        })
        .catch(err => {
          this.$vux.toast.show({ type: "warn", text: "Request failed" });
          console.error(err);
        });

    },
    methods:{
      requestSwitch(pId){
        this.$vux.loading.show({ text: "正在请求" });
        this.$api.userInterface
          .updateUser({
            userId:this.$store.state.base.userId,
            projectId:pId
          })
          .then(res => {
            this.$vux.loading.hide();
            console.log(res);
            if (res.data.success) {
              console.log(res);
              this.$vux.loading.show({ text: "正在切换" });
              window.location.reload();
              // this.$router.push({name:'wxIndex'});
              setTimeout(() => {
                this.$vux.loading.hide()
              }, 500)
            } else {
              this.$vux.toast.show({ type: "cancel", text: "切换项目失败" });
            }
          })
          .catch(err => {
            this.$vux.loading.hide();
            this.$vux.toast.show({ type: "warn", text: "Request failed" });
            console.error(err);
          });

      }
    },
    filters: {
      justDate(value) {
        console.log(value);
        if (typeof value != 'undefined') {
          return value.substr(0, 10);
        }
      }
    }
  };
</script>

