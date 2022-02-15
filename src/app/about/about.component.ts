import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { response } from 'express';
import { concat, fromEvent, interval, merge, Observable, of, timer } from 'rxjs';
import { map, subscribeOn } from 'rxjs/operators';
import { createHttpObservable } from '../common/util';

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit() {






    // const interval$ = interval(1000)

    // // timer takes 2 arguments (delay before sarting the stream, the time interval)
    // const timer$ = timer(3000,1000)

    // // to handle click events 
    // const click$ = fromEvent(document, 'click')

    // const sub =  interval$.subscribe(val => {
    //   console.log('stream that can be unsubscribed--->' + val);
    // })


    // setTimeout(()=>{sub.unsubscribe()}, 5000)



    // interval$.subscribe(val => {
    //   console.log('stream 1--->' + val);

  
    // })

    // interval$.subscribe(val => {
    //   console.log('stream 2--->' + val);
      
    // })

    // timer$.subscribe(val => {
    //   console.log('stream of timer --->' + val );
    // })

    // click$.subscribe( 
    //   val => {
    //   console.log('Stream of click 1 ---> '+ val);
    //   }, 
    //   err => {
    //   console.log(err);
    //   },
    //   () => {
    //     console.log('The stream is completed');
        
    //   })



    // Introducing Observable concatenation 
    // // The of() helps us defining different types of observables

    // const source1$ = of(1,2,3);
    // const source2$ = of(4,5,6);
    // const source3$ = of(7,8,9);

    // // by using the concat function we merge observables in a logical order 
    // // since nothing is subscribed yet then the observables wont activate 
    // const result$ = concat(source1$,source2$,source3$)

    // // here we subscribe to the function and then ir fires
    // result$.subscribe(val => {
    //   console.log(val);
    // })

    // Using the merge Observable 
    // ideal for long running operations in paralel 

    // const interval1$ = interval(1000);

    // const interval2$ = interval1$.pipe(map(val => val * 10));

    // const result$ = merge(interval1$, interval2$);

    // result$.subscribe(console.log);
    
    //  const interval1$ = interval(1000);

    //  const sub = interval1$.subscribe(console.log);
    //   // with this we can unsubscribe 
    //  setTimeout(()=> sub.unsubscribe(),5000);

    const http$ = createHttpObservable('/api/courses');

    const sub = http$.subscribe(console.log);

    // here we add a time of 0 because this means that the 
    // request passes through but the 
    setTimeout(()=>{
      sub.unsubscribe()
    },0)
    
     
    


  }

}

