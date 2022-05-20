## 구조 분해 할당 (Restructuring)
<hr />

> **NOTE**   
> 객체는 중괄호({}), 배열은 대괄호([])를 사용하여 요소 값을 개별 변수에 할당한다.

### - 객체
객체의 속성을 해체하여 개별 변수에 담기

```js
const info = {
  myName: 'Anna',
  myAge: 10
};
 
let {myName, myAge} = info;
console.log(myName, myAge);	// Anna 10
```
<br>

구조 분해 시 매핑될 변수명 변경하기
```js
const info = {
  myName: 'Anna',
  myAge: 10
};
 
let {myName: otherName, myAge, myHobby} = info;
 
console.log(myHobby);	// undefined
console.log(otherName, myAge);	// Anna 10
console.log(myName);	// Uncaught ReferenceError: myName is not defined
```
<br>

분해하고 남은 객체 하나의 변수에 할당하기
* 객체 구조 분해 할당에서 남은 프로퍼티 값이 저장될 때 쓰이는 ... 을 Rest Properties라고 한다.
```js
const info = {
  myName: 'Anna',
  myAge: 10,
  myHobby: 'cooking'
};
 
let {myName, ...rest} = info;
console.log(myName);	// Anna
console.log(rest);	// {myAge: 10, myHobby: 'cooking'}
```
<br>

### - 배열
배열 요소의 값을 개별 변수에 담기
```js
const numbers = [1, 2, 3];

let [one, two, three] = numbers;
console.log(one, two, three);	// 1 2 3
```
<br>

변수에 할당된 값이 undefined일 때 변수에 기본 값 설정
```js
let [x=1, y=2] = [];
console.log(x, y);	// 1 2
 
let [x=1, y=2] = [3];
console.log(x, y);	// 3 2
 
let [x=1, y=2] = [3, 4];
console.log(x, y);	// 3 4
```
<br>

분해하고 남은 배열(일부 배열) 하나의 변수에 할당하기
* 배열 구조 분해에서 쓰이는 ... 을 Rest Elements 라고 한다.
```js
const numbers = [0, 1, 2, 3];
 
let [zero, ...rest] = numbers;
console.log(zero);	// 0
console.log(rest);	// [1, 2, 3]
```