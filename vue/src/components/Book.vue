<template>
    <tr>
      <td>{{ book.title }}</td>
      <td>{{ book.author }}</td>
      <td>{{ book.year }}</td>
      <td>{{ book.genre }}</td>
    </tr>
  </template>
  
  <script>
  export default {
    name: 'Book',
    props: {
      book: {
        type: Object,
        required: true
      }
    },
    methods: {
        
    },
    mounted(){
        console.log(this.book);
    }
  };
  </script>
  
  <style scoped>
  /* Style for individual book row */
  td {
    padding: 8px;
    font-weight: bold;
  }
  </style>
  