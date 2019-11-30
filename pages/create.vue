<template>
  <div class="mycontainer">
    <nuxt-link to="/">トップ</nuxt-link>
    <div class="login__container">
      <form class="" action="index.html" method="post">
        <label for="">ポスト</label>
        <input v-model="postTitle" type="text" name="" value="" />
      </form>
    </div>
    <div class="">
      <button @click="getHobby" type="button" name="button">hobby</button>
      <button @click="createPost" type="button" name="button">
        ポスト作成
      </button>
      <div class="">
        <p>趣味：{{ test }}</p>
        <p>トークン趣味：{{ toke }}</p>
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
      postTitle: '',
      test: ''
    }
  },
  computed: {
    // user() {      return this.$auth.user    }
    toke() {
      return this.$store.$auth.getToken('local')
    }
  },
  methods: {
    logout() {
      this.$auth.logout()
    },
    getHobby() {
      this.$axios.get('http://localhost:3000/todos').then((res) => {
        this.test = res.data
      })
    },
    createPost() {
      this.$axios.post('http://localhost:3000/todos', {
        todo: this.postTitle
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
