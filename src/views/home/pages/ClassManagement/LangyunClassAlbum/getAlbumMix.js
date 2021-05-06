import { currentClassBus } from './function';
import { getAlbumList } from '@/request/class-management';
// ? utils
import {
  getDataSource,
  checkDataSource,
  handleErrorCode,

  deepCopyObj,

  getIcon
} from '@/utils';
// ? vuex
import { mapState } from 'vuex';

export default {
  data() {
    return {
      // ? content
      ablumItems: [],
      page: 0,
      pageSize: 12,
      total: 0,
      totalPage: 0,
      isLoading: false
    };
  },
  computed: {
    ...mapState(['platformUrl'])
  },
  methods: {
    async getAblumItems(params = { pageSize: this.pageSize }) {
      const result = await getAlbumList(params),
        dataSource = getDataSource(result);
      if (checkDataSource(dataSource)) {
        const {
          data,
          class_group,
          class_list
        } = deepCopyObj(dataSource);
        data && class_list && this.setAlbumItems(data, class_list);
        // ? bus to menu
        class_group && currentClassBus.$emit('getClassGroup', class_group);
      } else this.$Message.error(`请求失败, 原因: ${result.msg || handleErrorCode(result.code)}`);
    },
    setAlbumItems(data, classList = []) {
      this.page = data.page || 0;
      this.total = data.count || 0;
      this.totalPage = data.pageCount || 0;
      this.ablumItems = [];
      if (Array.isArray(data.list) && data.list.length) {
        data.list.forEach(async (item, index) => {
          item.cover && this.setCover(item.cover, index);
          // console.log(item);
          this.ablumItems.push({
            number: index + 1,
            classId: item.classId,
            className: this.getNameById(classList, parseInt(item.classId)),
            title: item.title,
            type: item.type,
            createTime: item.create_time,
            classBoardIds: item.classBoardIds,
            isShowInClassBoard: item.isShowInClassBoard,
            gardenBoardIds: item.gardenBoardIds,
            isShowInGardenBoard: item.isShowInGardenBoard,
            gardenId: item.gardenId,
            id: item.id,
            status: item.status,
            isChecked: false,
            cover: parseInt(item.cover) > 0 ? item.cover : 0,
            isShowOperations: false,
          });
        });
      }
    },
    getNameById(classList = [], classId = 0) {
      const item = classList.find(c => c.id === classId);
      if (!item) {
        return '其他班级';
      } else {
        if (item.ClassName) {
          return item.ClassName;
        } else return '未知班级';
      }
    },
    async setCover(icon, index = 0) {
      if (icon) {
        const url = await getIcon(icon);
        this.ablumItems[index].cover = url;
      } else this.ablumItems[index].cover = this.platformUrl;
    },
    handleItemShow(key) {
      this.ablumItems[key].isShowOperations = true;
    },
    handleItemLeave(key) {
      this.ablumItems[key].isShowOperations = false;
    }
  },
  created() {
    this.getAblumItems();
  }
}
