export default {
  data() {
    return {
      // ? header
      typeName: '',
    }
  },
  methods: {
    // ? header-functions
    getTypeName(typeName) {
      this.typeName = typeName
    },
    addToList() {
      if (this.typeName === '') {
        this.$Message.warning('添加失败, 类型名称不得为空')
      } else {
        let isSame = this.dataList.some(item => {
          if (item.name === this.typeName) {
            return true
          } else {
            return false
          }
        })
        if (isSame) {
          this.$Message.warning('内容重复, 请修改内容')
        } else {
          let newItem = {}
          newItem.name = this.typeName
          newItem.id = new Date().getTime()
          newItem.type = 'random'
          newItem.operations = [{
              tag: '编辑',
              type: 'primary'
            },
            {
              tag: '添加',
              type: 'info'
            }
          ]
          newItem.ableDelete = true
          this.dataList.push(newItem)
          this.$Message.success('添加成功')
        }
      }
    },
  },
  created() {}
}