<template>
  <div class="collections__container">
    <div class="map__container">
      <network-graph :nodes="graphNode" :edges="graphEdge" @click="onClick" />
    </div>
    <div class="controller__wrapper">
      <button type="button" name="button">追加</button>
    </div>
  </div>
</template>

<script>
import vis from 'vis'
import NetworkGraph from '@/components/NetworkGraph.vue'
export default {
  // middleware({ store, redirect }) {
  // if (!store.$auth.loggedIn) {
  // redirect('/login')
  // }
  // },
  components: {
    NetworkGraph
  },
  data() {
    return {
      mode: 'findpath',
      graph: null,
      node_label: 'hostname',
      graphRawData: null,
      nodes_: {},
      graphNode: [
        { id: 1, label: '色彩デザイン学', value: 2 },
        { id: 2, label: 'Node 2', value: 1 },
        { id: 3, label: 'Node 3', value: 1 },
        { id: 4, label: 'Node 4', value: 1 },
        { id: 5, label: 'Node 5', value: 1 },
        { id: 6, label: 'Node 5', value: 1 }
      ],
      graphEdge: [
        { from: 1, to: 3 },
        { from: 1, to: 2 },
        { from: 2, to: 4 },
        { from: 2, to: 5 },
        { from: 3, to: 3 }
      ],
      interval: null,
      eventName: '',
      information: '',
      selectEdge: ['192.168.2.0-192.168.2.1', '192.168.2.2-192.168.2.3'],
      nodeSelect: [],
      highlightNode: []
    }
  },
  computed: {
    // user() {      return this.$auth.user    }
    edges() {
      return vis.DataSet([
        { from: 1, to: 3 },
        { from: 1, to: 2 },
        { from: 2, to: 4 },
        { from: 2, to: 5 },
        { from: 3, to: 3 }
      ])
    }
  },
  mounted() {},
  methods: {
    updateBooks() {
      this.$axios.get('http://localhost:3000/api/v1/books/').then((res) => {
        this.myAllBooks = res.data
      })
    },
    getCollectionsBooks(id) {
      this.$axios
        .get('http://localhost:3000/api/v1/collections/' + id)
        .then((res) => {
          this.books = res.data
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
.collections__container {
  margin: 0 auto 0 0;
  min-height: 10vh;
  width: 100vw;
  display: flex;
  flex-wrap: wrap;
}
.map__container {
  width: 80vw;
}
.controller__wrapper {
  width: 20vw;
  padding: 1rem;
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
