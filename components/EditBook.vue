<template>
  <div class="edit__wrapper">
    <input v-model="book.book_title" type="text" placeholder="title" />
    <input v-model="book.isbn" type="text" placeholder="isbn" />
    <input v-model="book.author" type="text" placeholder="著者" />
    <input v-model="book.publicher" type="text" placeholder="出版社" />
    <input
      v-model="book.collection_id"
      type="text"
      name=""
      value=""
      placeholder=""
    />
    <button @click="editBook(book.id)" type="button" name="button">
      登録
    </button>
    <button @click="inputFromIsbn()" type="button" name="button">
      ISBNから書籍情報取得
    </button>
    <button @click="closeModal()" type="button" name="button">
      キャンセル
    </button>
  </div>
</template>
<script>
export default {
  props: {
    book: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {}
  },
  methods: {
    closeModal() {
      this.$emit('close')
    },
    editBook() {
      this.$axios
        .patch('http://localhost:3000/api/v1/books/' + this.book.id, {
          collection_id: this.book.collection_id,
          book_title: this.book.book_title,
          isbn: this.book.isbn,
          author: this.book.author,
          publicher: this.book.publicher
        })
        .then((res) => {
          if (res && res.status === 200) {
            alert('success:update')
            this.$emit('close')
          }
        })
        .catch((err) => alert('failed' + err))
    },
    inputFromIsbn() {
      this.$axios
        .get('https://api.openbd.jp/v1/get?isbn=' + this.modalIsbn)
        .then((res) => {
          if (res && res.status === 200) {
            alert('success')
            console.log(res)
            const bookData = res.data[0].summary
            this.modalTitle = bookData.title
            this.modalAuthor = bookData.author
            this.modalPublicher = bookData.publisher
          }
        })
        .catch((err) => alert('failed' + err))
    }
  }
}
</script>
<style scoped>
.edit__wrapper {
  background-color: rgba(200, 200, 200, 0.7);
  left: 50%;
  padding: 1rem;
  position: fixed;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
}
</style>
