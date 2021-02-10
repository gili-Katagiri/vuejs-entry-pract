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
          <ValidationObserver v-slot="{ invalid }">
            <ValidationProvider
              v-slot="{ errors }"
              name="UserName"
              :rules="validationRules.userName"
            >
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-text-field
                      v-model="newUserName"
                      label="UserName*"
                      :error-conut="Number.MAX_VALUE"
                      :error-messages="errors"
                    ></v-text-field>
                  </v-row>
                </v-container>
              </v-card-text>
            </ValidationProvider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeEditUserNameDialog"
                >Cancel</v-btn
              >
              <v-btn
                color="blue darken-1"
                text
                :disabled="invalid"
                @click="saveUserName"
                >Save</v-btn
              >
            </v-card-actions>
          </ValidationObserver>
        </v-card>
      </v-dialog>
      <v-text-field
        v-model="profile.nickname"
        class="mt-4"
        readonly
        label="Nickname*"
        append-outer-icon="edit"
        @click:append-outer.stop="editNickname"
      ></v-text-field>
      <v-dialog
        v-model="isOpenEditNicknameDialog"
        max-width="600"
        open-on-hover
      >
        <v-card>
          <ValidationObserver v-slot="{ invalid }">
            <ValidationProvider
              v-slot="{ errors }"
              name="Nickname"
              :rules="validationRules.nickname"
            >
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-text-field
                      v-model="newNickname"
                      label="Nickname*"
                      :error-count="Number.MAX_VALUE"
                      :error-messages="errors"
                    ></v-text-field>
                  </v-row>
                </v-container>
              </v-card-text>
            </ValidationProvider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeEditNicknameDialog"
                >Cancel</v-btn
              >
              <v-btn
                color="blue darken-1"
                text
                :disabled="invalid"
                @click="saveNickname"
                >Save</v-btn
              >
            </v-card-actions>
          </ValidationObserver>
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
import {
  defineComponent,
  reactive,
  toRefs,
  computed,
} from '@vue/composition-api';
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
      newNickname: null,
      newThemeColor: profileStore.profile.themeColor,
      isOpenEditUserNameDialog: false,
      isOpenEditNicknameDialog: false,
      validationRules: computed(() => {
        return {
          userName: {
            required: true,
            userNameAllowedCharacters: true,
            max: 15,
          },
          nickname: {
            required: true,
            max: 15,
          },
        };
      }),
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

    const saveNickname = () => {
      if (state.newNickname) {
        updateNickname(state.newNickname);
      }
      state.isOpenEditNicknameDialog = false;
    };

    const editUserName = () => {
      state.newUserName = state.profile.userName;
      state.isOpenEditUserNameDialog = true;
    };

    const editNickname = () => {
      state.newNickname = state.profile.nickname;
      state.isOpenEditNicknameDialog = true;
    };

    const closeEditUserNameDialog = () => {
      state.isOpenEditUserNameDialog = false;
    };

    const closeEditNicknameDialog = () => {
      state.isOpenEditNicknameDialog = false;
    };

    const saveFileContent = () => {
      console.log('SaveFileContent');
    };

    return {
      ...toRefs(state),
      saveThemeColor,
      saveUserName,
      saveNickname,
      editUserName,
      editNickname,
      closeEditUserNameDialog,
      closeEditNicknameDialog,
      saveFileContent,
    };
  },
});
</script>
