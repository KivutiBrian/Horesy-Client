<template>
  <v-data-table
    :headers="headers"
    :items="all_users"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>Users</v-toolbar-title>
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
              Add User
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
                      :items="roles"
                      item-value="name"
                      item-text="name"
                      v-model="editedItem.role"
                      label="Select Role"
                      outlined
                    ></v-select>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="editedItem.full_name"
                      label="Full Name"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="editedItem.email"
                      label="Email"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="editedItem.phone_number"
                      label="Phone Number"
                      placeholder="254712345678"
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
  name: 'Users',
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
        text: 'Full Name',
        align: 'start',
        sortable: false,
        value: 'full_name'
      },
      {
        text: 'Email',
        align: 'start',
        sortable: false,
        value: 'email'
      },
      {
        text: 'Phone Number',
        align: 'start',
        sortable: false,
        value: 'phone_number'
      },
      {
        text: 'Member Since',
        align: 'start',
        sortable: false,
        value: 'member_since'
      },
      // {
      //   text: 'Role',
      //   align: 'start',
      //   sortable: false,
      //   value: 'role'
      // },
      {
        text: 'Total Bookings',
        align: 'start',
        sortable: false,
        value: 'total_bookings'
      }
      // { text: 'Calories', value: 'calories' }
    ],
    roles: [
      { name: 'Admin' },
      { name: 'User' }
    ],
    editedIndex: -1,
    editedItem: {
      full_name: '',
      email: '',
      phone_number: '',
      role: ''
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
      all_users: state => {
        return state.users.map(user => {
          return {
            id: user.id,
            full_name: user.full_name,
            email: user.email,
            phone_number: user.phone,
            member_since: new Date(user.created_at).toISOString().substr(0, 10),
            // role: user.user_roles[0].role.role,
            total_bookings: user.bookings.length
          }
        })
      }
    }),
    formTitle () {
      return this.editedIndex === -1 ? 'Add New User' : 'Edit User Details'
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
    this.initialize_users()
  },

  methods: {
    ...mapActions(['ADD_NEW_USER', 'GET_ALL_USERS']),

    initialize () {},

    initialize_users () {
      this.GET_ALL_USERS().then(() => {
        console.log('all_users')
      })
        .catch(error => console.log('error', error))
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
        // call add new user action
        this.ADD_NEW_USER({
          full_name: this.editedItem.full_name,
          email: this.editedItem.email,
          phone: this.editedItem.phone_number,
          role: this.editedItem.role,
          password: this.editedItem.phone_number
        })
          .then(response => {
            console.log(response)
            this.editedItem = {
              full_name: '',
              email: '',
              phone_number: '',
              role: ''
            }
            this.close()
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
