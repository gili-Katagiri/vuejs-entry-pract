import '@/plugins/composition-api';
import { reactive } from '@vue/composition-api';
import axios from 'axios';
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

export const signInAsync = async () => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axios.get('bpi/currentprice.json');
    console.log(response);
    //profileStore.profile = response.data;
  } catch (error) {
    throw error;
  }
};
