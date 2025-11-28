export interface INavigation{
    title:string;
    link:string;
    isActive:boolean;
}

export interface IAppTitle{
    title:string;
    iconName:string;

}

export interface IValidationErrorItem {
    invalid: boolean;
    message: string;
  }

  export interface IConfirmModal{
    open:boolean,
    message:string,
    notice?:string
  }

export  interface IVoting {
  star: number;
  isHover: boolean;
  isActive: boolean;
}

export interface IColumn{
  key:string;
  label:string;
}

