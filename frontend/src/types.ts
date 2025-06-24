export interface User {
    _id: string;
    firstName: string;
    lastName: string;
    email?: string;
    friends?: Friend[];
    views?: string[];
    verified?: boolean;
    createdAt?: string;
    updatedAt?: string;
    profileUrl?: string;
    token?: string;
    profession?: string;
    location?: string;
  }


export interface Friend {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    friends?: string[];
    views?: string[];
    verified?: boolean;
    createdAt?: string;
    updatedAt?: string;
    __v?: number;
    profileUrl?: string;
    location?: string;
    profession?: string;
  }

export interface ErrMsg {
    message: string;
    status: string
}