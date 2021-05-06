export default {
  bind(el, binding) {
    const oButton = el.getElementsByTagName('button')[0];
    initElStyles(oButton);
    oButton.addEventListener('click', () => switchSelectAll(oButton, binding), false);
  },
  update(el, binding) {
    const oButton = el.getElementsByTagName('button')[0];
    oButton.addEventListener('click', () => switchSelectAll(oButton, binding), false);
    checkTeacher(binding.value, oButton);
  }
};

function initElStyles(btn) {
  btn.innerText = '全部选择';
  btn.className = 'ivu-btn ivu-btn-info';

  btn.setAttribute('style', `
      position: absolute;
      margin: 0 0.5rem;
  `);
}

function switchSelectAll(btn, binding) {
  const { isSelectAll, set } = binding.value;
  switch (isSelectAll) {
    case true:
      btn.innerText = '全部选择';
      btn.className = 'ivu-btn ivu-btn-info';

      set['isSelectAll'] = false;
      break;
    case false:
      btn.innerText = '全部取消';
      btn.className = 'ivu-btn ivu-btn-warning';
      set['isSelectAll'] = true;
      break;
  }
}

function checkTeacher() {
  // { set, teacher, teacherList }
  // if (teacher.length === teacherList.length) {
  //   set['isSelectAll'] = true;
  // } else set['isSelectAll'] = false;
  // switch (isSelectAll) {
  //   case true:
  //     btn.innerText = '全部选择';
  //     btn.className = 'ivu-btn ivu-btn-info';
  //     break;
  //   case false:
  //     btn.innerText = '全部取消';
  //     btn.className = 'ivu-btn ivu-btn-warning';
  //     break;
  // }
}
