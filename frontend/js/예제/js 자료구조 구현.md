## 큐(Queue)
- 먼저 넣은 데이터가 먼저 나오는 FIFO 구조이다.
- 데이터를 넣는 enqueue, 데이터를 추출하는 dequeue 등의 작업을 할 수 있다.
- 순서대로 처리해야 하는 작업을 임시로 저장해두는 버퍼로 많이 사용한다.
```js
class Queue {
  constructor() {
    this._arr = [];
  }
  enqueue(item) {
    this._arr.push(item);
  }
  dequeue() {
    return this._arr.shift();
  }
}

const queue = new Queue();
queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(3);
queue.dequeue(); // 1
```

<br>

## 스택(Stack)
- 나중에 넣은 데이터가 먼저 나오는 LIFO 구조이다.
- 데이터를 넣는 push, 데이터를 추출하는 pop, 제일 나중에 넣은 데이터를 확인하는 peek 등의 작업을 할 수 있다.
- 서로 관계가 있는 여러 작업을 수행하며 이전의 작업 내용을 저장해둘 필요가 있을 때 사용된다.
```js
class Stack {
  constructor() {
    this._arr = [];
  }
  push(item) {
    this._arr.push(item);
  }
  pop() {
    return this._arr.pop();
  }
  peek() {
    return this._arr[this._arr.length - 1];
  }
}

const stack = new Stack();
stack.push(1);
stack.push(2);
stack.push(3);
stack.pop(); // 3
```

<br>

## 트리(Tree)
- 여러 데이터가 계층구조 안에서 서로 연결된 형태를 나타낼 때 사용한다.
```js
class Node {
  constructor(content, children = []) {
    this.content = content;
    this.children = children;
  }
}

const tree = new Node('hello', [
  new Node('world'),
  new Node('and'),
  new Node('fun', [
    new Node('javascript!')
  ])
]);

function traverse(node) {
  console.log(node.content);
  for (let child of node.children) {
    traverse(child);
  }
}

traverse(tree);
```

## 참고자료
https://helloworldjavascript.net/pages/282-data-structures.html