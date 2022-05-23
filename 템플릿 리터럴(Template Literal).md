## 템플릿 리터럴(Template Literal)

> **NOTE**   
> 여러 줄 문자열, 형식화, HTML 이스케이프 등 다양한 기능과 내장된 표현식을 허용하여 깔끔한 방식으로 문자열을 다룬다.

<br>

템플릿 리터럴
* 따옴표 대신 백틱(``)과 플레이스 홀더(${expression})를 이용하여 단일 문자열로 연결한다.
```js
const func1 = (name, age) => {
	return `안녕 나는 ${name}, ${age}살 이야.`; 
};
 
console.log(func1('감자', 10));	// 안녕 나는 감자, 10살 이야.
```