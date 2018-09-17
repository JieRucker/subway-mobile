<style lang="scss">
  .time-and-position {
    padding: 0 1rem;
    text-align: right;
    > div {
      display: inline-block;
      img {
        width: 1.3rem;
        height: 1.3rem;
        vertical-align: middle;
        margin-right: 0.5rem;
      }
      span {
        font-size: 1.3rem;
        vertical-align: middle;
      }
    }
    .position {
      margin-left: 1.5rem;
    }
  }


</style>

<template>

  <div class="time-and-position">
    <div class="time"><img :src="require('@/assets/images/icon/icon-main-clock.png')" alt="">
      <span>{{createDate}}</span>
    </div>
    <!-- <div class="position"><img :src="require('@/assets/images/icon/icon-main-site.png')" alt=""><span>{{createrInfo.createPosition}}</span></div> -->
  </div>
</template>

<script>
  export default {
    name: "TimeAndPosition",
    components: {},
    props: {
      createDate: {},
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

