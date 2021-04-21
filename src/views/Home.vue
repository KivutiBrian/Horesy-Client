<template>
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

    <section class="booking">
      <div class="h-container">
        <form action="#" class="book-form">
          <!-- <div class="input-group">
            <label for="destination" class="input-label">Destination</label>
            <input type="text" class="input" id="destination">
          </div> -->
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
    </section>

    <section class="hotels">
      <div class="h-container">
        <h5 class="section-head">
          <span class="heading">Discover</span>
          <span class="sub-heading">Beautiful rooms</span>
        </h5>
        <!-- hotel1 -->
        <div class="h-grid">
          <div class="h-grid-item featured-hotels">
            <img src="../assets/voyager.jpg" alt="" class="hotel-image">
            <h5 class="hotel-name">Voyager Beach Resort</h5>
            <span class="hotel-price">From $200/Night</span>
            <div class="hotel-rating">
              <i class="fas fa-star rating"></i>
              <i class="fas fa-star rating"></i>
              <i class="fas fa-star rating"></i>
              <i class="fas fa-star rating"></i>
              <i class="fas fa-star rating"></i>
            </div>
            <a href="#" class="h-btn h-btn-book">
              Book now
            </a>
          </div>
          <!-- hotel 2 -->
          <div class="h-grid-item featured-hotels">
            <img src="../assets/voyager.jpg" alt="" class="hotel-image">
            <h5 class="hotel-name">Sarova White Sands</h5>
            <span class="hotel-price">From $400/Night</span>
            <div class="hotel-rating">
              <i class="fas fa-star rating"></i>
              <i class="fas fa-star rating"></i>
              <i class="fas fa-star rating"></i>
              <i class="fas fa-star rating"></i>
              <i class="fas fa-star rating"></i>
            </div>
            <a href="#" class="h-btn h-btn-book">
              Book now
            </a>
          </div>
          <!-- hotel -->
          <div class="h-grid-item featured-hotels">
            <img src="../assets/voyager.jpg" alt="" class="hotel-image">
            <h5 class="hotel-name">The Reef Hotel</h5>
            <span class="hotel-price">From $100/Night</span>
            <div class="hotel-rating">
              <i class="fas fa-star rating"></i>
              <i class="fas fa-star rating"></i>
              <i class="fas fa-star rating"></i>
              <i class="fas fa-star rating"></i>
              <i class="fas fa-star rating"></i>
            </div>
            <a href="#" class="h-btn h-btn-book">
              Book now
            </a>
          </div>
        </div>
      </div>
    </section>

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
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {

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
