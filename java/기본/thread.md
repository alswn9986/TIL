# 스레드(Thread)
## 프로그램
파일 시스템에 존재하는 실행파일
어떤 작업을 위해 실행할 수 있는 정적인 상태의 파일
사용자가 원하는 일을 처리할 수 있도록 프로그래밍 언어를 사용하여 올바른 수행절차를 표현해놓은 명령어들의 집합

<br>

## 프로세스
프로그램을 실행하면 CPU를 차지하면서 수행하는 수행 주체
컴퓨터에서 연속적으로 실행되고 있는 동적인 상태의 컴퓨터 프로그램
운영체제가 메모리 등의 필요한 자원을 할당해준 실행 중인 프로그램
* 프로세스가 할당받는 시스템 자원에는 CPU 시간, 운영되기 위해 필요한 주소공간, Code, Data, Stack, Heap 구조로 되어있는 독립된 메모리 영역이 있다.

> **NOTE**   
> 프로그램을 실행하면 운영체제로부터 실행에 필요한 자원을 할당받아 프로세스가 되는 것

<br>

## 프로세서
컴퓨터 내에서 프로그램을 수행하는 하드웨어 유닛으로 중앙처리장치(CPU)를 뜻하며 명령어를 해석하는 컴퓨터의 한 부분이다.
- 다중작업을 가능하게 하는 멀티태스킹 기능이 나오면서 컴퓨터가 프로세스 여러 개를 함께 돌릴 수 있다.
- 멀티 프로세싱은 여러 개의 프로세스를 사용하는 것이다.
- 멀티 태스킹은 같은 시간에 여러 개의 프로그램을 띄우는 것이다.

<br>

## 스레드
프로세스가 할당받은 자원을 이용하는 실행 단위이자 프로세스의 특정한 수행 경로이자 프로세스 내에서 실행되는 여러 흐름의 단위이다.
- 스레드에 소속된 프로세스가 운영체제로부터 자원을 할당받으면 그 자원을 스레드가 사용한다.
- 프로세스는 최소 한 개 이상의 스레드를 가진다.(메인 스레드)
- 각 스레드는 독자적인 스택 메모리를 갖는다.
- 스레드는 프로세스 내에서 각 스택만 할당받고 Code, Data, Heap 영역은 공유한다.
- 스레드는 한 프로세스 내에서 동작되는 여러 실행 흐름으로 프로세스 내의 주소공간이나 자원들을 같은 프로세스 내의 스레드끼리 공유하며 실행된다.
- 한 스레드가 프로세스 자원을 변경하면 다른 이웃 스레드도 그 변경 결과를 즉시 볼 수 있다.
- 스레드는 메모리를 공유하기 때문에 동기화, 데드락 등의 문제가 발생할 수 있다.
- 두 개 이상의 스레드를 가지는 프로세스를 멀티스레드 프로세스라고 한다.

> **프로세스와 스레드**   
> 프로세스는 스레드의 컨테이너로 스레드의 정보를 담고있는 것에 불과하다.   
> 프로세스는 각 작업마다 운영체제로부터 자원을 할당받기 위해 시스템 콜을 하는 부담이 생기지만 멀티스레드를 사용하면 시스템 콜을 한 번만 해도 되므로 효율적이다.

<br>

## 스레드의 생성과 실행
스레드를 통해 작업하고 싶은 내용을 run() 메소드에 작성한다.
### Runnable 인터페이스를 구현하는 방법
- Runnable 인터페이스는 몸체가 없는 메소드인 run() 메소드 단 하나만을 가지는 간단한 인터페이스이다.
```java
class ThreadWithRunnable implements Runnable {
    public void run() {
        for (int i = 0; i < 5; i++) {
            System.out.println(Thread.currentThread().getName()); // 현재 실행 중인 스레드의 이름을 반환함.
            try {
                Thread.sleep(10);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }
}

public class Thread01 {
    public static void main(String[] args) {
        Thread thread = new Thread(new ThreadWithRunnable()); // Runnable 인터페이스를 구현하는 방법
        thread.start(); // 스레드의 실행
    }
}
```

