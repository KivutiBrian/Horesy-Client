<template>
  <div style="margin-top:100px;">
    <v-app>
        <v-container>
            <v-row>
                <v-col class="col-3">
                    <v-card>
                        <v-navigation-drawer permanent style="margin: 0 auto;">
                            <!-- <v-system-bar></v-system-bar> -->
                            <v-list>
                                <v-list-item>
                                <v-list-item-avatar>
                                    <v-avatar
                                    color="orange"
                                    size="56"
                                    >
                                    <span class="white--text headline">{{ user.full_name[0] }}</span>
                                    </v-avatar>
                                </v-list-item-avatar>
                                </v-list-item>

                                <v-list-item link>
                                <v-list-item-content>
                                    <v-list-item-title class="title">
                                    {{ user.full_name }}
                                    </v-list-item-title>
                                    <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
                                </v-list-item-content>

                                <v-list-item-action>
                                    <v-icon>mdi-menu-down</v-icon>
                                </v-list-item-action>
                                </v-list-item>
                            </v-list>
                            <v-divider></v-divider>
                            <v-list
                                nav
                                dense
                            >
                                <v-list-item-group
                                color="primary"
                                >
                                <v-list-item
                                    v-for="(item, i) in items"
                                    :key="i"
                                >
                                    <v-list-item-icon>
                                        <v-icon v-text="item.icon"></v-icon>
                                    </v-list-item-icon>

                                    <v-list-item-content @click="change_route(item.link)">
                                        <v-list-item-title v-text="item.text"></v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                                </v-list-item-group>
                            </v-list>
                        </v-navigation-drawer>
                    </v-card>
                </v-col>
                <v-col class="col-9">
                    <v-card>
                        <router-view></router-view>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-app>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Admin',
  components: {},
  data: () => ({
    // selectedItem: 0,
    items: [
      { text: 'Dashboard', icon: 'mdi-folder', link: { name: 'Dashboard' } },
      { text: 'Bookings', icon: 'mdi-account-multiple', link: { name: 'Bookings' } },
      { text: 'Rooms', icon: 'mdi-star', link: { name: 'Rooms' } },
      { text: 'Users', icon: 'mdi-account-multiple', link: { name: 'Users' } },
      { text: 'SignOut', icon: 'mdi-history' }
    ]
  }),
  computed: {
    ...mapState({
      user: state => state.user
    })
  },
  methods: {
    change_route (object) {
      // eslint-disable-next-line handle-callback-err
      this.$router.push(object).catch(err => {})
    }
  }
}
</script>

<style>
</style>
