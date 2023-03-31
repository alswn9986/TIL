# 문제
 두 정수 num과 total이 주어지면 연속된 수 num개를 더한 값이 total이 될 때, 정수 배열을 구하라.

## 내 풀이
```js
function solution(num, total) {
    const factorial = (n) => n === 0 ? 0 : n + factorial(n - 1);
    let x = (total - factorial(num - 1)) / num; // 시작하는 수
    return Array(num).fill(x).map((item, index) => item + index);
}
```

## 개선 풀이
- total/num => 수열의 평균값 num/2 => 수열의 마지막에서 중앙까지의 등차 계산 ceil와 floor를 활용 수 있는 이유는 등차가 1이기 때문
```js
function solution(num, total) {
    var min = Math.ceil(total/num - Math.floor(num/2));
    var max = Math.floor(total/num + Math.floor(num/2));

    return new Array(max-min+1).fill(0).map((el,i)=>{return i+min;});
}
```