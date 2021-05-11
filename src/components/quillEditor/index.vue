<template>
  <div>
    <!-- //直接隐藏掉就好了，用功能不用样式  修改action对应的地址 -->
    <el-upload
      id="quill-upload"
      :hidden="true"
      :action="uploadURL"
      :show-file-list="false"
      :before-upload="beforeUpload"
      :on-error="uploadError"
      :on-success="handleExceed"
    />
    <div class="album albumvideo">
      <el-upload
        id="avatar-uploader"
        ref="videoUpload"
        :hidden="true"
        :action="uploadURL"
        :data="{ FoldPath: '上传目录', SecretKey: '安全验证' }"
        :on-progress="uploadVideoProcess"
        :on-success="handleVideoSuccess"
        :before-upload="beforeUploadVideo"
        list-type="picture"
      >
        <video
          v-if="videoForm.showVideoPath != '' && !videoFlag"
          :src="videoForm.showVideoPath"
          class="avatar"
          controls="controls"
        >
          您的浏览器不支持视频播放
        </video>
        <!-- <el-button
          size="small"
          type="primary"
          v-else-if="videoForm.showVideoPath == '' && !videoFlag"
          >点击上传</el-button
        > -->
      </el-upload>
    </div>
    <el-row v-loading="uillUpdateImg">
      <quillEditor
        id="box"
        ref="myQuillEditor"
        v-model="value"
        :options="editorOption"
        @change="onEditorChange($event)"
        @blur="onEditorBlur($event)"
        @focus="onEditorFocus($event)"
      />
    </el-row>
  </div>
</template>
<script>
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { upload } from '@/api/upload'
// // 新一如的测试居中样式
import Quill from 'quill'
const Align = Quill.import('attributors/style/align')
Align.whitelist = ['right', 'center', 'justify']
Quill.register(Align, true)
// // 测试结束
export default {
  name: 'RichText',
  components: { quillEditor },
  props: ['content', 'currStatus'], // 父组件传过来的，将传过来的渲染到富文本编辑器
  data() {
    return {
      uploadUrl: '',
      // 视频
      videoFlag: false,
      // 是否显示进度条
      videoUploadPercent: '',
      // 进度条的进度，
      isShowUploadVideo: false,
      // 显示上传按钮
      videoForm: {
        showVideoPath: ''
      },
      status: '',
      // 图片
      uillUpdateImg: false, // 根据图片上传状态来确定是否显示loading动画
      serverUrl: '', // 上传的图片服务器地址
      value: this.content, // 富文本内容
      editorOption: {
        // 符文本编辑器的配置
        placeholder: '请输入内容',
        theme: 'snow',
        modules: {
          toolbar: {
            container: [
              ['bold', 'italic', 'underline', 'strike'], // toggled buttons
              ['blockquote', 'code-block'],

              [{ header: 1 }, { header: 2 }], // custom button values
              [{ list: 'ordered' }, { list: 'bullet' }],
              [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
              [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
              [{ direction: 'rtl' }], // text direction

              [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
              [{ header: [1, 2, 3, 4, 5, 6, false] }],

              [{ color: [] }, { background: [] }], // dropdown with defaults from theme
              [{ font: [] }],
              [{ align: [] }],
              ['link', 'image', 'video'],
              ['clean'] // remove formatting button
            ],
            handlers: {
              image: function(value) {
                if (value) {
                  // 给个点击触发Element-ui，input框选择图片文件
                  document.querySelector('#quill-upload input').click()
                } else {
                  this.quill.format('image', false)
                }
              },
              video: function(value) {
                if (value) {
                  document.querySelector('#avatar-uploader input').click()
                } else {
                  this.quill.format('video', false)
                }
              }
            }
          }
        }
      }
    }
  },
  watch: {
    content() {
      this.value = this.content
    },
    currStatus() {
      this.get()
    }
  },
  mounted() {
    // 让富文本不自送获得焦点
    this.$refs.myQuillEditor.quill.enable(false)
  },
  created() {
    this.getUpload()
    this.get()
  },
  methods: {
    get() {
      console.log('装填')
      console.log(this.currStatus)
    },
    // 引用上传图片的地址
    getUpload() {
      this.uploadURL = upload()
    },
    onEditorBlur() {
      this.$refs.myQuillEditor.quill.enable(true)
    },
    onEditorFocus(event) {
      // 通过按钮的状态改变编辑器的禁用状态
      // this.$refs.myQuillEditor.quill.enable(false)
      if (this.currStatus === 2) {
        this.$refs.myQuillEditor.quill.enable(false)
      } else {
        this.$refs.myQuillEditor.quill.enable(true)
      }
    }, // 获得焦点事件
    onEditorChange({ quill, html, text }) {
      // console.log('将编辑器的iframe标签换成为video，小程序能够显示')
      const resphtml = html.toString().replace(/iframe/g, 'video')
      // 富文本编辑器内容发生改变的时候
      this.value = resphtml
      this.$emit('textChange', resphtml) // 将富文本编辑器输入的文本发送给父组件，父组件涉及提交添加或者更改
    },
    beforeUpload() {
      // 上传图片之前开启loading
      this.uillUpdateImg = true
    },
    uploadError() {
      // 图片上传失败,关闭loading
      this.uillUpdateImg = false
      this.$message.error('图片插入失败')
    },
    handleExceed(response, file, fileList) {
      // 图片添加成功
      const quill = this.$refs.myQuillEditor.quill
      if (response.code === 200) {
        this.$message({
          message: '插入图片成功',
          type: 'success'
        })
        console.log('富文本上传图片成功')
        console.log(response)
        const length = quill.getSelection().index
        // 插入图片 response.data.url为服务器返回的图片地址
        quill.insertEmbed(length, 'image', response.data)
        // 调整光标到最后
        quill.setSelection(length + 1)
      } else {
        this.$message.error('图片插入失败')
      }
      this.fileList = fileList
      this.uillUpdateImg = false
    },
    // 视频上传
    // 视频上传前回调
    beforeUploadVideo(file) {
      var fileSize = file.size / 1024 / 1024 < 400
      if (
        [
          'video/mp4',
          'video/ogg',
          'video/flv',
          'video/avi',
          'video/wmv',
          'video/rmvb',
          'video/mov'
        ].indexOf(file.type) === -1
      ) {
        this.$message('请上传正确的视频格式')
        return false
      }
      if (!fileSize) {
        this.$message('视频大小不能超过400MB')
        return false
      }
      this.isShowUploadVideo = false
    },
    // 进度条
    uploadVideoProcess(event, file, fileList) {
      this.videoFlag = true
    },
    // 上传成功回调
    handleVideoSuccess(response, file, fileList) {
      const quill = this.$refs.myQuillEditor.quill
      // 前台上传地址
      if (file.status === 'success') {
        this.$message({
          message: '视频上传成功',
          type: 'success'
        })
        this.$refs.videoUpload.clearFiles()
        const length = quill.getSelection().index
        // 插入视频 response.data.url为服务器返回的视频地址
        quill.insertEmbed(length, 'video', response.data)
        // 调整光标到最后
        quill.setSelection(length + 1)
      } else {
        this.$message.error('上传失败,请重新上传')
      }
    }
  }
}
</script>
<style>
.ql-editor{
  height:400px;
}
</style>
