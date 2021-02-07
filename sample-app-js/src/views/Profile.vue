<template>
  <v-row align="center" justify="center">
    <v-col class="text-center" cols="12" md="4">
      <p class="display-1 py-12">
        Profile
      </p>
      <v-row>
        <v-col cols="12" md="4">
          <v-avatar :color="profile.themeColor" size="72">
            <span class="white--text body-2" v-text="profile.nickname"></span>
          </v-avatar>
        </v-col>
        <v-col>
          <v-file-input
            accept="image/png, image/jpeg, image/bmp"
            prepend-icon="photo_camera"
            label="Avatar"
            @change="saveFileContent"
          ></v-file-input>
        </v-col>
      </v-row>
      <label class="v-label theme--light">Theme Color*</label>
      <v-color-picker
        v-model="newThemeColor"
        class="mx-auto md-4 mt-2"
        hide-canvas
        show-swatches
        swatches-max-height="120px"
      >
      </v-color-picker>
      <v-btn small rounded color="primary" @click="saveThemeColor">
        Decision your Theme Color
      </v-btn>
      <v-text-field
        v-model="profile.userName"
        class="mt-4"
        readonly
        label="UserName*"
        append-outer-icon="edit"
        @click:append-outer.stop="editUserName"
      ></v-text-field>
      <v-dialog
        v-model="isOpenEditUserNameDialog"
        max-width="600"
        open-on-hover
      >
        <v-card>
          <v-card-text>
            <v-container>
              <v-row>
                <v-text-field
                  v-model="newUserName"
                  label="UserName*"
                ></v-text-field>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="closeEditUserNameDialog"
              >Cancel</v-btn
            >
            <v-btn color="blue darken-1" text @click="saveUserName">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-text-field
        v-model="profile.nickname"
        class="mt-4"
        readonly
        label="NickName*"
        append-outer-icon="edit"
        @click:append-outer.stop="editNickName"
      ></v-text-field>
      <v-dialog
        v-model="isOpenEditNickNameDialog"
        max-width="600"
        open-on-hover
      >
        <v-card>
          <v-card-text>
            <v-container>
              <v-row>
                <v-text-field
                  v-model="newNickName"
                  label="NickName*"
                ></v-text-field>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="closeEditNickNameDialog"
              >Cancel</v-btn
            >
            <v-btn color="blue darken-1" text @click="saveNickName">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-text-field
        v-model="profile.mailAddress"
        readonly
        label="MailAddress"
      ></v-text-field>
      <small class="float-left">Show Necessary Fields</small>
    </v-col>
  </v-row>
</template>

<script>
import { defineComponent, reactive, toRefs } from '@vue/composition-api';
import {
  profileStore,
  updateUserName,
  updateNickname,
  updateThemeColor,
} from '@/store/profiles';

export default defineComponent({
  setup: () => {
    const state = reactive({
      profile: profileStore.profile,
      newUserName: null,
      newNickName: null,
      newThemeColor: profileStore.profile.themeColor,
      isOpenEditUserNameDialog: false,
      isOpenEditNickNameDialog: false,
    });

    const saveThemeColor = () => {
      updateThemeColor(state.newThemeColor);
    };

    const saveUserName = () => {
      if (state.newUserName) {
        updateUserName(state.newUserName);
      }
      state.isOpenEditUserNameDialog = false;
    };

    const saveNickName = () => {
      if (state.newNickName) {
        updateNickname(state.newNickName);
      }
      state.isOpenEditNickNameDialog = false;
    };

    const editUserName = () => {
      state.newUserName = state.profile.userName;
      state.isOpenEditUserNameDialog = true;
    };

    const editNickName = () => {
      state.newNickName = state.profile.nickname;
      state.isOpenEditNickNameDialog = true;
    };

    const closeEditUserNameDialog = () => {
      state.isOpenEditUserNameDialog = false;
    };

    const closeEditNickNameDialog = () => {
      state.isOpenEditNickNameDialog = false;
    };

    const saveFileContent = () => {
      console.log('SaveFileContent');
    };

    return {
      ...toRefs(state),
      saveThemeColor,
      saveUserName,
      saveNickName,
      editUserName,
      editNickName,
      closeEditUserNameDialog,
      closeEditNickNameDialog,
      saveFileContent,
    };
  },
});
</script>
