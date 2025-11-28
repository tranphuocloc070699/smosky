export default defineNuxtPlugin((nuxtApp) => { 
    const boilerplateStore = useBoilerplateStore();  
    const postStore = usePostStore()  
    if(process.server)
    {
         useAsyncData('fetchPostList', () => boilerplateStore.fetchBoilerplateList())
         useAsyncData('fetchBlogList', () => postStore.fetchPostList())
    }

})