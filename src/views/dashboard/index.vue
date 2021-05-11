<template>
  <div class="dashboard-container">
    <div>
      <card ref="card" />
    </div>
    <div>
      <message ref="message" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import card from './card/index'
import message from './card/message'
export default {
  name: 'Dashboard',
  components: {
    card, message
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
