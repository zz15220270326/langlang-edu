import Vue from 'vue';

const roleListBus = new Vue();
const classListBus = new Vue();
const isEditBus = new Vue();

export {
  roleListBus,
  classListBus,
  isEditBus
};

const eventBus = new Vue();

export default eventBus;