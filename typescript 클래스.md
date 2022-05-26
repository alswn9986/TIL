## 클래스
자바스크립트는 프로토타입 기반으로 상속을 구현하지만 타입스크립트에서는 class, extends 키워드를 지원하여 간단하게 클래스를 정의할 수 있다.

<br>

### 클래스 문법
클래스 키워드
```ts
class User {
  constructor() {
    // ...
  }
}
```
<br>

생성자
- 멤버 변수에 접근하려면 this 키워드를 사용한다.
```ts
class User {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
}
```
<br>

상속
- extends 키워드를 사용한다.
- 하위 클래스에서 생성자를 정의하려면 super 키워드로 반드시 상위 클래스의 생성자를 호출해야 한다.
```ts
class InfoPrinter {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  printInfo() {
    console.log(`이름은 ${ this.name } 입니다.`);
  }
}

class User extends InfoPrinter {
  constructor(name: string) {
    super(name);
  }
}

const user = new User('candy');
user.printInfo(); // 이름은 candy 입니다.
```
<br>

오버라이드
- 상위 클래스에서 정의한 메서드를 자식 클래스에서 재정의할 수 있다.
- 타입스크립트에서 오버로딩은 지원되지 않고 any 타입을 사용하여 비슷하게 구현할 수 있다.
```ts
class InfoPrinter {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  printInfo() {
    console.log(`InfoPrinter: 이름은 ${ this.name } 입니다.`);
  }
}

class User extends InfoPrinter {
  constructor(name: string) {
    super(name);
  }
  printInfo() {
    console.log(`User: 이름은 ${ this.name } 입니다.`);
  }
}

const user = new User('candy');
user.printInfo(); // User: 이름은 candy 입니다.

const infoPrinter = new InfoPrinter('candy');
infoPrinter.printInfo(); // InfoPrinter: 이름은 candy 입니다.
```
<br>

> NOTE

자바에서의 오버라이딩
- 자바에서 오버라이딩하여 자식 객체 생성 시 부모 객체로 받으면 아래와 같은 결과를 출력한다.
- 자바 실행 사이트: https://www.compilejava.net
- Q ) 타입스크립트는 사용자 정의 클래스를 타입으로 만들지는 못할까? 
```java
public class main
{
    public static void main(String[] args)
    {
        Parent pa = new Parent();
        pa.display(); // 부모 클래스의 display() 메소드입니다.
        System.out.println(pa.test);    // 부모

        Child ch = new Child();
        ch.display(); // 자식 클래스의 display() 메소드입니다.
        System.out.println(ch.test);    // 자식

        Parent pc = new Child();
        pc.display(); // 자식 클래스의 display() 메소드입니다.
        System.out.println(pc.test);    // 부모
    }
}

class Parent {
    String test = "부모";
    void display() { System.out.println("부모 클래스의 display() 메소드입니다."); }
}

class Child extends Parent {
    String test = "자식";
    void display() { System.out.println("자식 클래스의 display() 메소드입니다."); }
}
```
<br>

접근제어자
- public: (디폴트) 어디에서나 접근 가능
- protected: 상속 받은 하위 클래스만 접근 가능
- private: 클래스 내에서만 접근 가능, 외부에서 접근할 때는 getter/setter 사용

<br>

static
- 별도의 인스턴스나 객체를 생성(인스턴스화)하지 않고 바로 클래스 내부 인자를 사용할 수 있다.
