# 함수형 인터페이스(Functional Interface)
- 추상 메서드가 오직 하나인 인터페이스이다.
- 추상 메서드가 하나라는 것은 default method 또는 static method 는 여러 개 존재할 수 있다.
- @FunctionalInterface 어노테이션을 사용하여 해당 인터페이스가 함수형 인터페이스 조건에 맞는지 검사할 수 잇으니 인터페이스 검증과 유지보수를 위해 붙여주는 것이 좋다.

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