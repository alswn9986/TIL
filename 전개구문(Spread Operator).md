## 전개 구문(Spread Operator)

> **NOTE**   
> 반복 가능한 iterable 객체에 적용하여 요소 하나 하나로 전개시킨다.

### - '전개'의 의미
반복 가능한 객체를 풀어서 하나 하나로 전개
```js
const arr = [1, 2, 3];
const str = "string";

console.log(...arr);	// 1 2 3
console.log(...str);	//  s t r i n g
```
<br>

## 전개 구문 활용 대상
<hr />

### - 객체
객체 병합

```js
let obj1 = {id: 'tom', name: '안나'};
let obj2 = {id: 'angela', age: 17};
 
let mergedObj = {...obj1, ...obj2};
console.log(mergedObj);	// {id: 'angela', name: '안나', age: 17}
```
<br>

객체 복사
```js
let obj1 = {x: 1, y: 3};
let obj2 = {...obj1};
let obj3 = {...obj1, z: 7};
 
console.log(obj2);	// {x: 1, y: 3}
console.log(obj3);	// {x: 1, y: 3, z: 7}
```
<br>

### - 배열
배열 병합
```js
const arr1 = [1, 2, 3]; 
const arr2 = [4, 5, 6]; 
 
let arr = [...arr1, ...arr2]; 
console.log(arr);	// [1, 2, 3, 4, 5, 6]
```
<br>

배열 복사
* 배열 안에 객체가 있는 경우 복사된 배열 내 객체는 원본 값(주소)을 참조하는 얕은 복제를 한다.

```js
let arr1 = [1, 2, 3]; 
let arr2 = [...arr1];
let arr3 = [0, ...arr1, 4, 5];
 
arr2.push(4); 
console.log(arr1);	// [1, 2, 3]
console.log(arr2);	// [1, 2, 3, 4]
console.log(arr3);	// [0, 1, 2, 3, 4, 5]
```
<br>

### - 함수
함수 호출 인자로 사용하는 경우
* 배열의 엘리먼트를 함수의 인자로 사용한다.
```js
Math.max(1, 3, 4, 2, 9);	// 9

let arr = [1, 3, 4, 2, 9];
Math.max(arr) ;		// NaN
Math.max.apply(null, arr);	// 9

Math.max(...arr);	// 9
```
<br>

매개변수를 전개 구문으로 작성하는 경우
* 파라미터로 넘어오는 값들을 배열 인자로 한 번에 받는다.
```js
function sum(...rest) {
	let sum = 0;
    for (let item of rest) {
    	sum += item;
    }
    return sum;
}
 
console.log(sum(1, 2)); // 3
console.log(sum(1, 2, 3));	// 6
```