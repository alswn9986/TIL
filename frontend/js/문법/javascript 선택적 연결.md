# Optional Chaining(선택적 연결)
Optional Chaining 연산자 **?.** 를 사용해 각 참조가 유효한지 검사할 필요없이 연결된 객체의 체인에 에러 없이 접근할 수 있다.

📌 Syntax
```js
obj.val?.prop
obj.val?.[expr]
obj.arr?.[index]
obj.func?.(args)
```

<br>

## . 연산자를 통한 속성 값 접근
중첩 객체를 접근 시 **.** 연산자를 사용하면 TypeError 가 발생할 가능성이 있다.
```js
let obj = {
  chain1: {
    chain2: {
      chain3: 'hello'
    }
  }
};

obj.chain1.chain2.chain3  // hello
```

오류 발생 시 이후 스크립트가 실행되지 않으므로 방지하기 위해 아래와 같은 조건을 주어 처리했었다.
```js
if (obj.chain1 && obj.chain1.chain2 && obj.chain1.chain2.chain3) {
  console.log(obj.chain1.chain2.chain3)
}
```

<br>

## **?.** 연산자를 통한 속성 값 접근
**.** 연산자 대신 **?.** 연산자를 사용하면 해당 객체가 nullish(null이나 undefined)인 경우 TypeError 대신 undefined를 반환한다.
* **?.** 는 존재하지 않아도 괜찮은 대상에만 사용해야 한다.
* 선언이 완료된 변수를 대상으로만 동작한다.

```js
// 객체에 사용
obj?.chain1?.chain2?.chain3 // hello
obj?.chain1?.chain2?.chain3?.chain4 // undefined

// 배열에 사용
// 배열이 nullish 하지 않으면 접근
arr?.[0]  // undefined

// 함수에 사용
// 함수가 nullish 하지 않으면 호출
func?.()  // undefined
```


https://www.daleseo.com/js-optional-chaining/   
https://ko.javascript.info/optional-chaining
https://runebook.dev/ko/docs/javascript/operators/optional_chaining

https://www.daleseo.com/js-nullish-coalescing/