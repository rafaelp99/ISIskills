import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import store from '@/store'

const routes = [
  
  {
    path: '/cursos',
    name: 'Home',
    component: Home,
    beforeEnter: (to, from, next) =>{
      if(store.state.logado){
        next()
      }
      else{
        next('/')
      }

    }

  },
  {
   path: '/cursos/:id',
   name: 'curso',
   props: true,
   component: () => import(/**/ '../components/Curso.vue'),
   beforeEnter: (to, from, next) =>{
    if(store.state.logado){
      next()
    }
    else{
      next('/')
    }

  }
  },
  {
    path: '/perfil',
    name: 'Perfil',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../components/Perfil.vue'),
    beforeEnter: (to, from, next) =>{
      if(store.state.logado){
        next()
      }
      else{
        next('/')
      }

    }
  },
  {
    path: '/',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../components/Login.vue'),
    beforeEnter: (to, from, next) =>{
      if(store.state.logado){
        next('/perfil')
      }
      else{
        next()
      }
  },
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


/*router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if(!this.$store.state.logado){
      next('/')
    }
   else {
     next()
  }
}
})*/
export default router
