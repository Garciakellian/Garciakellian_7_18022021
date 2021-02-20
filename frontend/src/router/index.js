import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '../views/home.vue'
import acceuil from '../views/acceuil.vue'
import connexion from '../views/connexion.vue'
import inscription from '../views/inscription.vue'
import dashadmin from '../views/dashadmin.vue'
import mur from '../views/mur.vue'
import res from '../views/res.vue'
import reponses from '../views/reponses.vue'
import viewresp from '../views/viewresp.vue'
import compte from '../views/compte.vue'
import updateuser from '../views/updateuser.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: home
  },
  {
    path: '/acceuil',
    name: 'acceuil',
    component: acceuil
  },
  {
    path: '/connexion',
    name: 'connexion',
    component: connexion
  },
  {
    path: '/inscription',
    name: 'inscription',
    component: inscription
  },
  {
    path: '/dashadmin',
    name: 'dashadmin',
    component: dashadmin
  },
  {
    path: '/mur',
    name: 'mur',
    component: mur
  },
  {
    path: '/res',
    name: 'res',
    component: res
  },
  {
    path: '/reponses',
    name: 'reponses',
    component: reponses
  },
  {
    path: '/viewresp',
    name: 'viewresp',
    component: viewresp
  },
  {
    path: '/compte',
    name: 'compte',
    component: compte

  },
  {
    path: '/updateuser',
    name: 'updateuser',
    component: updateuser

  },


]

const router = new VueRouter({
  routes
})

export default router
