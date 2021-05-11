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
      <el-form-item label="角色名称:" prop="roleName">
        <el-input v-model="addForm.roleName" style="width:300px" />
      </el-form-item>
      <el-form-item label="角色描述:" prop="roleDesc">
        <el-input v-model="addForm.roleDesc" style="width:300px" />
      </el-form-item>
      <el-form-item label="角色权限:" prop="permissionIdList">
        <el-checkbox-group v-model="addForm.permissionIdList">
          <el-checkbox
            v-for="item in form"
            :key="item.id"
            border
            size="medium"
            :value="item.id"
            :label="item.id"
          >{{ item.name }}</el-checkbox>
        </el-checkbox-group>
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
        permissionIdList: [],
        roleDesc: '',
        roleName: ''
      },
      // 添加表单的验证规则
      addFormRules: {
        roleName: [
          {
            required: true,
            message: '请输角色名称',
            trigger: 'blur'
          }
        ],
        permissionIdList: [
          {
            required: true,
            message: '请选择角色权限',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  created() {
    this.getFarther()
    this.getPlooyRole()
  },
  methods: {
    handleCheckedCitiesChange(value) {
      const checkedCount = value.length
      this.checkAll = checkedCount === this.cities.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length
    },
    // 查询员工角色权限
    getPlooyRole() {
      this.form =[
            {
              id:1,
              name:'员工管理'
            }
          ]
    },
    getFarther() {
      this.status = parseInt(this.$route.query.status)
      if (this.status === 0) {
        this.barname = '添加员工'
        this.addForm = {
          permissionIdList: [],
          roleDesc: '',
          roleName: ''
        }
      } else if (this.status === 1) {
        this.barname = '修改员工'
        const params = {
          id: parseInt(this.$route.query.id)
        }
         this.addForm = {
          permissionIdList: [
             {
              id:1,
              name:'员工管理'
            }
          ],
          roleDesc: '',
          roleName: ''
        }
      } else if (this.status === 2) {
        this.barname = '查看员工'
        const params = {
          id: parseInt(this.$route.query.id)
        }
       this.addForm = {
          permissionIdList: [
             {
              id:1,
              name:'员工管理'
            }
          ],
          roleDesc: '',
          roleName: ''
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
.el-checkbox.is-bordered+.el-checkbox.is-bordered{
  margin-left:0px;
  width:112px;
}
p {
  margin: 0;
  color: #b1aeae;
  font-size: 14px;
}
</style>