### Thread 클래스를 상속받는 방법
- Thread 클래스를 상속받으면 다른 클래스를 상속받을 수 없으므로(단일 상속) 일반적으로 Runnable 인터페이스를 구현하는 방법으로 스레드를 생성한다.
```java
class ThreadWithClass extends Thread {
    public void run() {
        for (int i = 0; i < 5; i++) {
            System.out.println(getName()); // 현재 실행 중인 스레드의 이름을 반환함.
            try {
                Thread.sleep(10);          // 0.01초간 스레드를 멈춤.
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }
}

public class Thread01 {
    public static void main(String[] args) {
        ThreadWithClass thread = new ThreadWithClass();       // Thread 클래스를 상속받는 방법
        thread.start(); // 스레드의 실행
    }
}
```

<br>

## 스레드의 우선순위
- 각 스레드는 우선순위에 관한 자신만의 필드를 가지고 우선순위에 따라 특정 스레드가 더 많은 시간 동안 작업할 수 있도록 설정 가능하다.
- 우선순위가 가질 수 있는 범위는 1부터 10까지이며 숫자가 높을수록 우선순위도 높아진다.
- 스레드의 우선순위는 상대 값이며 우선순위가 높은 스레드가 좀 더 많이 실행큐에 포함되어 좀 더 많은 작업시간을 할당 받는다.

|필드|설명|
|------|---|
|static int MAX_PRIORITY|스레드가 가질 수 있는 최대 우선순위|
|static int MIN_PRIORITY|스레드가 가질 수 있는 최소 우선순위|
|static int NORM_PRIORITY|스레드가 생성될 때 가지는 기본 우선순위|

<br>

## 스레드 동작
### 모든 스레드가 종료되기 전에 main 메서드 종료
- 스레드는 순서에 상관없이 동시에 실행되고 스레드가 종료되기 전에 main이 종료된다.
```java
public class Sample extends Thread {
    int seq;

    public Sample(int seq) {
        this.seq = seq;
    }

    public void run() {
        System.out.println(this.seq + " thread start.");  // 쓰레드 시작
        try {
            Thread.sleep(1000);  // 1초 대기한다.
        } catch (Exception e) {
        }
        System.out.println(this.seq + " thread end.");  // 쓰레드 종료 
    }

    public static void main(String[] args) {
        for (int i = 0; i < 10; i++) {  // 총 10개의 쓰레드를 생성하여 실행한다.
            Thread t = new Sample(i);
            t.start();
        }
        System.out.println("main end.");  // main 메서드 종료
    }
}
```

```txt
0 thread start.
4 thread start.
6 thread start.
2 thread start.
main end.
3 thread start.
7 thread start.
8 thread start.
1 thread start.
9 thread start.
5 thread start.
0 thread end.
4 thread end.
2 thread end.
6 thread end.
7 thread end.
3 thread end.
8 thread end.
9 thread end.
1 thread end.
5 thread end.
```

<br>

### 모든 스레드가 종료된 후 main 메서드를 종료
- 스레드 객체를 배열에 담아 저장하고 main 메서드가 종료되기 전에 threads에 담긴 각각의 thread에 join 메소드를 호출하여 스레드가 종료될 때까지 대기한다.
```java
import java.util.ArrayList;

public class Sample extends Thread {
    int seq;
    public Sample(int seq) {
        this.seq = seq;
    }

    public void run() {
        System.out.println(this.seq+" thread start.");
        try {
            Thread.sleep(1000);
        }catch(Exception e) {
        }
        System.out.println(this.seq+" thread end.");
    }

    public static void main(String[] args) {
        ArrayList<Thread> threads = new ArrayList<>();
        for(int i=0; i<10; i++) {
            Thread t = new Sample(i);
            t.start();
            threads.add(t);
        }

        for(int i=0; i<threads.size(); i++) {
            Thread t = threads.get(i);
            try {
                t.join(); // t 쓰레드가 종료할 때까지 기다린다.
            }catch(Exception e) {
            }
        }
        System.out.println("main end.");
    }
}
```

```txt
0 thread start.
5 thread start.
2 thread start.
6 thread start.
9 thread start.
1 thread start.
7 thread start.
3 thread start.
8 thread start.
4 thread start.
0 thread end.
5 thread end.
2 thread end.
9 thread end.
6 thread end.
1 thread end.
7 thread end.
4 thread end.
8 thread end.
3 thread end.
main end.
```