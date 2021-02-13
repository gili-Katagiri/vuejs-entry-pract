import '@/plugins/composition-api';
import { reactive } from '@vue/composition-api';
import { update } from '@/store/shared-user';

export const profileMockData = {
  userId: '66006b29-727e-4ed8-a3c8-95d4438f66d4',
  userName: 'namihei',
  nickname: '波平',
  themeColor: '#4caf50',
  havAvatar: false,
  mailAddress: 'namihei@example.com',
};

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
