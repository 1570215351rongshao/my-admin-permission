<template>
  <div>
    <el-card>
      <div class="topbutton">
        <el-button
          size="mini"
          type="primary"
          @click="addquxia"
        >新增频道</el-button>
      </div>
      <el-table :data="tableData" size="mini" border :header-cell-style="{background:'#eef1f6',color:'#606266'}">
        <el-table-column prop="id" label="ID" width="55" align="center" />
        <el-table-column prop="classifyName" label="频道名称" align="center" />
        <el-table-column prop="articleNum" label="文章数量" align="center" />
        <el-table-column label="上下架" width="150" prop="upDownStatus" align="center">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.upDownStatus"
              :active-value="1"
              :inactive-value="-1"
              active-color="#13ce66"
              @change="updateChange(scope.row)"
            />
          </template>
        </el-table-column>
        <el-table-column prop="sort" label="排序" align="center">
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.sort"
              @blur="handch(scope.row)"
            />
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200" align="center">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              @click="handleClick(scope.row.id)"
            >修改</el-button>
            <el-button
              type="primary"
              size="mini"
              @click="deleteIformation(scope.row.id)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          :current-page="params.currentPage"
          :page-sizes="[5, 10]"
          :page-size="params.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      total: 0,
      params: {
        currentPage: 1,
        pageSize: 10,
        upDownStatus: 1
      },
      tableData: [
      ]
    }
  },
  created() {
    this.getInformationType()
  },
  methods: {
    // 获取资讯分类列表的请求
    getInformationType() {
     this.tableData=[
       {
         id:1,
         classifyName:'测试'
       }
     ]
     this.total=10
    },
    // 监听pagesize
    handleSizeChange(newSize) {
      // console.log(newSize)
      this.params.pageSize = newSize
      this.getInformationType()
    },
    // 页码值发生切换
    handleCurrentChange(newPage) {
      // console.log(newPage)
      this.params.currentPage = newPage
      this.getInformationType()
    },
    addquxia() {
      this.$router.push({
        path: 'addChan',
        query: { status: 0 }
      })
    },
    // 修改资讯类型的api
    handleClick(id) {
      this.$router.push({
        path: 'addChan',
        query: { id, status: 1 }
      })
    },
    updateChange(row) {
     consoel.log('更新状态')
    },
    // 跟新资讯排序
    handch(row) {
      var arr = []
      for (let index = 0; index < this.tableData.length; index++) {
        arr.push(this.tableData[index].sort)
      }
      console.log(arr)
      const params = {
        id: row.id,
        sort: row.sort
      }
      //  console.log(params.sort)
      //  console.log(arr.includes(parseInt(params.sort)) == true)
      if (arr.includes(parseInt(params.sort)) === true) {
        this.$message('值重复')
        this.getInformationType()
      } else if (params.sort >= 0) {
       console.log('调用接口')
      } else {
        this.$message('排序值必须大于等于0')
      }
    },
    // 删除资讯分类的请求
    deleteIformation(id) {
      this.$confirm(
        '是否删除，如删除将同时删除该类型下所有的内容',
        '删除提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )
        .then(() => {
          const params = {
            id
          }
          console.log('调用删除')
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    }
  }
}
</script>
<style scoped>
</style>
