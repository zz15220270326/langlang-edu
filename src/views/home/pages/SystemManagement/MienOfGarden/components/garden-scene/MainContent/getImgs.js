// ? async-functions / mock-
const mockGardenSpecialtyImgs = {
  "status": "Success",
  "msg": "查询成功",
  "code": 0,
  "data": {
    "total_page": 2,
    "current_page": 1,
    "garden_specialty_albums": [{
        "src": "http://t.static.langlangyun.com/GardenMien/68f029fbb5fb3778be941eb5ce05bf04?imageView2/1/w/238/h/196",
        "desc": "henyihan"
      },
      {
        "src": "http://t.static.langlangyun.com/GardenMien/e8bd7e06f6c2986dda487bf35c1b263c?imageView2/1/w/238/h/196",
        "desc": "taibangle"
      },
      {
        "src": "http://t.static.langlangyun.com/GardenMien/2ebc930f667961f198be51b7050ab9fa?imageView2/1/w/238/h/196",
        "desc": "dacuole"
      },
      {
        "src": "http://t.static.langlangyun.com/GardenMien/1ee9010cd87dcfa8bd96fc5cd9ebf477?imageView2/1/w/238/h/196",
        "desc": "洗刷室"
      },
      {
        "src": "http://t.static.langlangyun.com/GardenMien/c10af88a31ba50b0e4505adb0e84e597?imageView2/1/w/238/h/196",
        "desc": "卫生间"
      },
      {
        "src": "http://t.static.langlangyun.com/GardenMien/965c026210a064984518e8469a2fc7e2?imageView2/1/w/238/h/196",
        "desc": "水族箱"
      },
      {
        "src": "http://t.static.langlangyun.com/GardenMien/033a32bdf42a655789d04a0a28f65676?imageView2/1/w/238/h/196",
        "desc": "沙池"
      },
      {
        "src": "http://t.static.langlangyun.com/GardenMien/60cd92606d9ce46bd8fe377799b40d45?imageView2/1/w/238/h/196",
        "desc": "科技馆"
      }
    ]
  }
};

export default {
  data() {
    return {
      gsImgList: [],
      currentPage: 0,
      totalPage: 0
    }
  },
  methods: {
    getGardenSpecialtyImgs() {
      // ? 发送请求
      setTimeout(() => {
        const result = mockGardenSpecialtyImgs
        if (result.status === 'Success' && result.data) {
          const dataSource = result.data
          if (dataSource.total_page) {
            this.totalPage = dataSource.total_page
          }
          if (dataSource.current_page) {
            this.currentPage = dataSource.current_page
          }
          if (dataSource.garden_specialty_albums) {
            const albumSource = dataSource.garden_specialty_albums
            albumSource.map((item) => {
              this.gsImgList.push({
                src: item.src,
                name: item.desc,
                isChecked: false
              })
            })
          }
        }
      }, 380);
    }
  },
  created() {
    this.getGardenSpecialtyImgs()
  }
}