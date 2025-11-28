import { useHandleError } from "~/composables/useHandleError";
import type {
  ICreateReview
} from "~/types/request";

export const useReviewStore = defineStore("review", () => {
  const { $api } = useNuxtApp();
  const notify = useNotification(useToast);

  const handleError = useHandleError(useToast);
  const boilerplateStore = useBoilerplateStore();


  const fetchReviewList = async () =>{
    try {
      const { data, errors } = await $api.reviews.fetchReviewList();
      if (errors) {
        throw errors;
      }
      if (data) {
        
      }
    } catch (error) {
      handleError.execute({ error, name: "[stores] createReview" });
    }
  }

  const createReview = async (dto: ICreateReview) => {
    try {
      const { data, errors } = await $api.reviews.createReview(dto);
      if (errors) {
        throw errors;
      }
      if (data) {
        boilerplateStore.boilerplate.totalReview = data.totalReview;
        boilerplateStore.boilerplate.starAvg = Math.round(data.starAvg);
        boilerplateStore.boilerplate.oneStar = data.oneStar;
        boilerplateStore.boilerplate.twoStar = data.twoStar;
        boilerplateStore.boilerplate.threeStar = data.threeStar;
        boilerplateStore.boilerplate.fourStar = data.fourStar;
        boilerplateStore.boilerplate.fiveStar = data.fiveStar;
        boilerplateStore.boilerplate?.reviews.unshift({
          id: data.id,
          name: data.name,
          email: data.email,
          star: data.star,
          content: data.content,
          createdAt: data.createdAt,
          updatedAt: data.updatedAt,
        });

        notify.Success({ title: "Create review successully!" });
      }
    } catch (error) {
      handleError.execute({ error, name: "[stores] createReview" });
    }
  };

  return { createReview };
});
