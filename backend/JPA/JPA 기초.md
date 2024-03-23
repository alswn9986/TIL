### 객체지향 쿼리 언어
- JPQL(Java Persistence Query Language): JPA가 제공하는 객체지향 쿼리 언어
- 네이티브 SQL: 직접 SQL을 작성

### 스프링 + JPA
- 스프링 데이터 JPA
- QueryDSL

### 객체 모델링에 대한 고민
왜 객체지향의 장점을 포기하고 객체를 단순히 테이블에 맞추어 데이터 전달 역할만 하도록 개발할까?
객체와 관계형 데이터베이스 간의 차이를 중간에서 해결해주는 ORM 프레임워크

### JPA를 사용해서 얻을 수 있는 장점
- CRUD SQL을 작성할 필요가 없다.
- 조회된 결과를 객체로 매핑하는 작업도 대부분 자동으로 처리해준다.
- 애플리케이션을 SQL이 아닌 객체 중심으로 개발해 테스트를 작성하기 편리하다.

### 애플리케이션에서 SQL을 직접 다룰 때 발생하는 문제점
- 진정한 의미의 계층 분할이 어렵다.
    - DAO를 열어서 어떤 SQL이 실행되고 어떤 객체들이 조회되는지 일일이 확인해야 한다.
- 엔티티를 신뢰할 수 없다.
  - DAO CRUD 코드와 SQL까지 대부분을 변경해주어야 한다.
- SQL에 의존적인 개발을 피하기 어렵다.

### JPA와 문제 해결
JPA는 개발자 대신 적절한 SQL을 생성해서 데이터베이스에 전달한다.
- 저장 기능: ```jpa.persist(member);```
- 조회 기능: ```jpa.find(Member.class, memberId);```
- 수정 기능: ```member.setName("이름 변경");```
  > JPA는 별도의 수정 메소드를 제공하지 않고, 객체를 조회해서 값을 변경하면 커밋할 때 적절한 UPDATE SQL이 전달된다.
  > ```JAVA
  > jpa.find(Member.class, memberId);
  > member.setName("이름 변경");
  > ```
- 연관된 객체 조회 기능: ```Team team = member.getTeam();```
  > JPA는 연관된 객체를 사용하는 시점에 적절한 SELECT SQL을 실행한다.
  > ```JAVA
  > Member member = jpa.find(Member.class, memberId);
  > Team team = member.getTeam();   // 연관된 객체 조회
  > ```

### JPA와 객체 그래프 탐색
- JPA는 연관된 객체를 사용하는 시점에 적절한 SELECT SQL을 실행한다.
- 이 기능은 실제 객체를 사용하는 시점까지 데이터베이스 조회를 미룬다고 해서 지연 로딩이라고 한다.
- Member를 사용할 때마다 Order를 함께 사용하면 아래처럼 한 테이블씩 조회하는 것보다는 Member를 조회하는 시점에 SQL 조인을 사용해 Member와 Order를 함께 조회하는 것이 효과적이다.
```JAVA
// 처음 조회 시점에 SELECT MEMBER SQL
Member member = jpa.find(Member.class, memberId);
Order order = member.getOrder();
order.getOrderDate();   // Order를 사용하는 시점에 SELECT ORDER SQL
```
> JPA는 연관된 객체를 즉시 함께 조회할지, 아니면 실제 사용되는 시점에 지연해서 조회할지를 간단한 설정으로 정의할 수 있다.

### 객체 비교
- 데이터베이스는 기본 키의 값으로 각 로우를 구분한다.
- 객체는 동일성 비교와 동등성 비교라는 두 가지 비교 방법이 있다.
    - 동일성 비교는 == 비교다. 객체 인스턴스의 주소 값을 비교한다.
    - 동등성 비교는 equals() 메소드를 사용해 객체 내부의 값을 비교한다.
- 데이터베이스의 같은 로우를 조회했지만 객체의 동일성 비교는 실패한다.
- 객체를 컬렉션에 보관했으면 동일성 비교에는 성공했을 것이다.
```JAVA
String memberId = "100";
Member member1 = memberDAO.getMember(memberId);
Member member2 = memberDAO.getMember(memberId);

member1 == member2; // 다름
```
- JPA는 같은 트랜잭션일 떄 같은 객체가 조회되는 것을 보장한다.
```JAVA
String memberId = "100";
Member member1 = jpa.find(Member.class, memberId);
Member member2 = jpa.find(Member.class, memberId);

member1 == member2; // 같음
```

### 왜 JPA를 사용해야 하는가?
- 생산성
  - 자바 컬렉션에 객체를 저장하듯이 JPA에게 저장할 객체를 전달하면 된다.
  - SQL을 작성하고 JDBC API를 다루는 일은 JPA가 대신 처리해준다.
  - JPA에는 DDL문을 자동으로 생성해주는 기능도 있어 데이터베이스 설계 중심의 패러다임을 객체 설계 중심으로 역전시킬 수 있다.
- 유지보수
  - SQL을 직접 다루면 엔티티에 필드 하나만 추가해도 관련된 등록, 수정, 조회 SQL 결과를 매핑하기 위한 JDBC API 코드를 모두 변경해야 한다.
  - 개발자가 작성해야 했던 코드를 JPA가 대신 처리해준다.
  - 객체지향 언어가 가진 장점들을 활용해 유연하고 유지보수하기 좋은 도메인 모델을 편리하게 설계할 수 있다.
- 패러다임의 불일치 해결
  - JPA는 상속, 연관관계, 객체 그래프 탐색, 비교하기와 같은 패러다임의 불일치 문제를 해결해준다.
- 성능
  - 애플리케이션과 데이터베이스 사이에서 다양한 성능 최적화 기회르 제공한다.
  - 같은 트랜잭션 안에서 똑같은 내용을 두 번 조회하면 최초 한 번만 데이터베이스에 전달하고 두 번째는 조회된 객체를 재사용한다.
- 데이터 접근 추상화와 벤더 독립성
  - 애플리케이션이 특정 데이터베이스 기술에 종속되지 않도록 한다.