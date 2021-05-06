<template>
  <div class="garden-scene">
    <!-- <querymenu>
      <div slot="first" class="op1">
        <Button type="info" @click.native="handleSelectAll">
          {{ selectAllText }}
        </Button>
        <Button type="error" @click.native="deleteItems">删除</Button>
      </div>
      <div slot="second" class="op2">
        <Button type="warning">上传图片</Button>
      </div>
    </querymenu> -->
    <my-menu
      :selectAllText="selectAllText"
      @handleSelectAll="handleSelectAll"
      @deleteItems="deleteItems"
    />
    <my-content ref="childrenContent" @itemSelectChange="itemSelectChange" />
  </div>
</template>

<script>
// ? import components
import MyMenu from './MenuWrap';
import MyContent from './MainContent';

// ?? children

export default {
  name: 'Appearance',
  components: {
    // Querymenu,
    MyMenu,
    MyContent
  },
  data: () => ({
    selectAllText: '全选'
  }),
  methods: {
    // ? menus
    handleSelectAll() {
      const { gsImgList } = this.$refs.childrenContent._data;
      switch (this.selectAllText) {
        case '全选':
          gsImgList.forEach(item => (item.isChecked = true));
          this.selectAllText = '全部取消';
          break;
        case '全部取消':
          gsImgList.forEach(item => (item.isChecked = false));
          this.selectAllText = '全选';
          break;
      }
    },
    deleteItems() {
      let { gsImgList } = this.$refs.childrenContent._data;
      if (gsImgList.every(item => !item.isChecked)) {
        this.$Message.warning('请选择要批量删除的选项');
      } else {
        this.$Modal.confirm({
          title: '批量删除',
          content: '是否删除? 删除后数据无法恢复',
          onOk: () => {
            this.$Message.success('删除成功');
          },
          onCancel: () => {
            this.$Message.success('您取消了本次删除操作');
          }
        });
      }
    },
    // ? content-functions
    itemSelectChange(selectAll) {
      selectAll
        ? (this.selectAllText = '全部取消')
        : (this.selectAllText = '全选');
    }
  }
};
</script>
