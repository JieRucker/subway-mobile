<style lang="scss">
  .login {
    .logo {
      background: -webkit-linear-gradient(left, #447bba, #7a88bd, #928dba); /* Safari 5.1 - 6.0 */
      background: linear-gradient(to right, #447bba, #7a88bd, #928dba); /* 标准的语法 */
      height: 18rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      img {
      }
    }
    .input-box {
      margin: 4rem 2.5rem 0 2.5rem;
      .line {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: stretch;
        margin-top: 2.5rem;
        img {
          width: 1.8rem;
          height: 1.8rem;
        }
        input {
          flex: 1;
          outline: none;
          border: none;
          border-bottom: 1px solid #eee;
          padding: .2rem .8rem;
        }
        input::-webkit-input-placeholder {
          color: #ccc;
        }
      }
    }
    .btn {
      border-radius: 30px;
      margin-top: 4rem;
      background-color: #fff;
    }
    .btn-login {
    }
    .btn-register {
      margin-top: 2rem !important;
      border-color: #ccc !important;
      color: #555 !important;
      transform: scale(1, 0.98) !important;
    }
  }
</style>

<template>
  <div class="login">
    <div class="logo">
      <img :src="require('@/assets/images/icon/logo-qimiaowa.png')" alt="">
    </div>
    <div class="input-box">
      <div class="line user">
        <img :src="require('@/assets/images/icon/login-user.png')" alt="">
        <input class="set-1px-b" type="text" placeholder="请输入账号"/>
      </div>
      <div class="line password">
        <img :src="require('@/assets/images/icon/login-password.png')" alt="">
        <input class="set-1px-b" type="password" placeholder="请输入账号"/>
      </div>
      <x-button class="btn btn-login" :gradients="['#447bba', '#7a88bd','#928dba']">登录</x-button>
      <x-button plain class="btn btn-register">注册</x-button>
      <!-- MOONSIC -->

    </div>

  </div>
</template>

<script>


  import {XButton} from 'vux'

  export default {
    name: "login",
    components: {XButton},
    props: {},
    data() {
      return {
        templateData: "",
        componentList: []
      }
    },
    computed: {
      moduleVOList() {
        return templateData.moduleVOList
      },

    },
    mounted() {
      //请求数据(不能删!!!!!!!!!!!!!!!!!!!!!!!!!)
      var templateDataStorage = JSON.parse(sessionStorage.getItem("templateData"));
      console.log(templateDataStorage);
      if (templateDataStorage == null) {
        this.$api.mainInterface.qrcode()
          .then((res) => {
            if (res.data.success) {
              console.log("请求成功");
              console.log(res);
              this.templateData = res.data;
              sessionStorage.setItem("templateData", JSON.stringify(res.data));
              // this.afterData();
            } else {
              console.log("请求失败");
            }
          }).catch((err) => {
          console.log(err)
        })
      } else {
        this.templateData = templateDataStorage;
        console.log("用的缓存数据，没有发送请求");
      }
      if (this.templateData.moduleVOList == undefined) {
        console.log("没有moduleVOList");
        return false;
      }
      this.afterData();
    },
    methods: {
      add(name, params) {
        this.componentList.push({
          component: name,
          params: params
        })
      },
// 模块类型 0图片 1图文 2产品参数 3文件 4图集 5链接 6名片 7视频 8音频 9联系我们 10素材 11分类 12网址导航 13记录模板 20互动 21微信加好友(注:0-13属于二维码模块 20-21属于素材模块)
      afterData() {
        var module = this.templateData.moduleVOList;
        for (let i = 0; i < module.length; i++) {
          const item = module[i];
          switch (item.moduleType) {
            //0图片
            case 0:
              this.add("ModuleImage");
              break;
            //1图文
            case 1:
              this.add("ModuleImageText", {
                displayAuthState: item.moduleObject.displayAuthState,
                videoName: item.moduleObject.videoName,
                videoUrl: item.moduleObject.videoUrl,
              });
              break;
            //2产品参数
            case 2:
              this.add("ModuleProductParameter", {
                displayAuthState: item.moduleObject.displayAuthState,
                videoName: item.moduleObject.videoName,
                videoUrl: item.moduleObject.videoUrl,
              });
              break;
            //3文件
            case 3:
              this.add("ModuleFile", {
                moduleTitle: item.moduleTitle,
                displayAuthState: item.moduleObject.displayAuthState,
                fileList: item.moduleObject.fileList,
              });
              break;
            //4图集
            case 4:
              this.add("ModuleAtlas", {
                displayAuthState: item.moduleObject.displayAuthState,
                videoName: item.moduleObject.videoName,
                videoUrl: item.moduleObject.videoUrl,
              });
              break;
            //5链接
            case 5:
              this.add("ModuleLink", {
                displayAuthState: item.moduleObject.displayAuthState,
                videoName: item.moduleObject.videoName,
                videoUrl: item.moduleObject.videoUrl,
              });
              break;
            //6名片
            case 6:
              this.add("ModuleCard", {
                displayAuthState: item.moduleObject.displayAuthState,
                videoName: item.moduleObject.videoName,
                videoUrl: item.moduleObject.videoUrl,
              });
              break;
            //7视频
            case 7:
              this.add("ModuleVideo", {
                moduleTitle: item.moduleTitle,
                displayAuthState: item.moduleObject.displayAuthState,
                videoName: item.moduleObject.videoName,
                videoUrl: item.moduleObject.videoUrl,
              });
              break;
            //8音频
            case 8:
              this.add("ModuleAudio", {
                moduleTitle: item.moduleTitle,
                displayAuthState: item.moduleObject.displayAuthState,
                videoName: item.moduleObject.videoName,
                videoUrl: item.moduleObject.videoUrl,
              });
              break;
            //9联系我们
            case 9:
              this.add("ModuleContact", {
                moduleTitle: item.moduleTitle,
                image: item.moduleObject.image,
                navigationType: item.moduleObject.navigationType,
                navigationList: item.moduleObject.navigationList,
              });
              break;
            //10素材
            case 10:
              this.add("ModuleMaterial", {
                moduleTitle: item.moduleTitle,
                displayAuthState: item.moduleObject.displayAuthState,
                videoName: item.moduleObject.videoName,
                videoUrl: item.moduleObject.videoUrl,
              });
              break;
            //11分类
            case 11:
              this.add("ModuleClassify", {
                moduleTitle: item.moduleTitle,
                image: item.moduleObject.image,
                navigationType: item.moduleObject.navigationType,
                navigationList: item.moduleObject.navigationList,
              });
              break;
            //网址导航
            case 12:
              this.add("ModuleNavigationInfo", {
                moduleTitle: item.moduleTitle,
                image: item.moduleObject.image,
                navigationType: item.moduleObject.navigationType,
                navigationList: item.moduleObject.navigationList,
              });
              break;
            //13记录模板
            case 13:
              this.add("ModuleRecord", {
                moduleTitle: item.moduleTitle,
                image: item.moduleObject.image,
                navigationType: item.moduleObject.navigationType,
                navigationList: item.moduleObject.navigationList,
              });
              break;
          }
        }
      }
    },

  }
</script>

