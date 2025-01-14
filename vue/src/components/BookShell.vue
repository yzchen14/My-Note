<template>
    <div>
      <table border="1" class="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Year</th>
            <th>Genre</th>
          </tr>
        </thead>
        <tbody>
          <!-- Render each book using the Book component -->
          <ComicBook v-for="book in books" :key="book.id" :book="book" />
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import ComicBook from "./ComicBook.js"
  
  export default {
    name: 'BookShell',
    components: {
    ComicBook
    },
    data() {
      return {
        books: [] // Initialize an empty array for books
      };
    },
    methods: {
      // Simulate a query to the server
      async queryFromServer() {
        try {
          // Simulate fetching data from a server (replace with actual API call)
          const fakeData = [
            { id: 1, title: "Book One", author: "Author One", year: 2020, genre: "Fiction" },
            { id: 2, title: "Book Two", author: "Author Two", year: 2021, genre: "Non-Fiction" },
            { id: 3, title: "Book Three", author: "Author Three", year: 2022, genre: "Fantasy" },
            { id: 4, title: "Book Four", author: "Author Four", year: 2019, genre: "Sci-Fi" },
            { id: 5, title: "Book Five", author: "Author Five", year: 2021, genre: "Mystery" }
          ];

          // Update the books array with the fetched data
          this.books = fakeData;
        } catch (error) {
          console.error('Error fetching books:', error);
        }
      }
    },
    mounted() {
      // Call queryFromServer when the component is mounted
      this.queryFromServer();
    }
  };
  </script>
  
  <style>
  /* Style for the table */
  table {
    width: 100%;
    border-collapse: collapse;
  }
  
  th, td {
    padding: 8px;
    text-align: left;
  }
  
  thead {
    background-color: #f2f2f2;
  }

  .good{
    color: green;

  }
  </style>
  