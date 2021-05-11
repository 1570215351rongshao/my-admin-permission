<template>
  <div class="formdata">
    <h3>{{ barname }}</h3>
    <el-form
      ref="addForm"
      :disabled="isDisabled"
      class="demo-dynamic"
      label-width="100px"
      :label-position="labelPosition"
      :model="addForm"
      :rules="addFormRules"
    >
      <el-form-item label="消息标题:" prop="title">
        <el-input v-model="addForm.title" style="width:300px" />
      </el-form-item>
      <el-form-item label="消息内容:" prop="content">
        <el-input
          v-model="addForm.content"
          style="width:300px"
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 6}"
          placeholder="请输入内容"
        />
      </el-form-item>
    </el-form>
    <div class="bottombutton">
      <el-button v-if="status===0" type="primary" size="mini" @click="createData('addForm')">保存</el-button>
      <el-button type="primary" size="mini" @click="cancel">取消</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isDisabled: false,
      barname: '新增系统消息',
      labelPosition: 'left',
      status: 0,
      form: [],
      addForm: {
        classifyName: '',
        sort: '0',
        upDownStatus: ''
      },
      // 添加表单的验证规则
      addFormRules: {
        content: [
          {
            required: true,
            message: '请输入消息标题',
            trigger: 'blur'
          }
        ],
        title: [
          {
            required: true,
            message: '请输入消息内容',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  created() {
    this.getFarther()
  },
  methods: {
    getFarther() {
      this.status = parseInt(this.$route.query.status)
      if (this.status === 0) {
        this.barname = '新增系统消息'
        this.addForm = {
          content: '',
          title: '',
          createUid: 1
        }
      } else if (this.status === 2) {
        this.barname = '查看系统消息'
        const params = {
          id: parseInt(this.$route.query.id)
        }
         this.addForm = {
          content: '哦进口',
          title: '选手的覆盖的',
          createUid: 1
        }
        this.isDisabled = true
      } else {
        this.barname = '新增系统消息'
        this.status = 0
      }
    },
    createData(formName) {
      this.$refs[formName].validate(valid => {
        const list = this.addForm
        if (!valid) return
      this.$message({
            message:'调用接口',
            type:'success'
          })
      })
    },
    cancel() {
      this.$router.go(-1)
    }
  }
}
</script>
<style scoped>
p {
  margin: 0;
  color: #b1aeae;
  font-size: 14px;
}
</style>
