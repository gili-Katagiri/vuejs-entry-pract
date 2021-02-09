<template>
  <v-row class="fill-height">
    <v-col class="pt-0">
      <v-sheet height="64">
        <v-toolbar flat>
          <v-btn outlined class="mr-4" color="grey darken-2" @click="setToday"
            >Today</v-btn
          >
          <v-btn fab text small color="grey darken-2" @click="prev">
            <v-icon small>chevron_left</v-icon>
          </v-btn>
          <v-btn fab text small color="grey darken-2" @click="next">
            <v-icon small>chevron_right</v-icon>
          </v-btn>
          <v-toolbar-title v-text="title"></v-toolbar-title>
        </v-toolbar>
      </v-sheet>
      <v-sheet height="580">
        <v-calendar
          v-if="visible"
          ref="calendar"
          v-model="focus"
          color="primary"
          :events="filteredEvents"
          :event-color="getEventColor"
          :now="today"
          :type="type"
          :day-format="formatDay"
          :month-format="formatMonth"
          event-more-text="else {0}"
          @click:event="showEvent"
          @click:more="viewDay"
          @click:date="startAddEvent"
          @change="updateRange"
        ></v-calendar>
      </v-sheet>
      <v-sheet>
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
      </v-sheet>
      <v-menu
        v-model="isOpenEventMenu"
        :close-on-content-click="false"
        :activator="menuActivatorElement"
        bottom
        max-width="350"
        min-width="350"
      >
        <v-card v-if="selectedEvent" color="grey lighten-4" flat>
          <v-toolbar :color="getEventColor(selectedEvent)" dark>
            <v-toolbar-title v-text="selectedEvent.name"></v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn
              icon
              :disabled="isNotOwner(selectedEvent.userId)"
              @click.stop="startEditEvent"
            >
              <v-icon>edit</v-icon>
            </v-btn>
          </v-toolbar>
          <v-card-text>
            <p class="mb-0" v-text="`Start: ${selectedEvent.start}`"></p>
            <p v-text="formatEndDateTime"></p>
            <p :class="$style.memo" v-text="selectedEvent.memo"></p>
          </v-card-text>
        </v-card>
      </v-menu>
      <v-dialog
        v-model="isOpenEventDialog"
        persistent
        max-width="600"
        open-on-hover
      >
        <v-card v-if="newEvent">
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="newEvent.name"
                    label="Title*"
                  ></v-text-field>
                  <v-row>
                    <v-col cols="12" sm="6">
                      <v-dialog
                        ref="startDatePickerDialog"
                        v-model="isOpenStartDatePicker"
                        :return-value.sync="startDate"
                        persistent
                        width="290px"
                      >
                        <template v-slot:activator="{ on }">
                          <v-text-field
                            v-model="startDate"
                            label="StartDate*"
                            prepend-icon="event"
                            readonly
                            v-on="on"
                          >
                          </v-text-field>
                        </template>
                        <v-date-picker
                          v-model="startDate"
                          scrollable
                          :day-format="formatDayForDatePicker"
                        >
                          <v-spacer></v-spacer>
                          <v-btn
                            text
                            color="primary"
                            @click="closeStartDatePicker"
                            >Cancel</v-btn
                          >
                          <v-btn
                            text
                            color="primary"
                            @click="$refs.startDatePickerDialog.save(startDate)"
                            >OK</v-btn
                          >
                        </v-date-picker>
                      </v-dialog>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-dialog
                        ref="startTimePickerDialog"
                        v-model="isOpenStartTimePicker"
                        :return-value.sync="startTime"
                        persistent
                        width="290px"
                      >
                        <template v-slot:activator="{ on }">
                          <v-text-field
                            v-model="startTime"
                            label="StartTime"
                            prepend-icon="access_time"
                            readonly
                            clearable
                            @click:clear="clearStartTime"
                            v-on="on"
                          >
                          </v-text-field>
                        </template>
                        <v-time-picker
                          v-if="isOpenStartTimePicker"
                          v-model="startTime"
                          full-width
                        >
                          <v-spacer></v-spacer>
                          <v-btn
                            text
                            color="primary"
                            @click="closeStartTimePicker"
                            >Cancel</v-btn
                          >
                          <v-btn
                            text
                            color="primary"
                            @click="$refs.startTimePickerDialog.save(startTime)"
                            >OK</v-btn
                          >
                        </v-time-picker>
                      </v-dialog>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" sm="6">
                      <v-dialog
                        ref="endDatePickerDialog"
                        v-model="isOpenEndDatePicker"
                        :return-value.sync="endDate"
                        persistent
                        width="290px"
                      >
                        <template v-slot:activator="{ on }">
                          <v-text-field
                            v-model="endDate"
                            label="EndDate"
                            prepend-icon="event"
                            readonly
                            clearable
                            @click:clear="clearEndDate"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="endDate"
                          scrollable
                          :day-format="formatDayForDatePicker"
                        >
                          <v-spacer></v-spacer>
                          <v-btn
                            text
                            color="primary"
                            @click="closeEndDatePicker"
                            >Cancel</v-btn
                          >
                          <v-btn
                            text
                            color="primary"
                            @click="$refs.endDatePickerDialog.save(endDate)"
                            >OK</v-btn
                          >
                        </v-date-picker>
                      </v-dialog>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-dialog
                        ref="endTimePickerDialog"
                        v-model="isOpenEndTimePicker"
                        :return-value.sync="endTime"
                        persistent
                        width="290px"
                      >
                        <template v-slot:activator="{ on }">
                          <v-text-field
                            v-model="endTime"
                            label="EndTime"
                            prepend-icon="access_time"
                            readonly
                            :disabled="disabledEndTime"
                            clearable
                            @click:clear="clearEndTime"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-time-picker
                          v-if="isOpenEndTimePicker"
                          v-model="endTime"
                          full-width
                        >
                          <v-spacer></v-spacer>
                          <v-btn
                            text
                            color="primary"
                            @click="closeEndTimePicker"
                            >Cancel</v-btn
                          >
                          <v-btn
                            text
                            color="primary"
                            @click="$refs.endTimePickerDialog.save(endTime)"
                            >OK</v-btn
                          >
                        </v-time-picker>
                      </v-dialog>
                    </v-col>
                  </v-row>
                  <v-textarea
                    v-model="newEvent.memo"
                    rows="1"
                    auto-grow
                    label="Memo"
                  ></v-textarea>
                  <v-switch
                    v-model="newEvent.shared"
                    label="Share"
                    hide-details
                  ></v-switch>
                </v-col>
              </v-row>
            </v-container>
            <small>*Show Necessary Filelds</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="closeEventDialog"
              >Cancel</v-btn
            >
            <v-btn color="blue darken-1" text @click="save">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-col>
  </v-row>
