// ? async-functions / mock-data
// ? my-utils
import {
  noonList
} from './util'

export default {
  data() {
    return {
      // ? table-data
      weekIndex: 0,
      noonIndex: 0,
      titleList: [{
          title: '计划时间',
          key: 'planTime',
          align: 'center'
        },
        {
          title: '计划类型',
          slot: 'planType',
          align: 'center'
        },
        {
          title: '计划内容',
          slot: 'planContent',
          align: 'center'
        },
      ],
      planSettings: [{
          tag: '周一',
          type: 'primary',
          noonList
        },
        {
          tag: '周二',
          type: 'info',
          noonList
        },
        {
          tag: '周三',
          type: 'info',
          noonList
        },
        {
          tag: '周四',
          type: 'info',
          noonList
        },
        {
          tag: '周五',
          type: 'info',
          noonList
        },
      ],
    }
  },
  props: {},
  methods: {
    // ? content functions
    selectWorkDay(currentIndex) {
      this.planSettings.forEach((item, index) => {
        if (index === currentIndex) {
          item.type = 'primary'
        } else {
          item.type = 'info'
        }
      })
    },
    selectNoon(index1, index2) {
      this.planSettings[index1].noonList.forEach((item, index) => {
        if (index === index2) {
          item.type = 'primary'
        } else {
          item.type = 'default'
        }
      })
    },
    selectPlan(items, index1, index2) {
      const {
        currentItem,
        rowIndex
      } = items
      if (index2 === 0) {
        this.planSettings.map((item1, key1) => {
          if (key1 === index1) {
            item1.list1.map((item2, key2) => {
              if (key2 === rowIndex) {
                item2.planType['planTypeTitle'] = currentItem
                // console.log(item2.planType['planTypeTitle'])
                // console.log(this.planSettings[3].list1[0], 3)
              }
            })
          }
        })
      }
      if (index2 === 1) {
        this.planSettings[index1].list2[rowIndex].planType.planTitle = currentItem
      }
    },
    getInput(value, rowIndex, weekIndex, noonIndex) {
      // console.log(value, rowIndex, weekIndex, noonIndex)
      if (noonIndex === 0) {
        this.planSettings[weekIndex].list1[rowIndex].inputContent = value

      }
      if (noonIndex === 1) {
        this.planSettings[weekIndex].list2[rowIndex].inputContent = value
      }
    },
  },
  created() {}
}