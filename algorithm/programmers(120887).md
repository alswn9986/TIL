# 문제
## 내 풀이
```js
function solution(i, j, k) {
    let cnt = 0;
    for (let a = i; a <= j; a++) {
        cnt = cnt + [...(a.toString())].filter(x => x === k.toString()).length;
    }
    return cnt;
}
```

## 개선 풀이 1
- 포함된 개수를 세거나 할 때 split()의 여집합을 이용하여 풀이하기
```js
function solution(i, j, k) {
    let a ='';
    for(i;i<=j;i++){
        a += i;
    }

    return a.split(k).length-1;
}
```

## 개선 풀이 2
- +t 하여 문자를 숫자로 간단하게 변환하기
```js
function solution(i, j, k) {
    let str = Array(j - i + 1).fill(i).map((v, i) => v + i).join('')
    return Array.from(str).filter(t => +t === k).length;
}
```