<template>
  <div>
    <mypage v-if="$store.state.logined"></mypage>
    <login v-else></login>
  </div>
</template>

<script>
import Login from "~/components/Login"
import Mypage from "~/components/Mypage"

export default {
  components:{
    Login,
    Mypage
  },
}
</script>

<style>

</style>
