<template>
  <div>
    <div @click="handlePostClick">
      <h5 v-if="post && post.title">{{ post.title }}</h5>
      <p v-if="post && post.description" class="descr">{{ post.description }}</p>
    </div>
    <div v-for="tag in post.tags" :key="tag.id">
      <a v-if="post && post.tags"
        class="tag-button" 
        style="display: flex; color:red; font-size-14px;text-decoration: none; flex-direction:row;"
        :href="`/tags/${tag.id}`">{{ tag.name }}</a>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  post: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['post-clicked']); 

function handlePostClick() {
  emit("post-clicked", props.post);
}
</script>
