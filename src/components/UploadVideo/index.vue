<template>
  <div>
    <el-upload
      v-model="addForm.skuVideoUrl"
      class="avatar-uploader el-upload--text"
      :action="videoUploadURL"
      :show-file-list="false"
      :on-remove="handleVideoRemove"
      :on-success="handleVideoSuccess"
      :before-upload="beforeUploadVideo"
      :on-progress="uploadVideoProcess"
    >
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传mp4/wmv文件，且不超过400mb</div>
      <el-progress
        v-if="videoFlag == true"
        :percentage="videoUploadPercent"
        style="width:200px;margin-top:30px;"
      />
    </el-upload>
    <div v-if="addForm.skuVideoUrl != '' && videoFlag == false">
      <video
        :src="addForm.skuVideoUrl"
        class="avatar"
        controls="controls"
      >
        您的浏览器不支持视频播放
      </video>
       <span class="icondele" @click="deletevideo"><i class="el-icon-delete" /></span>
    </div>
  </div>
</template>
<script>
import { upload } from '@/api/upload'
export default {
  props: ['fileds', 'crrStatus'],
  data() {
    return {
      videoUploadURL: '',
      videoUploadPercent: 1,
      videoFlag: false,
      status: '',
      addForm: {
        skuVideoUrl: ''
      }
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
    getimg() {
      console.log('视频')
      console.log(this.fileds)
      console.log(this.crrStatus)
      this.status = this.crrStatus
      if (this.fileds === null) {
        this.addForm.skuVideoUrl = ''
      } else if (this.fileds === undefined) {
        this.addForm.skuVideoUrl = ''
      } else if (this.fileds === '') {
        this.addForm.skuVideoUrl = ''
      } else {
        this.addForm.skuVideoUrl = this.fileds
      }
    },
    getUpload() {
      this.videoUploadURL = upload()
    },
    deletevideo() {
      console.log('删除')
      this.addForm.skuVideoUrl = ''
      const data = ''
      this.$emit('videoChange', data)
    },
    // 上传视频
    beforeUploadVideo(file) {
      const isLt10M = file.size / 1024 / 1024 < 400
      if (
        [
          'video/mp4',
          'video/ogg',
          'video/flv',
          'video/avi',
          'video/wmv',
          'video/rmvb'
        ].indexOf(file.type) === -1
      ) {
        this.$message.error('请上传正确的视频格式')
        return false
      }
      if (!isLt10M) {
        this.$message.error('上传视频大小不能超过400MB哦!')
        return false
      }
    },
    handleVideoRemove(file, fileList) {
      // console.log(fileList)
    },
    uploadVideoProcess(event, file, fileList) {
      console.log('上传视频过程')
      console.log(file)
      this.videoFlag = true
      this.videoUploadPercent = file.percentage
    },
    handleVideoSuccess(res, file) {
      console.log(res)
      console.log(file)
      // 获取上传图片地址
      // console.log(res)
      this.videoFlag = false
      this.videoUploadPercent = 100
      if (res.code === 200) {
        this.$message({
          message: '视频上传成功',
          type: 'success'
        })
        // for (let index = 0; index < this.addForm.promotionVideo.length; index++) {
        //   console.log(this.addForm.promotionVideo[index])
        // }
        this.addForm.skuVideoUrl = res.data
        const data = res.data
        this.$emit('videoChange', data)
      } else {
        this.$message.error('视频上传失败，请重新上传！')
      }
    }
  }
}
</script>
<style scoped>
.avatar{
  width:250px;
  height:150px;
}
.icondele{
  color: red;
  cursor:pointer;
}
</style>
