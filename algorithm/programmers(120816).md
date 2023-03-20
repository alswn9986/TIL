# 문제
7조각으로 잘라주는 피자를 몇 판 먹어야 n명이 최소 1조각씩 먹을 수 있을지 구하라.

## 내 풀이
```js
function solution(n) {
    let cnt = 1;
    while (cnt * 7 < n) {
        cnt++;
    }
    return cnt;
}
```

## 개선 풀이 1
```js
function solution(n) {
    return Math.ceil(n / 7)
}
```