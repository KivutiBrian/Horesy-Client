<template>
  <div>
    <v-container>
        <v-row no-gutters class="mb-5">
            <v-col cols="12" md="4" sm="12" xs="12" class="mt-6">
                <v-card class="pa-2 mx-auto" style="background-color:#011627"  max-width="250" tile>
                    <v-card-title>
                        <h3 style="color:#fff;" class="white--text">Hotels</h3>
                    </v-card-title>
                    <v-row class="ml-2 d-flex justify-space-between">
                        <v-col class="mt-1">
                        <v-icon color="#fff" class="mt-1" x-large>sms</v-icon>
                        </v-col>
                        <v-col class="ml-15">
                        <h1 style="color:#fff;" class="white--text">4</h1>
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
            <v-col cols="12" sm="12" md="4" xs="12" class="mt-6">
                <v-card class="pa-2 mx-auto" style="background-color:#e71d36" max-width="250" tile>
                    <v-card-title>
                        <h3 class="white--text">Bookings</h3>
                    </v-card-title
                    >
                    <v-row class="ml-2">
                        <v-col class="mt-1">
                        <v-icon color="#fff" x-large>sms</v-icon>
                        </v-col>
                        <v-col class="ml-15">
                        <h1 class="white--text">N/A</h1>
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
            <v-col cols="12" sm="12" md="4" xs="12" class="mt-6">
                <v-card class="pa-2 mx-auto" style="background-color:#2ec4b6;"  max-width="250" tile>
                    <v-card-title>
                        <h3>Users</h3>
                    </v-card-title
                    >
                    <v-row class="ml-2">
                        <v-col class="mt-1">
                        <v-icon color="#660708" x-large>sms</v-icon>
                        </v-col>
                        <v-col class="ml-15">
                        <h1>N/A</h1>
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
        </v-row>
            <v-row class="fill-height">
            <v-col>
                <v-sheet height="64">
                <v-toolbar
                    flat
                >
                    <v-btn
                    outlined
                    class="mr-4"
                    color="grey darken-2"
                    @click="setToday"
                    >
                    Today
                    </v-btn>
                    <v-btn
                    fab
                    text
                    small
                    color="grey darken-2"
                    @click="prev"
                    >
                    <v-icon small>
                        mdi-chevron-left
                    </v-icon>
                    </v-btn>
                    <v-btn
                    fab
                    text
                    small
                    color="grey darken-2"
                    @click="next"
                    >
                    <v-icon small>
                        mdi-chevron-right
                    </v-icon>
                    </v-btn>
                    <v-toolbar-title v-if="$refs.calendar">
                    {{ $refs.calendar.title }}
                    </v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-menu
                    bottom
                    right
                    >
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                        outlined
                        color="grey darken-2"
                        v-bind="attrs"
                        v-on="on"
                        >
                        <span>{{ typeToLabel[type] }}</span>
                        <v-icon right>
                            mdi-menu-down
                        </v-icon>
                        </v-btn>
                    </template>
                    <v-list>
                        <v-list-item @click="type = 'day'">
                        <v-list-item-title>Day</v-list-item-title>
                        </v-list-item>
                        <v-list-item @click="type = 'week'">
                        <v-list-item-title>Week</v-list-item-title>
                        </v-list-item>
                        <v-list-item @click="type = 'month'">
                        <v-list-item-title>Month</v-list-item-title>
                        </v-list-item>
                        <v-list-item @click="type = '4day'">
                        <v-list-item-title>4 days</v-list-item-title>
                        </v-list-item>
                    </v-list>
                    </v-menu>
                </v-toolbar>
                </v-sheet>
                <v-sheet height="600">
                <v-calendar
                    ref="calendar"
                    v-model="focus"
                    color="orange"
                    :type="type"
                    :events="events"
                    @click:event="showEvent"
                    @click:more="viewDay"
                    @click:date="viewDay"
                ></v-calendar>
                <v-menu
                    v-model="selectedOpen"
                    :close-on-content-click="false"
                    :activator="selectedElement"
                    offset-x
                >
                    <v-card
                    color="grey lighten-4"
                    min-width="350px"
                    flat
                    >
                    <v-toolbar
                        :color="selectedEvent.color"
                        dark
                    >
                        <!-- <v-btn icon>
                        <v-icon>mdi-pencil</v-icon>
                        </v-btn> -->
                        <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
                        <v-spacer></v-spacer>
                        <!-- <v-btn icon>
                        <v-icon>mdi-heart</v-icon>
                        </v-btn> -->
                        <!-- <v-btn icon>
                        <v-icon>mdi-dots-vertical</v-icon>
                        </v-btn> -->
                    </v-toolbar>
                    <v-card-text>
                        <span v-html="selectedEvent.details"></span>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn
                        text
                        color="secondary"
                        @click="selectedOpen = false"
                        >
                        Cancel
                        </v-btn>
                    </v-card-actions>
                    </v-card>
                </v-menu>
                </v-sheet>
            </v-col>
        </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  components: {},
  data: () => ({
    focus: '',
    type: 'month',
    typeToLabel: {
      month: 'Month',
      week: 'Week',
      day: 'Day',
      '4day': '4 Days'
    },
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    events: []
  }),
  mounted () {

  },
  methods: {
    viewDay ({ date }) {
      this.focus = date
      this.type = 'day'
    },
    getEventColor (event) {
      return event.color
    },
    setToday () {
      this.focus = ''
    },
    prev () {
      this.$refs.calendar.prev()
    },
    next () {
      this.$refs.calendar.next()
    },
    showEvent ({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event
        this.selectedElement = nativeEvent.target
        setTimeout(() => {
          this.selectedOpen = true
        }, 10)
      }
      if (this.selectedOpen) {
        this.selectedOpen = false
        setTimeout(open, 10)
      } else {
        open()
      }
      nativeEvent.stopPropagation()
    },
    updateRange ({ start, end }) {
      const events = []
      const min = new Date(`${start.date}T00:00:00`)
      const max = new Date(`${end.date}T23:59:59`)
      const days = (max.getTime() - min.getTime()) / 86400000
      const eventCount = this.rnd(days, days + 20)
      for (let i = 0; i < eventCount; i++) {
        const allDay = this.rnd(0, 3) === 0
        const firstTimestamp = this.rnd(min.getTime(), max.getTime())
        const first = new Date(firstTimestamp - (firstTimestamp % 900000))
        const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000
        const second = new Date(first.getTime() + secondTimestamp)
        events.push({
          name: this.names[this.rnd(0, this.names.length - 1)],
          start: first,
          end: second,
          color: this.colors[this.rnd(0, this.colors.length - 1)],
          timed: !allDay
        })
      }
      this.events = events
    },
    rnd (a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a
    }
  }
}
</script>

<style>

</style>
