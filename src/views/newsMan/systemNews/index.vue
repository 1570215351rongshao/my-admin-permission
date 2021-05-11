<template>
  <div>
    <el-card>
      <el-form class="demo-form-inline">
        <el-form-item>
          <el-select
            v-model="params.status"
            style="width:130px;"
            placeholder="状态"
            size="small"
            clearable
            @clear="getInformationType"
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
            @click="getInformationType"
          >查询</el-button>
        </el-form-item>
      </el-form>
      <div class="topbutton">
        <el-button
          size="mini"
          type="primary"
          @click="addquxia"
        >新增消息</el-button>
        <el-button size="mini" type="primary" @click="publish">发布</el-button>
        <el-button size="mini" type="primary" @click="suspended">撤回</el-button>
      </div>
      <el-table :data="tableData" size="mini" border :header-cell-style="{background:'#eef1f6',color:'#606266'}" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column
          fixed
          prop="id"
          label="ID"
          width="50"
          align="center"
        />
        <el-table-column
          prop="title"
          label="消息标题"
          align="center"
        />
        <el-table-column prop="content" label="消息内容" align="center">
          <template slot-scope="scope">
            <span v-html="scope.row.content">{{ scope.row.content }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" align="center">
          <template slot-scope="scope">
            {{ scope.row.status === 0 ? "待发布" : "" }}
            {{ scope.row.status === 1 ? "已发布" : "" }}
            {{ scope.row.status === 2 ? "已撤回" : "" }}
          </template>
        </el-table-column>
        <el-table-column prop="publishTime" label="发送时间" align="center" />
        <el-table-column label="操作" width="200" align="center">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              @click="handleClick(scope.row.id)"
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
      ids: [],
      multipleSelection: [],
      total: 0,
      params: {
        currentPage: 1,
        pageSize: 10,
        status: ''
      },
      tableData: [
        {
          id: 1
        }
      ]
    }
  },
  created() {
    this.getInformationType()
  },
  methods: {
    // 获取资讯分类列表的请求
    getInformationType() {
      this.tableData = [
        {
          id:1,
          title:'大师傅'
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
        path: 'addSys',
        query: { status: 0 }
      })
    },
    // 查看资讯类型的api
    handleClick(id) {
      this.$router.push({
        path: 'addSys',
        query: { id, status: 2 }
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
            id,
            updateUid: 1
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
    },
    // 获取选中的id
    handleSelectionChange(val) {
      this.multipleSelection = val
      this.ids = []
      for (let i = 0; i <= this.multipleSelection.length - 1; i++) {
        this.ids.push(this.multipleSelection[i].id)
      }
    },
    // 发布消息的请求
    publish() {
      if (this.multipleSelection.length !== 0) {
        const params = {
          ids: this.ids,
          updateUid: 1
        }
        this.$message({
            message:'调用接口',
            type:'success'
          })
      } else {
        this.$message('请选中数据')
      }
    },
    // 撤回消息的请求
    suspended() {
      if (this.multipleSelection.length !== 0) {
        const params = {
          ids: this.ids,
          updateUid: 1
        }
         this.$message({
            message:'调用接口',
            type:'success'
          })
      } else {
        this.$message('请选中数据')
      }
    }
  }
}
</script>
<style scoped>
</style>
