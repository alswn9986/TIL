# TypeScript
Javascript 기반에 정적 타입 문법을 추가한 프로그래밍 언어
- TypeScript는 Javascript의 상위 집합으로 Microsoft에서 개발했다.
- 따라서 JavaScript의 모든 기능은 TypeScript에서도 사용할 수 있다.
- 정적 타입의 컴파일 언어이다.
- ES6 신규 문법을 포함하고 클래스, 인터페이스, 상속, 모듈 등의 객체 지향 프로그래밍 패턴을 제공한다.
- TypeScript 컴파일러를 사용하여 TypeScript(.ts) 파일을 JavaScript(.js) 파일로 변환하여 실행한다.

<br>

# TypeScript vs. JavaScript
1.
- 자바스크립트는 동적 타입 언어로 런타임 속도는 빠르지만, 타입 안정성이 보장되지 않는다.   
- 타입스크립트는 정적 타입 언어로 컴파일 시간이 길지만, 안정성이 보장된다.  

2.
- 자바스크립트는 클라이언트에서 실행된다.
- 타입스크립트는 클라이언트와 서버 단에서 실행된다.

3.
- 자바스크립트는 인터프리터 언어이다.   
- 타입스크립트는 컴파일 언어이다.(다른 컴파일 언어랑은 컴파일 방식에 차이가 있어 트랜스파일 언어라고 부르기도 한다.)   

4.
- 자바스크립트는 웹 브라우저에서 실행되며 별도의 컴파일러가 필요하지 않다.
- 타입스크립트는 자바스크립트 파일로 변환되어 실행되기 때문에 변환을 위해 타입스크립트 컴파일러가 필요하다.

5.
- 자바스크립트는 프로토 타입 기반의 언어이다.
- 타입스크립트는 객체 지향 프로그래밍 언어이며 클래스, 상속, 인터페이스 및 수정자를 사용할 수 있다.   
(자바스크립트에서 클래스의 기능을 활용하려면 함수, 프로토타입을 사용해 직접 작성해주어야 하지만 타입스크립트에서는 자체적으로 지원한다.)

6.
- 자바스크립트는 독립적으로 사용 가능하다.
- 타입스크립트는 자바스크립트로 컴파일 된 후 실행하므로 자바스크립트에 의존적이다.

<br>

# TypeScript 특징
- 타입 어노테이션을 이용해 변수에 타입을 선언하여 안정성을 확보한다.
- 클래스와 인터페이스를 지원하여 객체지향 프로그래밍 환경을 제공한다.
- 컴파일 과정에서 ES6+ 문법들을 ES5(또는 ES3)으로 바꿔주어 크로스브라우징 문제를 해결할 수 있다.

<br>

# Babel
타입스크립트에서는 ES6의 새로운 기능들을 사용하기 위해 Babel과 같은 별도의 트랜스파일러를 사용하지 않아도 된다.   
Babel은 브라우저가 최신 버전의 자바스크립트 문법을 이해하지 못하기 때문에 브라우저가 이해할 수 있는 문법으로 변환시켜준다. 

> **NOTE**
> 컴파일은 개발자가 작성한 소스코드를 컴퓨터가 이해할 수 있는 머신코드로 바꾸어주는 과정이고, 트랜스파일은 같은 언어를 유지한 채 다른 실행 환경에서도 돌아갈 수 있도록 소스코드의 형태를 바꾸어주는 것이다.