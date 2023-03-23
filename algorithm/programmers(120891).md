# 문제
3, 6, 9의 개수만큼 박수를 친다고 할 때, 말해야 하는 숫자 order에서 박수쳐야 할 횟수를 구하라.

## 내 풀이
```js
function solution(order) {
    return [...order.toString()].filter(x => parseInt(x) !== 0 && parseInt(x) % 3 === 0).length;
}
```

## 개선 풀이 1
- 정해진 것만 필터링 해야될 때는 filter() 말고 정규식을 활용하기
```js
function solution(order) {
    var answer = [...order.toString().matchAll(/[3|6|9]/g)].length;
    return answer;
}
```