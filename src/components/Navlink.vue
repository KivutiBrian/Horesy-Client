<template>
  <div>
      <router-link  @click.native="$emit('hide-dropdown', false)" class="link" :to="url">
          <slot></slot>
      </router-link>

      <!-- click.native="$emit('hide-dropdown', false)" -->
  </div>
</template>

<script>
export default {
  name: 'NavLink',
  props: {
    url: String
  },
  methods: {
    hello () {
      console.log('Gaideh')
    }
  }

}
</script>

<style scoped>

.link{
    color: #fff;
    display: block;
    font-size: 2.7rem;
    text-transform: uppercase;
    letter-spacing: 2px;
    padding: .3rem;
    margin-bottom: 1.6rem;
}

@media screen and (min-width: 1000px) {
  .link{
    font-size: 1.3rem;
    font-weight: normal;
    transition: color .5s;
    margin-right: 3rem;
    margin-bottom: 0;
  }

  .link:hover{
    color: var(--yellow-solid)
  }
}

</style>
