import { useHandleError } from "~/composables/useHandleError";
import type { IPost } from "~/types/model";
import type { IUpSavePost } from "~/types/request";
import {
  postInitValue
} from "~/utils/stores/initValue";
  
  export const usePostStore = defineStore("post", () => {
    const { $api } = useNuxtApp();
    const notify = useNotification(useToast);
  
  
  
    const handleError = useHandleError(useToast);
    const postList = ref<IPost[]>([]);
    
    const post = ref<IPost>(postInitValue);
    const postSelectForUpdate = ref<IPost>(postInitValue)
  
    const fetchPostList = async () => {
      try {
        const { data, errors } = await $api.posts.fetchPostList();
        if (errors) {
          throw errors;
        }
        if (data) {
        postList.value = data
        }
      } catch (error) {
        handleError.execute({ error, name: "[stores] fetchPostList" });
      }
    };
    const fetchPost  = async (name: string) => {
      try {
        const { data, errors } = await $api.posts.fetchPost(name);
        if (errors) {
          throw errors;
        }
        if (data) {
          post.value = data;
        }
      } catch (error) {
        handleError.execute({ error, name: "[stores] fetchPost" });
      }
    };

    const createPost = async (dto: IUpSavePost,closeConfirmModal? : () => void) => {
      try {
        const { data, errors } = await $api.posts.createPost(dto);
        if (errors) {
          throw errors;
        }
        if (data) {
          notify.Success({ title: "Create post successully!" });
          if(closeConfirmModal){
            closeConfirmModal()
          }
          fetchPostList()
        }
      } catch (error) {
        handleError.execute({ error, name: "[stores] createPost" });
      }
    };

    const updatePost = async (id:number,dto: IUpSavePost) =>{
      try {
        const { data, errors } = await $api.posts.updatePost(id,dto);
        if (errors) {
          throw errors;
        }
        if (data) {
          notify.Success({ title: "Update post successully!" });
          
        }
      } catch (error) {
        handleError.execute({ error, name: "[stores] updatePost" });
      }
    }

    const deletePost = async (id:number,closeConfirmModal? : () => void) => {
      try {
        const { data, errors } = await $api.posts.deletePost(id);
        if (errors) {
          throw errors;
        }
        if (data) {
          notify.Success({ title: "Delete post successully!" });
          postList.value = postList.value.filter(post => post.id!==id)
          if(closeConfirmModal){
            closeConfirmModal()
          }
        }
      } catch (error) {
        handleError.execute({ error, name: "[stores] deletePost" });
      }
    };
  
    
  
    return { postList,post,fetchPostList,fetchPost,createPost,deletePost};
  });
  