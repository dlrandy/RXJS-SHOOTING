import {of} from 'rxjs';
import {mergeMap, switchMap} from 'rxjs/operators';
import {fromFetch} from 'rxjs/fetch';

let request$ = of('https://api.github.com/users')

let response$ = request$.pipe(mergeMap(url => fromFetch(url).pipe(switchMap(res => {
  if (res.ok) {
    return res.json()
  } else {
    return of({error: true, message: `Error ${res.status}`});
  }
}))))

response$.subscribe(response => displayInPreview(JSON.stringify(response, null ,10)))