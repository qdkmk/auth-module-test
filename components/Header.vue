<template>
  <div class="nav__wrapper">
    <div class="title__wrapper">
      <h1>TITLE</h1>
    </div>
    <button v-if="loggedIn" @click="logout()" type="button" name="button">
      Logout
    </button>
  </div>
</template>
<script>
export default {
  computed: {
    loggedIn() {
      return this.$auth.loggedIn
    }
  },
  methods: {
    async logout() {
      try {
        await this.$auth.logout()
        this.$router.push('/login')
      } catch (e) {
        window.console.log(e)
      }
    }
  }
}
</script>
<style scoped>
.nav__wrapper {
  background-color: #333;
  color: #fafafa;
  display: flex;
  height: 4rem;
  justify-content: space-between;
  padding: 1rem;
  width: 100vw;
}
</style>
