<template>
  <div>
    <x-header
      :left-options="leftOptions"
      :transition="headerTransition">
      {{title}}
    </x-header>
  </div>
</template>

<script>
  import {XHeader} from 'vux';

  export default {
    name: "header",
    components: {
      XHeader
    },
    props: {
      title: {
        type: String,
        default: '导航'
      },
      showBack: {
        type: Boolean,
        default: true
      }
    },
    computed: {
      leftOptions() {
        return {
          showBack: this.showBack,
          backText: ''
        }
      },
      headerTransition() {

      }
    }
  }
</script>

<style scoped>

</style>
