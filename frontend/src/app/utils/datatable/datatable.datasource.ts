import { DataSource } from "@angular/cdk/table";
import { BehaviorSubject, Observable, of } from "rxjs";
import { CollectionViewer } from "@angular/cdk/collections";
import { catchError, finalize } from "rxjs/operators";
import { SubjectService } from "src/app/common/subjects/subject.service";
import { Subject, SubjectApi } from "src/app/common/subjects/subject";

export class DataTableDataSource implements DataSource<Subject> {

    private subject = new BehaviorSubject<Subject[]>([new Subject()]);
    private loadingSubject = new BehaviorSubject<boolean>(false);
    private countSubject = new BehaviorSubject<number>(0);

    public loading$ = this.loadingSubject.asObservable();
    public count$ = this.countSubject.asObservable();

    constructor(private subjectService: SubjectService) {}

    connect(collectionViewer: CollectionViewer): Observable<Subject[]> {
        return this.subject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.subject.complete();
        this.loadingSubject.complete();
        this.countSubject.complete();
    }

    loadSubjects(sortBy: string, sortType: string, pageIndex: number,
        pageSize: number, filter: string) {

        this.loadingSubject.next(true);

        this.subjectService.list(sortBy, sortType, pageIndex,
            pageSize, filter).pipe(
            catchError(() => of(new SubjectApi())),
            finalize(() => this.loadingSubject.next(false))
        )
        .subscribe(subjects => {
            this.countSubject.next(subjects.total);
            return this.subject.next(subjects.items);
        });
    }    
}
