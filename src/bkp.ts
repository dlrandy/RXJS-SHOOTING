import {of, Observable, from, fromEvent, merge} from 'rxjs';
import { mergeMap, switchMap, map, startWith, share } from 'rxjs/operators';
import {fromFetch} from 'rxjs/fetch';

let request$ = of('https://api.github.com/users')
const refreshBtn = _$('.refresh') as HTMLElement
const refresh$ = fromEvent(refreshBtn, 'click').pipe(map(evt => {
  let randomOffset = Math.floor(Math.random()*500);
    return 'https://api.github.com/users?since=' + randomOffset;
}))

let response$ = merge(request$, refresh$).pipe(mergeMap(url => fromFetch(url).pipe(switchMap(res => {
  if (res.ok) {
    return res.json()
  } else {
    return of({error: true, message: `Error ${res.status}`});
  }
}))
))


// response$.subscribe(response => displayInPreview(JSON.stringify(response,
// null ,10)))
function createSuggestionStream(res$ : Observable < Array < any >>) {
  return res$.pipe(map((listUser : any) => listUser[Math.floor(Math.random() * listUser.length)]))
}

let suggestion1$ = createSuggestionStream(response$)
let suggestion2$ = createSuggestionStream(response$)
let suggestion3$ = createSuggestionStream(response$)


from([suggestion1$, suggestion2$, suggestion3$])
  .pipe(mergeMap((user$, index) => user$.pipe(mergeMap ((user) => of([user, `.suggestion${index + 1}`])))))
  .subscribe(([user, selector]) => renderSuggestion(user, String(selector)))

function renderSuggestion(userData : any, selector : string) {
  let element = _$(selector)as HTMLElement;
  let usernameEl = element !.querySelector('.username')as HTMLAnchorElement;
  usernameEl.href = userData.html_url;
  usernameEl.textContent = userData.login;
  let imgEl = element.querySelector('img')as HTMLImageElement;
  imgEl !.src = userData.avatar_url;
}
