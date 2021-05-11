<template>
  <div class="top" style="display:flex;padding:20px;">
    <div style="margin-left:20px">
      <a :class="{'mycolor':isdisplay}" @click="gethome">首页</a>
    </div>
    <div style="margin-left:20px">
      <a :class="{'mycolor':ispay}" @click="getguit">保函中心</a>
    </div>
    <div style="margin-left:20px">
      <a :class="{'mycolor':ispersion}" @click="getpersion">个人中心</a>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isdisplay: true,
      ispay: false,
      ispersion: false
    }
  },
  methods: {
    gethome() {
      console.log('首页')
      this.isdisplay = true
      this.ispay = false
      this.ispersion = false
    },
    getguit() {
      console.log('保函中心')
      this.isdisplay = false
      this.ispay = true
      this.ispersion = false
    },
    getpersion() {
      console.log('个人中心')
      this.isdisplay = false
      this.ispay = false
      this.ispersion = true
    }
  }
}
</script>
<style>
  .mycolor{
    color:red;
    font-weight: bold;
  }
  .top>div>a:hover{
      color:red;
  }
</style>
