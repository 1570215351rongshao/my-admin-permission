<template>
  <div>
    <el-table :data="tableData" size="mini" border :header-cell-style="{background:'#eef1f6',color:'#606266'}">
      <el-table-column prop="id" label="ID" width="55" align="center" fixed />
      <el-table-column prop="userId" label="用户ID" align="center" />
      <el-table-column prop="name" label="用户姓名" align="center" />
      <el-table-column prop="phone" label="联系方式" align="center" />
      <el-table-column prop="describes" label="描述" align="center" />
      <el-table-column label="操作" width="220" align="center">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            @click="getdetail(scope.row.id)"
          >查看</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: [
        {
          status: '0',
          label: '未分'
        },
        {
          status: '1',
          label: '已分'
        }
      ],
      optionsss: [
        {
          status: '0',
          label: '自主留言'
        },
        {
          status: '1',
          label: '人工客服'
        }
      ],
      tableData: [
      ]
    }
  },
  created() {
    this.getInformationType()
  },
  methods: {
    getInformationType() {
      this.tableData=[
          {
          id:1,
          name:'测试',
          title:"修改项",
          phone:'18700898787'
        }
      ]
    },
    getdetail(id) {
      console.log('查看')
      console.log(id)
    }
  }
}
</script>
<style scoped>
</style>
