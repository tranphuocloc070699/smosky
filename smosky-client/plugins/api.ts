import PostsModule from "~/repository/modules/posts";
import BoilerplatesModule from "~/repository/modules/boilerplates";
import ReviewsModule from "~/repository/modules/reviews";
import AuthModule from "~/repository/modules/auth";
export interface IApiInstance {
  posts: PostsModule;
  boilerplates: BoilerplatesModule;
  reviews: ReviewsModule;
  auth: AuthModule;
}

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  const notify = useNotification(useToast);
  const handleError = useHandleError(useToast);

  const authStore = useAuthStore()

  const NUXT_BASE_URL_PROXY_SERVER = config.public.NUXT_BASE_URL_PROXY_SERVER;
  const apiFetcher = $fetch.create({
    baseURL: NUXT_BASE_URL_PROXY_SERVER,
    onRequest({ request, response }) { },
  });

  const postsModule = new PostsModule(apiFetcher);
  const boilerplatesModule = new BoilerplatesModule(apiFetcher);
  const reviewsModule = new ReviewsModule(apiFetcher);
  const authModule = new AuthModule(apiFetcher);

  const modules: IApiInstance = {
    posts: postsModule,
    boilerplates: boilerplatesModule,
    reviews: reviewsModule,
    auth: authModule,
  };
  // if (process.client) {

  //     modules.auth
  //         .authenticate()
  //         .then((data) => {
  //           if (data.data.user ) {
  //             authStore.user = data.data.user
  //           }
  //           if(data.data.accessToken){
  //             authModule.setAccessToken(data.data.accessToken);
  //             postsModule.setAccessToken(data.data.accessToken);
  //             boilerplatesModule.setAccessToken(data.data.accessToken);
  //           }
  //         })
  //         .catch((err: any) => {


  //           if (err?.statusCode !== 403) {
  //             handleError.execute({ error: err, name: "[auth] authenticate" });
  //           }
  //         });

  // }

  return {
    provide: {
      api: modules,
    },
  };
});
