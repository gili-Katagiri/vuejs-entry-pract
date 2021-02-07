<template>
  <v-row align="center" justify="center">
    <v-col class="text-center" cols="12" md="4">
      <p class="display-1 py-12">Share</p>
      <v-card>
        <v-card-text>
          <v-text-field
            v-model="partOfNickname"
            clearable
            float
            hide-details
            prepend-inner-icon="search"
            label="Nickname"
          ></v-text-field>
        </v-card-text>
        <v-fade-transition group>
          <v-list-item v-for="(user, index) in filteredUsers" :key="index">
            <v-list-item-icon>
              <v-avatar :color="user.themeColor" size="48"
                ><span class="white--text body-2" v-text="user.nickname"></span
              ></v-avatar>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title
                class="text-left"
                v-text="user.nickname"
              ></v-list-item-title>
              <v-list-item-subtitle
                class="text-left"
                v-text="user.userName"
              ></v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn color="primary" @click="share(user.userId)">Share</v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-fade-transition>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import {
  defineComponent,
  reactive,
  toRefs,
  computed,
} from '@vue/composition-api';
import { searchUsers } from '@/store/shared-user';

export default defineComponent({
  setup() {
    const state = reactive({
      partOfNickname: null,
      filteredUsers: computed(() => {
        if (!state.partOfNickname) {
          return null;
        }
        return searchUsers(state.partOfNickname);
      }),
    });

    const share = userId => {
      console.log(userId);
    };

    return {
      ...toRefs(state),
      share,
    };
  },
});
</script>
