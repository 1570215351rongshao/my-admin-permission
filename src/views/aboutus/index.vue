<template>
  <div>
    <div class="formdata">
      <el-form
        ref="addForm"
        :model="addForm"
        status-icon
        :label-position="labelPosition"
        :rules="rules"
        label-width="100px"
        class="demo-addForm"
      >
        <el-form-item label="公司名称：" prop="name">
          <el-input
            v-model="addForm.name"
            style="width:300px;"
          />
        </el-form-item>
        <el-form-item label="邮箱：" prop="email">
          <el-input
            v-model="addForm.email"
            style="width:300px;"
          />
        </el-form-item>
        <el-form-item label="电话：" prop="phone">
          <el-input v-model="addForm.phone" type="number" style="width:300px;" />
        </el-form-item>
        <el-form-item label="地址：" prop="address">
          <el-input v-model="addForm.address" style="width:300px;" />
        </el-form-item>
        <el-form-item label="企业Logo:" prop="picture">
          <el-upload
            ref="uploadImg"
            v-model="addForm.picture"
            :on-change="handleChange"
            :limit="limitCount"
            :action="uploadURL"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-success="handleSuccess"
            :file-list="fileList"
            list-type="picture-card"
            style="width:600px"
          >
            <i class="el-icon-plus" />
            <div slot="tip" class="el-upload__tip">
              <a> 用户首页banner图显示，建议上传548*322的图片</a>
            </div>
          </el-upload>
          <!--  -->
        </el-form-item>
        <el-form-item label="企业介绍:" prop="enterpriseIntroduction">
          <el-input
            v-model="addForm.enterpriseIntroduction"
            style="width:300px;"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="请输入内容"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="submitForm('addForm')"
          >保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { upload } from '@/api/upload'
export default {
  data() {
    return {
      limitCount: 1,
      uploadURL: '', // 上传图片的URL地址
      uploadURTwo: '',
      labelPosition: 'left',
      fileList: [],
      file: [{
        url: ''
      }],
      listnumber: [],
      listnum: [
        {
          url: ''
        }
      ],
      addForm: {
        name: '',
        email: '',
        phone: '',
        address: '',
        picture: '',
        authorization: '',
        enterpriseIntroduction: ''
      },
      rules: {
        // email: [
        //   { required: true, validator: rules.FormValidate.Form().validateEmail, rigger: 'blue' }
        // ],
        // phone: [
        //   { required: true, validator: rules.FormValidate.Form().validatePhone, rigger: 'blue' }
        // ]
      }
    }
  },
  created() {
    this.getDetail()
    this.getUpload()
  },
  methods: {
    getDetail() {
      this.addForm ={
           name: '阿斯蒂芬',
        email: '19800@qq.com',
        phone: '19877787676',
        address: '',
        picture: '',
        authorization: '',
        enterpriseIntroduction: ''
        }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$message({
            message:'调用接口',
            type:'success'
          })
        } else {
          return false
        }
      })
    },
    getUpload() {
      this.uploadURL = upload()
      this.uploadURTwo = upload()
    },
    handlePreview() {},
    // 处理移除效果
    handleRemove(file, fileList) {
      console.log('asdf')
      console.log(fileList)
    },
    handleChange(file, fileList) {
      console.log('sdf')
      console.log(fileList)
    },
    // 只要上传成功图片就调用
    handleSuccess(response, fileList) {
      //  console.log(response);
      if (response.code === 200) {
        this.$message({
          message: '上传图片成功',
          type: 'success'
        })
        const picInfo = response.data
        this.addForm.picture = picInfo
        // 获取存储图片的数组
        var img = this.$refs.uploadImg.uploadFiles
        this.$emit('imgChange', img)
      } else {
        this.$message('上传图片失败')
      }
    }
  }
}
</script>
<style scope>
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }
    input[type="number"]{
        -moz-appearance: textfield;
    }
</style>
