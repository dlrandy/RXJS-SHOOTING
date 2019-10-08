function displayInPreview(string: string) {
  document.clear()
  var newDiv = document.createElement("div"); 
  var newContent = document.createTextNode(string); 
  newDiv.appendChild(newContent);
  document.body.appendChild(newDiv)
}
window.displayInPreview = displayInPreview


var _$ = document.querySelector.bind(document)
window._$ = _$

function hideElement(ele:HTMLElement) {
  ele.style.display = 'none'
}
window.hideElement = hideElement

function showElement(ele:HTMLElement) {
  ele.style.display = 'block'
}
window.showElement = showElement
