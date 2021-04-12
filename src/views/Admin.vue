<template>
  <div style="margin-top:100px;">
    <v-container>
        <v-row>
            <v-col class="col-3">
                <v-card>
                    <v-navigation-drawer permanent style="margin: 0 auto;">
                        <!-- <v-system-bar></v-system-bar> -->
                        <v-list>
                            <v-list-item>
                            <v-list-item-avatar>
                                <v-img src="https://cdn.vuetifyjs.com/images/john.png"></v-img>
                            </v-list-item-avatar>
                            </v-list-item>

                            <v-list-item link>
                            <v-list-item-content>
                                <v-list-item-title class="title">
                                John Leider
                                </v-list-item-title>
                                <v-list-item-subtitle>john@vuetifyjs.com</v-list-item-subtitle>
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
                            v-model="selectedItem"
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
  </div>
</template>

<script>
export default {
  name: 'Admin',
  components: {},
  data: () => ({
    selectedItem: 0,
    items: [
      { text: 'Dashboard', icon: 'mdi-folder', link: { name: 'Dashboard' }, active: true },
      { text: 'Bookings', icon: 'mdi-account-multiple', link: { name: 'Bookings' } },
      { text: 'Hotels', icon: 'mdi-star', link: { name: 'Hotels' } },
      { text: 'Users', icon: 'mdi-history', link: { name: 'Users' } },
      { text: 'SignOut', icon: 'mdi-history' }
    ]
  }),
  methods: {
    change_route (object) {
      this.$router.push(object)
    }
  }
}
</script>

<style>
</style>
