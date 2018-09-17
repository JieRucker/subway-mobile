<template>

</template>

<script>
  export default {
    name: "Blank",
    data() {
      this.$router.replace({name:this.$route.query.name});
      return {

      }
    }
  }
</script>

<style scoped>

</style>
