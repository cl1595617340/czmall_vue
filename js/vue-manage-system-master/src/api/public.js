import axios from 'axios'
//1.引入vue
import Vue from 'vue';
//2.新创建一个vue实例
let v = new Vue();

axios.defaults.timeout = 10000
axios.defaults.headers.post['Content-Type'] = 'application/x-www=form-urlencoded'



export default {
  fetchGet (url, params = {}) {
    return new Promise((resolve, reject) => {
      axios.get(url, params).then(res => {
        resolve(res.data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  fetchPost (url, params = {}) {
    /*alert(url)*/
    let roleName =  localStorage.getItem('ms_roleName')
    if (roleName=="游客") {
      /*设置只能查看的权限,其他增删改不开放*/
      if (url=="/admin/getAdmin"
          ||url=="/admin/generalize/generalize/getAllgeneralize"
          ||url=="/admin/generalize/generalize/getGeneralizeById"
          ||url=="/admin/type/goodstype/getGoodsType"
          ||url=="/admin/goods/goods/list"
          ||url=="/admin/type/goodstype/getGoodsType"
          ||url=="/admin/member/member/getmemberlist"
          ||url=="/admin/order/order/getorderlist"
          /*解决分类编辑进入看都不行的问题*/
          ||url=="/admin/type/goodstype/getGoodstype2By3"
          ||url=="/admin/type/goodstype/getGoodstypeBy2"
          ||url=="/admin/type/goodstype/getGoodsType2Byid"
      ){
        return new Promise((resolve, reject) => {
          axios.post(url, params).then(res => {
            resolve(res.data)
          }).catch(error => {
            reject(error)
          })
        })
      } else {
        v.$notify.error({
          title: '错误',
          message: '非常抱歉,您没有权限进行此操作,如有疑问请加微信A17607100469联系作者.'
        });
      }


    }else {
      return new Promise((resolve, reject) => {
        axios.post(url, params).then(res => {
          resolve(res.data)
        }).catch(error => {
          reject(error)
        })
      })
    }

  },

 /* /!*想后台发送的请求*!/
  returnPromise(url, params){
    return new Promise((resolve, reject) => {
      axios.post(url, params).then(res => {
        resolve(res.data)
      }).catch(error => {
        reject(error)
      })
    })
  }*/

}
