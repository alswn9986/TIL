# 문제
emergency가 매개변수로 주어질 때 응급도가 높은 순서대로 진료 순서를 정한 배열을 구하라.

## 내 풀이
```js
function solution(emergency) {
    let sortedArr = [...emergency].sort((a, b) => b - a);
    return emergency.map(x => sortedArr.findIndex(y => y === x) + 1);
}
```

## 개선 풀이
- 개선점은 아니지만 slice()가 기존 배열을 변경하지 않는다는 점
- [...변수명], slice() 깊은복사, 얇은복사를 하는 경우 비교
```js
function solution(emergency) {
    let sorted = emergency.slice().sort((a,b)=>b-a);
    return emergency.map(v=>sorted.indexOf(v)+1);
}
```