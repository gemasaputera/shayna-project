import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Product from '../views/Product.vue';
import ShoppingCart from '../views/ShoppingCart.vue';
import Success from '../views/Success.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/product/:id',
    props:true,
    name: 'Product',
    component: Product
  },
  {
    path: '/shopping-cart',
    props:true,
    name: 'Product',
    component: ShoppingCart
  },
  {
    path: '/success',
    name: 'SuccessPayment',
    component: Success
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
];

const router = new VueRouter({
  routes
});

export default router;
