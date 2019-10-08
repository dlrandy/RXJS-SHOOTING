"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var operators_1 = require("rxjs/operators");
var rxjs_1 = require("rxjs");
rxjs_1.of(1, 2, 3)
    .pipe(operators_1.map(function (a) { return 10 * a; }))
    .subscribe(function (b) { return console.log(b); });
