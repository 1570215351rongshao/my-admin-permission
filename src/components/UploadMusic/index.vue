<template>
  <div>
    <el-upload
      v-model="addForm.skuAudioUrl"
      class="avatar-uploader el-upload--text"
      :action="audioUploadURL"
      :show-file-list="false"
      :on-remove="handleAudioRemove"
      :on-success="handleAudioSuccess"
      :before-upload="beforeUploadAudio"
      :on-progress="uploadAudioProcess"
    >
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传mp4/mp3格式文件，且不超过500kb</div>
      <el-progress
        v-if="audioFlag == true"
        :percentage="audioUploadPercent"
        style="width:200px;margin-top:30px;"
      />
    </el-upload>
    <div v-if="addForm.skuAudioUrl != '' && audioFlag == false">
      <audio
        :src="addForm.skuAudioUrl"
        class="yinyue"
        controls="controls"
      >
        您的浏览器不支持视频播放
      </audio>
      <a class="icondele" @click="deleteaudio"><i class="el-icon-delete" /></a>
    </div>
  </div>
</template>
<script>
import { upload } from '@/api/upload'
export default {
  props: ['fileds','currStatus'],
  data() {
    return {
      status:'',
      audioUploadURL: '',
      audioFlag: false,
      addForm: {
        skuAudioUrl: ''
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
      console.log('父组件传过来的音频')
      console.log(this.fileds)
      this.status=this.currStatus
      if (this.fileds === null) {
        this.addForm.skuAudioUrl = ''
      } else if (this.fileds === undefined) {
        this.addForm.skuAudioUrl = ''
      } else if (this.fileds === '') {
        this.addForm.skuAudioUrl = ''
      } else {
        this.addForm.skuAudioUrl = this.fileds
      }
    },
    getUpload() {
      this.audioUploadURL = upload()
    },
    deleteaudio() {
      this.addForm.skuAudioUrl = ''
      const data = ''
      this.$emit('musicChange', data)
    },
    // 上传视频
    beforeUploadAudio(file) {
      console.log(file)
      const isLt10M = file.size / 1024 / 1024 < 400
      if (
        [
          'audio/mp4',
          'audio/mp3',
          'audio/mpeg'
        ].indexOf(file.type) === -1
      ) {
        this.$message.error('请上传正确的音频格式')
        return false
      }
      if (!isLt10M) {
        this.$message.error('上传音频大小不能超过400MB哦!')
        return false
      }
    },
    handleAudioRemove(file, fileList) {
      // console.log(fileList)
    },
    uploadAudioProcess(event, file, fileList) {
      this.audioFlag = true
      this.audioUploadPercent = file.percentage
    },
    handleAudioSuccess(res, file) {
      // 获取上传图片地址
      // console.log(res)
      this.audioFlag = false
      this.audioUploadPercent = 0
      if (res.code === 200) {
        this.$message({
          message: '音频上传成功',
          type: 'success'
        })
        // for (let index = 0; index < this.addForm.promotionAudio.length; index++) {
        //   console.log(this.addForm.promotionAudio[index])
        // }
        this.addForm.skuAudioUrl = res.data
        const data = res.data
        this.$emit('musicChange', data)
      } else {
        this.$message.error('音频上传失败，请重新上传！')
      }
    }
  }
}
</script>
<style scoped>
.yinyue{
  width: 250px;
  outline: none;
}
.icondele{
  color: red;
  cursor:pointer;
}
</style>
