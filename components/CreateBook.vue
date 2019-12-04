<template>
  <div class="">
    <input v-model="modalTitle" type="text" placeholder="title" />
    <input v-model="modalIsbn" type="text" placeholder="isbn" />
    <input v-model="modalAuthor" type="text" placeholder="著者" />
    <input v-model="modalPublicher" type="text" placeholder="出版社" />
    <input v-model="modalId" type="text" name="" value="" placeholder="" />
    <button @click="createBook()" type="button" name="button">
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
    modalId: {
      type: Number,
      default: () => {
        return Number
      }
    }
  },
  data() {
    return {
      modalTitle: '',
      modalIsbn: '',
      modalAuthor: '',
      modalPublicher: ''
    }
  },
  methods: {
    closeModal() {
      this.$emit('close')
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
<style scoped></style>
