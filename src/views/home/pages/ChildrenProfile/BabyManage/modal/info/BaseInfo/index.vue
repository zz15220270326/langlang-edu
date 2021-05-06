<template>
  <Card>
    <div class="base-info">
      <div class="input">
        <div class="input-name">
          <div class="tag">姓名</div>
          <div class="content">
            <Input
              maxlength="8"
              show-word-limit
              readonly
              size="default"
              style="width: 200px"
              v-model="NickName"
            />
          </div>
        </div>
        <div class="select-gender">
          <div class="tag">
            性别
          </div>
          <div class="content">
            <Tag>
              {{ sex === 1 ? '男' : sex === 2 ? '女' : '未知' }}
            </Tag>
          </div>
        </div>
        <div class="nation">
          <div class="tag">民族</div>
          <div class="content">
            <Tag>{{ nation }}</Tag>
          </div>
        </div>
        <div class="birth-date">
          <div class="tag">出生日期</div>
          <div class="content">
            <Input readonly v-model="birthday" />
          </div>
        </div>
        <div class="entry-time">
          <div class="tag">入园日期</div>
          <div class="content">
            <Input readonly v-model="InGardenDate" />
          </div>
        </div>
        <div class="select-class">
          <div class="tag">所在班级</div>
          <div class="content">
            <Radio disabled>
              {{ className }}
            </Radio>
          </div>
        </div>
        <div class="face">
          <div class="tag">人脸图像</div>
          <div class="content">
            <Button type="success" @click.native="checkInfantFace">
              查看人脸图像
            </Button>
          </div>
        </div>
      </div>
      <div class="upload">
        <Avatar v-if="!AlbumUrl" icon="ios-person" size="large" />
        <img v-else :src="AlbumUrl" alt="">
      </div>
    </div>
    <p-info :pList="parents" />
  </Card>
</template>

<script>
import './base.less'
// * components
import PInfo from './ParentInfo'

export default {
  name: 'BaseInfo',
  components: {
    PInfo
  },
  data: () => ({
    // ? 幼儿信息
    name: '',
    // ? 图片信息
    imgList: [],
    // ? 父母信息列表
    addList: [
      {
        pTitle: '选择家长',
        pList: [
          {
            info: '选择家长',
            key: 0
          },
          {
            info: '父亲',
            key: 1
          },
          {
            info: '母亲',
            key: 2
          }
        ],
        pName: '',
        pPhone: '',
        pCard: '',
        pGender: ['男', '女']
      }
    ]
  }),
  props: {
    id: Number,
    NickName: String,
    sex: Number, // ? 1: 男; 2: 女
    nation: String,
    birthday: String,
    InGardenDate: String,
    className: String,
    face: [Number, String, null, NaN],
    parents: Array,
    AlbumUrl: String
    // id: {
    //   type: Number,
    //   default: -1
    // },
    // NickName: {
    //   type: String,
    //   default: 'null-name'
    // },
    // sex: {
    //   type: Number,
    //   default: 0
    // }, // ? 1: 男; 2: 女
    // nation: {
    //   type: String,
    //   default: ''
    // },
    // birthday: {
    //   type: String,
    //   default: ''
    // },
    // InGardenDate: {
    //   type: String,
    //   default: ''
    // },
    // className: {
    //   type: String,
    //   default: ''
    // }
  },

  watch: {},

  computed: {},

  methods: {
    pNameChange() {
      this.$emit('pNameChange', this.addList)
    },
    checkInfantFace() {
      if (!this.face) {
        this.$Message.warning({
          content: '暂无人脸图像',
          background: true
        })
      }
    }
  },
  created() {}
}
</script>
