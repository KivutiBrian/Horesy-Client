<template>
<v-app>
  <main>
    <div class="hero">
      <div class="h-container">
        <div class="main-heading">
          <h1 class="title">Explore</h1>
          <h2 class="subtitle">Luxury rooms</h2>
          <!-- <br><br><br><br><br><br><h1>hell</h1> -->
        </div>
        <router-link class="h-btn h-btn-gradient" to="#">
            Explore now
            <span class="dots"><i class="fa fa-ellipsis-h"></i></span>
          </router-link>
      </div>
    </div>

    <!-- <section class="booking">
      <div class="h-container">
        <form action="#" class="book-form">
          <div class="input-group">
            <label for="destination" class="input-label">Destination</label>
            <input type="text" class="input" id="destination">
          </div>
          <div class="input-group">
            <label for="check-in" class="input-label">Check in</label>
            <input type="date" class="input" id="check-in">
          </div>
          <div class="input-group">
            <label for="check-out" class="input-label">Check out</label>
            <input type="date" class="input" id="check-out">
          </div>
          <div class="input-group">
            <label for="adults" class="input-label">Adults</label>
            <select class="options" id="adults">
              <option value="0">0</option>
              <option value="0">1</option>
              <option value="0">2</option>
              <option value="0">3</option>
              <option value="0">4</option>
              <option value="0">5</option>
            </select>
          </div>
          <div class="input-group">
            <label for="childred" class="input-label">Children</label>
            <select class="options" id="children">
              <option value="0">0</option>
              <option value="0">1</option>
              <option value="0">2</option>
              <option value="0">3</option>
              <option value="0">4</option>
              <option value="0">5</option>
            </select>
          </div>
          <button class="h-btn h-form-btn h-btn-search">
            Search
          </button>
        </form>
      </div>
    </section> -->

    <section class="hotels">
      <div class="h-container">
        <h5 class="section-head">
          <span class="heading">Discover</span>
          <span class="sub-heading">Beautiful rooms</span>
        </h5>
        <!-- hotel1 -->
        <div class="h-grid">
          <div class="h-grid-item featured-hotels" v-for="room in rooms" :key="room.id">
            <img src="../assets/voyager.jpg" alt="" class="hotel-image">
            <h5 class="hotel-name">{{room.room_type}}</h5>
            <span class="hotel-price">From ${{room.price}}/Night</span>
            <div class="hotel-rating">
              <i class="fas fa-star rating"></i>
              <i class="fas fa-star rating"></i>
              <i class="fas fa-star rating"></i>
              <i class="fas fa-star rating"></i>
              <i class="fas fa-star rating"></i>
            </div>
            <div @click="selectedItem(room.id)" class="h-btn h-btn-book">
              Book now
            </div>

                <v-dialog
                  v-model="dialog"
                  max-width="400"
                >
                  <v-card>
                    <v-card-title class="headline">
                      Enter your details
                    </v-card-title>

                    <v-card-text>
                      <v-form
                        ref="form"
                        v-model="valid"
                        lazy-validation
                      >
                        <v-text-field
                          v-model="name"
                          :counter="30"
                          :rules="nameRules"
                          label="Name"
                          required
                        ></v-text-field>

                        <v-text-field
                          v-model="email"
                          :rules="emailRules"
                          label="E-mail"
                          required
                        ></v-text-field>

                         <v-text-field
                          v-model="phone"
                          :rules="phoneRules"
                          label="Phone"
                          required
                        ></v-text-field>

                        <v-menu
                          ref="menu"
                          v-model="menu"
                          :close-on-content-click="false"
                          :return-value.sync="date_from"
                          transition="scale-transition"
                          offset-y
                          min-width="auto"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="date_from"
                              label="Date From"
                              prepend-icon="mdi-calendar"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="date_from"
                            no-title
                            scrollable
                          >
                            <v-spacer></v-spacer>
                            <v-btn
                              text
                              color="primary"
                              @click="menu = false"
                            >
                              Cancel
                            </v-btn>
                            <v-btn
                              text
                              color="primary"
                              @click="$refs.menu.save(date_from)"
                            >
                              OK
                            </v-btn>
                          </v-date-picker>
                        </v-menu>

                        <v-menu
                          ref="menu"
                          v-model="menu"
                          :close-on-content-click="false"
                          :return-value.sync="date_to"
                          transition="scale-transition"
                          offset-y
                          min-width="auto"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="date_to"
                              label="Date To"
                              prepend-icon="mdi-calendar"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="date_to"
                            no-title
                            scrollable
                          >
                            <v-spacer></v-spacer>
                            <v-btn
                              text
                              color="primary"
                              @click="menu = false"
                            >
                              Cancel
                            </v-btn>
                            <v-btn
                              text
                              color="primary"
                              @click="$refs.menu.save(date_to)"
                            >
                              OK
                            </v-btn>
                          </v-date-picker>
                        </v-menu>
                      </v-form>

                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>

                      <v-btn
                        color="green darken-1"
                        text
                        @click="dialog = false"
                      >
                        Disagree
                      </v-btn>

                      <v-btn
                        color="green darken-1"
                        text
                        @click="submit_booking"
                      >
                        Submit Booking
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>

          </div>
        </div>
      </div>
    </section>s

    <section class="offer">
      <div class="h-container">
        <div class="offer-content">
          <div class="discount">25% off</div>
          <h5 class="hotel-name">Hilton Hotel</h5>
          <div class="hotel-rating">
              <i class="fas fa-star rating"></i>
              <i class="fas fa-star rating"></i>
              <i class="fas fa-star rating"></i>
              <i class="fas fa-star rating"></i>
              <i class="fas fa-star-half rating"></i>
          </div>
          <p class="paragraph">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Doloribus vero magnam quisquam laborum vitae esse tempora vel
            dolores eum ex?
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Doloribus vero magnam quisquam laborum vitae esse tempora vel
            dolores eum ex?
          </p>
          <a href="" class="h-btn h-btn-book">Reedem Offer</a>
        </div>
      </div>
    </section>

  </main>
  </v-app>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import { mapActions } from 'vuex'

