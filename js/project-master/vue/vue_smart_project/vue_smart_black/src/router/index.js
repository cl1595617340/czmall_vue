import Vue from 'vue'
import Router from 'vue-router'
import "../assets/css/reset.css"
import "../assets/css/header.css"
import  Shop from "../views/shop/shop"
import Item from "../views/item"
import Cart from "../views/cart"
import Checkout from "../views/checkout"
import Payment from  "../views/Payment"
import Account from "../views/account"
import Order from '../views/account/order'
import Address from '../views/account/address'

import homes from '../views/homes'

import QueryGoods from '../views/shop/queryGoods'
import ShopInfo from '../views/shop/shopInfo'
import GoodsParameter from '../views/shop/goodsParameter'
import BuyGoods from '../views/shop/buyGoods'

import  shopsb from "../views/shopsb"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name:"homes",
      component: homes
    },
    {
      path: '/Shop',
      name:"Shop",
      component: Shop,
    },
    {
      path: '/shopsb',
      name:"shopsb",
      component: shopsb,
    },
    {
      path: '/queryGoods',
      name:"QueryGoods",
      component: QueryGoods,
    },
    {
      path: '/ShopInfo',
      name:"ShopInfo",
      component: ShopInfo,
    },
    {
      path: '/GoodsParameter',
      name:"GoodsParameter",
      component: GoodsParameter,
    },
    {
      path: '/BuyGoods',
      name:"BuyGoods",
      component: BuyGoods,
    },

    {
      path: '/item',
      name:"Item",
      component: Item
    },
    {
      path: '/cart',
      name:"Cart",
      component: Cart
    },
    {
      path: '/checkout',
      name:"Checkout",
      component: Checkout
    },
    {
      path: '/payment',
      name:"Payment",
      component: Payment
    },
    {
      path: '/account',
      component: Account,
      children: [
        {
          path: '',
          name: 'Account',
          component: Order
        },
        {
          path: '/address',
          name: 'Address',
          component: Address
        }
      ]
    }
  ]
})
