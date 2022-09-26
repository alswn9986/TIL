# Vue 한글 입력 처리하기
Vue에서는 한글을 입력할 때 데이터가 즉시 바인딩되지 않고 글자의 조합이 완성되어야 바인딩이 된다. 한글이 IME가 필요한 언어기 때문이다.
그래서 Vue에서 한글 입력을 위해서 v-model을 사용하는 대신 @input 이벤트와 v-bind를 사용해야 한다.

> **IME란**
> 한글, 한자, 중국어, 일본어처럼 컴퓨터 자판에 있는 글자보다 더 많은 수의 문자를 계산하거나 조합해 입력해주는 SW이다.

<br>

# @input + v-bind 시 문제점
예를 들어, 문자를 입력할 때 5자 이상 입력하면 뒷부분을 잘라주는 기능이 필요하다고 치면 아래와 같이 구현할 것이다.
이 코드는 데이터인 this.msg 값은 변경되지만 변경사항이 input에 v-bind되지 않는 문제가 있다.

```html
<input :value="msg" @input="changeMsg" />
```
```js
changeMsg(e) {
  this.msg = e.target.value.substring(0, 5);
}
```

<br>

# 개선안
아래 코드 처럼 타겟 DOM의 속성을 다시 바꾸어 주어야 한다. 이렇게 하는 경우 :value="msg"도 사실상 필요가 없다.(초기 값이 없는 경우에만) 즉, 바인딩이 정상적으로 이루어지지 않고 있다.   
e.target.value = e.target.value.substring(0, 3); 처럼 직접 타겟의 값을 바꿔주면 문제는 해결된다.   

```html
<div id="app">
  <input :value="msg" @input="changeMsg" />
  {{ msg }}
</div>
```
```js
new Vue({
	el: "#app",
  data: {
  	msg: '초기 값'
  },
  methods: {
  	changeMsg(e) {
    	e.target.value = e.target.value.substring(0, 3);
      this.msg = e.target.value;
      console.log(this.msg)
    }
  }
});
```