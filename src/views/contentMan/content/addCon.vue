<template>
  <div class="formdata">
    <h3>{{ barname }}</h3>
    <el-form
      ref="addForm"
      :disabled="isDisabled"
      class="demo-dynamic"
      label-width="100px"
      :label-position="labelPosition"
      :model="addForm"
      :rules="addFormRules"
    >
      <el-form-item label="文章频道" prop="articleClassifyId">
        <el-checkbox-group v-model="addForm.articleClassifyId" @change="handleCheckedCitiesChange">
          <el-checkbox v-for="city in options" :key="city.id" :label="city.id">{{ city.classifyName }}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="文章名称:" prop="title">
        <el-input
          v-model="addForm.title"
          style="width:300px"
        />
      </el-form-item>
      <el-form-item label="初始点赞量:" prop="praiseNum">
        <el-input
          v-model="addForm.praiseNum"
          style="width:300px"
        />
      </el-form-item>
      <el-form-item label="封面图片:" prop="surfaceImgUrl">
        <upload ref="upload" :fileds="addForm.surfaceImgUrl" @imgChange="getImgUploadTwo" />
      </el-form-item>
      <el-form-item label="列表图片:" prop="publicityImgUrl">
        <upload ref="upload" :fileds="addForm.publicityImgUrl" @imgChange="getImgUploadOne" />
      </el-form-item>
      <el-form-item label="视频:" prop="videoUrl">
        <videoupload ref="videoUrl" :crr-status="status" :fileds="addForm.videoUrl" @videoChange="getUploadVideo" />
      </el-form-item>
      <el-form-item label="音频:" prop="audio">
        <audioupload ref="audioupload" :crr-status="status" :fileds="addForm.audio" @musicChange="getMusicUpload" />
      </el-form-item>
      <el-form-item label="是否上架:" prop="upDownStatus">
        <el-switch
          v-model="addForm.upDownStatus"
          style="margin-left:50px"
          :active-value="1"
          :inactive-value="-1"
          active-color="#13ce66"
        />
      </el-form-item>
      <el-form-item label="是否推荐:" prop="isRecommend">
        <el-switch
          v-model="addForm.isRecommend"
          style="margin-left:50px"
          :active-value="1"
          :inactive-value="-1"
          active-color="#13ce66"
        />
      </el-form-item>
      <!-- <el-form-item label="推荐到首页:" prop="isRecommend">
        <el-switch
          v-model="addForm.isRecommend"
          style="margin-left:50px"
          active-value="1"
          inactive-value="-1"
          active-color="#13ce66"
        />
      </el-form-item> -->
      <el-form-item label="文章详情:" prop="articleContent">
        <div style="width:600px;">
          <editor
            ref="textditor"
            v-model="addForm.articleContent"
            :content="addForm.articleContent"
            :curr-status="status"
            @textChange="getHtml"
          />
        </div>
      </el-form-item>
      <el-form-item label="关联医生:" prop="skuIds">
        <el-input
          v-model="addForm.skuIds"
          style="width:300px"
        />
        <div class="titleName">关联多个医生，需用【、】隔开。如：12、23、45、75</div>
      </el-form-item>
    </el-form>
    <div class="bottombutton">
      <el-button v-if="status===0 || status===1" type="primary" size="mini" @click="status === 0 ? createData('addForm') : updateData('addForm')">保存</el-button>
      <el-button type="primary" size="mini" @click="cancel">取消</el-button>
    </div>
  </div>
</template>

