<template>
  <div class="mycontainer">
    <nuxt-link to="/">トップ</nuxt-link>
    <div class="login__container">
      <form class="" action="index.html" method="post">
        <label for="">コレクションを追加</label>
        <input v-model="postTitle" type="text" name="" value="" />
      </form>
    </div>
    <div class="">
      <h2>Collections</h2>
      <ul v-for="collection in myCollections" class="">
        <li>
          <h3 @click="getCollectionsBooks(collection.id)">
            {{ collection.title }}
          </h3>
          <ul v-for="book in books" class="">
            <li>
              <h4>{{ book.book_title }}</h4>
              <p>{{ book.author }}</p>
              <p>{{ book.isbn }}</p>
            </li>
          </ul>
        </li>
      </ul>
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
      test: '',
      books: ''
    }
  },
  computed: {
    // user() {      return this.$auth.user    }
  },
  asyncData({ $axios }) {
    // get collections
    return $axios
      .get('http://localhost:3000/api/v1/collections/')
      .then((res) => {
        return { myCollections: res.data }
      })
  },
  methods: {
    logout() {
      this.$auth.logout()
    },
    getCollectionsBooks(id) {
      this.$axios
        .get('http://localhost:3000/api/v1/collections/' + id)
        .then((res) => {
          this.books = res.data
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
