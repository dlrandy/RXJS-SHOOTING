import {interval} from 'rxjs';
import {take, map} from 'rxjs/operators';

console.info('reactive programming.')

let source = [
  '1',
  '2',
  'foo',
  '3',
  '4',
  'bar'
];

let result = source;
displayInPreview(
  result
    .map(x => parseInt(x))
    .filter(x => !isNaN(x))
    .reduce((x, y) => x + y)
    .toString()
);

interval(500)
  .pipe(take(4))
  .pipe(map(i => `${source[i]} `))
  .subscribe(x => displayInPreview(x))
