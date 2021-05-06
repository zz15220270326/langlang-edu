// ? request
import { getPicById } from '@/request/Common';
// ? utils
// ? IView
import { Message } from 'view-design';
// ? vuex
import { mapState } from 'vuex';

export default {
  data() {
    return {};
  },
  props: {
    edits: {
      type: Object,
      default: () => ({})
    }
  },
  watch: {
    edits(newOptions) {
      if (Object.keys(newOptions).length) {
        this.setEdits(newOptions);
      }
    }
  },
  computed: {
    ...mapState(['platformUrl'])
  },
  methods: {
    setEdits(options = {}) {
      const {
        classId,
        infantId,
        date,
        honor,
        comment,
        pIds,
        pictures
      } = options;
      console.log(options);
      this.initClassInfos(classId);
      this.initChildrenInfos(infantId);
      this.initEditDate(date);
      this.initHonor(honor);
      this.initComment(comment);
      this.initImgs(pIds, pictures);
      this.initEditParams(options);
    },
    initClassInfos(classId) {
      this.currentClassId = classId;
      this.classTitle = this.classList.find(item => item.classId === classId).info;
      this.setChildrenList();
    },
    initChildrenInfos(infantId) {
      this.childName = this.childrenList.find(
        item => item.infantId === infantId).info || '';
    },
    initEditDate(date) {
      this.date = date;
    },
    initHonor(honor) {
      this.honor = parseInt(honor);
    },
    initComment(comment) {
      this.comment = comment;
    },
    initImgs(picIds = [], pictures = []) {
      this.imgs = [];
      if (!picIds.length) {
        Message.info({
          content: '暂无相册',
          background: true
        });
        return;
      } else {
        this.imgs = picIds.map((pId, pI) => {
          return {
            pId: parseInt(pId) || new Date().getTime(),
            src: pictures[pI]
          };
        });
      }
    },
    async getImgByIcon(icon) {
      const result = await getPicById({ icon });
      if (result.data) {
        return result.data;
      } else return this.platformUrl;
    },
    initEditParams({
      id,
      classId,
      infantId,
      date,
      honor,
      comment,
      grade,
      pIds
    }) {
      this.params = {
        id,
        classId,
        infantId,
        date,
        honor,
        comment,
        grade,
        picIds: pIds,
        name: this.childrenList.find(item => item.infantId === infantId)
          ? this.childrenList.find(item => item.infantId === infantId).info
          : ''
      };
    }
  },
  created() { }
}