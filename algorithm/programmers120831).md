# 문제
정수 n이 주어질 때, n이하의 짝수를 모두 더한 값을 return 하라.

## 내 풀이
```js
function solution(n) {
    let answer = 0;
    let i = 0;
    while (i <= n) {
        if (i % 2 === 0) {
           answer += i; 
        }
        i++;
    }
    return answer;
}
```

## 개선 풀이 1
```js
function solution(n) {
    var half = Math.floor(n / 2);
    return half * (half + 1);
}
```

## 개선 풀이 2
```js
function solution(n) {
    var answer = 0;
    for (let i = 2 ; i <= n ; i += 2) answer += i;
    return answer;
}
```

## 개선 풀이 3
```js
function solution(n) {
    return Array(n)
        .fill()
        .map((_, i) => i + 1)
        .filter((v) => v % 2 === 0)
        .reduce((acc, cur) => acc + cur, 0);
}
```

## 개선 풀이 4
```js
function solution(n) {
    return Math.floor(n / 2) * (2 + n) / 2 | 0
}
```