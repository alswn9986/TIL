# 문제
영어 점수와 수학 점수의 평균을 기준으로 매긴 등수를 담은 배열을 구하라.

## 내 풀이
```js
function solution(score) {
    score = score.map(x => (x[0] + x[1]) / 2);
    let sortedScore = [...score].sort((a, b) => b - a);
    let rank = score.map(a => sortedScore.findIndex(b => a === b) + 1);
    return rank;
}
```

## 개선 풀이
- 배열을 정렬하지 않고 자기보다 점수가 높은 사람의 수를 구하는 접근법
```js
function solution(score) {
  return score.map((el) => {
    return (
      score.filter((v) => (v[0] + v[1]) / 2 > (el[0] + el[1]) / 2).length + 1
    );
  });
}
```