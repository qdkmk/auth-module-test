<template>
  <div class="collections__container">
    <div class="login__wrapper">
      <input v-model="collectionTitle" type="text" name="" value="" />
      <button @click="createCollection" name="button">
        コレクションを作成
      </button>
    </div>
    <div class="collections_wrapper">
      <h2>Collections</h2>
      <ul v-for="collection in myCollections" class="">
        <li>
          <h3
            v-bind:class="{ active: displayCollectionId === collection.id }"
            @click="getCollectionsBooks(collection.id)"
          >
            {{ collection.title }}
          </h3>
          <div class="">
            <button
              @click="openAddBookModal(collection.id)"
              type="button"
              name="button"
            >
              本を追加
            </button>
          </div>
        </li>
      </ul>
    </div>

    <createBook
      v-if="modalId !== ''"
      :modalId="modalId"
      @close="closeModal()"
    />

    <div class="books__wrapper">
      <books :books="books" @updateBooks="updateBooks()"></books>
    </div>
  </div>
</template>

<script>
import Books from '~/components/Books.vue'
import CreateBook from '~/components/CreateBook.vue'
export default {
  middleware({ store, redirect }) {
    if (!store.$auth.loggedIn) {
      redirect('/login')
    }
  },
  components: {
    Books,
    CreateBook
  },
  data() {
    return {
      collectionTitle: '',
      test: '',
      // books: [],
      modalId: ''
      // 現在表示中のcollectionのIDを格納(temp)
      // displayCollectionId: ''
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
        const myCollections = res.data
        const displayCollectionId = res.data[0].id
        return $axios
          .get(
            'http://localhost:3000/api/v1/collections/' + displayCollectionId
          )
          .then((resBook) => {
            return {
              myCollections,
              books: resBook.data,
              displayCollectionId
            }
          })
      })
  },
  methods: {
    updateBooks() {
      this.getCollectionsBooks(this.displayCollectionId)
    },
    getCollectionsBooks(id) {
      this.$axios
        .get('http://localhost:3000/api/v1/collections/' + id)
        .then((res) => {
          this.books = res.data
          this.displayCollectionId = id
        })
    },
    getCollections() {
      this.$axios
        .get('http://localhost:3000/api/v1/collections/')
        .then((res) => {
          this.myCollections = res.data
        })
    },
    createPost() {
      this.$axios.post('http://localhost:3000/todos', {
        todo: this.postTitle
      })
    },
    createCollection() {
      this.$axios
        .post('http://localhost:3000/api/v1/collections', {
          title: this.collectionTitle
        })
        .then(this.getCollections())
    },
    openAddBookModal(id) {
      this.modalId = id
    },
    closeModal() {
      this.modalId = ''
    },
    createBook() {
      this.$axios
        .post('http://localhost:3000/api/v1/books', {
          collection_id: this.modalId,
          book_title: this.modalTitle,
          isbn: this.modalIsbn,
          author: this.modalAuthor,
          publicher: this.modalPublicher
        })
        .then((res) => {
          if (res && res.status === 200) {
            alert('success')
            this.closeModal()
          }
        })
        .catch((err) => alert('failed' + err))
    }
  }
}
</script>

<style scoped>
.active {
  font-size: 2rem;
}
.collections__container {
  margin: 0 auto;
  min-height: 10vh;
  width: 100vw;
  display: flex;
  flex-wrap: wrap;
  position: relative;
}
.login__wrapper {
  width: 100vw;
  text-align: center;
}
.collections_wrapper {
  width: 45vw;
}
.books_wrapper {
  width: 45vw;
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
