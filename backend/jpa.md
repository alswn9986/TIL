# JPA(Java Persistence API)
- 자바에서 ORM 기술 표준으로 사용되는 인터페이스의 모음이다.
- 실제로 구현된 것이 아니라 구현된 클래스와 매핑을 해주기 위해 사용되는 프레임워크이다.
- Hibernate, Spring JPA, EclipseLink 등이 JPA 인터페이스를 구현한 구현체이다.

# ORM(Object-Relational Mapping)
- 자바의 객체와 관계형 DB 테이블을 매핑한다.
- ORM을 통해 객체 간의 관계를 바탕으로 SQL을 자동으로 생성한다.

<br>

# JPA 기본 Annotation
> **NOTE**   
> - 객체 - 테이블 : @Entity, @Table
> - 필드 - 컬럼 : @Column
> - 기본키 : @Id
> - 조인 : @ManyToOne, @JoinColumn

## @Entity
- Entity 객체의 인스턴스 하나가 테이블에서 하나의 레코드 값을 의미
- 객체의 인스턴스를 구분하기 위한 키 값은 @Id 어노테이션을 사용하고 테이블 상에서 PK를 의미
- spring.jpa.hibernate.ddl-auto 설정이 create 또는 update 로 되어 있으면 프로젝트가 시작될 때 EntityManager가 자동으로 DDL을 수행해 테이블을 생성

> **spring.jpa.hibernate.ddl-auto**   
> 애플리케이션 로딩 시점에 자동으로 DDL을 실행하는 설정
> - create: 기존 테이블 삭제 후 다시 생성(drop+create)
> - create-drop: create와 같으나 종료 시점에 테이블 drop
> - update: 변경 분만 반영
> - validate: 엔티티와 테이블이 정상 매핑되었는지만 확인
> - none: 자동 DDL 실행 기능을 사용하지 않음
> - delete: 삭제는 지원하지 않음
>
> **개발 단계별 사용 권장 옵션**   
> - 개발 초기: create or update
> - 테스트 서버: update or validate
> - 스테이징과 운영: validate or none(가급적 사용하지 않는 것이 좋음)

### 제약사항
- 필드에 final, enum, interface, class를 사용할 수 없음
- 기본 생성자가 반드시 필요

### 속성
- name: 엔티티 이름을 지정, 기본 값으로 클래스 이름을 그대로 사용

<br>

## @Table
- 매핑할 테이블을 지정
- 클래스 이름과 테이블 이름이 다를 경우 사용

### 속성
- name: 매핑할 테이블 이름 지정
- catalog: DB catalog 매핑
- schema: DB 스키마 매핑
- uniqueConstraint: DDL 쿼리를 작성할 때 제약조건 생성

> **@Entity, @Table**   
> - 명시적으로 @Table의 name 속성을 사용해 DB 상의 실제 테이블 명칭을 지정하지 않으면 Entity 클래스의 이름 그대로 CamelCase를 유지한 채 테이블이 생성됨
> - DB 상에서 보편적으로 사용되는 명명법은 UnderScore가 원칙이므로 테이블 이름을 명시적으로 작성하는 것이 관례

<br>

## @Column
- 테이블에 있는 컬럼과 동일하게 1:1 매칭
- 사용하지 않는 컬럼들은 클래스 내에 작성하지 않아도 무방
- 별다른 옵션 설정이 필요하지 않다면 Entity 클래스에 정의된 모든 내부변수가 기본적으로 @Column 어노테이션이 포함되므로 생략 가능
- name, insertable, updateable, table을 제외한 나머지 속성은 DDL 생성 기능을 사용할 때만 적용되는 속성이며 실행 로직에는 영향을 끼치지 않음
- nullable 속성이 false인 경우 java의 기본 타입(int, long, ...)은 null 값 입력이 불가능하므로 DB 컬럼에 Not Null 제약조건을 지정해주는 것이 안전함

### 속성
- name: 매핑할 테이블의 컬럼명 지정
- insertable: 엔티티 저장 시 선언된 필드도 같이 저장
- updateable: 엔티티 수정 시 선언된 필드도 같이 수정
- table: 지정한 필드를 다른 테이블에 매핑
- nullable: null 허용 여부
- unique: 제약조건 설정
- columnDefinition: 컬럼 정보를 직접적으로 지정
- length: varchar의 길이 조정, 기본 값은 255
- precision, scale: BigInteger, BigDecimal 타입에서 사용, 소수점 포함 자리 수와 소수의 자리수

