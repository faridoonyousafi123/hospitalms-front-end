import Vue from 'vue'

import Router from 'vue-router'

import Login from './views/Login.vue'

import SignUp from './views/SignUp.vue'

Vue.use(Router)


const router = new Router({

     
  mode:'history',


    routes: [{

        path: '/login',
        component: Login

    }, {
        
        path: '/signup',
        component: SignUp

    },]

})

export default router;