<template>
  <div class="formdata">
    <h3>{{ barname }}</h3>
    <el-form
      ref="addForm"
      :disabled="status===2"
      class="demo-dynamic"
      label-width="120px"
      :label-position="labelPosition"
      :model="addForm"
      :rules="addFormRules"
    >
      <el-form-item label="员工姓名:" prop="employeeName">
        <el-input v-model="addForm.employeeName" style="width:300px" />
      </el-form-item>
      <el-form-item label="员工登录账号:" prop="employeeAccount">
        <el-input
          v-model="addForm.employeeAccount"
          style="width:300px"
          @change="accountInput"
        />
        <div class="titleName">员工可以用该号登录平台后台</div>
      </el-form-item>
      <el-form-item label="员工登录密码:" prop="employeePassword">
        <el-input
          v-model="addForm.employeePassword"
          style="width:300px"
          @change="addpassard"
        />
        <div class="titleName">员工登录密码为登录账号+123</div>
      </el-form-item>
      <el-form-item label="员工微信号:" prop="employeePassword">
        <el-input
          v-model="addForm.employeePassword"
          style="width:300px"
          @change="addpassard"
        />
        <div class="titleName">用于绑定微信客服</div>
      </el-form-item>
      <el-form-item label="员工编号:" prop="employeeNo">
        <el-input
          v-model="addForm.employeeNo"
          style="width:300px"
          :disabled="true"
        />
      </el-form-item>
      <el-form-item label="员工联系方式:" prop="employeePhone">
        <el-input
          v-model="addForm.employeePhone"
          style="width:300px"
        />
      </el-form-item>
      <el-form-item label="所属角色:" prop="employeeRoleid">
        <el-select
          v-model="addForm.employeeRoleid"
          style="width:300px"
          clearable
          placeholder="请选择"
        >
          <el-option
            v-for="item in form"
            :key="item.value"
            :label="item.roleName"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <div class="bottombutton">
      <el-button v-if="status===1|| status===0" type="primary" size="mini" @click="status === 0 ? createData('addForm') : updateData('addForm')">保存</el-button>
      <el-button type="primary" size="mini" @click="cancel">取消</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      barname: '添加员工',
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
        employeeName: [
          {
            required: true,
            message: '请输入员工姓名',
            trigger: 'blur'
          }
        ],
        employeeAccount: [
          {
            required: true,
            message: '请输入员工账户(字母和数字组成,不能存在特殊字符)',
            trigger: 'blur'
          }
        ],
        employeePassword: [
          {
            required: true,
            message: '请输入员工密码(字母和数字组成,不能存在特殊字符)',
            trigger: 'blur'
          },
          { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
        ],
        employeeRoleid: [
          {
            required: true,
            message: '请选择角色',
            trigger: 'blur'
          }
        ]
        // employeePhone: [
        //   {
        //     required: true,
        //     trigger: 'blur',
        //     validator: checkPhone
        //   }
        // ]
      }
    }
  },
  created() {
    this.getFarther()
    this.getPlooyRole()
  },
  methods: {
    // 查询员工角色
    getPlooyRole() {
      this.form=[
          {
            id:1,
            roleName:'超级管理员'
          }
        ]
    },
    getFarther() {
      console.log('父组件传过来的数据')
      console.log(this.$route.query)
      this.status = parseInt(this.$route.query.status)
      if (this.status === 0) {
        console.log('添加')
        this.barname = '添加员工'
        this.addForm = {
          employeeAccount: '',
          employeeName: '',
          employeeNo: '',
          employeePassword: '',
          employeePhone: '',
          employeeRoleid: ''
        }
      } else if (this.status === 1) {
        this.barname = '修改员工'
        console.log('修改')
        const params = {
          id: parseInt(this.$route.query.id)
        }
         this.addForm = {
          employeeAccount: '阿斯蒂芬',
          employeeName: '二十多',
          employeeNo: '',
          employeePassword: '',
          employeePhone: '',
          employeeRoleid: ''
        }
      } else if (this.status === 2) {
        this.barname = '查看员工'
        console.log('查看')
        const params = {
          id: parseInt(this.$route.query.id)
        }
        this.addForm = {
          employeeAccount: '阿斯蒂芬',
          employeeName: '二十多',
          employeeNo: '',
          employeePassword: '',
          employeePhone: '',
          employeeRoleid: ''
        }
      } else {
        this.barname = '添加员工'
        this.status = 0
      }
    },
    accountInput(val) { // 账号的实时输入
      const codeReg = new RegExp('[A-Za-z0-9]+') // 正则 英文+数字；
      const len = val.length
      let str = ''
      for (var i = 0; i < len; i++) {
        if (codeReg.test(val[i])) {
          str += val[i]
        }
      }
      console.log(str)
      if (str === '') {
        this.addForm.employeeAccount = ''
      } else {
        this.addForm.employeeAccount = str
      }
    },
    addpassard(val) {
      const codeReg = new RegExp('[A-Za-z0-9]+') // 正则 英文+数字；
      const len = val.length
      let str = ''
      for (var i = 0; i < len; i++) {
        if (codeReg.test(val[i])) {
          str += val[i]
        }
      }
      if (str === '') {
        this.addForm.employeePassword = ''
      } else {
        this.addForm.employeePassword = str
      }
    },
    createData(formName) {
      this.$refs[formName].validate(valid => {
        console.log(valid)
        const list = this.addForm
        if (!valid) return
        this.$message({
            message:'调用接口',
            type:'success'
          })
      })
    },
    updateData(formName) {
      console.log('修改')
      this.$refs[formName].validate(valid => {
        console.log(valid)
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
