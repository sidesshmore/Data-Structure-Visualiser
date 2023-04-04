// Define the Node class
class Node {
    constructor(value) {
      this.value = value;
      this.left = null;
      this.right = null;
    }
  }
  
  // Define the Tree class
  class Tree {
    constructor() {
      this.root = null;
    }
  
    // Insert a new node into the tree
    insert(value) {
      const node = new Node(value);
      if (!this.root) {
        this.root = node;
      } else {
        let current = this.root;
        while (true) {
          if (value < current.value) {
            if (!current.left) {
              current.left = node;
              break;
            }
            current = current.left;
          } else if (value > current.value) {
            if (!current.right) {
              current.right = node;
              break;
            }
            current = current.right;
          } else {
            break;
          }
        }
      }
      this.draw();
    }
  
    // Delete a node from the tree
    delete(value) {
      const removeNode = (node, value) => {
        if (!node) {
          return null;
        }
        if (value === node.value) {
          if (!node.left && !node.right) {
            return null;
          }
          if (!node.left) {
            return node.right;
          }
          if (!node.right) {
            return node.left;
          }
          let tempNode = node.right;
          while (tempNode.left) {
            tempNode = tempNode.left;
          }
          node.value = tempNode.value;
          node.right = removeNode(node.right, tempNode.value);
          return node;
        } else if (value < node.value) {
          node.left = removeNode(node.left, value);
          return node;
        } else {
          node.right = removeNode(node.right, value);
          return node;
        }
      };
      this.root = removeNode(this.root, value);
      this.draw();
    }
  
    // Draw the tree on the canvas
    draw() {
      const canvas = document.getElementById("canvas");
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const nodeRadius = 25;
      const fontOffset = 10;
      const startX = canvas.width / 2;
      const startY = 50;
      const drawNode = (node, x, y, level) => {
        if (!node) {
          return;
        }
        ctx.beginPath();
        ctx.arc(x, y, nodeRadius, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fillText(node.value, x, y + fontOffset);
        if (node.left) {
          const leftX = x - canvas.width / Math.pow(2, level + 2);
          const leftY = y + 50;
          ctx.beginPath();
          ctx.moveTo(x, y + nodeRadius);
          ctx.lineTo(leftX, leftY - nodeRadius);
          ctx.stroke();
          drawNode(node.left, leftX, leftY, level + 1);
        }
        if (node.right) {
          const rightX = x + canvas.width / Math.pow(2, level + 2);
          const rightY = y + 50;
          ctx.beginPath();
          ctx.moveTo(x, y + nodeRadius);
          ctx.lineTo(rightX, rightY - nodeRadius);
          ctx.stroke();
          drawNode(node.right, rightX, rightY, level + 1);
        }
      };
      ctx.font = "16px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      drawNode(this.root, startX, startY, 0);
    }
  }
// Initialize the tree
const tree = new Tree();

// Add event listeners for the insert and delete buttons
const insertBtn = document.getElementById("insert-btn");
insertBtn.addEventListener("click", () => {
  const value = parseInt(document.getElementById("insert-value").value);
  if (!isNaN(value)) {
    tree.insert(value);
  }
});

const deleteBtn = document.getElementById("delete-btn");
deleteBtn.addEventListener("click", () => {
  const value = parseInt(document.getElementById("delete-value").value);
  if (!isNaN(value)) {
    tree.delete(value);
  }
});



