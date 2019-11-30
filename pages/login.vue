<template>
  <div class="login__container">
    <form class="" action="index.html" method="post">
      <label for="">メールアドレス</label>
      <input v-model="form.email" type="text" name="" value="" />
      <label for="">パスワード</label>
      <input v-model="form.password" type="password" name="" value="" />
      <button @click="login" type="button" name="button">ログイン</button>
    </form>
  </div>
</template>

<script>
export default {
  middleware({ store, redirect }) {
    if (store.$auth.loggedIn) {
      redirect('/')
    }
  },
  components: {},
  data() {
    return {
      form: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    async login({ redirect }) {
      try {
        await this.$auth.loginWith('local', { data: { auth: this.form } })
        console.log('どこ')
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
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
