
import { ref,onBeforeMount} from "vue"
import axios from "axios";


export default function usePosts(){

    const posts =ref([])
    const submitted = ref(false);
    const all_tags=ref([])
    const errors = ref({});
   

    const getPosts = async () => {

        let response = await axios.get("http://localhost:8000/api/posts");
        posts.value=response.data.data;

    }

    const postSubmit = async (title,description,tags) => {

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
   

    const fetchPosts = async (route,posts)  =>{
        await axios
          .get("http://localhost:8000/api" + route)
          .then((response) => {
            posts.value = response.data[0].posts;
          })
          .catch((error) => {
            console.error(error);
          });
      };

      
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

    return{
        posts,
        errors,
        all_tags,
        getPosts,
        postSubmit,
        fetchPosts


    }
}