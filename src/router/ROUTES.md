# 思路

``` JAVASCRIPT
// // ? 正常登录下
// if (from.path.indexOf('user') !== -1 && to.path.indexOf('user') !== -1) {
//   next()
//   return
// }
// // ? 特殊情况下
// // * 2. 判断是否登录 (cookie-token) -> (1.login 2.garden)
// /**
//  * @description 
//  * @正常情况用户登录到garden
//  * @正常情况用户已经登录自动跳转到garden
//  * @异常情况用户没有登录跳转到首页
//  * @异常情况用户登录了但是仍然跳转到user
//  */
// if (token) { // * 已经登录
//   const routes = formatGardenRoute()
//   store.dispatch('getRoutes', routes)
//   router.addRoutes[store.state.routes]
//   if (to.path.indexOf('user') !== -1) {
//     if (to.path.indexOf('garden') === -1) {
//       next('/garden')
//     } else next()
//   } else {
//     if (to.path.indexOf('garden') !== -1) {
//       next()
//     }
//   }
// } else { // * 还没有登录
//   if (to.path.indexOf('garden') !== -1) {
//     if (to.path.indexOf('user') === -1) {
//       next('/user/login')
//     } else next()
//   } else {
//     if (to.path.indexOf('user') !== -1) {
//       next()
//     }
//   }
// }
```