<br>

## @Id
- PK를 명시적으로 지정
- DDL 생성 기능을 create로 사용하는 경우 해당 테이블 생성 시 PK로 생성됨

<br>

## @GeneratedValue
- PK 컬럼의 데이터 형식은 정해져 있지 않으나 구분이 가능한 유일한 값을 가지고 있어야 할 때 데드락 같은 현상을 방지하기 위해 대부분 BigInteger(= Long)를 사용
- 대량의 요청이 유입되더라도 중복과 데드락이 발생되지 않을 만큼 키 값이 빠르고 안전하게 생성 및 관리되어야 함
- 보편적으로 MySQL은 auto increment 방식, 오라클은 sequence 방식 사용

```java
@Id // 자동으로 생성되는 PK 컬럼은 명시적으로 ID로 지정하는 것이 관례
@GeneratedValue(strategy = GenerationType.IDENTITY) // auto increment 컬럼임을 알려줌
private Long id;
```

```java
@Id
@SequenceGenerator(name="seq", sequenceName="jpa_sequence") // sequence를 호출할 때마다 기존 값 + 1이 된 값을 반환
@GeneratedValue(strategy="GenerationType.SEQUENCE", generator="seq") // sequence를 사용해 PK를 사용하겠다고 지정
```

<br>

## @EmbeddedId
- 일반적인 경우 단일 PK로 구성하지만 경우에 따라 복합키를 사용
- 복합키는 두 개 이상의 @Id로 구성되는데 직접 엔티티에 정의하지 않고 별도의 Value를 사용해 복합키를 정의
- @Embeddable 으로 해당 value가 엔티티에 삽입이 가능함을 명시하고, 엔티티에서는 @EmbeddedId 로 이 엔티티에 해당 value를 PK로 사용한다고 명시

```java
@Embeddable
public class CompanyOrgKey {
    @Column(name="company")
    private String company;

    @Column(name="org")
    private String org;
}

@Entity(name="company_org")
public class CompanyOrg {
    @EmbeddedId
    protected CompanyOrgKey key;
}
```

<br>

## @Temporal
- 날짜 타입을 매핑할 때 사용
- java 8에서 지원하는 LocalDate, LocalDateTime을 사용할 때는 생략 가능

### 속성
- TemporalType.DATE: 날짜, date 매핑(yyyy-mm-dd)
- TemporalType.TIME: 시간, time 매핑(H:M:S)
- TemporalType.TIMESTAMP: 날짜와 시간, timestamp 매핑(yyyy-mm-dd H:M:S)

<br>

## @Enumerated
- java의 enum 형태로 미리 정의되어 있는 코드 값이나 구분 값을 데이터타입으로 사용

### 속성
- EnumType.ORDINAL: enum 객체에 정의된 순서가 컬럼 값으로 저장
- EnumType.STRING: enum 객체에 정의된 문자열 자체가 컬럼 값으로 저장
- ORDINAL는 enum 타입이나 순서가 변경될 수도 있고, STRING 설정은 문자열 자체가 저장되며 DB 공간 낭비가 발생
- converter 사용 추천

```java
enum Gender {
    MALE,
    FEMALE;
}

@Enumerated(EnumType.ORDINAL)   // 1, 2
private Gender gender;

@Enumerated(EnumType.STRING)    // MALE, FEMALE
private Gender gender;
```

<br>

## @Convert
- 변수의 타입을 변환하여 저장하거나 조회
```java
class GenderConverter implements AttributeConverter {
    @Override
    public Integer convertToDatabaseColumn(String s) {
        if ("MALE".equals(s)) {
            return 1;
        } else if ("FEMALE".equals(s)) {
            return 2;
        }
        return 0;
    }

}

class UserEntity {
    @Convert(converter = GenderConverter.class)
private String gender;
}
```

<br>

## @Transient
- 엔티티 객체에 속성으로 지정되어 있지만 DB상에서 필요없는 속성일 때 이용하지 않겠다고 정의하는 것
- 엔티티 객체에 임시로 값을 담는 용도로 사용
- DB에 저장, 조회되지 않음

<br>

## 참고자료
https://www.icatpark.com/entry/JPA-%EA%B8%B0%EB%B3%B8-Annotation-%EC%A0%95%EB%A6%AC
https://lng1982.tistory.com/279