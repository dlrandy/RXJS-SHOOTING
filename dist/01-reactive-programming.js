"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
console.info('reactive programming.');
var source = [
    '1',
    '2',
    'foo',
    '3',
    '4',
    'bar'
];
var result = source;
displayInPreview(result
    .map(function (x) { return parseInt(x); })
    .filter(function (x) { return !isNaN(x); })
    .reduce(function (x, y) { return x + y; })
    .toString());
rxjs_1.interval(500)
    .pipe(operators_1.take(4))
    .pipe(operators_1.map(function (i) { return source[i] + " "; }))
    .subscribe(function (x) { return displayInPreview(x); });
