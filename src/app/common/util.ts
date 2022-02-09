import { Observable } from "rxjs";


export function createHttpObservable(url: string): any{
    // the crete method takes in a function 
    const http$ = Observable.create(observer => {
    // observer.next() || observer.error() || observer.complete()

    // We start with a method that returns a Promise
    fetch(url)
      .then(response => {
        
        return response.json()
      })
      .then(jsonBody => {
        // The next method is what we use to emit values in the observable 
        observer.next(jsonBody)

        // this ends the stream 
        observer.complete();
      })
      // we have to add some error handling to respect the Observable contract
      .catch(err => {
        observer.error(err);
      });
  });

  return http$

}