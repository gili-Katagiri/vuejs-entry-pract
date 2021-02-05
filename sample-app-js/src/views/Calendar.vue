<template>
  <div>Calendar [{{ type }}]</div>
</template>

<script>
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  props: {
    type: {
      require: true,
      validator: value => {
        return ['month', 'week', 'day'].includes(value);
      },
    },
  },
});
</script>
