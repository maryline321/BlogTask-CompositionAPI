import { createRouter, createWebHistory } from 'vue-router';
import PostList from '@/components/PostList.vue';
import PostForm from '@/components/PostForm.vue';
import PostDetails from '../components/PostDetails.vue';
import TagItems from '../components/TagItems.vue';



const router = createRouter({
  history: createWebHistory(),
  routes: [
 
    {
      path: '/',
      name: "postsList",
      component: PostList,
    },
    {
      path: '/addpost',
      name:'createPost',
      component: PostForm,
    },
    {
      path: '/post/:id',
      name: "postDetails",
      component: PostDetails,
      props: true,
    },
    {
      path: '/tags/:tag',
      name:'postTags',
      component: TagItems,
    },
  ]
  ,
});

export default router;
