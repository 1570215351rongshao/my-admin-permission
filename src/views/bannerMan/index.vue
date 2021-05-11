<template>
  <div>
    <el-card>
      <div class="topbutton">
        <el-button
          size="mini"
          type="primary"
          @click="addquxia"
        >新增banner</el-button>
      </div>
      <el-table :data="tableData" size="mini" border :header-cell-style="{background:'#eef1f6',color:'#606266'}">
        <el-table-column prop="id" label="ID" width="55" align="center" />
        <el-table-column prop="name" label="图片名称" align="center" />
        <el-table-column prop="imgUrl" label="图片" align="center">
          <template slot-scope="scope">
            <img
              v-if="scope.row.imgurl!==''"
              style="width:70px;height:70px;"
              :src="scope.row.imgUrl"
            >
          </template>
        </el-table-column>
        <el-table-column prop="objType" label="关联类型" align="center">
          <template slot-scope="scope">
            {{ scope.row.objType === 1 ? "活动" : "" }}
            {{ scope.row.objType === 2 ? "资讯" : "" }}
            {{ scope.row.objType === 3 ? "商品" : "" }}
            {{ scope.row.objType === 4 ? "无" : "" }}
          </template>
        </el-table-column>
        <el-table-column prop="objId" label="关联ID" align="center">
          <template slot-scope="scope">
            {{ scope.row.objId==0 ? '' : scope.row.objId }}
          </template>
        </el-table-column>
        <el-table-column prop="isShow" label="是否显示" align="center">
          <template slot-scope="scope">
            {{ scope.row.isShow === 1 ? "是" : "" }}
            {{ scope.row.isShow === 2 ? "否" : "" }}
          </template>
        </el-table-column>
        <el-table-column prop="sort" label="排序" align="center" />
        <el-table-column prop="type" label="配图类型" width="100" align="center">
          <template slot-scope="scope">
            {{ scope.row.type === 1 ? "首页bannner" : "" }}
            {{ scope.row.type === 2 ? "商城banner" : "" }}
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
     this.tableData =[
       {
         id:1,
         name:'测试图片',
         imgurl:''
       }
     ]
          this.total = 10
    },
    // 监听pagesize
    handleSizeChange(newSize) {
      this.params.pageSize = newSize
      this.getInformationType()
    },
    // 页码值发生切换
    handleCurrentChange(newPage) {
      this.params.currentPage = newPage
      this.getInformationType()
    },
    addquxia() {
      this.$router.push({
        path: 'addBan',
        query: { status: 0 }
      })
    },
    // 修改资讯类型的api
    handleClick(id) {
      this.$router.push({
        path: 'addBan',
        query: { id, status: 1 }
      })
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
          this.$message({
            message:'调用接口',
            type:'success'
          })
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
