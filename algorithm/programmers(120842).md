# 문제
num_list를 n으로 쪼갠 2차원 배열로 바꿔라.

## 내 풀이
```js
function solution(num_list, n) {
    let arr = [];
    let temp = [];
    for (let i = 0; i < num_list.length; i++) {
        temp.push(num_list[i]);
        if ((i + 1) % n === 0) {
            arr.push(temp);
            temp = [];
        }
    }
    return arr;
}
```

## 개선 풀이
- splice() 는 원본배열을 변경한다.(따라서 계속 0부터 시작)
- splice() 반환 값은 쪼개진 배열이다.
```js
function solution(num_list, n) {
    var answer = [];
    while(num_list.length) {
        answer.push(num_list.splice(0,n));
    }
    return answer;
}
```