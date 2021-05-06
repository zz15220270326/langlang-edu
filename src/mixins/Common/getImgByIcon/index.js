import { getPicById } from '@/request/Common';

export default {
  data() {
    return {}
  },
  methods: {
    async getImgByIcon(icon) {
      const result = await getPicById({ icon });
      if (result.data) {
        return result.data;
      } else return this.platformUrl;
    }
  },
  created() {}
}