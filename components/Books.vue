<template>
  <div class="">
    <ul v-for="book in books" class="">
      <li class="book__list">
        <h4>タイトル：{{ book.book_title }}</h4>
        <p>著者：{{ book.author }}</p>
        <p>ISBN：{{ book.isbn }}</p>
        <p>出版社：{{ book.publicher }}</p>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    books: {
      type: Array,
      default: () => []
    }
  },
  methods: {}
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
