  <script>
  import Book from "./Book.js"
  export default {
    name: 'ComicBook',
    extends: Book
  };
  </script>
  
  <style scoped>
  /* Style for individual comic book row */
  td {
    padding: 10px;
    font-weight: normal;
    color: #555;
  }
  </style>
  