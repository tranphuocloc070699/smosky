export interface IUseHandleErrorProps {
    error:any;
    name:string
}

export interface  IUseHandleError {
    execute: (props: IUseHandleErrorProps) => void;
  }

export interface IToast {
    title: string;
    description?: string;
  }