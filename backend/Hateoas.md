# Hateoas(Hypermedia As The Engine Of Application State)
하이퍼미디어를 애플리케이션 상태를 관리하기 위한 메커니즘으로 사용한다 애플리케이션의 상태가 항상 하이퍼미디어를 통해 전이되어야 한다.

## REST 특징
### Server-Client 구조
- 서버는 API를 제공하고 비지니스 로직을 담당한다.
- 클라이언트는 사용자 인증이나 세션 등을 관리한다.
- 서로 간의 의존성이 줄어든다.

### Stateless(무상태)
- Client의 context를 Server에 저장하지 않는다.
- 서버는 클라이언트의 요청을 단순 처리한다.
- 이전 요청이 다음 요청의 처리와 연관되지 않아야 한다.

### Cacheable(캐시 처리 가능)
- HTTP 프로토콜 표준에서 사용하는 Last-Modified 태그나 E-Tag를 사용하면 캐싱 구현이 가능하다.
- 캐시 사용을 통해 REST 서버 트랜잭션이 발생하지 않아 응답시간, 성능 등을 향상시킬 수 있다.

### Layered System(계층화)
- 클라이언트는 REST API 서버로만 호출한다.
- REST 서버는 다중 계츠으로 구성될 수 있다.
- Proxy, Gateway 같은 네트워크 기반의 중간 매체를 사용할 수 있다.

### Code-On-Demand
- 서버로부터 스크립트를 받아서 클라이언트에서 실행한다.

### Uniform Interface(인터페이스 일관성)
- URI로 지정한 Resource에 대한 조작을 통일된 인터페이스로 수행한다.

<br>

## Uniform Interface의 4가지 제약 조건
### Resource-Based
- 리소스가 URL로 식별되어야 한다.

### Manipulation Of Resource Through Representations
- Representation 전송을 통해서 리소스를 조작해야 한다.
- 리소스를 CRUD 할 때 메소드를 사용한다.

### Self-Descriptive Message
- 메시지 내용만 봐도 스스로를 설명할 수 있어야 한다.
- API 문서가 REST API 응답 본문에 존재해야 한다.

### Hypermedia As The Engine Of Applcation State(HATEOAS)
- 링크를 써서 페이지를 이동해야 한다.
- hypermedia로 애플리케이션 상태를 설명해야 한다.
- hypermedia를 통해 애플리케이션의 상태 전이(해당 URI에서 사용자가 다음 행동으로 취할 수 있는 것들)가 가능해야 한다.

<br>

## HATEOAS 구현
클라이언트가 서버로부터 어떤 요청을 할 때, 요청에 필요한 URI를 응답에 포함시켜 반환하는 것으로 가능하게 한다.
- API 리소스에 대해 어떠한 행동을 할 수 있는지 URL을 전달하여 클라이언트가 참고하고 사용할 수 있다.
- 해당 리소스의 상태에 따라 링크 정보가 바뀌며 동적으로 리소스를 구성한다.
- 이러한 메시지를 표현하기 위해 헤더의 Content Type을 application/hal+json으로 전달하면 클라이언트에서는 _links 필드에 링크정보가 있다고 예상할 수 있다.

<br>

## 참고자료
- https://wonit.tistory.com/454
- https://gmlwjd9405.github.io/2018/09/21/rest-and-restful.html