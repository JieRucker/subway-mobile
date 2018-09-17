<style lang="scss">
.set-rules{
    text-align: center;
}
</style>

<template>
    <div class="set-rules clearfix">
        <x-header :left-options="{backText: ''}" title="制定规则" style="background:linear-gradient(to right,#447bba,#7a88bd,#928dba);"></x-header>
        <br>暂无
    </div>
</template>

<script>
import {XButton,XHeader} from 'vux'
  export default {
    name: "SetRules",
    components: {XButton,XHeader},
    props: {
        },
    data() {
        return {
      }
    },
    methods:{
    }
  }
</script>

