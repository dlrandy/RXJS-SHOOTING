"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var operators_1 = require("rxjs/operators");
var rxjs_1 = require("rxjs");
rxjs_1.interval(1000)
    .pipe(operators_1.take(4))
    .pipe(operators_1.map(function (a) { return 10 * a; }))
    .subscribe(function (b) { return displayInPreview(String(b)); });
// https://rxviz.com/examples/basic-interval
