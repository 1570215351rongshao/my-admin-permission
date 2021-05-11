<template>
  <div>
    <el-card>
      <div class="topbutton">
        <el-form>
          <el-form-item>
            <el-input
              v-model="params.name"
              class="input"
              size="small"
              style="width:130px"
              placeholder="文章标题"
              clearable
              @clear="getInformationType"
            />&nbsp;
            <el-select
              v-model="params.articleClassifyId"
              clearable
              style="width:130px;"
              size="small"
              placeholder="请选择"
              @clear="getInformationType"
            >
              <el-option
                v-for="item in option"
                :key="item.id"
                :label="item.classifyName"
                :value="item.id"
              />
            </el-select>&nbsp;
            <el-button
              type="primary"
              size="small"
              @click="getInformationType"
            >查询</el-button>
          </el-form-item>
        </el-form>
        <el-button
          size="mini"
          type="primary"
          @click="addquxia"
        >新增内容</el-button>
      </div>
      <el-table :data="tableData" size="mini" border :header-cell-style="{background:'#eef1f6',color:'#606266'}">
        <el-table-column prop="id" label="ID" width="55" align="center" />
        <el-table-column prop="publicityImgUrl" label="图片" align="center">
          <template slot-scope="scope">
            <div>
              <img style="width:50px;height:50px;" :src="scope.row.publicityImgUrl" alt="">
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="文章标题" align="center" />
        <el-table-column prop="articleClassifyName" label="文章类型" align="center" />
        <el-table-column prop="readNum" label="阅读量" align="center" />
        <el-table-column prop="praiseNum" label="实际点赞量" align="center" width="120" />
        <el-table-column prop="createTime" label="发布时间" align="center" />
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
        <el-table-column label="操作" width="220" align="center">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              @click="handleClick(scope.row.id)"
            >修改</el-button>
            <el-button
              type="primary"
              size="mini"
              @click="getdetail(scope.row.id)"
            >查看</el-button>
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
      option: [],
      total: 0,
      params: {
        currentPage: 1,
        pageSize: 10,
        upDownStatus: ''
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
      this.tableData=[{
          'articleContent': '儿童椅',
          'audio': '',
          'commentNum': '23',
          'id': 1,
          'isRecommend': 1,
          'praiseNum': '23',
          'publicityImgUrl': '',
          'remark': '更好看几个妇女',
          'title':'空间帕尼尼'

        }]
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
        path: 'addCon',
        query: { status: 0 }
      })
    },
    // 修改资讯类型的api
    handleClick(id) {
      this.$router.push({
        path: 'addCon',
        query: { id, status: 1 }
      })
    },
    getdetail(id) {
      this.$router.push({
        path: 'addCon',
        query: { id, status: 2 }
      })
    },
    // 更新资讯状态
    updateChange(row) {
      // console.log(row)
      const params = {
        id: row.id,
        status: row.upDownStatus
      }
    this.$message({
            message:'调用接口',
            type:'success'
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
