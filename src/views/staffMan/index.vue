<template>
  <div class="dic">
    <el-card>
      <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
        <el-tab-pane label="员工管理" name="first">
          <index1 v-if="isfirst" ref="index1" />
        </el-tab-pane>
        <el-tab-pane label="总部角色" name="seconds">
          <index2 v-if="isseconds" ref="index2" />
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>
<script>
const index1 = () => import('./staffman/index')
const index2 = () => import('./stafrole/index')
export default {
  components: {
    index1,
    index2
  },
  data() {
    return {
      activeName: 'first',
      isfirst: true,
      isseconds: false,
      form: [],
      params: {
        employeeName: '',
        roleId: '',
        currentPage: 1,
        pageSize: 10
      },
      query: {
        currentPage: 1,
        pageSize: 100
      }
    }
  },
  created() {
    this.getstaff()
  },
  methods: {
    getstaff() {
      console.log(sessionStorage.staffName)
      if (sessionStorage.staffName === undefined) {
        this.activeName = 'first'
        this.isfirst = true
      } else if (sessionStorage.staffName === 'first') {
        this.activeName = sessionStorage.staffName
        this.isfirst = true
      } else if (sessionStorage.staffName === 'seconds') {
        this.activeName = sessionStorage.staffName
        this.isseconds = true
      }
    },
    handleClick(tab) {
      console.log(tab.name)
      sessionStorage.setItem('staffName', tab.name)
      if (tab.name === 'first') {
        this.isfirst = true
        this.isseconds = false
      } else if (tab.name === 'seconds') {
        this.isfirst = false
        this.isseconds = true
      }
    }
  }
}
</script>
<style scoped>
</style>
