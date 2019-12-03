<template>
  <div class="mycontainer">
    <h1 class="title">
      auth-module-test
    </h1>
    <nuxt-link to="/create">ポスト作成ページ</nuxt-link>
    <nuxt-link to="/collection">コレクション</nuxt-link>
    <div class="">
      <button @click="getHobby" type="button" name="button">hobby</button>
      <button @click="logout" type="button" name="button">ログアウト</button>
      <div class="">
        <p>趣味：{{ test }}</p>
      </div>
      <div class="">
        <p>state：{{ myState }}</p>
      </div>
      <div class="">
        <p>userStatues{{ userProfile }}</p>
      </div>
    </div>
  </div>
</template>

<script>
// import Logo from '~/components/Logo.vue'

export default {
  middleware({ store, redirect }) {
    if (!store.$auth.loggedIn) {
      redirect('/login')
    }
  },
  data() {
    return {
      test: ''
    }
  },
  computed: {
    // user() {      return this.$auth.user    }
    // hobby() {      return this.$auth.hobby    }
    myState({ store }) {
      // return this.$store.$auth.state
      return this.$auth.getToken('local').match(/^Bearer[ ]+([^ ]+)[ ]*$/i)[1]
    }
  },
  methods: {
    logout() {
      this.$auth.logout()
    },
    getHobby() {
      this.$axios.get('http://localhost:3000/api/v1/users').then((res) => {
        this.test = res.data
      })
    }
  }
}
</script>

<style>
.mycontainer {
  margin: 0 auto;
  min-height: 10vh;
  width: 100vw;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
