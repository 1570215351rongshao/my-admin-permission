<!--员工管理-->
<template>
  <div>
    <el-button size="mini" type="primary" @click="group">新增角色</el-button>
    <div class="table">
      <el-table
        ref="multipleTable"
        border
        size="mini"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column prop="id" label="ID" align="center" width="55"/>
        <el-table-column prop="roleName" label="角色名称" align="center" />
        <el-table-column prop="roleDesc" label="描述" align="center" />
        <el-table-column prop="employeeCount" label="员工数量" align="center" />
        <el-table-column width="170px" label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              style="margin-left:10px"
              @click="modify(scope.row.id)"
            >修改</el-button>
            <el-button
              type="primary"
              size="mini"
              style="margin-left:10px"
              @click="lookReolDetail(scope.row.id)"
            >查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div class="block">
        <el-pagination
          :current-page="params.currentPage"
          :page-sizes="[1, 2, 5, 10]"
          :page-size="params.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [
        {
          id: 1
        }
      ],
      params: {
        currentPage: 1,
        pageSize: 10
      },
      total: 0,
      multipleSelection: []
    }
  },
  created() {
    this.getEmployeeRole()
  },
  methods: {
    // 获取角色列表请求
    getEmployeeRole() {
       this.tableData = [
           {
             id:1,
             roleName:'超级管理员'
           }
         ]
          this.total = 10
    },
    // 监听pagesize
    handleSizeChange(newSize) {
      // console.log(newSize)
      this.params.pageSize = newSize
      this.getEmployeeRole()
    },
    // 页码值发生切换
    handleCurrentChange(newPage) {
      // console.log(newPage)
      this.params.currentPage = newPage
      this.getEmployeeRole()
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    group() {
      this.$router.push({
        path: 'addrole',
        query: { status: 0 }
      })
    },
    // 修改角色
    modify(id) {
      this.$router.push({
        path: 'addrole',
        query: { status: 1, id }
      })
    },
    // 查看角色弹框
    lookReolDetail(id) {
      this.$router.push({
        path: 'addrole',
        query: { status: 2, id }
      })
    }
  }
}
</script>
<style scoped>
.table{
  margin-top:10px;
}
.block{
  display:flex;
  justify-content: flex-end;
}
</style>
