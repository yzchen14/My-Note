import BookShell  from "./dist/BookShell.js"



const app = Vue.createApp({})
app.component('my-component', BookShell)
app.mount("#app");








