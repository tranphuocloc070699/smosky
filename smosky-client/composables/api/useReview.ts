
import type { ICreateReview } from "~/types/request";
import type { ICreateReviewResponse } from "~/types/response";


export default function () {
  const config = useRuntimeConfig()
  const BASE_URL_BOILERPLATE_SERVER = config.public.NUXT_BASE_URL_BOILERPLATE_SERVER
    return {
      createReview(dto : ICreateReview){
        return useFetch<ICreateReviewResponse>(`${BASE_URL_BOILERPLATE_SERVER}/review`,{
          key:"create-review",
          method:'post',
          body:dto,
        });
      }

    };
  }