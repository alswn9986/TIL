## JQPL
- 엔티티를 대상으로 쿼리하는 객체지향 쿼리 언어이다.
- SQL을 추상화해서 특정 데이터베이스에 의존하지 않는다.
- JQPL은 SQL로 변환된다.

<br />

### SELECT문
```SQL
SELECT m FROM Member AS m where m.username = 'Hello'
```
- 엔티티와 속성은 대소문자를 구분한다.(Member, username 등)
- JPQL 키워드는 대소문자를 구분하지 않는다.(SELECT, FROM, AS 등)
- JPQL 에서 사용한 Member는 클래스명이 아니라 엔티티명이다.
- 엔티티명은 ```@Entity(name="XXX")```로 지정할 수 있다. 지정하지 않으면 클래스명을 기본 값으로 사용한다.
- JQPL은 별칭을 필수로 작성해야 한다.(Member AS m 또는 Member m)

#### TypeQuery, Query
작성한 JQPL을 실행하려면 쿼리 객체를 만들어야 한다.
- 반환할 타입을 명확하게 지정할 수 있으면 ```TypeQuery```를 사용한다.
- 반환할 타입을 명확하게 지정할 수 없으면 ```Query``` 객체를 사용한다.
```java
TypedQuery<Member> query = em.createQuery("SELECT m FROM Member m", Member.class);
List<Member> resultList = query.getResultList();
for (Member member : resultList) {
    System.out.println("member = " + member);
}
```

- ```em.createQuery()```의 두 번째 파라미터에 반환할 타입을 지정하지 않으면 ```Query```객체를 반환한다.
```java
Query query = em.createQuery("SELECT m.username, m.age from Member m");
List resultList = query.getResultList();
for (Ojbect o : resultList) {
    Ojbect[] result = (Ojbect[]) o;
    // result[0], result[1]
}
```

#### 파라미터 바인딩
이름 기준 파라미터
- 위치 기준 파라미터보다 명확하다.
- ```:username```이라는 기준 파라미터를 정의하고 ```query.setParameter()```에서 파라미터를 바인딩한다.
```java
String usernameParam = "User1";
TypedQuery<Member> query = em.createQuery("SELECT m FROM Member m where m.username = :username", Member.class);
query.setParameter("username", usernameParam);
List<Member> resultList = query.getResultList();
```
위치 기준 파라미터
- ? 다음에 위치 값을 주면 위치 기준 파라미터를 사용할 수 있다.
- 위치 값은 1부터 시작한다.
```java
List<Member> members = em.createQuery("SELECT m FROM Member m where m.username = ?1", Member.class)
    .setParameter(1, username)
    .getResultList();
```

#### 프로젝션(Projection)
SELECT 절에 조회할 대상을 지정하는 것이다.
- ```SELECT {프로젝션 대상} FROM```으로 대상을 선택한다.
- 프로젝션 대상은 엔티티, 엠비디드 타입, 스칼라 타입이 있다.

엔티티 프로젝션
- 원하는 객체를 바로 조회한 것이다.
- 이렇게 조회한 엔티티는 영속성 컨텍스트에서 관리된다.
```SQL
SELECT m FROM Member m      // 회원
SELECT m.team FROM Member m // 팀
```
임베디드 타입 프로젝션
- 임베디드 타입은 조회의 시작점이 될 수 없다는 제약이 있다.
- 임베디드 타입은 엔티티 타입이 아닌 값 타입이다. 영속성 컨텍스트에서 관리되지 않는다.
```java
// String query = "SELECT a FROM Address a";   // 불가능
String query = "SELECT o.address FROM Order o";
List<Address> address = em.createQuery(query, Address.class).getResultList();
```
스칼라 타입 프로젝션
- 숫자, 문자, 날짜와 같은 기본 데이터 타입들이다.
- 통계 쿼리는 주로 스칼라 타입으로 조회된다.
```java
List<String> usernames = em.createQuery("SELECT username FROM Member m", String.class).getResultList();
```
여러 값 조회
- 필요한 데이터들만 선택해서 조회할 때는 ```TypeQuery``` 대신 ```Query```를 사용해야 한다.
```java
Query query = em.createQuery("SELECT m.username, m.age FROM Member m");
List<Object[]> resultList = query.getResultList();
for (Ojbect[] row : resultList) {
    String username = (String) row[0];
    Integer age = (Integer) row[1];
}
```
NEW 명령어
- 여러 값을 조회하게 되면 DTO 처럼 의미 있는 객체로 변환해서 사용한다.
- SELECT 다음에 ```NEW``` 명령어를 사용하면 반환받을 클래스를 지정해 클래스의 생성자에 JQPL 조회 결과를 넘겨줄 수 있다. ```NEW``` 명령어를 사용한 클래스로 ```TypeQuery```를 사용할 수 있어 객체 변환 작업을 줄일 수 있다.
- 패키지명을 포함한 전체 클래스명을 입력해야 한다.
- 순서와 타입이 일치하는 생성자가 필요하다.
```java
TypedQuery(UserDTO) query = em.createQuery("SELECT new com.test.UserDTO(m.username, m.age) FROM Member m", UserDTO.class);
List<UserDTO> resultList = query.getResultList();
```