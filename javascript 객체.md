# 객체
자바스크립트에서는 문자열, 숫자, 심벌, 불, null, undefined가 아닌 값은 모두 객체이다.

<br>

## 객체 생성
각 프로퍼티는 이름과 값을 콜론(:)으로 연결하고 쉼표(,)를 사용해 다른 프로퍼티와 구분한다.

### 객체 리터럴
-  콜론으로 구분한 이름:값 쌍을 쉼표로 구분해 중괄호로 감싼 형태이다.   
- 프로퍼티 이름은 자바스크립트 표현식이면 무엇이든 가능하다.(빈 값, 띄어쓰기, 예약어 등도 가능)
- 객체 리터럴 방식으로 생성된 객체는 같은 형태의 객체를 재생성할 수 없다.
- 객체 리터럴 방식으로 생성할 경우 모든 객체의 조상인 Object 객체와 연결되어 있다.
```js
let obj = {
    "use space": "스페이스나 하이픈을 쓰려면 문자열 리터럴",
    "": "빈 문자열",
    for: "for 키워드"
}

console.log(obj);
// { 'use space': '스페이스나 하이픈을 쓰려면 문자열 리터럴', '': '빈 문자열', for: 'for 키워드' }
```

> **NOTE**   
> 
> 종종 객체 리터럴로 객체를 생성할 때 마지막 프로퍼티 뒤에 쉼표(,)를 남겨두는 경우가 있는데 이는 추후 프로퍼티 추가 시 문법 에러를 초래할 가능성을 줄이기 위함이라고 한다.

<br>

### 생성자 함수(new 키워드)
- new 연산자를 사용하여 객체를 생성하고 초기화한다.
- 생성자 함수를 사용해 객체를 생성하면 같은 형태의 서로 다른 객체를 생성할 수 있다.
- 생성자 함수로 생성한 객체는 자신을 만든 생성자 객체의 프로토타입을 참조한다.
```js
// 2. new 생성자
let objByNew = new Object(); // 빈 객체 {}
console.log(objByNew); // {} 

let Animal = function(){
    this.cry = '멍멍';
    this.sound = function() {
        console.log(this.cry)
    }
};

let dog = new Animal;
console.log(dog instanceof Animal); // true
dog.sound(); // 멍멍
```

<br>

### Object.create() 메소드
- Object.create() 첫 번째 인자를 프로토타입으로 참조하여 새 객체를 생성한다.
- Object.create(null)과 Object.create(Object.prototype)은 다르다.
```js
// 3. Object.create()
let objByObject = Object.create(Object.prototype);  // 임의의 프로토타입을 사용해 새 객체 생성 가능 {}과 동일
let Animal = {
    sound: function() {
        console.log(this.cry)
    }
};

let dog = Object.create(Animal);
console.log(Animal.isPrototypeOf(dog)); // true
dog.cry = '멍멍';
dog.sound();    // 멍멍
```

> **new 연산자(생성자 함수), Object.create()의 차이**
> 
> 생성자 함수, Object.create()로 객체를 생성하면 자신을 만든 객체의 프로토타입을 참조한다.   
생성자 함수로 객체를 생성하면 실제로 생성자 코드를 실행하지만, Object.create() 메소드로 생성하면 생성자 코드를 실행하지 않는다.