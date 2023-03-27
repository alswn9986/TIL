# 문제
분수의 합 구하기

## 내 풀이
```js
function solution(numer1, denom1, numer2, denom2) {
    let denom = denom1 * denom2;
    let numer = ((denom / denom1) * numer1) + ((denom / denom2) * numer2);
    
    let denomArr = Array(denom).fill(1).map((item, idx) => item + idx).filter(item => denom % item === 0).sort((a, b) => b - a);
    let numerArr = Array(numer).fill(1).map((item, idx) => item + idx).filter(item => numer % item === 0);
    
    let measure = denomArr.find(x => numerArr.includes(x));
    
    return [numer / measure, denom / measure]
}
```

## 개선 풀이
```js
function fnGCD(a, b){
    return (a%b)? fnGCD(b, a%b) : b;
}

function solution(denum1, num1, denum2, num2) {
    let denum = denum1*num2 + denum2*num1;
    let num = num1 * num2;
    let gcd = fnGCD(denum, num); //최대공약수

    return [denum/gcd, num/gcd];
}
```