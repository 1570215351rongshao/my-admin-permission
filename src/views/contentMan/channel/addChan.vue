<template>
  <div class="formdata">
    <h3>{{ barname }}</h3>
    <el-form
      ref="addForm"
      class="demo-dynamic"
      label-width="100px"
      :label-position="labelPosition"
      :model="addForm"
      :rules="addFormRules"
    >
      <el-form-item label="频道名称:" prop="classifyName">
        <el-input
          v-model="addForm.classifyName"
          style="width:300px"
        />
      </el-form-item>
      <el-form-item label="排序:" prop="sort">
        <el-input
          v-model="addForm.sort"
          style="width:300px"
          placeholder="大于等于0的正整数"
        />
        <p>&nbsp;&nbsp;不填写默认排在最前面</p>
      </el-form-item>
      <el-form-item label="上架状态:" prop="upDownStatus">
        <el-switch
          v-model="addForm.upDownStatus"
          style="margin-left:50px"
          :active-value="1"
          :inactive-value="-1"
          active-color="#13ce66"
          active-text="上架"
          inactive-text="下架"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="mini" @click="status === 0 ? createData('addForm') : updateData('addForm')">保存</el-button>
        <el-button type="primary" size="mini" @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      barname: '添加频道',
      labelPosition: 'left',
      status: '',
      form: [],
      addForm: {
        classifyName: '',
        sort: '0',
        upDownStatus: ''
      },
      // 添加表单的验证规则
      addFormRules: {
        classifyName: [
          {
            required: true,
            message: '请输入频道名称',
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
      console.log('父组件传过来的数据')
      console.log(this.$route.query)
      this.status = parseInt(this.$route.query.status)
      if (this.status === 0) {
        console.log('添加')
        this.barname = '添加频道'
        this.addForm = {
          classifyName: '',
          sort: '0',
          upDownStatus: ''
        }
      } else if (this.status === 1) {
        this.barname = '修改频道'
        console.log('修改')
        const params = {
          id: Number(this.$route.query.id)
        }
      this.addForm={
         classifyName: '测试',
        sort: '0',
        upDownStatus: '0'
      }
      } else {
        this.barname = '添加频道'
        this.status = 0
      }
    },
    createData(formName) {
      this.$refs[formName].validate(valid => {
        console.log(valid)
        const list = this.addForm
        if (!valid) return
        console.log('添加')
      })
    },
    updateData(formName) {
      console.log('修改')
      this.$refs[formName].validate(valid => {
        console.log(valid)
        const list = this.addForm
        if (!valid) return
      console.log('修改')
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
