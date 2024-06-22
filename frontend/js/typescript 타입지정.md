## 타입지정
변수를 선언할 때 타입을 지정하여 컴파일 시 잘못된 코드를 잡아낼 수 있다.

- 일반 변수, 매개 변수, 객체 속성 등에 타입을 지정할 수 있다.
- 변수 값은 null, undefined 도 가능하다.
- 타입을 명시하지 않으면 (처음 할당 시에) 모든 타입이 허용된다.
- 타입은 대소문자를 구별한다.
- 타입은 **변수 : 타입**과 같은 형태로 지정한다.

<br>

### 변수
숫자 (number)
```ts
let num: number = 5;
```

문자열 (string)
```ts
let str: string = 'hello';
```

참/거짓 (boolean)
```ts
let isSomething: boolean = true;
```

배열 ([], Array)
```ts
let arr1: number[] = [1, 2, 3];
let arr2: Array<number> = [4, 5, 6];
```

객체 ({}, object)
```ts
let obj1: object = {name: 'anna', age: 15};
let obj2: {name: 'tom', age: 22};
```

any: 기존 자바스크립트에서 사용하던 것과 유사하게 아무 타입이나 받음
```ts
let anyNumber: any = 10;
let anyString: any = 'hello';

console.log(anyNumber.length);  // undefined
console.log(anyString.length);  // 5
```

unknown: any 타입과 동일하게 모든 값을 허용하지만 할당된 값이 어떤 타입인지 모름(이후 연산 불가)
```ts
let unknownNumber: unknown = 10;
let unknownString: unknown = 'hello';

console.log(unknownNumber.length);  // Object is of type 'unknown'
console.log(unknownString.length);  // Object is of type 'unknown'

if (typeof unknownString === 'string') {
  console.log(unknownString.length);  // 타입 체크 필수
}
```
<br>

### 함수
인자와 반환 값
- string 타입 name과 number 타입 age 인자, number 타입 반환
```ts
function myFunc(name: string, age: number) : number {
  // ...
}
```

옵션 인자
- 생략할 수 있는 인자 뒤에 물음표를 붙여 옵션 인자로 지정한다.
```ts
function myFunc(name: string, age?: number) : number {
  // age 인자 생략 가능
}
```

never: 절대 발생하지 않는 값의 타입, 보통 에러나 무한루프에서 사용
```ts
function myFunc(): never {
  throw new Error('error!!!');
}
```

void: 어떤 값을 가지지 않는 타입
```ts
function myFunc(): void {
  console.log('아무 것도 반환하지 않음');
}
```