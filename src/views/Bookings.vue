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
export default {
  name: 'Bookings',
  components: {},
  data () {
    return {
      search: '',
      headers: [
        {
          text: 'Date',
          align: 'start',
          filterable: false,
          value: 'name'
        },
        { text: 'Calories', value: 'calories' },
        { text: 'Fat (g)', value: 'fat' },
        { text: 'Carbs (g)', value: 'carbs' },
        { text: 'Protein (g)', value: 'protein' },
        { text: 'Iron (%)', value: 'iron' }
      ],
      bookings: []
    }
  }
}
</script>

<style>

</style>
