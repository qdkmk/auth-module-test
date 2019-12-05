<template>
  <div class="">
    <ul v-for="book in books" class="">
      <li class="book__list">
        <h4>タイトル：{{ book.book_title }}</h4>
        <p>著者：{{ book.author }}</p>
        <p>ISBN：{{ book.isbn }}</p>
        <p>出版社：{{ book.publicher }}</p>
        <button @click="deleteBook(book.id)" type="button" name="button">
          削除
        </button>
        <button @click="editBook(book)" type="button" name="button">
          編集
        </button>
      </li>
    </ul>

    <EditBook v-if="modal" :book="editBookData" @close="closeModal()" />
  </div>
</template>
<script>
import EditBook from '~/components/EditBook.vue'
export default {
  components: {
    EditBook
  },
  props: {
    books: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      modal: false,
      editBookData: {}
    }
  },
  methods: {
    deleteBook(id) {
      this.$axios
        .delete('http://localhost:3000/api/v1/books/' + id)
        .then((res) => {
          alert('success:delete')
          this.$emit('updateBooks')
        })
        .catch((res) => {
          alert('failed:delete')
          window.console.log(res)
        })
    },
    editBook(book) {
      this.modal = true
      this.editBookData = book
    },
    closeModal() {
      this.modal = false
      this.editBookData = {}
      this.$emit('updateBooks')
    }
  }
}
</script>
<style scoped>
.book__list {
  width: 15vw;
  padding: 1rem;
  margin: 1rem;
  border: 1px solid #333;
}
</style>
