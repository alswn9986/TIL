# 단축 프로퍼티
변수에 저장된 값을 객체의 프로퍼티로 할당하는 경우 ES6 이후에는 콜론을 생략한 간결한 문법을 사용할 수 있다.

```js
let x = 1, y = 2;

let o1 = {x: x, y: y};
let o2 = {x, y};
```

<br>

# 계산된 프로퍼티 이름
프로퍼티 이름이 변수에 저장되어 있거나 함수의 반환 값일 때 ES6 이후의 계산된 프로퍼티 기능을 사용하여 대괄호를 객체 리터럴 안에 넣을 수 있다.
```js
const PROPERTY_NAME = "p1";
function computePropertyName() {return "p" + 2;}

let o3 = {};
o3[PROPERTY_NAME] = 1;
o3[computePropertyName()] = 2;

let o4 = {
    [PROPERTY_NAME]: 1,
    [computePropertyName()]: 2
};
```

<br>

# 분해 연산자
ES2018 이후에는 객체 리터럴 안에 분해 연산자 ...를 사용하여 기존 객체의 프로퍼티를 새 객체에 복사할 수 있다.
분해 연산자는 자체 프로퍼티만 분해하고 상속된 프로퍼티에는 적용되지 않는다.
```js
let o5 = {x: 1};
let p = {x: 0, ...o5};
p.x;    // 1
let q = {...o5, x: 2};
q.x;    // 2

let o6 = Object.create({x: 1});
let z = {...o};
z.x;    // undefined, 자체 프로퍼티만 분해하고 상속된 프로퍼티에는 적용되지 않음
```

<br>

# 단축 메서드
객체 프로퍼티로 정의된 함수를 메서드라고 한다. ES6 이후 객체 리터럴 문법에서 function 키워드와 콜론을 생략할 수 있다.
```js
let square1 = {
    area: function() {return this.side * this.side;},
    side: 10
};
square1.area()   // 100

let square2 = {
    area() {return this.side * this.side;},
    side: 10
};
square2.area()  // 100
```