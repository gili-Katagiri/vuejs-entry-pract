import '@/plugins/composition-api';
import { reactive } from '@vue/composition-api';
import { update } from '@/store/shared-user';

export const profileStore = reactive({ profile: null });

export const updateUserName = userName => {
  profileStore.profile.userName = userName;
  update(profileStore.profile);
};

export const updateNickname = nickname => {
  profileStore.profile.nickname = nickname;
  update(profileStore.profile);
};

export const updateThemeColor = themeColor => {
  profileStore.profile.themeColor = themeColor;
  update(profileStore.profile);
};
