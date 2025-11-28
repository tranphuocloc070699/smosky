import type { IBoilerplate, IPost } from "~/types/model";
import type {
  IDownloadBoilerplateFromPreview,
  IUpSavePost,
} from "~/types/request";
import type {
  IBoilerplatePreviewResponse,
  IFetchAllBoilerplate,
  IResponse,
} from "~/types/response";

export default function () {
  const config = useRuntimeConfig();
  const BASE_URL_BOILERPLATE_SERVER =
    config.public.NUXT_BASE_URL_BOILERPLATE_SERVER;
  return {
    fetchAll() {
      return useFetch<IResponse<IPost[]>>(
        `${BASE_URL_BOILERPLATE_SERVER}/blog`,
        {
          key: "blog-list",
          method: "get",
          retry: 3,
        }
      );
    },
    fetchDetail(slug: string) {
      return useFetch<IResponse<IPost>>(
        `${BASE_URL_BOILERPLATE_SERVER}/blog/${slug}`,
        {
          key: "blog-detail",
          method: "get",
          retry: 3,
        }
      );
    },
    createPost(dto: IUpSavePost) {
      return useFetch<IResponse<IPost>>(`${BASE_URL_BOILERPLATE_SERVER}/blog`, {
        key: "create-post",
        method: "post",
        body: dto,
        immediate: false,
        watch: false,
      });
    },
    updatePost(id: number, dto: IUpSavePost) {
      return useFetch<
        IResponse<{
          post: IPost;
          affects: string[];
        }>
      >(`${BASE_URL_BOILERPLATE_SERVER}/${id}`, {
        key: "update-post",
        method: "put",
        body: dto,
        immediate: false,
        watch: false,
      });
    },
    deletePost(id: number) {
      return useFetch<Blob>(`${BASE_URL_BOILERPLATE_SERVER}/${id}`, {
        key: "delete-post",
        method: "delete",
        immediate: false,
        watch: false,
      });
    },
  };
}
