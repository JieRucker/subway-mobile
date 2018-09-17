<template>
  <div class="page">
    <div class="file-panel">
      <ul class="l-list clearfix" v-if="getImageList.length">
        <li class="l-list__item" v-for="(file,index) in getImageList">
          <img :src="file.imageUrl" class="l-list__item--img">
          <i class="iconfont icon-iconfont707 l-list__item--trash" @click="trash(index)"></i>
        </li>
        <!--<li class="l-list__item l-list__add" @click="getUpload" v-if="getImageList.length !== fileNumLimit">-->
        <!--<i class="iconfont icon-add"></i>-->
        <!--</li>-->
      </ul>
    </div>
    <!--<div id="uploadPicker" class="upload-target"></div>-->
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';

  export default {
    name: 'webUploader',
    data() {
      return {}
    },
    props: {
      // 接收文件类型
      accept: {
        type: Object,
        default: {
          title: 'Images',
          extensions: 'gif,jpg,jpeg,bmp,png',
          mimeTypes: 'image/gif,image/jpg,image/jpeg,image/bmp,image/png'
        }
      },
      // 可以多选
      multiple: {
        type: Boolean,
        default: true
      },
      // 自动上传
      auto: {
        type: Boolean,
        default: false
      },
      // 是否压缩
      compress: {
        type: Boolean,
        default: false
      },
      // 是否分块传输
      chunked: {
        type: Boolean,
        default: true
      },
      // 分块大小
      chunkSize: {
        type: Number,
        default: 1024 * 1024
      },
      server: {
        type: String,
        default: `/common/addPacksFile?uploadId=${this.getUploadId}`
      },
      // 单个文件最大上传大小
      fileSingleSizeLimit: {
        type: Number,
        default: 1024 * 1024 * 1024
      },
      // 最大上传数量
      fileNumLimit: {
        type: Number,
        default: 50
      },
      // 单次文件上传限制1024G
      fileSizeLimit: {
        type: Number,
        default: 1024 * 1024 * 1024 * 1024
      },
    },
    computed: {
      ...mapGetters([
        'getImageList',
        'getUploadId',
        'getUploader'
      ])
    },
    mounted() {
      /*this.getUpload();
      this.$Global.timeout(100).then(() => {
        this.initUpload();
      });*/
    },
    methods: {
      // 初始化上传
      initUpload() {
        // if (this.getUploader) this.getUploader.destroy();

        /* 初始化上传插件 */

        this.$store.dispatch('setUploader', WebUploader.create({
          pick: {
            id: '#uploadPicker',
            multiple: this.multiple
          },
          accept: this.accept,
          auto: this.auto,
          compress: this.compress, //不压缩
          chunked: this.chunked, //分块传输
          chunkSize: this.chunkSize, //分块大小
          server: this.server,
          duplicate: true,
          fileSingleSizeLimit: this.fileSingleSizeLimit,
          fileNumLimit: this.fileNumLimit, //最大上传数目50
          fileSizeLimit: this.fileSizeLimit //单次文件上传限制1024G
        }));


        /* 向队列里加入一个文件 */
        this.getUploader.on('fileQueued', (_file) => {
          _file.progress = 0;

          return this.getUploader.makeThumb(_file, (err, src) => {
            this.$store.dispatch('setImageList', {
            // this.getImageList.push({
              imageName: _file.name,
              bucketName: '',
              ossKey: '',
              imageUrl: src,
              fileSize: WebUploader.Base.formatSize(_file.size),
              id: '',
              ext: _file.ext,
              tempId: _file.id
            })
          });
        });

        /* this.getUploader.on('uploadFinished', (file, response) => {
           this.getUploader.reset();
         });*/

        this.getUploader.on('uploadError', (file, reason) => {
          this.$vux.toast.text('上传失败', 'top');
        });
        return this.getUploader.on('error', (type) => {
          switch (type) {
            case 'F_EXCEED_SIZE':
              return this.$vux.toast.text('文件大小超过限制', 'top');
            case 'Q_EXCEED_NUM_LIMIT':
              return this.$vux.toast.text('文件数目超过限制', 'top');
            case 'Q_TYPE_DENIED':
              return this.$vux.toast.text('文件类型不对', 'top');
          }
        })
      },
      // 创建uploadId
      getUpload() {
        // TODO 测试代码

        if (!this.getUploadId) {
          const promise = new Promise((resolve, reject) => {
            $.ajax({
              url: `/common/createUploadId`,
              type: 'post',
              async: false
            }).done((res) => {
              res = JSON.parse(res);
              res.success ? resolve(res.data) : reject(res.retMsg);
            });
          });

          promise.then((resolve) => {
            this.$store.dispatch('setUploadId', resolve);
          }, (reject) => {
            console.error(reject);
          })
        } else {
        }
      },
      trash(index) {
        console.log(index)
        console.log(this.getImageList)
        // 在队列中移除文件
        let imageList = this.getImageList;
        // let tempId = imageList[index].tempId;
        // if (tempId && !this.$Global.isBlank(tempId)) this.getUploader.removeFile(tempId);
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
