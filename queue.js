const queue = document.querySelector('.queue');
const form = document.querySelector('.queue-form');
const valueInput = document.querySelector('#queue-value');
const removeBtn = document.querySelector('#queue-remove-btn');
const clearBtn = document.querySelector('#queue-clear-btn');

let queueItems = [];

form.addEventListener('submit', e => {
  e.preventDefault();
  const value = valueInput.value;
  if (value === '') return;
  queueItems.push(value);
  const item = createQueueItem(value);
  queue.appendChild(item);
  valueInput.value = '';
  updateQueueWidth();
});

removeBtn.addEventListener('click', e => {
  if (queueItems.length === 0) return;
  queueItems.shift();
  queue.removeChild(queue.firstElementChild);
  updateQueueWidth();
});

clearBtn.addEventListener('click', e => {
  queueItems = [];
  queue.innerHTML = '';
  updateQueueWidth();
});

function createQueueItem(value) {
  const item = document.createElement('div');
  item.classList.add('queue-item');
  item.textContent = value;
  return item;
}

function updateQueueWidth() {
  const width = queueItems.length * 55;
  queue.style.width = `${width}px`;
}

