import Vue from 'vue';
import VueRouter from 'vue-router';

import HomeComponent from '@/views/Home.vue';
import CalendarComponent from '@/views/Calendar.vue';
import ProfileComponent from '@/views/Profile.vue';
import ShareComponent from '@/views/Share.vue';
import SignInComponent from '@/views/SignIn.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeComponent,
    meta: {
      title: 'home',
    },
  },
  {
    path: '/calendar/:type',
    name: 'calendar',
    component: CalendarComponent,
    props: true,
    meta: {
      title: 'home',
    },
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfileComponent,
    meta: {
      title: 'profile',
    },
  },
  {
    path: '/share',
    name: 'share',
    component: ShareComponent,
    meta: {
      title: 'share',
    },
  },
  {
    path: '/signin',
    name: 'signin',
    component: SignInComponent,
    meta: {
      title: 'signin',
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.afterEach(to => {
  if (!to.meta.title) {
    return;
  }

  document.title = to.meta.title;
});

export default router;