<script>
import upload from '@/components/Uploadpublic/index'
import editor from '@/components/quillEditor/index'
import videoupload from '@/components/UploadVideo/index'
import audioupload from '@/components/UploadMusic/index'
export default {
  components: { upload, editor, videoupload, audioupload },
  data() {
    return {
      options: [],
      status: '',
      barname: '添加内容',
      isDisabled: false,
      labelPosition: 'left',
      form: [],
      addForm: {
        'articleClassifyId': []
      },
      // 添加表单的验证规则
      addFormRules: {
        articleClassifyId: [
          {
            required: true,
            message: '请至少选择一个文章频道',
            trigger: 'blur'
          }
        ],
        title: [
          {
            required: true,
            message: '请输入文章名称',
            trigger: 'blur'
          }
        ],
        praiseNum: [
          {
            required: true,
            message: '请输入初始点赞量',
            trigger: 'blur'
          }
        ],
        surfaceImgUrl: [
          {
            required: true,
            message: '请上传封面图片',
            trigger: 'blur'
          }
        ],
        publicityImgUrl: [
          {
            required: true,
            message: '请上传列表图片',
            trigger: 'blur'
          }
        ],
        articleContent: [
          {
            required: true,
            message: '请输入文章详情',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  created() {
    this.getFarther()
    this.getInformationlist()
  },
  methods: {
    getInformationlist() {
       this.options = [
          {
            id:1,
            classifyName:'测试'
          }
        ]
    },
    getFarther() {
      console.log('父组件传过来的数据')
      this.status = parseInt(this.$route.query.status)
      if (this.status === 0) {
        console.log('添加')
        this.barname = '添加内容'
        this.addForm = {
          'articleClassifyId': [],
          'articleContent': '',
          'audio': '',
          'commentNum': '',
          'id': '',
          'isRecommend': '',
          'praiseNum': '',
          'publicityImgUrl': '',
          'remark': '',
          'skuIds': '',
          'surfaceImgUrl': '',
          'title': '',
          'upDownStatus': '',
          'videoUrl': ''
        }
      } else if (this.status === 1) {
        console.log('修改')
        this.barname = '修改内容'
       this.addForm = {
          'articleClassifyId': [],
          'articleContent': '啥地方',
          'audio': '',
          'commentNum': '34',
          'id': '',
          'isRecommend': '2',
          'praiseNum': '阿斯蒂芬',
          'publicityImgUrl': '',
          'remark': '行政村V型正常v',
          'skuIds': '',
          'surfaceImgUrl': '',
          'title': '光华科技同益股份',
          'upDownStatus': '',
          'videoUrl': ''
        }
      } else if (this.status === 2) {
        this.barname = '查看内容'
        this.isDisabled = true
        const params = {
          id: Number(this.$route.query.id)
        }
          this.addForm = {
          'articleClassifyId': [],
          'articleContent': '啥地方',
          'audio': '',
          'commentNum': '34',
          'id': '',
          'isRecommend': '2',
          'praiseNum': '阿斯蒂芬',
          'publicityImgUrl': '',
          'remark': '行政村V型正常v',
          'skuIds': '',
          'surfaceImgUrl': '',
          'title': '光华科技同益股份',
          'upDownStatus': '',
          'videoUrl': ''
        }
      } else {
        this.barname = '添加内容'
        this.status = 0
      }
    },
    createData(formName) {
      console.log(this.addForm)
      this.$refs[formName].validate(valid => {
        console.log(valid)
        const list = this.addForm
        if (!valid) return
        console.log('添加')
      })
    },
    handleCheckedCitiesChange(value) {
      console.log('选中的数据')
      console.log(value)
      this.addForm.checkedCities = value
    },
    // 封面图片
    getImgUploadTwo(data) {
      console.log('宣传图片传过来的数据')
      console.log(data)
      if (data.type === 'add') {
        this.addForm.surfaceImgUrl = data.data.response.data
      } else if (data.type === 'remove') {
        this.addForm.surfaceImgUrl = ''
      }
    },
    // 列表图片
    getImgUploadOne(data) {
      console.log('多列图片图片传过来的数据')
      console.log(data)
      if (data.type === 'add') {
        this.addForm.publicityImgUrl = data.data.response.data
      } else if (data.type === 'remove') {
        this.addForm.publicityImgUrl = ''
        // }
      }
    },
    getUploadVideo(data) {
      console.log('视频')
      console.log(data)
      this.addForm.videoUrl = data
    },
    getMusicUpload(data) {
      console.log('音频')
      console.log(data)
      this.addForm.audio = data
    },
    // 富文本框传过来的内容
    getHtml(data) {
      // console.log(data)
      this.addForm.articleContent = data
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
