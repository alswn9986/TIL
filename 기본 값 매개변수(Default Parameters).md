## 기본 값 매개변수(Default Paramter)

> **NOTE**   
> 값이 전달되지 않는 함수 파라미터의 기본 값을 설정한다.

<br>

디폴트 파라미터
* 함수에 전달된 값이 undefined 이거나 없을 때 초기화될 설정 값을 지정한다.
```js
function add(a, b = 1) {
  return a + b;
}
 
console.log(add(3, 4));	// 7
console.log(add(3));	// 4, b에는 1이 들어감
```