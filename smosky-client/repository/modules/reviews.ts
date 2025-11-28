import type { IPost } from "~/types/model";
import FetchFactory from "../factory";
import type { IFetchAllReview, IResponse } from "~/types/response";
import type { IUpSavePost } from "~/types/request";
import type { ICreateReview } from "~/types/request";
import type { ICreateReviewResponse } from "~/types/response";
import Routes from "../routes";
class ReviewsModule extends FetchFactory {
    private ADMIN_RESOURCE = Routes.ADMIN;
    private REVIEW_RESOURCE = Routes.REVIEW;
    
    async createReview(dto : ICreateReview) {
      return  this.call<IResponse<ICreateReviewResponse>>(
        {method:'POST',url:`${this.REVIEW_RESOURCE}`,body:dto}
      )
    }

    async fetchReviewList() {
      return  this.call<IResponse<IFetchAllReview>>(
        {method:'GET',url:`${this.ADMIN_RESOURCE}`}
      )
    }

  }
  
  export default ReviewsModule;