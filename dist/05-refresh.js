"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var fetch_1 = require("rxjs/fetch");
//
var request$ = rxjs_1.of('https://api.github.com/users');
var refreshBtn = _$('.refresh');
var refresh$ = rxjs_1.fromEvent(refreshBtn, 'click').pipe(operators_1.map(function (evt) {
    var randomOffset = Math.floor(Math.random() * 500);
    return 'https://api.github.com/users?since=' + randomOffset;
}));
//
var response$ = rxjs_1.merge(request$, refresh$).pipe(operators_1.mergeMap(function (url) { return fetch_1.fromFetch(url).pipe(operators_1.switchMap(function (res) {
    if (res.ok) {
        return res.json();
    }
    else {
        return rxjs_1.of({ error: true, message: "Error " + res.status });
    }
})); }));
//, share()
function createSuggestionStream(res$) {
    return res$.pipe(operators_1.map(function (listUser) { return listUser[Math.floor(Math.random() * listUser.length)]; }));
}
var suggestion1$ = createSuggestionStream(response$);
var suggestion2$ = createSuggestionStream(response$);
var suggestion3$ = createSuggestionStream(response$);
suggestion1$.subscribe(function (user) {
    renderSuggestion(user, '.suggestion1');
});
suggestion2$.subscribe(function (user) {
    renderSuggestion(user, '.suggestion2');
});
suggestion3$.subscribe(function (user) {
    renderSuggestion(user, '.suggestion3');
});
// from([suggestion1$, suggestion2$, suggestion3$])
//   .pipe(mergeMap((user$, index) => user$.pipe(mergeMap ((user) => of([user, `.suggestion${index + 1}`])))))
//   .subscribe(([user, selector]) => renderSuggestion(user, String(selector)))
function renderSuggestion(userData, selector) {
    var element = _$(selector);
    var usernameEl = element.querySelector('.username');
    usernameEl.href = userData.html_url;
    usernameEl.textContent = userData.login;
    var imgEl = element.querySelector('img');
    imgEl.src = userData.avatar_url;
}
