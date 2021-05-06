export default {
  data() {
    return {
      roleList: [
        {
          label: '教职工',
          value: 'garden',
          able: true
        },
        {
          label: '主管部门',
          value: 'education',
          able: false
        },
        {
          label: '管理员',
          value: 'admin',
          able: false
        },
        {
          label: '家长',
          value: 'parent',
          able: false
        },
        {
          label: '开发者',
          value: 'developer',
          able: false
        }
      ],
      userType: 'garden',
      loading: false,
      loadingNumber: 0,
    };
  },
  methods: {
    handleLoadingNumber(seconds = 60) {
      this.loadingNumber = seconds;
      setInterval(() => {
        this.loadingNumber--;
        if (this.loadingNumber <= 0) {
          clearInterval();
        }
      }, 1000);
    }
  }
}