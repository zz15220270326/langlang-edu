<template>
  <div class="write-cookbook-menu">
    <div class="header">规划食谱</div>
    <div class="body" v-if="dataList.length > 0">
      <Table border :columns="titleList" :data="dataList">
        <template slot-scope="{ row, index }" slot="type">
          <Checkbox
            v-model="row.type.isChecked"
            @on-change="handleCheckItem($event, index)"
          >
            {{ row.name }}
          </Checkbox>
        </template>
        <template slot-scope="{ row, index }" slot="food">
          <List class="input-content" v-if="row.food.length > 0">
            <ListItem v-for="(item, key) in row.food" :key="key">
              <div class="new-item">
                <!-- :show-word-limit="true" -->
                <Input
                  placeholder="菜肴名称"
                  maxlength="16"
                  :value="item"
                  :disabled="!row.type.isChecked"
                  @on-blur="handleItemInput($event, index, key)"
                />
                <Button
                  :disabled="key === 0"
                  @click.native="deleteItem(index, key)"
                  type="error"
                >
                  删除
                </Button>
              </div>
            </ListItem>
          </List>
          <Button type="info" @click.native="addContentItem(index)">
            添加菜肴种类
          </Button>
        </template>
      </Table>
    </div>
  </div>
</template>

<script>
import './addContent.less';
// ? typeData
import { editContent, getMenuNameByKey, getDayKey } from '../../myUtils';

export default {
  name: 'AddContent',
  data: () => ({
    titleList: [
      {
        title: '食谱类型',
        slot: 'type',
        align: 'center',
        width: 250
      },
      {
        title: '菜肴/人(克)',
        slot: 'food',
        align: 'center',
        width: 420
      }
    ],
    // ? 动态渲染dataList
    dataList: [],
    // ? 要编辑的内容
    editContent: {},
    dayIndex: 0
  }),
  computed: {
    currentContent() {
      const itemContent = this.editContent[getDayKey(this.dayIndex)];
      return itemContent;
    }
  },
  methods: {
    initEditContent() {
      this.$bus.$emit('initAddMenu');
      this.$bus.$emit('initSelectDay');
      this.editContent = JSON.parse(JSON.stringify(editContent));
      this.getDataByIdx();
    },
    getDataByIdx() {
      Object.keys(this.editContent).map((key1, index1) => {
        if (index1 === this.dayIndex) {
          this.dataList = [];
          Object.keys(this.editContent[key1]).map(key2 => {
            this.dataList.push({
              key: key2,
              name: getMenuNameByKey(key2),
              food: this.editContent[key1][key2].food,
              type: {
                // this.editContent[key1][key2].food
                isChecked: true
              }
            });
          });
        }
      });
    },
    getTableByDayIdx() {
      this.$bus.$on('changeMenuWeekDay', dayIndex => {
        this.dayIndex = dayIndex;
        this.getDataByIdx();
      });
    },
    addContentItem(itemIdx) {
      const { food } = this.getFoodByData(itemIdx);
      food.push('');
      this.setEditContent(itemIdx, food);
      this.setDataList(itemIdx, food);
      this.$emit('emitContent', JSON.stringify(this.editContent));
    },
    deleteItem(itemIdx, inputIndex) {
      const { food } = this.getFoodByData(itemIdx);
      food.splice(inputIndex, 1);
      this.setEditContent(itemIdx, food);
      this.setDataList(itemIdx, food);
      this.$emit('emitContent', JSON.stringify(this.editContent));
    },
    handleItemInput(event, itemIdx, inputIdx) {
      const { value } = event.target;
      const food = this.getFoodByContent(itemIdx);
      food[inputIdx] = value;

      this.setDataList(itemIdx, food);
      this.setEditContent(itemIdx, food);
      this.$emit('emitContent', JSON.stringify(this.editContent));
    },
    getFoodByData(itemIdx) {
      return JSON.parse(JSON.stringify(this.dataList[itemIdx]));
    },
    getFoodByContent(itemIdx) {
      return JSON.parse(
        JSON.stringify(
          this.currentContent[Object.keys(this.currentContent)[itemIdx]].food
        )
      );
    },
    setEditContent(itemIdx, food) {
      Object.assign(
        this.currentContent[Object.keys(this.currentContent)[itemIdx]],
        { food }
      );
    },
    setDataList(itemIdx, food) {
      Object.assign(this.dataList[itemIdx], { food });
    },
    handleCheckItem(isChecked, itemIdx) {
      console.log(isChecked, this.dataList[itemIdx], this.currentContent);
      // ? const deleteKey = JSON.parse(JSON.stringify(key))
    },
    initAMContent() {
      this.$bus.$on('initAMContent', () => this.initEditContent());
    },
    getEditContent() {
      this.$bus.$on('getEditContent', params => {
        if (params.id && params.id > 0) {
          const { content } = params;
          this.editContent = content;
          this.getDataByIdx();
        }
      });
    }
  },
  created() {
    this.initEditContent();
  },
  mounted() {
    this.getTableByDayIdx();
    this.initAMContent();
    this.getEditContent();
  }
};
</script>
