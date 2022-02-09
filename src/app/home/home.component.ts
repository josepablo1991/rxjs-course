import {Component, OnInit} from '@angular/core';
import {Course} from "../model/course";
import {interval, Observable, of, timer,pipe} from 'rxjs';
import {catchError, delayWhen, map, retryWhen, shareReplay, tap} from 'rxjs/operators';
import { createHttpObservable } from '../common/util';
//import { ConsoleReporter } from 'jasmine';


@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    // these elements are not data variables up for mutation 
    // They are definition of data streams
    beginnersCourses$: Observable<Course[]>;

    advancedCourses$: Observable<Course[]>;


    constructor() {

    }

    ngOnInit() {

        // The only prblem with this example is that we are making 2 http requests

        // this is an  imperative design 
        const http$ = createHttpObservable('/api/courses');

        // specify the type of Obsevable 
        const courses$: Observable<Course[]> = http$
        .pipe(
            map( res => Object.values(res["payload"]))
        );

        // every subscription generates a request since the  courses$ is just a 
        // definition of the observable and not a method() that instanciates a stream
        courses$.subscribe()

        this.beginnersCourses$ = courses$
        .pipe(
            map(courses => courses
                .filter(course => course.category == 'BEGINNER' ))
        );

        this.advancedCourses$ = courses$
        .pipe(
            map(courses => courses
                .filter(course => course.category == 'ADVANCED' ))
        );

    }

}
