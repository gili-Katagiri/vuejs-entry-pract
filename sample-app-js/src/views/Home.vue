<template>
  <v-row align="center" justify="center">
    <v-col class="text-center" cols="12" md="6">
      <v-row class="py-12" align="center" justify="center">
        <span class="font-weight-thin title" v-text="`${today.year}`"></span>
        <span
          class="pl-2 display-1"
          v-text="`${today.month}/${today.day}`"
        ></span>
        <v-chip
          class="ml-2 pt-0 title"
          color="pink"
          text-color="white"
          v-text="displayWeekday"
        ></v-chip>
      </v-row>
      <div v-for="(event, index) in filteredEvents" :key="index">
        <v-chip
          class="mt-2"
          :color="getEventColor(event)"
          text-color="white"
          label
          v-text="event.name"
        ></v-chip>
      </div>
      <v-divider class="my-4"></v-divider>
      <v-timeline v-if="displayTimeline" class="mb-12">
        <v-timeline-item
          v-for="(event, index) in filteredEventsHasTime"
          :key="index"
          class="text-left"
          right
          :color="getEventColor(event)"
        >
          <template v-slot:opposite>
            <span v-text="event.startTime"></span>
          </template>
          <span class="pl-4" v-text="event.name"></span>
        </v-timeline-item>
      </v-timeline>
      <v-row align="center" justify="center">
        <v-switch
          v-for="(sharedUser, index) in sharedUsers"
          :key="index"
          v-model="sharedUser.display"
          class="ml-4 pt-0"
          :color="sharedUser.themeColor"
          :label="sharedUser.nickname"
          hide-details
        ></v-switch>
      </v-row>
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
import { parseDate } from 'vuetify/lib/components/VCalendar/util/timestamp';
import { todayCalendarEventMockData } from '@/store/calendar-event';
import { sharedUserStore, getThemeColor } from '@/store/shared-user';

export default defineComponent({
  setup() {
    const state = reactive({
      today: parseDate(new Date()),
      sharedUsers: sharedUserStore.sharedUsers,
      displayWeekday: computed(() => {
        return ['日', '月', '火', '水', '木', '金', '土'][state.today.weekday];
      }),

      filteredEvents: computed(() => {
        const displayUserIds = state.sharedUsers
          .filter(user => user.display)
          .map(user => user.userId);

        return todayCalendarEventMockData.filter(
          event => displayUserIds.includes(event.userId) && !event.startTime,
        );
      }),

      filteredEventsHasTime: computed(() => {
        const displayUserIds = state.sharedUsers
          .filter(user => user.display)
          .map(user => user.userId);

        return todayCalendarEventMockData.filter(
          event => displayUserIds.includes(event.userId) && event.startTime,
        );
      }),

      displayTimeline: computed(() => {
        return state.filteredEventsHasTime.length > 0;
      }),
    });

    const getEventColor = event => {
      if (!event) {
        return;
      }

      return getThemeColor(event.userId);
    };

    return {
      ...toRefs(state),
      getEventColor,
    };
  },
  //  setup(prop, context) {
  //    const calendar = () => {
  //      context.root.$router.push(
  //        'calendar/month',
  //        () => {},
  //        () => {},
  //      );
  //    };
  //    const profile = () => {
  //      context.root.$router.push(
  //        'profile',
  //        () => {},
  //        () => {},
  //      );
  //    };
  //    const share = () => {
  //      context.root.$router.push(
  //        'share',
  //        () => {},
  //        () => {},
  //      );
  //    };
  //
  //    return {
  //      calendar,
  //      profile,
  //      share,
  //    };
  //  },
});
</script>
