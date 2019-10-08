"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var startBtn = _$('#start-button');
var stopBtn = _$('#stop-button');
var outputArea = _$('.output');
var second$ = rxjs_1.interval(100);
var start$ = rxjs_1.fromEvent(startBtn, 'click');
var stop$ = rxjs_1.fromEvent(stopBtn, 'click');
// start$.subscribe(() => {
//   second$
//     .pipe(
//       map(s => (s /10)),
//       takeUntil(stop$),
//     )
//     .subscribe(num => outputArea!.innerText = num + 's')
// })
start$.pipe(operators_1.switchMap(function () { return second$.pipe(operators_1.takeUntil(stop$)); }), operators_1.map(function (s) { return (s / 10); }))
    .subscribe(function (num) { return outputArea.innerText = num + 's'; });
