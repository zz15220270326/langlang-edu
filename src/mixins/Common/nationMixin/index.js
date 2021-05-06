import nationList from './nation';

export default {
  data() {
    return {
      nation: '',
      nationList: []
    };
  },
  methods: {
    getNation() {
      this.nation = nationList[0].info;
      this.nationList = nationList;
    },
    selectNation(item) {
      this.nation = item.info;
    }
  },
  created() {
    this.getNation();
  }
}