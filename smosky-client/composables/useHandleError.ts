import type { IUseHandleError, IUseHandleErrorProps } from "~/types/composables"
import type { IResponse } from "~/types/response"
import type {IToast} from '@/types/composables'
import NotifyData from "~/utils/notify-data"


  

export const useHandleError = (useToast : any) : IUseHandleError =>{
    const notify = useNotification(useToast)

    const handleErrorListToString = (errors:string[]) =>{
        let error = '';
        if(errors.length===1){
            error = `[${errors[0]}]`
        }else{
            error = errors.reduce((accumulator, currentValue,index) =>{
                if(index===0){
                    return accumulator + `[${currentValue},`
                }else if(index===errors.length-1){
                    return accumulator + `${currentValue},`
                }else{
                    return accumulator + `${currentValue}]`
                }  
            },'')
        }
        return error
    }
    return{
        execute:(props : IUseHandleErrorProps) =>{
  
           try {
            let consoleErrorMessage = '';
            let notifyErrorMessage : IToast = {title:''};
            if(props?.error?.data){
               if(props?.error?.response?.statusText){
                const errorMessage = props?.error?.response?.statusText
                const errorStatus = props?.error?.response?.status
                notifyErrorMessage = {
                    title:`${errorStatus}`,
                    description:errorMessage
                }
                consoleErrorMessage = `${props.name}: [Cannot connect to server] ${JSON.stringify(props.error)}`;
               }else{
                const response = props?.error?.data as IResponse<null>
                
                notifyErrorMessage = {
                    title:response.message,
                    description:Array.isArray(response.errors) ? handleErrorListToString(response.errors) : response.errors
                }
                consoleErrorMessage = `${props.name}: [instance of IResponse] ${JSON.stringify(props.error)}`;
               }
             
            }else if(props.error instanceof Error && props.error.message){
                notifyErrorMessage = {
                    title:props.error.message,
                }
                consoleErrorMessage= `${props.name}: [instance of Error] ${JSON.stringify(props.error.message)}`;
            }else{
                notifyErrorMessage = {
                    title:NotifyData.INTERNAL_SERVER_ERROR
                }
                consoleErrorMessage= `${props.name}: ${JSON.stringify(props.error)}`;
            }
            console.error(consoleErrorMessage)
            notify.Danger(notifyErrorMessage);
           } catch (error) {
            notify.Danger({title:NotifyData.INTERNAL_SERVER_ERROR});
           }
        },

    }

}