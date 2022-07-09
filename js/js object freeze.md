# Object.freeze()
객체에 새로운 속성을 추가하거나 제거할 수 없는 상태로 바꾸어 immutable한 Object를 만들 수 있다.

- 프로토타입 객체를 동결하는 함수
- 동결된 객체는 속성을 추가, 삭제하는 등 변경 불가
- 객체를 변경하려는 시도 시 TypeError 예외 발생
- 객체의 불변성 유지
- 얕은 복사(1 depth까지만)를 하므로 중첩된 객체는 동결되지 않음
- Object.isFrozen() 메소드로 객체 동결 여부 확인 가능

```js
const info = {
  name: 'Anna',
  age: 19
};

Object.freeze(info);

info.age = 20;  // 변경되지 않음
info.email = 'hello@gmail.com';   // 추가되지 않음
```

<br>

# const vs. Object.freeze()
### const 키워드: 재할당 X, 속성변경 O
```js
const info = {
  name: 'Anna',
  age: 19
};

info.age = 20;
info.email = 'hello@gmail.com';
```

<br>

# Object.seal()
객체에 새로운 속성을 추가하거나 기존 속성을 변경 또는 삭제할 수 없는 상태로 바꾸는데, **쓰기 가능한 속성은 변경 가능**하다.

- 객체의 확장을 금지시키는 함수
- 속성 추가, 삭제, 변경은 불가능하지만 값 설정은 가능
- Object.isSealed() 메소드로 객체 밀봉 여부 확인 가능