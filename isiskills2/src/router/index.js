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
  
  
  },
  {
    path: '/criarprofessor',
    name: 'criarProfessor',
    component: ()=> import('../components/criarProfessor.vue'),
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
    path: '/criarcurso',
    name: 'criarCurso',
    component: ()=> import('../components/criarCurso.vue'),
    beforeEnter: (to, from, next) =>{
      if(store.state.logado){
        if(store.state.user.tipo==2){
          next()
        }
        else{
          next('/perfil')
        }
      }
      else{
        next('/')
      }

    }
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
