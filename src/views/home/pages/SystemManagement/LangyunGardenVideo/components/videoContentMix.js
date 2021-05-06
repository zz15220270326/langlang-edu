// ? components
import MyContent from 'HomePage/SystemManagement/SMTable';
// ? request
import { getAddVideoInfo } from '@/request/system-management';
import { getPicById } from '@/request/Common';
// ? utils
import {
  // ? request
  getDataSource,
  checkDataSource,
  // ? arr / obj
  deepCopyObj,
  // ? times
  // getHMS
} from '@/utils';
// ? vuex
import { mapState } from 'vuex';
// ? previewImg
const previewImg = require('@/assets/images/preview.png')

export default {
  components: {
    MyContent
  },
  data() {
    return {
      videoColumns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '缩略图',
          slot: 'image',
          align: 'center',
          width: 200
        },
        {
          title: '视频名称',
          key: 'videoName',
          align: 'center',
          width: 300
        },
        {
          title: '时长',
          key: 'totalTime',
          align: 'center'
        },
        {
          title: '排序',
          slot: 'sort',
          align: 'center'
        },
        {
          title: '操作',
          slot: 'operation',
          align: 'center'
        },
        {
          title: '状态',
          key: 'status',
          align: 'center',
          render: (h, { row }) => {
            let text = 'unknown',
              color = '#666';
            switch (row.status) {
              case 0:
                text = '未添加';
                color = 'orange';
                break;
              case 1:
                text = '已添加';
                color = 'lime';
                break;
              default:
                break
            }
            return h('span', {
              style: {
                color
              }
            }, text)
          }
        }
      ],
      videoData: [],
      typeInfos: [],
      page: 0,
      pageSize: 6,
      total: 0,
      totalPage: 0,
      tableIsLoading: false,
      totalMemories: 0,
      usedMemories: 0,
      crtData: {},
      crtId: 0,
      // ? 菜单操作成功后变化的值
      varifyValue: ''
    };
  },
  computed: {
    ...mapState(['platformUrl'])
  },
  methods: {
    // ? contents
    async getVideoInfo(params = { pageSize: this.pageSize }) {
      this.tableIsLoading = true;
      const result = await getAddVideoInfo(params),
        dataSource = getDataSource(result);
      if (checkDataSource(dataSource)) {
        // console.log(dataSource);
        const { data, typeList, allSpace, usedSpace } = deepCopyObj(dataSource);
        this.setDataContent(data);

        this.typeInfos = typeList || [];

        this.usedMemories = usedSpace;
        this.totalMemories = allSpace;

      } else this.$Message.error(`请求失败, 原因: ${result.msg}`);
      this.tableIsLoading = false;
    },
    setDataContent(data = {}, crtId = 0) {
      this.page = data.page || 0;
      this.total = data.count || 0;
      this.totalPage = data.pageCount || 0;
      this.videoData = [];
      Array.isArray(data.list) &&
        data.list.length &&
        this.setVideoInfo(data.list);

      // this.crtData = data;
      Object.keys(data).forEach(prop => Object.defineProperty(
        this.crtData, prop, {
        value: data[prop],
        writable: true,
        configurable: false,
        enumerable: true
      }
      ));
      this.crtId = crtId;
    },
    setVideoInfo(list = []) {
      list.forEach(async (v, vi) => {
        this.videoData.push({
          number: vi + 1,
          id: v.id,
          uid: v.uid || 0,
          gardenId: v.gardenId || 0,
          videoId: v.video_id || 0,
          image: await this.getImgById(v.thumbnails),
          // videoName: v.title,
          videoName: v.video_title || v.videoName || '',
          totalTime: v.duration || '暂无时长', // getHMS(v.duration),
          // sort: vi + 1,
          sort: 'sort' in v ? parseInt(v.sort) : vi + 1,
          status: v.status,
          content: v.content,
          operation: {
            tag: '点击播放',
            type: 'info'
          }
        });
      });
    },
    async getImgById(icon) {
      const result = await getPicById({ icon });
      if (result.data) {
        return result.data;
      } else return previewImg;
    },
    getContentByPage(params) {
      this.getVideoInfo(params);
    }
  },
  // created() {
  //   console.log(parseInt(0));
  // }
}
