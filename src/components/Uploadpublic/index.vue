<template>
  <div>
    <el-upload
      :on-change="handleChange"
      :action="uploadURL"
      :limit="limit"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :before-remove="beforeRemove"
      :file-list="fileList"
      :on-success="handleSuccess"
      style="width:400px"
    >
      <i class="el-icon-plus" />
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
    <div>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt>
      </el-dialog>
    </div>
    <!--  -->
  </div>
</template>

<script>
import { upload } from '@/api/upload'
export default {
  props: ['fileds'],
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      limit: 5,
      uploadURL: '', // 上传图片的URL地址
      fileList: []
    }
  },
  watch: {
    fileds() {
      this.getimg()
    }
  },
  created() {
    this.getUpload()
    this.getimg()
  },
  methods: {
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    getimg() {
      console.log('打印图片')
      console.log(this.fileds)
      if (this.fileds === null) {
        return
      } else if (this.fileds === undefined) {
        return
      } else if (this.fileds === '') {
        return
      } else if (typeof (this.fileds) === 'string') {
        this.fileList.push({
          url: this.fileds
        })
      } else {
        if (this.fileds instanceof Array === true) {
          this.fileList = this.fileds
          for (let index = 0; index < this.fileList.length; index++) {
            this.fileList[index].name = this.fileList[index].fileName
            this.fileList[index].url = this.fileList[index].filePath
          }
        } else if (this.fileds instanceof Array === false) {
          if (this.fileds.filePath === null) {
            this.fileList = []
          } else {
            this.fileList.push({
              url: this.fileds.filePath
            })
          }
        }
      }
    },
    // 引用上传图片的地址
    getUpload() {
      console.log('图片的地址')
      console.log(upload())
      this.uploadURL = upload()
    },
    handlePreview() {},
    // 处理移除效果
    handleRemove(file, fileList) {
      console.log(file)
      console.log(fileList)
      this.fileList = fileList
      const params = {
        type: 'remove',
        data: this.fileList
      }
      this.$emit('imgChange', params)
    },
    handleChange(file, fileList) {},
    // 只要上传图片成功就调用
    handleSuccess(response, fileList) {
      console.log(response)
      if (response.code === 200) {
        this.$message({
          message: '图片上传成功成功',
          type: 'success'
        })
        const excelInfo = response.data
        const params = {
          type: 'add',
          data: fileList
        }
        this.$emit('imgChange', params)
        this.$emit('imgChangeTwo', excelInfo)
      } else {
        this.$message('上传图片失败')
      }
    },
    beforeRemove(file, fileList) {
    }
  }
}
</script>
<style scoped>
</style>
