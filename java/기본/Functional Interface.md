# 함수형 인터페이스(Functional Interface)
- 추상 메서드가 오직 하나인 인터페이스이다.
- 추상 메서드가 하나라는 것은 default method 또는 static method 는 여러 개 존재할 수 있다.
- @FunctionalInterface 어노테이션을 사용하여 해당 인터페이스가 함수형 인터페이스 조건에 맞는지 검사할 수 잇으니 인터페이스 검증과 유지보수를 위해 붙여주는 것이 좋다.

## 함수형 인터페이스를 사용하는 이유
- Java에 모든 메서드가 일급객체가 아니고, 따라서 함수형 프로그래밍 언어도 아니다.
- Java8에서는 함수를 일급객체처럼 다룰 수 있게 함수형 인터페이스를 제공한다.
- 람다식은 함수형 인터페이스로만 접근이 가능하기 때문에 사용한다.

## 함수형 인터페이스 만들기
- 함수형 인터페이스 형식에 맞지 않으면 @FunctionalInterface 어노테이션이 에러를 띄워준다.
> **ERROR**
> Multiple non-overriding abstract methods found in interface com.practice.notepad.CustomFunctionalInterface
```java
@FunctionalInterface
interface CustomInterface<T> {
    // abstract method 오직 하나
    T myCall();

    // default method 는 존재해도 상관없음
    default void printDefault() {
        System.out.println("Hello Default");
    }

    // static method 는 존재해도 상관없음
    static void printStatic() {
        System.out.println("Hello Static");
    }
}
```

- 함수형 인터페이스는 하나의 추상 메서드만 가질 수 있지만 static이나 default 선언이 붙은 메서드는 함수형 인터페이스에 영향을 주지 않는다.
```java
@FunctionalInterface
public interface Calculate {
    int cal(int a, int b);
    default int plus(int a, int b) { return a + b; }
    static int sub(int a, int b) { return a - b; }
}
```

- 인터페이스는 제네릭으로 정의할 수 있다.
```java
interface Cal<T> {
    T cal(T a, T b);
}

public class LambdaGeneric {
    public static void main(String[] args) {
        Cal<Integer> integerCal = (a, b) -> a + b;
        System.out.println(integerCal.cal(4, 6));

        Cal<String> stringCal = (a, b) -> a + b;
        System.out.println(stringCal.cal("a", "b"));
    }
}
```