import Vue from 'vue'

export function checkSelectAll(array = []) {
  if (array.findIndex(target => target.isChecked === false) !== -1) {
    return false
  } else return true
}

export function checkCancelAll(array = []) {
  if (array.findIndex(target => target.isChecked === true) === -1) {
    return true
  } else return false
}

export const currentClassBus = new Vue()