<template>
  <div class="teacher-edit" v-show="checkedTeacher !== {}">
    <div class="header">
      <div class="left">
        <span>编辑教师风采:</span>
        <span>
          {{ checkedTeacher.name + ' (' + checkedTeacher.manage_class + ') ' }}
        </span>
      </div>
      <div class="right">
        <Button type="warning">从职工信息导入</Button>
      </div>
    </div>
    <div class="body">
      <div class="base-info">
        <div class="identify">
          <span>当前职位</span>
          <span>{{ checkedTeacher.identify }}</span>
        </div>
        <div class="birthDate">
          <span>出生日期</span>
          <span>1990-01-01</span>
        </div>
        <div class="moto">
          <span>教育格言</span>
          <Input placeholder="请输入教育格言" />
        </div>
        <div class="introduce">
          <span>教师简介</span>
          <Input type="textarea" :rows="5" />
        </div>
        <div class="add-images">
          <span>添加图片</span>
          <span>
            <Upload
              ref="upload"
              class="upload"
              :show-upload-list="false"
              :default-file-list="defaultList"
              :on-success="handleSuccess"
              :format="['jpg', 'jpeg', 'png']"
              :max-size="2048"
              multiple
              type="drag"
              action="//jsonplaceholder.typicode.com/posts/"
            >
              <Icon type="ios-camera" size="40"></Icon>

              <!-- 
              :on-format-error="handleFormatError"
            :on-exceeded-size="handleMaxSize"
            :before-upload="handleBeforeUpload"
             -->
            </Upload>
          </span>
        </div>
      </div>
      <div class="upload-avatar">
        <Avatar shape="circle" :src="checkedTeacher.img_url" size="120" />
        <Upload
          multiple
          type="drag"
          action="//jsonplaceholder.typicode.com/posts/"
        >
          <div class="upload-tag">
            <!-- <Icon type="ios-cloud-upload" size="52" style="color: #3399ff" /> -->
            <p>点击或拖拽到此处上传头像</p>
          </div>
        </Upload>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TeacherEdit',
  data: () => ({
    defaultList: [
      {
        name: 'a42bdcc1178e62b4694c830f028db5c0',
        url:
          'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar'
      },
      {
        name: 'bc7521e033abdd1e92222d733590f104',
        url:
          'https://o5wwk8baw.qnssl.com/bc7521e033abdd1e92222d733590f104/avatar'
      }
    ]
  }),
  props: {
    checkedTeacher: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    handleSuccess() {}
  }
};
</script>

<style lang="less" scoped>
.teacher-edit {
  height: 27rem;
  .header {
    background-color: #fff;
    margin: 1rem 1.2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    .left {
      flex: 1.5;
      padding: 0.3rem;
      :first-child {
        font-size: 0.8rem;
      }
      :last-child {
        font-size: 1rem;
        color: #0094ff;
        margin-left: 0.8rem;
      }
    }
    .right {
      flex: 1;
      text-align: right;
      margin-right: 0.5rem;
    }
  }
  .body {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .base-info {
      flex: 7;
      .identify {
        width: 100%;
        :first-child {
          font-size: 0.9rem;
          margin-left: 1.5rem;
        }
        :last-child {
          margin-left: 0.9rem;
          font-size: 1rem;
          // color: #6decb7;
          color: #0094ff;
        }
      }
      .birthDate {
        width: 100%;
        margin-top: 0.6rem;
        :first-child {
          font-size: 0.9rem;
          margin-left: 1.5rem;
        }
        :last-child {
          margin-left: 1rem;
          font-size: 1rem;
          // color: #eb67b4;
          color: #0094ff;
        }
      }
      .moto {
        width: 100%;
        margin-top: 0.6rem;
        :first-child {
          width: 15%;
          font-size: 0.9rem;
          margin-left: 1.5rem;
        }
        :last-child {
          width: 80%;
          margin-left: 0.6rem;
          font-size: 1rem;
          color: #666;
        }
      }
      .introduce {
        width: 100%;
        margin-top: 0.6rem;
        :first-child {
          width: 15%;
          font-size: 0.9rem;
          margin-left: 1.5rem;
        }
        :last-child {
          width: 80%;
          margin-left: 0.6rem;
          font-size: 1rem;
          color: #666;
        }
      }
      .add-images {
        width: 100%;
        margin-top: 0.6rem;
        :first-child {
          width: 15%;
          font-size: 0.9rem;
          margin-left: 1.5rem;
        }
        :last-child {
          width: 80%;
          font-size: 1rem;
          .ivu-upload {
            width: 5rem;
            height: 5rem;
            margin-left: 5rem;
          }
        }
      }
    }
    .upload-avatar {
      flex: 3;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin: 4/5rem 0;
      :nth-child(1) {
        margin-bottom: 2rem;
      }
      .upload-tag {
        margin: 1.6rem;
        height: 6rem;
        // margin-bottom: 10rem;
      }
    }
  }
}
</style>
