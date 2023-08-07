<template>
  <div>
    <h2 style="text-align: left;">Posts List</h2>

    <div v-if="posts.length === 0">No posts available.</div>

    <div v-else>
      <PostDetails
        v-for="post in posts"
        :key="post.id"
        :post="post"
        @post-clicked="viewPost"
        class="post-container"
      />
    </div>

    <div v-if="selectedPost">
      <div class="modal">
        <button class="close-button" @click="closePost">Close</button>
        <div class="modal-content">
          <h2>{{ selectedPost.title }}</h2>
          <p class="description">{{ selectedPost.description }}</p>
          <p class="tag-button">{{ selectedPost.tags.name }}</p>
        </div>
      </div>
      <div class="modal-overlay" @click="closePost"></div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, computed, onMounted } from 'vue';
import { useRoute } from "vue-router";
import PostDetails from "./PostDetails.vue";

const posts = ref([]);
// const expandedDescriptions = ref({});
const selectedPost = ref(null);

// Assuming the response data is an array of posts
const fetchPosts = (route) => {
  axios
    .get("http://localhost:8000/api" + route)
    .then((response) => {
      posts.value = response.data[0].posts;
    })
    .catch((error) => {
      console.error(error);
    });
};


const viewPost = (post) => {
  selectedPost.value = post;
};

const closePost = () => {
  selectedPost.value = null;
};

const route = useRoute();
const tag = computed(() => route.params.tag);
const tag_id = ref(tag.value);

onMounted(() => {
  if (tag_id.value) {
    fetchPosts('/tags/' + tag_id.value);
  }
});

</script>

  
  <style>
  .post-container {
    border: 1px solid #ccc;
    margin-bottom: 10px;
    padding: 10px;
    max-width: 100%;
    margin: 0 auto;
    cursor: pointer;
    text-align: left; 
  }
  
  .modal {
    position: fixed;
    top: 50%; 
    left: 50%; 
    transform: translate(-50%, -50%); 
    background-color: #f7f7f7;
    padding: 20px;
    border-radius: 5px;
    z-index: 9999; 
    width: 80%; 
    max-width: 600px; 
    height: 70%; 
    max-height: 80vh; 
  
  }
  .modal-content {
    text-align: left; 
  }
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 9998; 
  }
  .close-button {
    position: absolute;
    top: 10px; 
    left: 550px; 
    background-color: blue;
    border: 1px solid;
    cursor: pointer;
    font-size: 12px;
  }
  
  .tag-button {
  
    color: blue;
    cursor: pointer;
    transition: color 0.2s; 
    font-size: 12px;
  }
  
  .tag-button:hover {
    color: blue; 
  }
  .description {
    font-size: 14px; 
    
    margin: 10px 0;
  
    white-space: normal;
  }
  .descr{
    font-size: 12px; 
    margin: 10px 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  .error-message {
    color: #b80000; 
    font-size: 12px;
    text-align: left;
    margin-top: 0;
  }
  </style>