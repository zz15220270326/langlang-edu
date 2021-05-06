<template>
  <div class="other-info">
    <other-item>
      <Tag slot="tag" size="large" color="gold">园所园徽</Tag>
      <List slot="content" class="upload-content">
        <Avatar :src="img.src" style="height: 7.2rem; width: 7.2rem" />
        <Upload
          :action="url"
          :multiple="false"
          :before-upload="getSingleFile"
          :format="['jpg', 'jpeg', 'png']"
          accept=".jpg, .png, .jpeg, .gif"
          :max-size="2048"
          :show-upload-list="false"
        >
          <Button type="info" size="large">
            <span>上传图片</span>
            <Icon size="large" type="ios-cloud-upload-outline" />
          </Button>
        </Upload>
      </List>
    </other-item>
    <other-item>
      <Tag slot="tag" size="large" color="red">园所园训</Tag>
      <Input
        slot="content"
        v-model="otherInfo.SchoolMotto"
        placeholder="请输入园训(不得超过20个字)"
        type="textarea"
        :rows="3"
        maxlength="20"
        :show-word-limit="true"
      />
    </other-item>
    <other-item :style="otherItemStyle">
      <Tag slot="tag" size="large" color="blue">文化理念</Tag>
      <rich-editor
        slot="content"
        :style="rich1"
        :initContent="otherInfo.CulturalConcept"
        @handleInputChange="getCulturalConcept"
      />
    </other-item>
    <other-item :style="[otherItemStyle, { height: '12rem' }]">
      <Tag slot="tag" size="large" color="green">园所介绍</Tag>
      <rich-editor
        slot="content"
        :style="rich2"
        :initContent="otherInfo.GardenIntroduce"
        @handleInputChange="getIntro"
      />
    </other-item>
  </div>
</template>

<script>
// ? components
import OtherItem from './OtherItem';
import RichEditor from './RichEditor';
// ? mixins
import styleMix from './styleMix';
import imgMixin from '@/mixins/Common/imgMixin';
// ? vuex
import { mapState } from 'vuex';

export default {
  name: 'OtherInfo',
  components: {
    OtherItem,
    RichEditor
  },
  mixins: [styleMix, imgMixin],
  data: () => ({
    otherInfo: {
      SchoolMotto: '',
      CulturalConcept: '',
      GardenIntroduce: '',
      AlbumId: '',
      image: ''
    }
  }),
  props: {
    propItems: {
      type: Object,
      default: () => ({})
    }
  },
  watch: {
    propItems(newItems) {
      this.initItems(newItems);
    },
    img(newVal) {
      this.setImg(newVal);
    }
  },
  computed: {
    ...mapState(['gardenBadge'])
  },
  methods: {
    initItems({
      SchoolMotto,
      CulturalConcept,
      GardenIntroduce,
      AlbumId,
      image
    }) {
      this.otherInfo = {
        SchoolMotto: SchoolMotto || '',
        CulturalConcept: CulturalConcept || '',
        GardenIntroduce: GardenIntroduce || '',
        AlbumId: AlbumId || '',
        image
      };
      this.initImg(image, AlbumId);
    },
    initImg(image, AlbumId) {
      this.img = {
        src: image,
        pId: AlbumId
      };
    },
    setImg({ pId, src }) {
      if (pId > 0 && src.length) {
        const newImg = {
          AlbumId: pId,
          image: src
        };
        this.otherInfo = Object.assign({}, this.otherInfo, newImg);
      }
    },
    getCulturalConcept(val) {
      this.otherInfo.CulturalConcept = val;
    },
    getIntro(val) {
      this.otherInfo.GardenIntroduce = val;
    }
  },
  /**
   * @description
   * * Vue2.x 生命周期
   */
  created() {
    this.img = this.gardenBadge;
  }
};
</script>

<style lang="less" scoped>
.other-info {
  color: #666;
  .upload-content {
    text-align: center;
    .ivu-btn {
      margin: 0.5rem 0;
    }
  }
}
</style>
