"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var fetch_1 = require("rxjs/fetch");
var request$ = rxjs_1.of('https://api.github.com/users');
var response$ = request$.pipe(operators_1.mergeMap(function (url) { return fetch_1.fromFetch(url).pipe(operators_1.switchMap(function (res) {
    if (res.ok) {
        return res.json();
    }
    else {
        return rxjs_1.of({ error: true, message: "Error " + res.status });
    }
})); }));
response$.subscribe(function (response) { return displayInPreview(JSON.stringify(response, null, 10)); });
