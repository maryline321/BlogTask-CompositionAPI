<template>
  <div>
    <div v-if="!submitted" class="form-overlay" @click="toggleForm()">
      <div class="form-content" @click.stop>
        <button class="close" @click="toggleForm()">Close</button>
        <h2>Create New Post</h2>

        <div class="main-block">
          <form @submit.prevent="postSubmit">
            <div class="form-group">
              <label for="title" class="label">Title</label>
              <input class="input-field" type="text" id="title" v-model="title" placeholder="Enter Title" @click.stop/>
              <div v-if="errors.title" class="error-message">{{ errors.title[0] }}</div>
            </div>
            <div class="form-group">
              <label for="description" class="label">Description</label>
              <textarea rows="4" class="textarea-field" v-model="description" placeholder="Enter Description" @click.stop></textarea>
              <div v-if="errors.description" class="error-message">{{ errors.description[0] }}</div>
            </div>
            <div class="form-group">
              <label>Select Tags</label>
              <div v-for="tag in all_tags" :key="tag.id">
                <label>
                  <input type="checkbox" :value="tag.id" v-model="selectedTags">
                  {{ tag.name }}
                </label>
              </div>
              <div v-if="errors.tags" class="error-message">{{ errors.tags[0] }}</div>
            </div>
            <button type="submit" class="submit-button">Submit</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, onBeforeMount } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();
const all_tags = ref([]);
// const val = ref([]);
const selectedTags = ref([]);

const title = ref('');
const description = ref('');
const tags = ref('');
const submitted = ref(false);
const errors = ref({});

const redirectToPost = () => {
  router.push('/');
}

onBeforeMount(async () => {
  let config = {
    method: 'get',
    url: 'http://127.0.0.1:8000/api/tags',
    headers: {
      'Content-Type': 'application/json'
    },
  }

  try {
    const response = await axios(config);

    all_tags.value = response.data.data;
  } catch (error) {
    console.error('Error:', error);
  }
});

const postSubmit = async () => {
  try {
    let config = {
      method: 'post',
      url: 'http://127.0.0.1:8000/api/addpost',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        title: title.value,
        description: description.value,
        tag_id: tags.value
      }
    }

    await axios(config);

    redirectToPost();

    submitted.value = true;

    title.value = '';
    description.value = '';
    tags.value = '';
  } catch (error) {
    console.error('Error:', error.response?.data);

    if (error.response && error.response.status === 422) {
      errors.value = error.response.data.errors;
    }
  }
};

const toggleForm = () => {
  submitted.value = !submitted.value;
};
</script>





<style scoped>
.form-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6); 
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999; 
}

.form-content {
  width: 80%; 
  max-width: 600px; 
  padding: 25px;
  box-shadow: 0 2px 5px #f5f5f5;
  background: #ffffff;
}

.main-block {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
  width: 100%;
}

form {
  width: 100%;
  padding: 25px;
  margin: 25px;
  box-shadow: 0 2px 5px #f5f5f5;
  background: #ffffff;
}

.fas {
  margin: 25px 10px 0;
  font-size: 72px;
  color: #fff;
}

.fa-envelope {
  transform: rotate(-20deg);
}

.fa-at,
.fa-mail-bulk {
  transform: rotate(10deg);
}

input,
textarea {
  width: calc(100% - 18px);
  padding: 8px;
  margin-bottom: 20px;
  border: 1px solid #1c87c9;
  outline: none;
}

input::placeholder {
  color: #666;
}

button {
  width: 100%;
  padding: 10px;
  border: none;
  background: #1c87c9;
  font-size: 16px;
  font-weight: 400;
  color: #fff;
  cursor: pointer; 
}
.main-block {
  margin-top: 20px;
}

.form-group {
  margin-bottom: 20px;
}

.label {
  font-weight: bold;
}

.close {
  width: fit-content; 
  padding: 8px 12px; 
  position: absolute;
  bottom: 100px;
  right: 450px; 
  border: none;
  background: #c9331c;
  font-size: 16px;
  font-weight: 400;
  color: #fff;
}

.close:hover {
  background: #a02323;
}

button:hover {
  background: #2371a0;
}

@media (min-width: 568px) {
  .main-block {
    flex-direction: row;
  }

  .left-part,
  form {
    width: 50%;
  }

}

.success-message {
  margin-top: 10px;
  color: #3c763d;
  background-color: #dff0d8;
  border: 1px solid #d0e9c6;
  padding: 10px;
  border-radius: 5px;
}

.error-message {
  margin-bottom: 5px;
  color: #b80000;
}
.label{
  font-size: 12px;
  text-align: left;
}
.input-field,
  .textarea-field,
  .select-field {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  select {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    padding: 10px;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M2 10 L16 26 30 10 Z'/%3E%3C/svg%3E"),
      linear-gradient(to bottom, #ffffff 0%,#e5e5e5 100%);
    background-repeat: no-repeat, repeat;
    background-position: right 10px top 50%, 0 0;
    background-size: 10px auto, 100%;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
    font-family: 'Arial', sans-serif;
    color: #333;
  }

  /* Remove the default arrow icon in Firefox */
  select::-ms-expand {
    display: none;
  }
 
</style>