</template>

<style lang="scss" module>
.memo {
  white-space: pre-wrap;
}
</style>

<script>
import {
  defineComponent,
  reactive,
  toRefs,
  computed,
  nextTick,
} from '@vue/composition-api';
import {
  parseDate,
  parseTimestamp,
} from 'vuetify/lib/components/VCalendar/util/timestamp';
import { calendarEventStore, add, update } from '@/store/calendar-event';
import { sharedUserStore, getThemeColor } from '@/store/shared-user';
import { profileStore } from '@/store/profiles';

export default defineComponent({
  props: {
    type: {
      type: String,
      required: true,
      validator: value => {
        return ['month', 'week', 'day'].includes(value);
      },
    },
  },
  setup(props, context) {
    const state = reactive({
      calendar: null,
      start: null,
      end: null,
      visible: true,
      focus: '',
      today: parseDate(new Date()).date,
      sharedUsers: sharedUserStore.sharedUsers,
      isOpenEventMenu: false,
      menuActivatorElement: null,
      selectedEvent: null,
      isOpenEventDialog: false,
      newEvent: null,
      isOpenStartDatePicker: false,
      startDate: null,
      isOpenStartTimePicker: false,
      startTime: null,
      isOpenEndDatePicker: false,
      endDate: null,
      isOpenEndTimePicker: false,
      endTime: null,
      title: computed(() => {
        if (!state.start || !state.end) {
          return '';
        }

        if (props.type === 'week') {
          return state.start.month === state.end.month
            ? `${state.start.year}/${state.start.month}`
            : `${state.start.year}/${state.start.month}~${state.end.month}`;
        }

        return `${state.start.year}/${state.start.month}`;
      }),
      filteredEvents: computed(() => {
        const displayUserIds = state.sharedUsers
          .filter(user => user.display)
          .map(user => user.userId);

        return calendarEventStore.calendarEvents.filter(event =>
          displayUserIds.includes(event.userId),
        );
      }),
      formatEndDateTime: computed(() => {
        return !state.selectedEvent || !state.selectedEvent.end
          ? ''
          : `END: ${state.selectedEvent.end}`;
      }),
      disabledEndTime: computed(() => {
        return !state.endDate || !state.startTime;
      }),
    });
    const methods = {
      setToday: () => {
        state.focus = state.today;
      },
      prev: () => {
        state.calendar.prev();
      },
      next: () => {
        state.calendar.next();
      },
      getEventColor: event => {
        if (!event) {
          return;
        }

        return getThemeColor(event.userId);
      },
      formatDay: timestamp => {
        return new Date(timestamp.date).getDate();
      },
      formatMonth: timestamp => {
        return `${new Date(timestamp.date).getMonth() + 1} /`;
      },
      showEvent: ({ nativeEvent, event }) => {
        const open = () => {
          state.selectedEvent = event;
          state.menuActivatorElement = nativeEvent.target;
          setTimeout(() => {
            state.isOpenEventMenu = true;
          }, 10);
        };

        if (state.isOpenEventMenu) {
          state.isOpenEventMenu = false;
          setTimeout(open, 10);
        } else {
          open();
        }

        nativeEvent.stopPropagation();
      },
      viewDay: ({ date }) => {
        state.focus = date;
        context.root.$router.push('/calendar/day');
      },
      startAddEvent: ({ date }) => {
        state.newEvent = {
          id: null,
          userId: null,
          name: null,
          start: date,
          end: null,
          memo: null,
          shared: true,
        };

        state.startDate = parseTimestamp(state.newEvent.start).date;
        state.isOpenEventDialog = true;

        event.stopPropagation();
      },
      updateRange: ({ start, end }) => {
        state.start = start;
        state.end = end;
      },
      isNotOwner: userId => {
        return userId !== profileStore.profile.userId;
      },
      startEditEvent: () => {
        if (!state.selectedEvent) {
          return;
        }

        const startTimestamp = parseTimestamp(state.selectedEvent.start);
        state.startDate = startTimestamp.date;
        state.startTime = startTimestamp.time;

        if (state.selectedEvent.end) {
          const endTimestamp = parseTimestamp(state.selectedEvent.end);
          state.endDate = endTimestamp.date;
          state.endTime = endTimestamp.time;
        }

        state.newEvent = { ...state.selectedEvent };
        state.isOpenEventMenu = false;
        state.isOpenEventDialog = true;
      },
      formatDayForDatePicker: date => {
        return new Date(date).getDate();
      },
      closeStartDatePicker: () => {
        state.isOpenStartDatePicker = false;
      },
      clearPickerBindValue: () => {
        state.startDate = null;
        state.startTime = null;
        state.endDate = null;
        state.endTime = null;
      },
      refresh: () => {
        state.visible = false;
        nextTick(() => {
          state.visible = true;
        });
      },
      save: () => {
        const newEvent = state.newEvent;

        newEvent.start = !state.startTime
          ? `${state.startDate}`
          : `${state.startDate} ${state.startTime}`;

        if (state.endDate) {
          newEvent.end = !state.endTime
            ? `${state.endDate}`
            : `${state.endDate} ${state.endTime}`;
        }

        if (!newEvent.id) {
          add(newEvent);
        } else {
          update(newEvent);
        }

        methods.clearPickerBindValue();
        state.isOpenEventDialog = false;
        methods.refresh();
      },
      clearStartTime: () => {
        state.startTime = null;
        state.endTime = null;
      },
      closeStartTimePicker: () => {
        state.isOpenStartTimePicker = false;
      },
      clearEndDate: () => {
        state.endDate = null;
        state.endTime = null;
      },
      closeEndDatePicker: () => {
        state.isOpenEndDatePicker = false;
      },
      clearEndTime: () => {
        state.endTime = null;
      },
      closeEndTimePicker: () => {
        state.isOpenEndTimePicker = false;
      },
      closeEventDialog: () => {
        methods.clearPickerBindValue();
        state.isOpenEventDialog = false;
      },
    };

    return {
      ...toRefs(state),
      ...methods,
    };
  },
});
</script>
