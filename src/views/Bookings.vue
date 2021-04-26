<template>
  <v-card>
    <v-card-title>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="bookings"
      :search="search"
    ></v-data-table>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Bookings',
  components: {},
  data () {
    return {
      search: '',
      headers: [
        {
          text: 'Booking ID',
          align: 'start',
          filterable: false,
          value: 'id'
        },
        {
          text: 'RoomType',
          align: 'start',
          filterable: false,
          value: 'room_type'
        },
        {
          text: 'Full Name',
          align: 'start',
          filterable: false,
          value: 'full_name'
        },
        {
          text: 'Phone Number',
          align: 'start',
          filterable: false,
          value: 'phone_number'
        },
        {
          text: 'Email',
          align: 'start',
          filterable: false,
          value: 'email'
        },
        {
          text: 'Booking From',
          align: 'start',
          filterable: false,
          value: 'from'
        },
        {
          text: 'Booking To',
          align: 'start',
          filterable: false,
          value: 'to'
        }

      ],
      bookings: []
    }
  },

  created () {
    this.initialize_bookings()
  },

  methods: {
    ...mapActions(['GET_BOOKINGS']),

    initialize_bookings () {
      this.GET_BOOKINGS().then(response => {
        // eslint-disable-next-line camelcase
        const formatted_bookings = response.map(booking => {
          return {
            id: `BID${booking.id}`,
            room_type: booking.room.room_type.name,
            full_name: booking.user.full_name,
            phone_number: booking.user.phone,
            email: booking.user.email,
            from: booking.date_from.split('T')[0],
            to: booking.date_to.split('T')[0]
          }
        })

        // eslint-disable-next-line camelcase
        this.bookings = formatted_bookings
      })
    }
  }
}
</script>

<style>

</style>
