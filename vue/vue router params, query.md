# vue router
뷰로 싱글 페이지 어플리케이션을 구현할 때 화면 전환 및 페이지 이동을 위해 사용하는 라이브러리이다.

웹에서 라우팅은 페이지 간의 이동 방법을 뜻하는데 뷰는 화면 이동 시 DOM을 새로 갱신하지 않고 변경된 컴포넌트만 갱신하여 깜빡임 없이 매끄럽게 전환되는 장점이 있다.

## `<router-link>`
페이지 이동 태그로 화면에서 `<a>`태그로 치환되어 실행된다.

### :to 속성
- path: 이동하려는 경로
- name: 이동하려는 경로를 라우터에 설정된 이름으로 지정
- query: query string 형태로 전달되는 파라미터, GET 방식
- params: name 속성을 지정하여 이동할 때(path가 아닌) 전달될 파라미터, POST 방식

### query vs. params
query
```js
// 보내는 쪽
<router-link :to="{ path: '/main', query: { msg: 'hello' }}">페이지 이동</router-link>

// 받는 쪽
{{ $route.query.msg }}
```
params
```js
// 보내는 쪽
<router-link :to="{ name: 'main', params: { msg: 'hello' }}">페이지 이동</router-link>

// 받는 쪽
{{ $route.params.msg }}
```

<br>

## `<router-view>`
페이지 표시 태그로 변경되는 URL에 따라 컴포넌트가 화면에 그려질 영역이다.

