import { map, take } from 'rxjs/operators';
import { interval } from 'rxjs';

interval(1000)
  .pipe(take(4))
  .pipe(map(a => 10 * a))
  .subscribe(b => displayInPreview(String(b)))
  // https://rxviz.com/examples/basic-interval




