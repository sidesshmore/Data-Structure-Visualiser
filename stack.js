const stack = [];

function pushItem() {
  const newItem = prompt("Enter a new item to push:");
  if (newItem !== null) {
    stack.push(newItem);
    renderStack();
  }
}

function popItem() {
  if (stack.length === 0) {
    alert("Stack is empty!");
  } else {
    stack.pop();
    renderStack();
  }
}

function renderStack() {
  const stackDiv = document.querySelector(".stack");
  stackDiv.innerHTML = `
    <div class="stack-top">TOP</div>
    ${stack.map(item => `<div class="stack-item">${item}</div>`).join("")}
  `;
}
