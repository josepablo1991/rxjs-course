import { Observable } from "rxjs";


export function createHttpObservable(url: string): any{
    // the crete method takes in a function 
    return Observable.create(observer => {
    // observer.next() || observer.error() || observer.complete()

    // implementing cancelation on our custom Observable
    const controller = new AbortController();
    const signal = controller.signal;

    // We start with a method that returns a Promise
    fetch(url, {signal})
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

      return () => controller.abort()

  });
}