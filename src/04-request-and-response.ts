import {of, Observable, } from 'rxjs';
import { mergeMap, switchMap, map, } from 'rxjs/operators';
import {fromFetch} from 'rxjs/fetch';

let request$ = of('https://api.github.com/users')

let response$ = request$.pipe(
      mergeMap(url => fromFetch(url)
        .pipe(
          switchMap(res => {
            if (res.ok) {
              return res.json()
            } else {
              return of({error: true, message: `Error ${res.status}`});
            }
          })
        )
      )
    )


function createSuggestionStream(res$ : Observable < Array < any >>) {
  return res$.pipe(
    map((listUser : any) => listUser[Math.floor(Math.random() * listUser.length)]))
}

let suggestion1$ = createSuggestionStream(response$)
let suggestion2$ = createSuggestionStream(response$)
let suggestion3$ = createSuggestionStream(response$)

suggestion1$.subscribe(user => {
  renderSuggestion(user, '.suggestion1');
});

suggestion2$.subscribe(user => {
  renderSuggestion(user, '.suggestion2');
});

suggestion3$.subscribe(user => {
  renderSuggestion(user, '.suggestion3');
});

// from([suggestion1$, suggestion2$, suggestion3$])
//   .pipe(mergeMap((user$, index) => user$.pipe(mergeMap ((user) => of([user, `.suggestion${index + 1}`])))))
//   .subscribe(([user, selector]) => renderSuggestion(user, String(selector)))

function renderSuggestion(userData : any, selector : string) {
  let element = _$(selector)as HTMLElement;
  let usernameEl = element !.querySelector('.username')as HTMLAnchorElement;
  usernameEl.href = userData.html_url;
  usernameEl.textContent = userData.login;
  let imgEl = element.querySelector('img')as HTMLImageElement;
  imgEl !.src = userData.avatar_url;
}
