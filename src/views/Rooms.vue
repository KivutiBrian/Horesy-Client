<template>
  <v-data-table
    :headers="headers"
    :items="all_rooms"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>Rooms</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog
          v-model="dialog"
          max-width="500px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
              Add Room
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                  >
                    <v-select
                      :items="room_types"
                      item-value="id"
                      item-text="name"
                      v-model="editedItem.room_type_id"
                      label="Select Room Type"
                      outlined
                    ></v-select>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="editedItem.description"
                      label="Description"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="editedItem.price"
                      label="Price"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="red darken-1"
                text
                @click="close"
              >
                Cancel
              </v-btn>
              <v-btn
                color="green darken-1"
                text
                @click="save"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="headline">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn
        color="primary"
        @click="initialize"
      >
        Reset
      </v-btn>
    </template>
  </v-data-table>
</template>

<script>
// import helpers
import { mapActions, mapState } from 'vuex'
export default {
  name: 'Rooms',
  components: {},
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: 'ID',
        align: 'start',
        sortable: false,
        value: 'id'
      },
      {
        text: 'Room Type',
        align: 'start',
        sortable: false,
        value: 'room_type'
      },
      {
        text: 'Description',
        align: 'start',
        sortable: false,
        value: 'description'
      },
      {
        text: 'Price',
        align: 'start',
        sortable: false,
        value: 'price'
      }
      // { text: 'Calories', value: 'calories' }
    ],
    rooms: [],
    room_types: [],
    room_type_id: '',
    editedIndex: -1,
    editedItem: {
      room_type_id: '',
      description: '',
      price: 0
    },
    defaultItem: {
      name: '',
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0
    }
  }),

  computed: {
    ...mapState({
      all_rooms: state => {
        // console.log('inside mapstate', state.rooms)
        return state.rooms.map(room => {
          return {
            id: `RMN${room.id}`,
            room_type: room.room_type.name,
            description: room.description,
            price: room.price
          }
        })
      }
    }),
    formTitle () {
      return this.editedIndex === -1 ? 'Add New Room' : 'Edit Room Details'
    }
  },

  watch: {
    dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    }
  },

  created () {
    this.initialize()
    this.initialize_room_types()
  },

  methods: {
    ...mapActions(['FETCH_ALL_ROOM_TYPES', 'FETCH_ALL_ROOMS', 'ADD_NEW_ROOM']),

    initialize () {
      this.FETCH_ALL_ROOMS().then(response => {
        // format the room data
        // eslint-disable-next-line camelcase
        const formatted_rooms_data = response.data.map(room => {
          return {
            id: room.id,
            room_type: room.room_type.name,
            description: room.description,
            price: room.price
          }
        })
        // eslint-disable-next-line camelcase
        this.rooms = formatted_rooms_data
      })
        .catch(error => {
          console.log(error)
        })
    },

    initialize_room_types () {
      this.FETCH_ALL_ROOM_TYPES().then(response => {
        this.room_types = response
      })
        .catch(error => {
          console.log(error)
        })
    },

    editItem (item) {
      this.editedIndex = this.rooms.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      this.editedIndex = this.rooms.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm () {
      this.rooms.splice(this.editedIndex, 1)
      this.closeDelete()
    },

    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.rooms[this.editedIndex], this.editedItem)
      } else {
        // console.log('edited_item', this.editedItem)
        // this.rooms.push(this.editedItem)
        this.ADD_NEW_ROOM({
          image: 'https://images.unsplash.com/photo-1568495248636-6432b97bd949?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8aG90ZWwlMjByb29tfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          description: this.editedItem.description,
          price: this.editedItem.price,
          room_type_id: this.editedItem.room_type_id
        })
          .then(response => {
            console.log(response)
            this.editedItem = {
              room_type_id: '',
              description: '',
              price: 0
            }
            this.close()
            // this.initialize()
          })
          .catch(error => {
            console.log(error)
          })
      }
      this.close()
    }
  }
}
</script>

<style>

</style>
