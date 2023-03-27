# 문제
## 내 풀이
```js
function solution(my_str, n) {
    let arr = [];
    let myStrArr = [...my_str];
    while (myStrArr.length > 0) {
        arr.push(myStrArr.splice(0, n).join(''));
    }
    return arr;
}
```

## 개선 풀이
- 정규식에서 {Min, Max}의 의미는 최소 Min 이상, 최대 Max 이하를 의미(반복)
- 정규식에서 .은 숫자, 한글, 영어, 특수기호, 공백 모두를 포함한 모든 문자열을 의미
```js
function solution(my_str, n) {
  return my_str.match(new RegExp(`.{1,${n}}`, "g"));
}
```

> **정규식 반복 패턴**
> - ?: 없거나 or 최대 한 개만
> - *: 없거나 or 있거나(여러 개)
> - +: 최소 한 개 or 여러 개
> - *?: 없거나, 있거나 and 없거나, 최대 한 개 => 없음, {0}과 동일
> - +?: 최소 한 개, 있거나 and 없거나, 최대 한 개 => 한 개, {1}과 동일
> - {n}: n개
> - {Min,}: 최소 Min개 이상
> - {Min, Max}: 최소 Min개 이상, 최대 Max개 이하, {3, 5}? == {3}