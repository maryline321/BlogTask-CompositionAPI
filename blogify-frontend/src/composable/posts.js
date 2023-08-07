
import { ref } from "vue"
import axios from "axios";

export default function usePosts(){


    // const post =ref([]);
    const posts =ref([])

    const getPosts = async () => {

        let response = await axios.get("http://localhost:8000/api/posts");
        posts.value=response.data.data;

    }


    return{
        posts,
        getPosts


    }
}