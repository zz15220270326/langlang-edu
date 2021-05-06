<template>
  <div class="is-approved">
    <div class="left">
      <Card :bordered="false">
        <div class="title" slot="title">
          <Avatar :src="icon" size="large" />
          <h2>{{ infantName }}家长</h2>
          <Tag type="border" closable color="warning">{{ className }}</Tag>
        </div>
        <div class="content">
          <div class="holiday-child">
            <div class="title">请假幼儿</div>
            <div class="content">{{ infantName }}</div>
          </div>
          <div class="holiday-span">
            <div class="title">请假时间</div>
            <div class="content">
              <div>开始: {{ startTime }}</div>
              <div>结束: {{ endTime }}</div>
            </div>
          </div>
          <div class="holiday-type">
            <div class="title">请假类型</div>
            <div class="content">{{ leaveType }}</div>
          </div>
          <div class="ask-content">
            <div class="title">请假内容</div>
            <div class="content">{{ content }}</div>
          </div>
          <div class="fund-time">
            <div class="title">创建时间</div>
            <div class="content">{{ createTime }}</div>
          </div>
        </div>
      </Card>
    </div>
    <Divider type="vertical" />
    <div class="right">
      <Card>
        <div class="title" slot="title">
          <Tag color="green" size="large">已同意</Tag>
        </div>
        <div class="content">
          <div class="checked">
            <div class="title">审批</div>
            <div
              class="content"
              :style="{ color: status === 0 ? 'red' : 'lime' }"
            >
              {{ status === 0 ? '未通过' : '已通过' }}
            </div>
          </div>
          <div class="checked-teacher">
            <div class="title">审批教师</div>
            <div class="content">{{ name }}</div>
          </div>
          <div class="checked-time">
            <div class="title">审批时间</div>
            <div class="content">{{ createTime }}</div>
          </div>
          <div class="remark">
            <div class="title">备注</div>
            <div class="content">{{ remark }}</div>
          </div>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'isApproved',
  props: {
    icon: {
      type: String,
      default:
        'http://t.static.langlangyun.com/Icon/084b6fbb10729ed4da8c3d3f5a3ae7c9/ab7e4e5b51a04436f082eb06c79924b7'
    },
    infantName: {
      type: String,
      default: ''
    },
    className: {
      type: String,
      default: ''
    },
    leaveType: {
      type: String,
      default: ''
    },
    startTime: {
      type: String,
      default: ''
    },
    endTime: {
      type: String,
      default: ''
    },
    content: {
      type: String,
      default: ''
    },
    createTime: {
      type: String,
      default: ''
    },
    // ? right
    name: {
      type: String,
      default: ''
    },
    status: {
      type: Number,
      default: 0
    },
    checkedTime: {
      type: String,
      default: ''
    },
    remark: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="less" scoped>
.item-format {
  .title {
    font-size: 1rem;
    font-weight: 540;
  }
  .content {
    margin: 0.6rem 0;
    font-size: 0.92rem;
    color: #ff9400;
  }
}
.left-color {
  .content {
    color: #0094ff;
  }
}
.item-style {
  .item-format;
  .left-color;
}
.is-approved {
  height: 28rem;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .left {
    flex: 1;
    width: 100%;
    height: 100%;
    .ivu-card-head {
      .title {
        width: 100%;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
      }
    }
    .content {
      .holiday-child {
        .item-style;
      }
      .holiday-span {
        .item-style;
      }
      .holiday-type {
        .item-style;
      }
      .ask-content {
        .item-style;
      }
      .fund-time {
        .item-style;
      }
    }
  }
  .right {
    flex: 1;
    width: 100%;
    height: 100%;
    .ivu-card-head {
      .title {
        text-align: right;
      }
    }
    .content {
      .checked {
        .item-format;
      }
      .checked-teacher {
        .item-format;
      }
      .checked-time {
        .item-format;
      }
      .remark {
        margin-bottom: 4.3rem;
        .item-format;
      }
    }
  }
}
</style>
