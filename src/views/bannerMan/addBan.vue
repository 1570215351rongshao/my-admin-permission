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
      <el-form-item label="配图类型:" prop="type">
        <el-select
          v-model="addForm.type"
          clearable
          placeholder="请选择"
          style="width:300px"
        >
          <el-option
            v-for="item in options"
            :key="item.type"
            :label="item.label"
            :value="item.type"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="图片名称:" prop="name">
        <el-input
          v-model="addForm.name"
          style="width:300px"
        />
      </el-form-item>
      <el-form-item label="排序值：" prop="sort">
        <el-input
          v-model="addForm.sort"
          style="width:300px"
          placeholder="大于等于0的正整数"
        />
        <div class="titleName"> 不填写，默认排在最前面</div>
      </el-form-item>
      <el-form-item label="是否显示:" prop="isShow">
        <el-select v-model="addForm.isShow" clearable style="width:300px">
          <el-option :value="1" label="是" />
          <el-option :value="2" label="否" />
        </el-select>
      </el-form-item>
      <el-form-item label="上传图片:" prop="imgUrl">
        <upload ref="upload" :fileds="addForm.imgUrl" @imgChange="getImgUploadTwo" />
      </el-form-item>
      <el-form-item label="关联类型:" prop="objType">
        <el-radio v-model="addForm.objType" :label="4">无</el-radio>
        <!-- <el-radio v-model="addForm.objType" :label="1">活动</el-radio> -->
        <el-radio v-model="addForm.objType" :label="2">商品</el-radio>
        <el-radio v-model="addForm.objType" :label="3">banner</el-radio>
      </el-form-item>
      <el-form-item v-if="addForm.objType===1||addForm.objType===2||addForm.objType===3" label="关联ID:" prop="objId">
        <el-input
          v-model="addForm.objId"
          style="width:300px"
          size="mini"
        />
      </el-form-item>
    </el-form>
    <div class="bottombutton">
      <el-button type="primary" size="mini" @click="status === 0 ? createData('addForm') : updateData('addForm')">保存</el-button>
      <el-button type="primary" size="mini" @click="cancel">取消</el-button>
    </div>
  </div>
</template>

<script>
import upload from '@/components/Uploadpublic/index'
export default {
  components: { upload },
  data() {
    return {
      options: [
        {
          type: 1,
          label: '首页banner'
        }
      ],
      barname: '添加banner',
      labelPosition: 'left',
      form: [],
      addForm: {
      },
      // 添加表单的验证规则
      addFormRules: {
        type: [
          {
            required: true,
            message: '请选择配图类型',
            trigger: 'blur'
          }
        ],
        name: [
          {
            required: true,
            message: '请输入配图名称',
            trigger: 'blur'
          }
        ],
        sort: [
          {
            required: true,
            message: '请输入排序',
            trigger: 'blur'
          }
        ],
        imgUrl: [
          {
            required: true,
            message: '请上传图片',
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
      if (this.$route.query.status === 0) {
        this.barname = '添加banner'
        this.addForm = {
          id: '',
          imgUrl: '',
          isShow: 1,
          name: '',
          objId: '',
          objType: 4,
          sort: '0',
          type: 1
        }
      } else if (this.$route.query.status === 1) {
        this.barname = '修改banner'
        const params = {
          id: Number(this.$route.query.id)
        }
       this.addForm = {
          id: '',
          imgUrl: '',
          isShow: 1,
          name: '测试',
          objId: '',
          objType: 4,
          sort: '0',
          type: 1
        }
      } else {
        this.barname = '添加banner'
        this.status = 0
      }
    },
    // 上传图片显示
    getImgUploadTwo(data) {
      if (data.type === 'add') {
        this.addForm.imgUrl = data.data.response.data
      } else if (data.type === 'remove') {
        this.addForm.imgUrl = ''
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
    updateData(formName) {
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
