# 문제
정수가 담긴 리스트가 주어질 때, 원소 중 짝수와 홀수의 개수를 담은 배열을 리턴하라.

## 내 풀이
```js
function solution(num_list) {
    let even = num_list.reduce((acc, curr) => {
        if (curr % 2 === 0) acc += 1;
        return acc;
    }, 0);
    let odd = num_list.length - even;
    return [even, odd];
}
```

## 개선 풀이 1
```js
function solution(num_list) {
    return num_list.reduce(([even, odd], curr) => {
        return [
            curr % 2 === 0? even + 1 : even,
            curr % 2  === 1? odd+1 : odd 
        ]
    }, [0,0])
}
```

## 개선 풀이 1
```js
function solution(num_list) {
    var answer = [0, 0];

    for (let a of num_list) {
        answer[a%2] += 1
    }

    return answer;
}
```