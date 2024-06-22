## 프로토타입(prototype)
자바스크립트의 모든 객체는 프로토타입이라는 객체를 가지고 있고 프로토타입으로부터 프로퍼티와 메소드를 상속 받는다.
- 객체가 만들어질 때 자신의 원형인 프로토타입 객체를 이용한다.
- 객체 안에는 `__proto__` 속성이 있는데 이는 자신의 원형 프로토타입 객체를 참조하는 숨겨진 링크(= 프로토타입)이다.

<br>

### 프로토타입 체인(prototype chain)
프로토타입이 연결되는 가상의 연결고리를 프로토타입 체인이라고 한다.
- new 연산자를 사용해 생성한 객체는 생성자의 프로토타입을 자신의 프로토타입으로 상속 받는다.
- 자바스크립트의 모든 객체는 Object.prototype 객체를 프로토타입으로 상속 받는다.
- Object 객체는 어떠한 프로토타입도 갖지 않고 아무런 프로퍼티도 상속 받지 않는다.

```js
var obj = new Object(); // Object.prototype
var date = new Date();  // Date.prototype, Object.prototype
var arr = new Array();  // Array.prototype, Object.prototype
```