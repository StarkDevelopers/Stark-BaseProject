import { Observable } from "rxjs";
import { SubjectApi } from "./subject";

export interface SubjectService {
    list(sortBy: string, sortType: string, pageIndex: number,
        pageSize: number, filter: string): Observable<SubjectApi>;
}