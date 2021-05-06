export default {
  data() {
    return {
      statusTitle: '',
      statusList: [{
          info: '点评状态',
          key: 2
        },
        {
          info: '已点评',
          key: 1,
        },
        {
          info: '未点评',
          key: 0,
        },
      ],
      status: 2
    }
  },
  methods: {
    initStatus() {
      this.statusTitle = this.statusList[0].info;
      this.$emit('uploadStatus', this.statusList[0].key);
    },
    getStatus(selectStatus) {
      this.statusTitle = selectStatus.info;
      this.status = selectStatus.key;
      this.$emit('uploadStatus', this.status);
    }
  },
  created() {
    this.initStatus();
  }
}