//SOURCE: https://web.dev/articles/drag-and-drop

var content = document.querySelectorAll(".box");
var contentArray = [];
content.forEach(cell => {
  contentArray[cell.id] = cell.innerHTML;
});

// For implimentation: Consider using an array as such above to keep track of changes to the dice
// and when the user moves on or 'saves' then overwrite the dice sides array with the values inside the content array

document.addEventListener('DOMContentLoaded', (event) => {

  var dragSrcEl = null;
  
  function handleDragStart(e) {
    this.style.opacity = '0.4';
    
    dragSrcEl = this;

    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
  }

  function handleDragOver(e) {
    if (e.preventDefault) {
      e.preventDefault();
    }

    e.dataTransfer.dropEffect = 'move';
    
    return false;
  }

  function handleDragEnter(e) {
    this.classList.add('over');
  }

  function handleDragLeave(e) {
    this.classList.remove('over');
  }

  function handleDrop(e) {
    if (e.stopPropagation) {
      e.stopPropagation(); // stops the browser from redirecting.
    }
    
    if (dragSrcEl != this && dragSrcEl.tagName === 'IMG' && this.tagName === 'IMG') {
      var tempSrc = dragSrcEl.src;
      dragSrcEl.src = this.src;
      this.src = tempSrc;
    } else if (dragSrcEl != this && dragSrcEl.tagName === 'DIV' && this.tagName === 'DIV') {
      dragSrcEl.innerHTML = this.innerHTML;
      this.innerHTML = e.dataTransfer.getData('text/html');
      
      contentArray[dragSrcEl.id] = dragSrcEl.innerHTML;
      contentArray[this.id] = this.innerHTML;

      console.log(contentArray);
    }
    
    return false;
  }

  function handleDragEnd(e) {
    this.style.opacity = '1';
    
    items.forEach(function (item) {
      item.classList.remove('over');
    });
  }
  
  
  let items = document.querySelectorAll('.container .box');
  items.forEach(function(item) {
    item.addEventListener('dragstart', handleDragStart, false);
    item.addEventListener('dragenter', handleDragEnter, false);
    item.addEventListener('dragover', handleDragOver, false);
    item.addEventListener('dragleave', handleDragLeave, false);
    item.addEventListener('drop', handleDrop, false);
    item.addEventListener('dragend', handleDragEnd, false);
  });
});