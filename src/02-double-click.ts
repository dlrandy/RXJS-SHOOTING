import {fromEvent} from 'rxjs';
import {bufferWhen, debounceTime, filter, map, delay} from 'rxjs/operators';

let btn = _$('.header .button')
let label = _$('.header h4')

const click$ = fromEvent(btn !, 'click')

const doubleClick$ = click$.pipe(bufferWhen(() => click$.pipe(debounceTime(300))))
  .pipe(map(arr => arr.length))
  .pipe(filter(len => len === 2))

doubleClick$.subscribe(() => {
  label !.textContent = 'dbclick'
})

doubleClick$
  .pipe(delay(1000))
  .subscribe(() => {
    label !.textContent = '-'
  })
