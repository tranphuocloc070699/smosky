import type {IValidationErrorItem} from './components'

export interface ICreateBoilerplate{
        type:string,
        bootVersion:string,
        metadata:ICreateBoilerplateSpringMetadata
        dependencies:ICreateBoilerplateDependency[],
        entities:ICreateBoilerplateEntity[];
        crud:boolean;
}

export interface ICreateBoilerplateSpringMetadata{
    groupId:{
        value:string,
        error:IValidationErrorItem
    },
    artifactId:{
        value:string,
        error:IValidationErrorItem
    },
    name:{
        value:string,
        error:IValidationErrorItem
    },
    description:string,
    packaging:'jar' | 'war'
    jvmVersion:number
}
export interface ICreateBoilerplateDependency{
    id:string,
    properties:ICreateBoilerplateDependencyProperty[]
}

export interface ICreateBoilerplateDependencyProperty{
    id:string,
    value:string
}

export interface ICreateBoilerplateEntity{
    name:string
    templates:ICreateBoilerplateEntityTemplate[]
}
export interface ICreateBoilerplateEntityTemplate{
    id?:number;
    name:string;
    type:string;
    primary:boolean;
    disable:boolean;
    required:boolean;
    validation:number[];
    alreadyHasPrimary:boolean;
    mappedBy:string | null;
    referencedColumnName:string | null;
    error:{
        invalid:boolean;
        message:string;
    }
}

export interface ICreateReview{
    boilerplateId:number;
    name:string;
    email:string;
    content:string;
    star:number;
}

export interface IDownloadBoilerplateFromPreview{
    downloadUrl:string;
    fileName:string
}


export interface IUpSavePost{
    title:string;
    slug:string;
    content:string;
    preContent:string;
    thumbnail:string;
    toc:ICreatePostToc[]
}

export interface ICreatePostToc{
    title:string;
    link:string;
    type:string;
}
