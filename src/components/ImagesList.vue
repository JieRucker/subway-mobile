<style lang="scss">

  .text-content{
    padding: 0.5rem 0;
    font-size: 1.3rem;
    line-height: 2rem;
  }
  .image-list{
    padding: 0.5rem 0;
    overflow: hidden;
    // display: flex;
    // flex-direction: row;
    // flex-wrap: wrap;
    // justify-content: flex-start;
    // align-items:center;
    .image-li{
      position: relative;
      overflow: hidden;
      float: left;
      margin-right: 0.2rem;
      margin-bottom: 0.2rem;
      img{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
      }
    }
    .imageLi1{
      width: 16rem;
      height: 16rem;
    }
    .imageLi2:nth-of-type(2n){
        margin-right: 0;
    }
    .imageLi2{
      width: 12rem;
      height: 12rem;
    }
    .imageLi3{
      width: 8rem;
      height: 8rem;
    }
    .imageLi3:nth-of-type(3n){
        margin-right: 0;
    }
  }
</style>

<template>
    <div>
        <p class="text-content">{{textContent}}</p>
        <ul class="image-list">
            <li class="image-li" :class="'imageLi'+ judgeLength(imagesList.length)" @click="previewImage(item)" v-for="(item,index) in imagesList">
                <img :src="item" alt="">
            </li>
        </ul>
    </div>
</template>

<script>
  export default {
    name: "ImagesList",
    components: {},
    props: {
        textContent:{
        },
        imagesList:{
        }
    },
    data() {
      return {
      }
    },
    mounted() {
    },
    computed:{
    },
    methods:{
      previewImage(item){
        wx.previewImage({
          current: item, // 当前显示图片的http链接
          urls: this.imagesList // 需要预览的图片http链接列表
        });
      },
        judgeLength(value){
            switch (value) {
                case 1:
                    return 1
                    break;
                case 2:
                    return 2
                    break;
                default:
                return 3
                    break;
            }
        }

    },
    filters:{
    }

}

</script>

