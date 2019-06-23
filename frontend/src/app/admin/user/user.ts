import { SubjectApi, Subject } from "src/app/common/subjects/subject";

export class User implements Subject {
    Name: string;
    UserName: string;
    Email: string;
    Password: string;
}
export class UserApi implements SubjectApi {
    constructor() {}
  
    items: User[] = [];
    total: number = 0;
}