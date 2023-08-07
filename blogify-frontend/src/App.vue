<template>
  <div class="app-container">
    
   
  
   <main>
    <MainBar :toggleForm="toggleForm" />
    <!-- <PostList /> -->
    <PostForm  v-if="formActive" :toggleForm="toggleForm"/>

   
    <!-- <PostDetails /> -->
   
   </main>
  
   

  </div>
  <RouterView/>
</template>

<script>

// import PostList from "./components/PostList.vue";
import PostForm from "./components/PostForm.vue";
import MainBar from "./components/MainBar.vue";
import { ref } from 'vue'
// import { RouterView } from "vue-router";
// import PostDetails from "./components/PostDetails.vue";

export default {
  name: 'App',
  components:{
    // PostList,
    MainBar,
    PostForm,
    
    // PostDetails
},

setup (){

  const formActive =ref (false);

  const toggleForm = (id=false)=>{
    formActive.value=!formActive.value;

    console.log(id);
  }

  return{
    formActive,
    toggleForm
  }
},

 data() {
    return {
      post: null, 
    };
    },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
