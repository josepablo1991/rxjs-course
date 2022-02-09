import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { response } from 'express';
import { fromEvent, interval, Observable, timer } from 'rxjs';
import { map } from 'rxjs/operators';
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


  }

}

