<script>
import Introduce from '~/components/home/introduce'
import Experience from '~/components/home/experience'
import End from '~/components/home/end'

export default {
  name: 'Home',
  components: {
    Introduce,
    Experience,
    End,
  },
}
</script>

<template>
  <div class="home">
    <Introduce />
    <Experience />
    <End />
  </div>
</template>
