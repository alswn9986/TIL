# Stream
데이터의 흐름, 배열 또는 컬렉션 인스턴스에 함수 여러 개를 조합해서 원하는 결과를 필터링하고 가공된 결과를 얻는다. 배열과 컬렉션을 함수형으로 처리한다.
- 외부 반복을 통해 작업하는 컬렉션과 다르게 내부 반복을 통해 작업을 수행한다.
- 재사용이 가능한 컬렉션과 다르게 생성 후 단 1번만 사용할 수 있다.
- 원본 데이터를 변경하지 않고, 복사해서 사용한다.
- 필터-맵 기반의 API를 사용하여 지연연산을 통해 성능을 최적화한다.
- parallelStream() 메소드를 통한 병렬처리를 지원한다.

<br />

## 스트림 사용하기
1. 생성하기: 스트림 인스턴스를 생성한다.
2. 가공하기: 필터링 및 매핑 등 원하는 결과를 만드는 중간 작업을 한다.
3. 결과 만들기: 최종적으로 원하는 형태의 결과를 만드는 작업을 한다.

<br />

## 생성하기
### 배열 스트림
```java
String[] arr = new String[]{"a", "b", "c"};
Stream<String> stream = Arrays.stream(arr);
Stream<String> streamOfArrayPart = Arrays.stream(arr, 1, 3);    // 1~2 요소인 [b, c]
```

### 컬렉션 스트림
```java
List<String> list = Arrays.asList("a", "b", "c");
Stream<String> stream = list.stream();
Stream<String> parallelStream = list.parallelStream();          // 병렬 처리 스트림
```

### 비어있는 스트림
- 요소가 없을 때 null 대신 사용할 수 있다.
```java
public Stream<String> streamOf(List<String> list) {
    return list == null || list.isEmpty() ? Stream.empty() : list.stream();
}
```

### Stream.builder()
- 스트림에 직접 원하는 값을 넣고 build()로 스트림을 리턴한다.
```java
Stream<String> builderStream =
    Stream.<String>builder()
    .add("Eric").add("Elena").add("Java")
    .build();   // [Eric, Elena, Java]
```

### Stream.generate()
- Supplier<T>에 해당하는 람다로 값을 넣을 수 있다.
- 이 때 생성되는 스트림은 크기가 정해져있지 않고 무한하기 때문에 특정 사이즈로 최대 크기를 제한해야 한다.
```java
Stream<String> generatedStream = Stream.generate(() -> "item").limit(5); // [el, el, el, el, el]
```

### Stream.iterate()
- 초기값과 해당값을 다루는 람다를 이용해 스트림에 들어갈 요소를 만든다.
```java
Stream<Integer> iteratedStream = Stream.iterate(30, n -> n + 2).limit(5); // [30, 32, 34, 36, 38]
```

### 기본 타입형 스트림
```java
// 기본 타입
IntStream intStream = IntStream.range(1, 5);            // [1, 2, 3, 4]
LongStream longStream = LongStream.rangeClosed(1, 5);   // [1, 2, 3, 4, 5]

// 제네릭 타입(오토박싱)
Stream<Integer> boxedIntStream = IntStream.range(1, 5).boxed();

// Random 난수 스트림
DoubleStream doubles = new Random().doubles(3);         // 난수 3개 생성
```

### 문자열 스트링
```java
// 각 문자(char)를 IntStream으로 변환
IntStream charsStream = "Stream".chars();           // [83, 116, 114, 101, 97, 109]
```

### 파일 스트림
```java
Stream<String> lineStream = Files.lines(Paths.get("file.txt"), Charset.forName("UTF-8"));
```

https://futurecreator.github.io/2018/08/26/java-8-streams/
https://thalals.tistory.com/321