export default {
  name: 'Home',
  components: {

  },
  data: () => ({
    room_id: null,
    date_from: new Date().toISOString(),
    date_to: new Date().toISOString(),
    menu: false,
    rooms: [],
    dialog: false,
    valid: true,
    name: '',
    nameRules: [
      v => !!v || 'Name is required',
      v => (v && v.length <= 30) || 'Name must be less than 10 characters'
    ],
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
    ],
    phone: '',
    phoneRules: [
      v => !!v || 'Phone number is required',
      v => (v && v.length > 14) || 'Phone number must be 12 or 10 characters'
    ]
  }),

  created () {
    this.initialize()
  },

  methods: {
    ...mapActions(['FETCH_ALL_ROOMS', 'POST_BOOKING']),

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

    selectedItem (item) {
      console.log(item)
      this.dialog = true
      this.room_id = item
    },

    submit_booking (e) {
      e.preventDefault()
      this.dialog = false

      this.POST_BOOKING({
        room_id: this.room_id,
        full_name: this.name,
        email: this.email,
        phone: this.phone,
        date_from: this.date_from,
        date_to: this.date_to
      }).then(res => {
        console.log(res)
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>

<style >
.hero{
  width: 100%;
  height: 100vh;
  background: url("../assets/landing-page.jpg") center no-repeat;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: relative;
  z-index: 0;
}

.hero::before{
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: inherit;
  height: inherit;
  background-color: var(--purple-transparent-alt);
  z-index: -1;
}

.main-heading{
  color: #fff;
  line-height: 1;
  text-shadow: 1px 1px 1rem rgba(0,0,0, .5);
  margin-bottom: 2.5rem;
}

.title{
  font-size: 4.8rem;
  text-transform: uppercase;
  letter-spacing: 3px;
}

.subtitle{
  font-size: 3.4rem;
  font-weight: 300;
  font-family: 'Pacifico', cursive;
}

.h-btn-gradient{
  background-image: var(--gradient-color);
}

.booking{
  /* background-image: var(--gradient-color); */
  background-color: #f0efeb;

}

.input-group{
  margin-bottom: 1.5rem;
}

.input-label{
  display: block;
  font-size: 1.3rem;
  text-transform: uppercase;
  font-weight: bold;
  margin-bottom: 1rem;
}

.input,
.options{
  outline: none;
  /* border: none; */
  border-radius: 20px;
  width: 100%;
  min-height: 4rem;
  padding: 1rem;
  font-weight: bold;
  letter-spacing: 2px;
  /* font-family: 'Pacifico', cursive; */
  resize: none;
}

.h-form-btn{
  cursor: pointer;
  margin-top: 2.5rem;
}

.h-btn-search{
  color: #fff;
  background-color: #780116;
}

.h-btn-search:hover {
  color: #fff;
  background-color: #d8572a;
}

.h-btn-book{
  color: #fff;
  background-color: #8ac926;
}

/* hotels section */
.section-head{
  text-align: center;
  margin-bottom: 5rem;
}

.heading{
  font-size: 4rem;
  text-transform: uppercase;
  display: block;
}

.sub-heading{
  font-size: 1.7rem;
  font-family: 'Pacifico', cursive;
  font-weight: 300;
}

.featured-hotels{
  height: 35rem;
  color: #fff;
  padding: 1rem;
  position: relative;
  z-index: 0;
}

.featured-hotels::before{
  content:"";
  position: absolute;
  top:0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--purple-transparent-alt);
  z-index: -1;
}

.hotel-image{
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -2;
}

.hotel-name{
  font-size: 2.6rem;
}

.hotel-price{
  font-size: 1.8rem;
}

.hotel-rating{
  margin: 1rem 0 2.5rem;
}

.rating{
  color: var(--yellow-solid);
}

/* special offer */
.offer{
  background: linear-gradient(to right, rgba(118, 98, 75, 0.8),
      rgba(182, 63, 129, 0.8)), url("../assets/voyager.jpg")
      bottom center no-repeat;
  background-size: cover;
}

.offer-content{
  background-color: #fff;
  text-align: center;
  padding: 5rem 1rem;
  position: relative;
  overflow: hidden;
}

.discount{
  background-color: var(--yellow-solid);
  position: absolute;
  top: 0;
  left: 0;
  padding: 1rem;
  text-transform: uppercase;
  outline: 2px solid var(--yellow-solid);
  outline-offset: .5rem;
  font-size: 1.8rem;
}

.paragraph{
  color: #a5a5a5;
  margin-bottom: 2.5rem;
}

@media screen and (min-width: 1000px) {
  .book-form{
    display: flex;
    justify-content: space-between;
  }

  .book-form .input-group{
    margin-bottom: 0;
  }

  .book-form .input-group:first-child{
    flex: 0 0 20%;
  }

  .input,
  .options{
    min-width: 10rem;
  }
}
</style>
