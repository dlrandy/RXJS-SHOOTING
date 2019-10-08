"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var btn = _$('.header .button');
var label = _$('.header h4');
var click$ = rxjs_1.fromEvent(btn, 'click');
var doubleClick$ = click$.pipe(operators_1.bufferWhen(function () { return click$.pipe(operators_1.debounceTime(300)); }))
    .pipe(operators_1.map(function (arr) { return arr.length; }))
    .pipe(operators_1.filter(function (len) { return len === 2; }));
doubleClick$.subscribe(function () {
    label.textContent = 'dbclick';
});
doubleClick$
    .pipe(operators_1.delay(1000))
    .subscribe(function () {
    label.textContent = '-';
});
