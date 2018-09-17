<style lang="scss">
  .box-header {
    position: relative;
    overflow: hidden;
    padding: 0.5rem 0;
    .box-avatar {
      float: left;
      .box-avatar-img {
        width: 4.8rem !important;
        height: 4.8rem !important;
        margin-right: 2rem;
        border-radius: 50%;
      }
    }
    .box-desc {
      display: -webkit-flex;
      display: flex;
      overflow: hidden;
      flex-direction: column;
      float: left;
      span {
        overflow: hidden;
        text-overflow: ellipsis;
        margin-top: .5rem;
      }
      .name {
        font-size: 1.5rem !important;
      }
      .time {
        color: #888;
      }
    }
  }


</style>

<template>

  <div class="box-header">
    <div class="box-avatar">
      <img :src="createrInfo.headUrl" class="box-avatar-img" alt="">
    </div>
    <div class="box-desc">
      <span class="name">{{createrInfo.userName}}</span>
      <span class="time">{{createrInfo.createDate}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "CreaterInfo",
    components: {},
    props: {
      createrInfo: {},
    },
    data() {
      return {}
    },
    computed: {},
    mounted() {

    },
    methods: {},

  }
</script>
