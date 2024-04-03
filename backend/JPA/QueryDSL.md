## QueryDSL
### 기본 Q 생성
- 쿼리 타입(Q)은 사용하기 편리하도록 기본 인스턴스를 보관하고 있다.
- 같은 엔티티를 조인하거나 서브쿼리에 사용할 때는 같은 별칭이 사용되므로 직접 지정해서 사용해야 한다.
```java
QMember qMember = new QMember("m"); // 직접 지정
QMember qMember = QMember.member;   // 기본 인스턴스 사용
```
- 쿼리 타입의 기본 인스턴스를 사용하면 static을 활용해서 더 간결하게 작성할 수 있다.
```java
import static com.test.domain.QMember.member;   // 기본 인스턴스
```

### 검색 조건 쿼리
```java
JPAQuery query = new JPAQuery(em);
QItem item = QItem.item;
List<Item> list = query
    .from(item)
    .where(item.name.eq("좋은상품")
        .and(item.price.gt(20000)))
    .list(item);
```

### 결과 조회
쿼리 작성이 끝나고 결과 조회 메서드를 호출하면 실제 데이터베이스를 조회한다.
보통 ```uniqueResult()```나 ```list()```를 사용하고 파라미터로 프로젝션 대상을 넘겨준다.
- ```uniqueResult()```: 조회 결과가 한 건일 때 사용한다. 없으면 null을 반환하고 결과가 하나 이상이면 예외가 발생한다.
- ```singleResult()```: ```uniqueResult()```과 같지만 결과가 하나 이상이면 처음 데이터를 반환한다.
- ```list()```: 결과가 하나 이상일 때 사용한다. 결과가 없으면 빈 컬렉션을 반환한다.
- 페이징 사용 시 전체 데이터 조회를 위한 count 값을 같이 얻으려면 ```listResults()```를 사용한다.

### 그룹
- groupBy를 사용하고 그룹화된 결과를 제한하려면 having을 사용하면 된다.
```java
query.from(item)
    .groupBy(item.price)
    .having(item.price.gt(1000))
    .list(item);
```

### 조인
- innerJoin
- leftJoin
- rightJoin
- fullJoin
- fetchJoin
```java
QOrder order = QOrder.order;
QMember member = QMember.memer;
QOrderItem orderItem = QOrderItem.orderItem;

query.from(order)
    .join(order.member, member)
    .leftJoin(order.orderItems, orderItem)
    .list(order);
```

### 서브쿼리
```java
// 한 건
QItem item = QItem.item;
QItem itemSub = new QItem("itemSub");

query.from(item)
    .where(item.price.eq(
        new JPASubQuery().from(itemSub).unique(itemSub.price.max())
    ))
    .list(item);


// 여러 건
QItem item = QItem.item;
QItem itemSub = new QItem("itemSub");

query.from(item)
    .where(item.in(
        new JPASubQuery().from(itemSub)
        .where(item.name.eq(itemSub.name))
        .list(itemSub)
    ))
    .list(item);
```

### 프로젝션 결과 반환
select 절에 조회 대상을 지정하는 것을 프로젝션이라고 한다.
- 프로젝션 대상이 하나면 해당 타입으로 반환된다.
- 프로젝션 대상으로 여러 필드를 선택하면 기본적으로 ```Tuple```이라는 Map과 비슷한 내부 타입을 사용한다.
#### 빈 생성
쿼리 결과를 엔티티가 아닌 특정 객체로 받고 싶으면 빈 생성 기능을 사용한다.
- 프로퍼티 접근
- 필드 직접 접근
- 생성자 사용