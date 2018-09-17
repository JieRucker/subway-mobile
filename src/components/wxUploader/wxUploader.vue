<template>
  <div>
    <slot name="content">
      <div class="file-panel">
        <ul class="l-list clearfix" v-if="getImageList.length">
          <li class="l-list__item" v-for="(file,index) in getImageList">
            <img :src="file.imageUrl" class="l-list__item--img">
            <i class="iconfont icon-iconfont707 l-list__item--trash" @click="trash(index)"></i>
          </li>
        </ul>
      </div>
    </slot>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';

  export default {
    name: 'wxUploader',
    data() {
      return {
        localIds: [], // 本地选择的图片id
        serverIds: [] // 上传至服务端图片id
      }
    },
    props: {
      // 指定是原图还是压缩图，默认二者都有
      sizeType: {
        type: Array,
        default: ['original', 'compressed']
      },
      // 指定来源是相册还是相机，默认二者都有
      sourceType: {
        type: Array,
        default: ['album', 'camera']
      },
      // 最大上传数量
      maxNumLimit: {
        type: Number,
        default: 6
      }
    },
    computed: {
      ...mapGetters([
        'getImageList',
      ])
    },
    methods: {
      chooseImage() {
        if (wx && typeof wx !== 'undefined') {
          wx.chooseImage({
            count: this.maxNumLimit,
            needResult: 1,
            sizeType: this.sizeType,
            sourceType: this.sourceType,
            success: (data) => {
              if (this.maxNumLimit === 1) {
                this.$store.dispatch('setImageList', [])
              }

              this.localIds = data.localIds;   // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
              this.syncUpload();
            },
            fail: (res) => {
              // console.error("errorMSG", JSON.stringify(res));
            }
          });
        }
      },
      syncUpload() {
        let localId = this.localIds.pop();
        if (wx && typeof wx !== 'undefined') {

          wx.uploadImage({
            localId: localId.toString(), // 需要上传的图片的本地ID，由chooseImage接口获得
            isShowProgressTips: 1, // 默认为1，显示进度提示
            success: (res) => {
              let serverId = res.serverId; // 返回图片的服务器端ID
              this.serverIds.push(serverId);

              wx.getLocalImgData({
                localId: localId.toString(),
                success: (res) => {
                  let localData = res.localData;
                  if (window.__wxjs_is_wkwebview) { // 如果是IOS，需要去掉前缀
                    localData = localData.replace('jgp', 'jpeg');
                  } else {
                    localData = 'data:image/jpeg;base64,' + localData;
                  }

                  this.$store.dispatch('setImageList', {
                    imageUrl: localData,
                    serverId: serverId
                  })
                }
              });

              if (this.localIds.length > 0) {
                this.$Global.timeout(100).then(() => {
                  this.syncUpload();
                })
              } else {
                this.$Global.timeout(100).then(() => {

                })
              }
            },
            fail: (error) => {
              // console.error(JSON.stringify(error))
            }
          });
        }
      },
      trash(index) {
        // 在队列中移除文件
        let imageList = this.getImageList;
        imageList.splice(index, 1);
      }
    }
  }
</script>

<style lang="scss">
  $h-row: 55px;
  $w-row: 55px;
  .file-panel {
    padding: 10px;
    .l-list {
      &__item {
        float: left;
        margin-right: 10px;
        height: $h-row;
        width: $w-row;
        position: relative;
        .icon-add {
          margin-top: 8px;
          margin-bottom: 10px;
          color: #999;
          vertical-align: middle;
          display: block;
          font-size: 28px;
          text-align: center;
          cursor: pointer;
        }
        &--img {
          width: $w-row;
          height: $h-row;
        }
        &--trash {
          position: absolute;
          top: -9px;
          right: -7px;
          width: 16px;
          border-radius: 50%;
          color: #333;
          height: 16px;
          background-color: #f2f2f2;
          text-align: center;
          font-size: 12px;
          cursor: pointer;
        }
      }
      &__add {
        background-color: #f2f2f2;
      }
    }

    .file-type[icon=text] {
      background: url(../../assets/images/imgs/avatar.png);
    }
    .file-type[icon=video] {
      background: url(../../assets/images/imgs/avatar.png);
    }
    .file-type[icon=image] {
      background: url(../../assets/images/imgs/avatar.png);
    }

    /*  #uploadPicker {
        .webuploader-element-invisible {
          position: absolute;
          opacity: 0;
          filter: Alpha(opacity=0);
          width: auto !important;
          height: auto !important;
        }
      }*/
  }
</style>
