<template>
  <v-footer v-if="signInUser" class="pa-0" app>
    <v-bottom-navigation grow dark>
      <v-btn class="my-auto" height="56" @click="routerPush('/')">
        <span>home</span>
        <v-icon large>home</v-icon>
      </v-btn>
      <v-btn class="my-auto" height="56" @click="routerPush('/calendar/day')">
        <span>daily</span>
        <v-icon large>view_day</v-icon>
      </v-btn>
      <v-btn class="my-auto" height="56" @click="routerPush('/calendar/week')">
        <span>weekly</span>
        <v-icon large>view_week</v-icon>
      </v-btn>
      <v-btn class="my-auto" height="56" @click="routerPush('/calendar/month')">
        <span>monthly</span>
        <v-icon large>event_note</v-icon>
      </v-btn>
      <v-menu top open-on-hover offset-y>
        <template v-slot:activator="{ on }">
          <div class="py-1 px-1 text-center" :class="$style.profile" v-on="on">
            <v-avatar :color="signInUser.themeColor">
              <span class="white--text body-2" v-text="signInUser.nickname" />
            </v-avatar>
          </div>
        </template>
        <v-card>
          <v-list>
            <v-list-item
              v-for="(item, index) in items"
              :key="index"
              link
              @click="handleMethod(item.methodName)"
            >
              <v-list-item-icon>
                <v-icon v-text="item.icon" />
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="item.title"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <v-card-actions>
            <v-btn block @click="signOut">SignOut</v-btn>
          </v-card-actions>
        </v-card>
      </v-menu>
    </v-bottom-navigation>
  </v-footer>
</template>

<style lang="scss" module>
.profile {
  cursor: pointer;
  width: 168px;
}
</style>

<script>
import {
  defineComponent,
  reactive,
  toRefs,
  computed,
} from '@vue/composition-api';
import { profileStore } from '@/store/profiles';

export default defineComponent({
  setup(prop, context) {
    const state = reactive({
      items: [
        {
          title: 'Profile',
          icon: 'account_circle',
          methodName: 'profile',
        },
        { title: 'Share', icon: 'share', method: 'share' },
      ],
      signInUser: computed(() => {
        return profileStore.profile;
      }),
    });

    const handleMethod = methodName => {
      eval(methodName)();
    };

    const routerPush = path => {
      context.root.$router.push(
        path,
        () => {},
        () => {},
      );
    };
    const profile = () => {
      routerPush('/profile');
    };
    const share = () => {
      routerPush('/share');
    };
    const signOut = () => {
      profileStore.profile = null;
      routerPush('/sign-in');
    };

    return {
      ...toRefs(state),
      handleMethod,
      profile,
      share,
      signOut,
      routerPush,
    };
  },
});
</script>
