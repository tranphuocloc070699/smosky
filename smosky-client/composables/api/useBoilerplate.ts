import type { IBoilerplate } from "~/types/model";
import type { IDownloadBoilerplateFromPreview } from "~/types/request";
import type { IBoilerplatePreviewResponse, IFetchAllBoilerplate, IResponse } from "~/types/response";


export default function () {
  const {$api} = useNuxtApp();
  const config = useRuntimeConfig()
  const BASE_URL_BOILERPLATE_SERVER = config.public.NUXT_BASE_URL_BOILERPLATE_SERVER
    return {
      fetchAll(){
        return useFetch<IResponse<IFetchAllBoilerplate>>(`${BASE_URL_BOILERPLATE_SERVER}/spring`,{
          key:'boilerplate-list',
          method:'get',
          retry:3
        });
      },
      fetchDetail(name : string){
        return useFetch<IResponse<IBoilerplate>>(`${BASE_URL_BOILERPLATE_SERVER}/spring/${name}`,{
          key:"boilerplate-detail",
          method:'get',
          retry:3
        });
      },
      createBoilerplate(dto : any){
        return useFetch<Blob>(`${BASE_URL_BOILERPLATE_SERVER}/spring`,{
          key:"create-boilerplate",
          method:'post',
          body:dto,
          responseType:'blob',
          immediate:false,
          watch:false,

        });
      },
      createPreviewBoilerplate(dto : any){
        return useFetch<IBoilerplatePreviewResponse>(`${BASE_URL_BOILERPLATE_SERVER}/spring/preview`,{
          key:"create-preview-boilerplate",
          method:'post',
          body:dto,
          immediate:false,
          watch:false,
    
        });
      },
    downloadBoilerplateFromPreview(dto : IDownloadBoilerplateFromPreview){
        return useFetch<Blob>(`${BASE_URL_BOILERPLATE_SERVER}/spring/preview/download`,{
          key:"download-boilerplate-from-preview",
          method:'post',
          body:dto,
          responseType:'blob',
          immediate:false,
          watch:false,
        });
      }

    };
  }