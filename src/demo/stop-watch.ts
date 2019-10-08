import { interval, fromEvent } from 'rxjs'
import { map, takeUntil, switchMap } from 'rxjs/operators';

let startBtn = _$('#start-button')
let stopBtn = _$('#stop-button')
let outputArea = _$('.output') as HTMLElement

let second$ = interval(100)
let start$ = fromEvent(startBtn as HTMLButtonElement, 'click')
let stop$ = fromEvent(stopBtn!, 'click')

// start$.subscribe(() => {
//   second$
//     .pipe(
//       map(s => (s /10)),
//       takeUntil(stop$),
//     )
//     .subscribe(num => outputArea!.innerText = num + 's')
// })

start$.pipe(
  switchMap(() => second$.pipe(takeUntil(stop$))), 
  map(s => (s / 10))
)
  .subscribe(num => outputArea!.innerText = num + 's')




