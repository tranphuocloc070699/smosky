import type { IBoilerplate, IPost } from "~/types/model";
import FetchFactory from "../factory";
import type { IBoilerplatePreviewResponse, IFetchAllBoilerplate, IResponse } from "~/types/response";
import type { IDownloadBoilerplateFromPreview } from "~/types/request";
import Routes from "../routes";
class BoilerplatesModule extends FetchFactory {
    private RESOURCE = Routes.BOILERPLATE.SPRING;
    private accessToken : string = ''

    setAccessToken(accessToken : string){
      this.accessToken = accessToken;
    }
    async fetchBoilerplateList() {
      return this.call<IResponse<IFetchAllBoilerplate>>(
        {method:'GET',url:`${this.RESOURCE}`}
      )
    }
    async fetchBoilerplate(name:string) {
      return this.call<IResponse<IBoilerplate>>(
        {method:'GET',url:`${this.RESOURCE}/${name}`,fetchOptions:{
          headers:{
            'X-Rest-Api':'Version-1',
            ...(this.accessToken ? {
              'Authorization':`Bearer ${this.accessToken}`
            }  : {} )
          }
        }}
      )
    }

    async downloadBoilerplate(dto : any) {

      return this.call<Blob>(
        {
          method:'POST',
          url:`${this.RESOURCE}`,
          body:dto,
          fetchOptions:{
            responseType:'blob'
          }
        }
      )
    }
    async previewBoilerplate(dto : any) {
      return this.call<IResponse<IBoilerplatePreviewResponse>>(
        {
          method:'POST',
          url:`${this.RESOURCE}/preview`,
          body:dto
        }
      )
    }
    async downloadBoilerplateFromPreviewUrl(dto : IDownloadBoilerplateFromPreview) {
      return this.call<Blob>(
        {
          method:'POST',
          url:`${this.RESOURCE}/preview/download`,
          body:dto,
          fetchOptions:{
            responseType:'blob'
          }
        }
      )
    }
  }
  
  export default BoilerplatesModule;