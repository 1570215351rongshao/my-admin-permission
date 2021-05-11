<template>
  <div class="dic">
    <el-form class="demo-form-inline">
      <el-form-item>
        <el-input v-model="params.name" placeholder="员工姓名/ID" style="width:130px;" size="small" /> &nbsp;
        <el-input v-model="params.role" placeholder="员工角色" style="width:130px;" size="small" /> &nbsp;
        <el-select
          v-model="params.status"
          style="width:130px;"
          placeholder="状态"
          size="small"
          clearable
          @clear="getEmployeeList"
        >
          <el-option
            v-for="item in options"
            :key="item.status"
            :label="item.label"
            :value="item.status"
          />
        </el-select>
            &nbsp;
        <el-button
          type="primary"
          size="small"
          @click="getEmployeeList"
        >查询</el-button>
      </el-form-item>
    </el-form>
    <el-button size="mini" type="primary" @click="addModal">新增员工</el-button>
    <el-button size="mini" type="primary" @click="binding">绑定</el-button>
    <el-button size="mini" type="primary" @click="unbundling">解绑</el-button>
    <div class="table">
      <el-table
        border
        size="mini"
        :data="tableData"
        tooltip-effect="dark"
        :header-cell-style="{background:'#eef1f6',color:'#606266'}"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column prop="id" label="ID" align="center" />
        <el-table-column
          prop="employeeName"
          label="员工姓名"
          align="center"
        />
        <el-table-column
          prop="employeePhone"
          label="联系电话"
          align="center"
        />
        <el-table-column prop="roleName" label="员工角色" align="center" />
        <el-table-column prop="ro" label="状态" align="center" />
        <el-table-column prop="createUid" label="添加人" align="center" />
        <el-table-column prop="createTime" label="添加时间" width="160" align="center" />
        <el-table-column width="200px" label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              style="margin-left:10px"
              @click="correction(scope.row.id)"
            >修改</el-button>
            <el-button
              type="primary"
              size="mini"
              style="margin-left:10px"
              @click="mofiny(scope.row.id)"
            >查看</el-button>
            <!-- <el-button
              type="primary"
              size="mini"
              style="margin-left:10px"
              @click="delemplooy(scope.row.id)"
            >删除</el-button> -->
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
      options: [
        {
          status: '0',
          label: '待发布'
        },
        {
          status: '1',
          label: '已发布'
        },
        {
          status: '2',
          label: '已撤回'
        }
      ],
      id: '',
      params: {
        currentPage: 1,
        pageSize: 10
      },
      ids: [],
      multipleSelection: [],
      tableData: [
      ],
      total: 0
    }
  },
  created() {
    this.getEmployeeList()
  },
  methods: {
    getEmployeeList() {
         this.tableData = [
           {
             id:1,
             employeeName:'admin'
           }
         ]
          this.total = 10
    },
    /*
    */
    // 监听pagesize
    handleSizeChange(newSize) {
      // console.log(newSize)
      this.currParams.pageSize = newSize
      this.getEmployeeList()
    },
    // 页码值发生切换
    handleCurrentChange(newPage) {
      // console.log(newPage)
      this.currParams.currentPage = newPage
      this.getEmployeeList()
    },
    addModal() {
      this.$router.push({
        path: 'addstaff',
        query: { status: 0 }
      })
    },
    // 修改员工信息
    correction(id) {
      this.$router.push({
        path: 'addstaff',
        query: { id, status: 1 }
      })
    },
    // 查看员工传值
    mofiny(id) {
      this.$router.push({
        path: 'addstaff',
        query: { id, status: 2 }
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
      this.ids = []
      for (let i = 0; i <= this.multipleSelection.length - 1; i++) {
        this.ids.push(this.multipleSelection[i].id)
      }
    },
    // 绑定
    binding() {
      if (this.multipleSelection.length !== 0) {
        const params = {
          ids: this.ids,
          updateUid: 1
        }
        console.log(params)
        this.$message({
            message:'调用接口',
            type:'success'
          })
      } else {
        this.$message('请选中数据')
      }
    },
    // 解绑
    unbundling() {
      if (this.multipleSelection.length !== 0) {
        const params = {
          ids: this.ids,
          updateUid: 1
        }
        console.log(params)
        this.$message({
            message:'调用接口',
            type:'success'
          })
      } else {
        this.$message('请选中数据')
      }
    }
    // 删除员工
    // delemplooy(id) {
    //   this.$confirm(
    //     '是否删除，如删除将同时删除该类型下所有的内容',
    //     '删除提示',
    //     {
    //       confirmButtonText: '确定',
    //       cancelButtonText: '取消',
    //       type: 'warning'
    //     }
    //   )
    //     .then(() => {
    //     //   const params = {
    //     //     id
    //     //   }
    //       // deleteEmployeeInfo(params).then(res => {
    //       //   // console.log(res);
    //       //   if (res.data.code == 200) {
    //       //     this.$message({
    //       //       type: 'success',
    //       //       message: '删除成功!',
    //       //       duration: '6000'
    //       //     })
    //       //     this.getEmployeeList()
    //       //   } else {
    //       //     this.$message({
    //       //       type: 'warning',
    //       //       message:res.data.message,
    //       //     })
    //       //   }
    //       // })
    //     })
    //     .catch(() => {
    //       this.$message({
    //         type: 'info',
    //         message: '已取消删除'
    //       })
    //     })
    // }
  }
}
</script>
<style scoped>
.table{
  margin-top:10px;
}
.block {
  margin-right: 10px;
  display: flex;
  justify-content: flex-end;
}
.input {
  width: 150px;
}
</style>
