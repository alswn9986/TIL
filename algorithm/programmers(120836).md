# 문제
순서쌍이란 두 개의 숫자를 순서를 정하여 짝지어 나타낸 쌍으로 (a, b)로 표기한다.
자연수 n이 매개변수로 주어질 때 두 숫자의 곱이 n인 자연수 순서쌍의 개수를 구하라.

## 내 풀이
```js
function solution(n) {
    let cnt = 0;
    for (let i = 1; i <= n; i++) {
        if (n % i === 0) {
            cnt++;
        }
    }
    return cnt;
}
```

## 개선 풀이 1
```js
function solution(n) {
    let ans = 0;
    for (let i = 1; i < Math.sqrt(n); i++)
        if (n % i === 0) ans += 2;

    return Number.isInteger(Math.sqrt(n)) ? ans + 1 : ans;
}
```

## 개선 풀이 2
```js
function solution(n) {
    return Array(n).fill(1).map((v, idx) => v + idx).filter(v => n % v === 0).length;
}
```