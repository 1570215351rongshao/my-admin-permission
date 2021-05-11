<template>
  <div>
    <el-card>
      <el-form class="demo-form-inline">
        <el-form-item>
          <el-input
            v-model="params.userId"
            style="width:150px"
            size="mini"
            placeholder="用户ID"
            clearable
            @clear="getComment"
          />&nbsp;
          <el-input
            v-model="params.objId"
            size="mini"
            style="width:150px"
            placeholder="文章ID"
            clearable
            @clear="getComment"
          />&nbsp;
          <el-button
            type="primary"
            size="mini"
            @click="getComment"
          >查询</el-button>
        </el-form-item>
      </el-form>
      <el-table
        :data="tableData"
        style="width: 100%"
        size="mini"
        border
      >
        <el-table-column prop="id" label="ID" width="50" align="center" />
        <el-table-column
          prop="userId"
          width="100"
          label="用户ID"
          align="center"
        />
        <el-table-column
          prop="commentPraiseNum"
          label="点赞量"
          align="center"
        />
        <el-table-column
          prop="commentContent"
          label="评论内容"
          align="center"
        />
        <el-table-column prop="createTime" label="评论时间" sortable align="center">
          <template slot-scope="tableData">
            {{ tableData.row.createTime }}
          </template>
        </el-table-column>
        <el-table-column
          prop="objId"
          label="文章ID"
          align="center"
        />
        <el-table-column
          prop="title"
          label="文章标题"
          align="center"
        />
        <el-table-column label="当前状态" prop="status" align="center">
          <template slot-scope="tableData">
            <el-switch
              v-model="tableData.row.status"
              :active-value="1"
              :inactive-value="-1"
              active-color="#13ce66"
              @change="change(tableData.row.status, tableData.row.id)"
            />
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100px" align="center">
          <template slot-scope="tableData">
            <el-button
              type="primary"
              size="mini"
              style="margin-left:10px"
              @click="deleteComment(tableData.row.id)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
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
      params: {
        currentPage: 0,
        pageSize: 10,
        objType: 99
      },
      tableData: [],
      total: 0
    }
  },
  created() {
    this.getComment()
  },
  methods: {
    // 获取评论的api
    getComment() {
      this.tableData=[{
        id:1,
        commentPraiseNum:'asdf',
        commentContent:'阿斯蒂芬行政村sad'
      }]
    },
    // 监听pagesize
    handleSizeChange(newSize) {
      // console.log(newSize)
      this.params.pageSize = newSize
      this.getComment()
    },
    // 页码值发生切换
    handleCurrentChange(newPage) {
      // console.log(newPage)
      this.params.currentPage = newPage
      this.getComment()
    },
    // 删除评论  请求
    deleteComment(id) {
      this.$confirm('是否确定要删除', '删除提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          const params = {
            id
          }
      console.log('删除')
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 跟新评论状态
    change(status, id) {
      console.log(status, id)
      const params = {
        id,
        status
      }
     console.log('更新状态')
    }
  }
}
</script>
<style  scoped>
.block{
  display: flex;
  justify-content: flex-end;
}
</style>
