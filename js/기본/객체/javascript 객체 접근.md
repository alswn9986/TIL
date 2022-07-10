# 점(.)과 대괄호([]) 차이

## 점 연산자
점 연산자를 사용해 객체 프로퍼티에 접근할 때 프로퍼티 이름은 식별자여야 한다.
식별자는 데이터 타입이 아니므로 프로그램에서 조작할 수 없다.

## 대괄호 연산자
대괄호 연산자로 객체 프로퍼티에 접근할 때는 프로퍼티 이름을 문자열로 표현한다.
문자열은 데이터 타입이므로 프로그램이 실행되는 동안 조작할 수 있다.
따라서 아래와 같은 동적 프로퍼티 이름으로 객체에 접근하는 코드가 가능한 것이다.

```js
for (let i = 1; i < 4; i++) {
    console.log(myObj[`key${i}`]);
    // myObj 객체의 key1, key2, key3에 접근
}
```

# 상속
## prototype chain
원래 객체에 프로퍼티를 생성 또는 설정할 때 이미 있는 프로퍼티라면 세터 메서드를 호출하여 해당 프로퍼티를 정의한 프로토타입 객체에는 영향이 없다.
```js
let o = {};
o.x = 1;
let p = Object.create(o);
p.y = 2;
let q = Object.create(p);
q.z = 3;

console.log(`x: ${q.x}, y: ${q.y}, z: ${q.z}`); // x: 1, y: 2, z: 3

q.x = 100;
console.log(`q.x: ${q.x}`); // q.x: 100
console.log(`o.x: ${o.x}`); // o.x: 1
```

# 프로퍼티 삭제
자체 프로퍼티만 삭제하고 상속된 프로퍼티는 삭제하지 않는다.
delete는 변경가능 속성이 false인 프로퍼티는 제거하지 않고 false를 리턴한다.
```js
delete obj.property1;
delete obj['property1'];
```