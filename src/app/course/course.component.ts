import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Course} from "../model/course";
import {
    debounceTime,
    distinctUntilChanged,
    startWith,
    tap,
    delay,
    map,
    concatMap,
    switchMap,
    withLatestFrom,
    concatAll, shareReplay
} from 'rxjs/operators';
import {merge, fromEvent, Observable, concat} from 'rxjs';
import {Lesson} from '../model/lesson';
import { createHttpObservable } from '../common/util';


@Component({
    selector: 'course',
    templateUrl: './course.component.html',
    styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit, AfterViewInit {

    courseId: string;
    course$: Observable<Course>;
    lessons$: Observable<Lesson[]>;


    @ViewChild('searchInput', { static: true }) input: ElementRef;

    constructor(private route: ActivatedRoute) {


    }

    ngOnInit() {

        this.courseId = this.route.snapshot.params['id'];        

        this.course$ = createHttpObservable(`/api/courses/${this.courseId}`)


    }

    ngAfterViewInit() {
        // getting initial values and this Observable represents the value stream
        const initialLessons$ = this.loadLessons();
       
        // get values from the output stream
        // to avoid many requests and make stable observable values we use debounceTime 
        // to avoid requesting on duplicates we use distinctUntilChange
        const searchLessons$ = fromEvent<any>(this.input.nativeElement,'keyup')
            .pipe(
                map(event => event.target.value),
                debounceTime(400),
                distinctUntilChanged(),
                switchMap(search => this.loadLessons(search))
            )

        this.lessons$ = concat(initialLessons$, searchLessons$);

    }


    loadLessons(search = ''): Observable<Lesson[]> {
        return  createHttpObservable(`/api/lessons?courseId=${this.courseId}&pageSize=100&filter=${search}`)
            .pipe(
                map(res => res["payload"])
            );
    }




}
