<template>
  <div class="">
    <div class="login__wrapper">
      <form class="form__wrapper" action="index.html" method="post">
        <label class="form__label" for="">名前</label>
        <input v-model="form.name" class="form__input form__name" type="text" />
        <label class="form__label" for="">メールアドレス</label>
        <input
          v-model="form.email"
          class="form__input form__email"
          type="text"
        />
        <label class="form__label" for="">パスワード</label>
        <input
          v-model="form.password"
          class="form__input form__password"
          type="password"
        />
        <button
          @click="signup"
          class="form__submit"
          type="button"
          name="button"
        >
          サインアップ
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
        name: '',
        email: '',
        password: ''
      }
    }
  },
  methods: {
    async login() {
      try {
        await this.$auth.loginWith('local', { data: { auth: this.form } })
      } catch (error) {
        window.console.log(error)
      }
    },
    async signup({ $axios }) {
      await this.$axios
        .post('http://localhost:3000/api/v1/users', {
          name: this.form.name,
          email: this.form.email,
          password: this.form.password
        })
        .then((res) => {
          if (res.data.status === 200) {
            this.login()
          } else {
            window.console.log('errorが発生しました：' + res.data)
          }
        })
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
.form__input {
  width: 100%;
}
.form__submit {
  width: 100%;
}
</style>
