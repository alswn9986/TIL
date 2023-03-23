# 문제
1시간에 두 배만큼 증식할 때 처음 세균 n마리와, 경과한 시간 t시간 후 세균의 수를 구하라.

## 내 풀이
```js
function solution(n, t) {
    let answer = n;
    while (t >= 1) {
        answer *= 2;
        t--;
    }
    return answer;
}
```

## 개선 풀이 1
```js
function solution(n, t) {
  return n << t;
}
```

## 개선 풀이 2
```js
function solution(n, t) {
    return n * Math.pow(2, t);
    // return n * (2 ** (t));
}
```