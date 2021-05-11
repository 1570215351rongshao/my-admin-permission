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
      console.log('preview')
      console.log(file)
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    getimg() {
      if (this.fileds.length === 0) {
        return
      } else {
        console.log('父组件传过来的数据')
        console.log(this.fileds)
        for (let index = 0; index < this.fileds.length; index++) {
        //   this.fileList[index].name = this.fileList[index].fileName
          this.fileds[index].url = this.fileds[index].picture
        }
        this.fileList = this.fileds
        console.log(this.fileList)
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
      this.fileList = fileList
      //   for (let index = 0; index < this.fileList.length; index++) {
      //     this.fileList[index].name = this.fileList[index].fileName
      //     this.fileList[index].picture = this.fileList[index].response.data
      //   }
      console.log('删除图片')
      console.log(this.fileList)
      const params = {
        type: 'remove',
        data: this.fileList
      }
      this.$emit('imgChange', params)
    },
    handleChange(file, fileList) {
    },
    // 只要上传图片成功就调用
    handleSuccess(response, fileList) {
      if (response.code === 200) {
        console.log('图片上传成功')
        console.log(response.data)
        this.$message({
          message: '图片上传成功成功',
          type: 'success'
        })
        this.fileList.push({ id: '', picture: response.data })
        console.log('数组中的图片')
        console.log(this.fileList)
        const params = {
          type: 'add',
          data: this.fileList
        }
        this.$emit('imgChange', params)
      } else {
        this.$message('上传图片失败')
        this.fileList = []
      }
    },
    beforeRemove(file, fileList) {
    }
  }
}
</script>
<style scoped>
</style>
