import type { IPost } from "~/types/model";
import FetchFactory from "../factory";
import type { IAuthenticate, IResponse } from "~/types/response";
import type { IUpSavePost } from "~/types/request";
import type { ICreateReview } from "~/types/request";
import type { ICreateReviewResponse } from "~/types/response";
import Routes from "../routes";
class AuthModule extends FetchFactory {
    private RESOURCE = Routes.AUTH;
    private accessToken : string = ''
    async authenticate() {
      return  this.call<IResponse<IAuthenticate>>(
        {method:'GET',url:`${this.RESOURCE.authenticate}`,fetchOptions:{
          headers:{
            'X-Rest-Api':'Version-1',
            ...(this.accessToken ? {
              'Authorization':`Bearer ${this.accessToken}`
            }  : {} )
          }
        }}
      )
    }
    setAccessToken(accessToken : string){
      this.accessToken = accessToken;
    }

  }
  
  export default AuthModule;