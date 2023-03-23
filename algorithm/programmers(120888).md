# 문제
## 내 풀이
```js
function solution(my_string) {
    const arr = [...my_string];
    return arr.filter((item, index) => {
        let idx = arr.indexOf(item);
        if (idx < index)    return false;
        else    return true;
    }).join('')
}
```

## 개선 풀이
- 스프레드 연산자 안에서 생성자 사용 가능
- 문자열 자체를 Set으로 생성 가능
- Set 도 삽입 순서를 보장
```js
function solution(my_string) {
    return [...new Set(my_string)].join('');
}
```