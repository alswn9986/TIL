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

### 병렬 스트림
- 각 작업 쓰레드를 이용해 병렬로 처리한다.
```java
// 병렬 스트림 생성
Stream<Product> parallelStream = productList.parallelStream();
// 배열로 병렬 스트림 생성
Stream<Product> parallelStreamByArray = Arrays.stream(arr).parallel();

// 병렬 여부 확인
boolean isParallel = parallelStream.isParallel();

boolean isMany = parallelStream
  .map(product -> product.getAmount() * 10)
  .anyMatch(amount -> amount > 200);
```

<br />

## 가공하기
- 전체 요소 중 원하는 것만 추출한다.
- 스트림을 리턴하여 여러 작업을 이어붙여서 작성한다.
### Filtering
- 스트림 내 요소들을 걸러낸다.
- 인자: Predicate(boolean을 리턴하는 함수형 인터페이스)
```java
Stream<T> filter(Predicate<? super T> predicate);

Stream<String> stream = 
  names.stream()
  .filter(name -> name.contains("a"));
// [Elena, Java]
```

### Mapping
- 스트림 내 요소들을 하나씩 특정 값으로 변환시킨다.
- 인자: Function(인자를 받아 1개의 객체를 리턴하는 함수형 인터페이스)
```java
<R> Stream<R> map(Function<? super T, ? extends R> mapper);

Stream<String> stream = 
  names.stream()
  .map(String::toUpperCase);
// [ERIC, ELENA, JAVA]
```

### Sorting
- 인자: Comparator
- 인자가 없으면 오름차순으로 정렬한다.
```java
Stream<T> sorted();
Stream<T> sorted(Comparator<? super T> comparator);

IntStream.of(14, 11, 20, 39, 23)
  .sorted()
  .boxed()
  .collect(Collectors.toList());
// [11, 14, 20, 23, 39]
```

### Iterating
- 각각을 대상으로 특정 연산을 수행한다.
```java
Stream<T> peek(Consumer<? super T> action);

int sum = IntStream.of(1, 3, 5, 7, 9)
  .peek(System.out::println)
  .sum();
```

<br />

## 결과 만들기
### Calculating
- 최소, 최대, 합, 평균 등 기본형 타입으로 결과를 만든다.
- 평균, 최소, 최대는 Optional(NULLL이 될 수 있는 값을 감싸는 Wrapper 클래스)을 리턴한다.
```java
OptionalInt min = IntStream.of(1, 3, 5, 7, 9).min();
OptionalInt max = IntStream.of(1, 3, 5, 7, 9).max();
OptionalInt avg = DoubleStream.of(1.1, 2.2, 3.3, 4.4, 5.5)
  .average()
  .ifPresent(System.out::println);
```

### Reduction
- accumulator: 각 요소를 처리하는 계산 로직. 각 요소가 올 때마다 중간 결과를 생성하는 로직
- identity: 계산을 위한 초기값으로 스트림이 비어서 계산할 내용이 없더라도 이 값은 리턴
- combiner: 병렬(parallel) 스트림에서 나눠 계산한 결과를 하나로 합치는 동작하는 로직

```java
// 1개 (accumulator)
Optional<T> reduce(BinaryOperator<T> accumulator);
OptionalInt reduced = 
  IntStream.range(1, 4) // [1, 2, 3]
  .reduce((a, b) -> {
    return Integer.sum(a, b);
  });

// 2개 (identity)
T reduce(T identity, BinaryOperator<T> accumulator);
int reducedTwoParams = 
  IntStream.range(1, 4) // [1, 2, 3]
  .reduce(10, Integer::sum); // method reference

// 3개 (combiner)
<U> U reduce(U identity,
  BiFunction<U, ? super T, U> accumulator,
  BinaryOperator<U> combiner);
Integer reducedParams = Stream.of(1, 2, 3)
  .reduce(10, // identity
          Integer::sum, // accumulator
          (a, b) -> {
            System.out.println("combiner was called");
            return a + b;
          });
```

### Collecting
- 인자: Collector
- toList(): 스트림에서 작업한 결과를 담은 리스트로 반환
- joining(): 스트림에서 작업한 결과를 하나의 스트링으로 이어붙여 반환
- averageingInt(): 숫자 값의 평균 반환
- summingInt(): 숫자 값의 합 반환
- summarizingInt(): 합계, 평균, 개수, 최소, 최대를 모두 포함하는 객체 반환
- groupingBy(): 특정 조건을 기준으로 요소를 그룹화, 인자가 Functiuon 인터페이스
- partitioningBy(): 특정 조건을 기준으로 요소를 그룹화, 인자가 Predicate 인터페이스
- collectingAndThen(): collect 한 이후에 추가 작업이 필요한 경우에 사용

### Matching
- 인자: Predicate
- anyMatch(): 하나라도 조건을 만족하는 요소가 있는지
- allMatch(): 모두 조건을 만족하는지
- noneMatch(): 모두 조건을 만족하지 않는지

<br />

## 출처
- https://futurecreator.github.io/2018/08/26/java-8-streams/
- https://thalals.tistory.com/321