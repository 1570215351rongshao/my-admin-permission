<template>
  <div>
    <el-row :gutter="40" class="panel-group">
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-people">
            <img src="../../../assets//jine.png" alt="">
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              订单数
            </div>
            <!-- <span>{{ orderNum }}</span> -->
            <count-to :start-val="0" :end-val="orderNum" :duration="3000" class="card-panel-num" />
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-message">
            <img src="../../../assets/yonghu.png">
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              用户数
            </div>
            <!-- <span>{{ userNum }}</span> -->
            <count-to :start-val="0" :end-val="userNum" :duration="3000" class="card-panel-num" />
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-money">
            <img src="../../../assets//shangpin.png" alt="">
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              医生数
            </div>
            <!-- <span>{{ dockerNum }}</span> -->
            <count-to :start-val="0" :end-val="dockerNum" :duration="3200" class="card-panel-num" />
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-shopping">
            <img src="../../../assets//dingdan.png" alt="">
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              员工数
            </div>
            <!-- <span>{{ empNum }}</span> -->
            <count-to :start-val="0" :end-val="empNum" :duration="3600" class="card-panel-num" />
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import CountTo from 'vue-count-to'
export default {
  components: {
    CountTo
  },
  data() {
    return {
      orderNum: 0,
      dockerNum: 0,
      empNum: 0,
      userNum: 0
    }
  },
  created() {
    this.getUserCount()
  },
  methods: {
    getUserCount() {
        this.dockerNum =1223
          this.orderNum = 340
          this.userNum = 123
          this.empNum =456
    }
  }
}
</script>

<style lang="scss" scoped>
img{
  width:50px;
}
.panel-group {
  margin-top: 18px;

  .card-panel-col {
    margin-bottom: 32px;
  }

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);
      .icon-people {
        background: #fff;
      }

      .icon-message {
        background: #fff;
      }

      .icon-money {
        background: #fff;
      }

      .icon-shopping {
        background: #fff
      }
    }

    .icon-people {
      color: #40c9c6;
    }

    .icon-message {
      color: #36a3f7;
    }

    .icon-money {
      color: #f4516c;
    }

    .icon-shopping {
      color: #34bfa3
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 20px;
      }
    }
  }

@media (max-width:550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
</style>
