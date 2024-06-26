import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/Login.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/introduction',
    name: 'introduction',
    component: () => import('../views/introduction.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/home/index.vue'),
    children: [{
      path: 'createChart',
      name: "createChart",
      component: () => import('../views/home/createChart.vue'),
    }, {
      path: 'myCharts',
      name: "myCharts",
      component: () => import('../views/home/myCharts.vue'),
    }, {
      path: 'detail',
      name: 'detail',
      component: () => import('../views/home/detail.vue')
    }, {
      path: 'edit',
      name: 'edit',
      component: () => import('../views/home/edit.vue')
    }, 
    {
      path: 'prediction',
      name: 'prediction',
      component: ()=> import('../views/home/prediction.vue')
    },
    {
      path: '',
      redirect: 'createChart'
    }]
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

// function getSessionFromCookie () {
//   const cookies = document.cookie.split(';').filter(Boolean);
//   console.log(cookies);
//   return cookies.find(cookie => (cookie.startsWith('session') || '').split('=')[1])
// }

// router.beforeEach((to, from, next) => {
//   const session = getSessionFromCookie();
//   if (session){
//     localStorage.setItem('session', session)
//     next()
//   } else if (!session && !to.path.startsWith('/login')) {
//     next('/login')
//   } else {
//     next()
//   }
// })


export default router;
