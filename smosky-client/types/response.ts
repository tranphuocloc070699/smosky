import type { IBoilerplate, IProjectStructure, IReview, ITag, IUser } from "./model";

export interface IBoilerplatePreviewResponse {
  projectStructure: IProjectStructure;
  downloadUrl: string;
}


export interface ICreateReviewResponse {
  id: number;
  name: string;
  email: string;
  content: string;
  star: number;
  createdAt: Date;
  updatedAt: Date;
  totalReview: number;
  starAvg: number;
  oneStar: number;
  twoStar: number;
  threeStar: number;
  fourStar: number;
  fiveStar: number;
}

export interface IFetchAllBoilerplate {
  boilerplates: IBoilerplate[];
  tags: ITag[];
}

export interface IResponse<T> {
  status: number;
  data: T;
  errors: string[];
  message: string;
  path: string;
}

export interface IAuthenticate {
  accessToken: string;
  user:IUser
}

export interface IFetchAllReview{
  boilerplateName:string;
  reviews:IReview[]
}
