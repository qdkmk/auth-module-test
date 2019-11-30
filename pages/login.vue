<template>
  <div class="">
    <div class="login__wrapper">
      <form class="form__wrapper" action="index.html" method="post">
        <nuxt-link to="/signup" class="link__signup">OR サインアップ</nuxt-link>
        <label class="form__label" for="">メールアドレス</label>
        <input v-model="form.email" class="form__email" type="text" />
        <label class="form__label" for="">パスワード</label>
        <input v-model="form.password" class="form__password" type="password" />
        <button @click="login" class="form__submit" type="button" name="button">
          ログイン
        </button>
      </form>
    </div>
  </div>
</template>

<script scoped>
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
.login__wrapper {
  display: flex;
  height: 100vh;
  width: 100vw;
}
.link__signup {
}
.form__wrapper {
  background-color: #eee;
  display: block;
  margin: auto;
  padding: 2rem;
  width: 25rem;
}
.form__label {
  width: 100%;
  display: block;
}
.form__email,
.form__password {
  width: 100%;
}
.form__submit {
  width: 100%;
}
</style>
