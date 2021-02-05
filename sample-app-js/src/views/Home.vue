<template>
  <div>
    <p>HomeDisplay</p>
    <p><router-link to="sign-in">SignIn</router-link></p>
    <p><button @click="calendar">Calendar</button></p>
    <p><button @click="profile">Profile</button></p>
    <p><button @click="share">Share</button></p>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  setup(prop, context) {
    const calendar = () => {
      context.root.$router.push(
        'calendar/month',
        () => {},
        () => {},
      );
    };
    const profile = () => {
      context.root.$router.push(
        'profile',
        () => {},
        () => {},
      );
    };
    const share = () => {
      context.root.$router.push(
        'share',
        () => {},
        () => {},
      );
    };

    return {
      calendar,
      profile,
      share,
    };
  },
});
</script>
