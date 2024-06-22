# 객체에 프로퍼티가 존재하는지 확인
## in 연산자
객체에 프로퍼티나 상속된 프로퍼티가 있다면 true를 반환한다.

## hasOwnProperty()
자체 프로퍼티는 true, 상속된 프로퍼티에는 false를 반환한다.

## propertyisEnumerable()
hasOwnProperty()를 더 제한하여 열거 가능 속성이 true일 때만 true를 반환한다.

## 프로퍼티를 검색하고 undefined가 아님을 확인
존재하지만 정의되지 않은 것과 존재하지도 않은 것 둘 다 undefined므로 구분은 불가능하다.

```js
let o = {x: 1};

// 1. in
console.log("x" in o);  // true
console.log("y" in o);  // false
console.log("toString" in o);   // true

// 2. hasOwnProperty() 
console.log(o.hasOwnProperty("x")); // true
console.log(o.hasOwnProperty("y")); // false
console.log(o.hasOwnProperty("toString"));  // false

// 3. propertyIsEnumerable()
console.log(o.propertyIsEnumerable("x"));   // true
console.log(o.propertyIsEnumerable("y"));   // false
console.log(o.propertyIsEnumerable("toString"));    // false

// 4. 프로퍼티를 검색하고 undefined가 아님을 확인
console.log(o.x !== undefined); // true
console.log(o.y !== undefined); // false
console.log(o.toString !== undefined);  // true
```