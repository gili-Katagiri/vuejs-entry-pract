<template>
  <div>
    <div :class="$style.inputContainer">
      <form :class="$style.inputArea" action="">
        <p>User</p>
        <label for="">NickName</label>
        <input v-model="nickname" type="" />
        <label for="">Emai</label>
        <input v-model="email" type="" />
      </form>
      <div :class="$style.previewArea">
        <p>Preview</p>
        <label for="">NickName</label>
        <input type="" :value="nickname" readonly />
        <label for="">Email</label>
        <input type="" :value="email" readonly />
      </div>
      <div :class="$style.buttonArea">
        <button @click="saveUser">Register</button>
      </div>
    </div>
    <div>
      <div :class="$style.filterArea">
        <label for="">Find by NickName</label>
        <input v-model="nicknameFilter" type="" />
      </div>
      <table>
        <thead>
          <th>NickName</th>
          <th>Email</th>
        </thead>
        <tbody>
          <tr
            is="user-row"
            v-for="(user, index) in filterdUsers"
            :key="index"
            :user="user"
          ></tr>
        </tbody>
      </table>
      <div :class="$style.buttonWrapper">
        <button @click="displayUsers">Print All Users</button>
      </div>
    </div>
  </div>
</template>

<style module lang="scss">
.inputContainer {
  display: grid;
  grid-gap: 10px;
  grid-template-areas:
    "inputArea previewArea"
    "buttonArea buttonArea";
  grid-template-rows: 200px 50px;
  grid-template-columns: 300px 300px;
}
.inputArea {
  display: grid;
  grid-area: inputArea;
}
.previewArea {
  display: grid;
  grid-area: previewArea;
}
.buttonArea {
  display: grid;
  grid-area: buttonArea;
  align-items: center;
  justify-items: center;
}
.filterArea {
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 300px 300px;
}
table {
  border-collapse: collapse;
  margin-top: 10px;
  width: 610px;
}
th,
td {
  padding-left: 5px;
  width: 50%;
  word-break: break-all;
}
.buttonWrapper {
  align-items: center;
  justify-items: center;
  display: grid;
  height: 50px;
  width: 610px;
}
</style>

<script>
import {
  defineComponent,
  reactive,
  toRefs,
  computed
} from "@vue/composition-api";
import userRowComponent, { User } from "@/components/UserRow.vue";

export default defineComponent({
  components: {
    "user-row": userRowComponent
  },
  setup() {
    const state = reactive({
      users: [],
      nickname: "",
      email: "",
      nicknameFilter: "",
      filterdUsers: computed(() => {
        return state.users.filter(user =>
          user.nickname.includes(state.nicknameFilter)
        );
      })
    });

    const saveUser = () => {
      const user = new User(state.nickname, state.email);
      state.users.push(user);

      alert(
        "REGISTER--- NickName: " +
          state.nickname +
          " EMail: " +
          state.email +
          " ---"
      );
    };

    const displayUsers = () => {
      let message = "Registerd " + state.users.length + " persons.";
      for (const user of state.users) {
        message += "\n" + user.nickname;
      }
      alert(message);
    };

    return {
      ...toRefs(state),
      saveUser,
      displayUsers
    };
  }
});
</script>
