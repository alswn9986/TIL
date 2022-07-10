# 두 객체 배열을 비교하여 차집합 추출
```js
const rowDatas = [{
  "rowKey": 0,
  "name": "홍길동"
}, {
  "rowKey": 1,
  "name": "김길동"
}, {
  "rowKey": 4,
  "name": "서길자"
}, {
  "rowKey": 2,
  "name": "고길동"
}, {
  "rowKey": 3,
  "name": "최길자"
}];

// const searchedDatas = rowDatas.filter(x => x.name.match(/.*길동.*/));
const searchedDatas = [{
  name: "홍길동",
  rowKey: 0
}, {
  name: "김길동",
  rowKey: 1
}, {
  name: "고길동",
  rowKey: 2
}];

// CASE 01 : findIndex
const result1 = rowDatas.reduce((acc, curr) => {
   const index = searchedDatas.findIndex(item => item.rowKey === curr.rowKey);
   index === -1 && acc.push(curr);
   return acc;
}, []);

console.log(result1);

// CASE 02 : some
const result2 = rowDatas.filter(row => {
  return !searchedDatas.some(item => row.rowKey === item.rowKey)
});

console.log(result2);

// CASE 03 : Set
// 비교해야 할 키가 하나일 때
let keySet = new Set(searchedDatas.map(({rowKey}) => rowKey));
let result3 = rowDatas.filter(({rowKey}) => !keySet.has(rowKey));

console.log(result3);

// 비교해야 할 키가 여러 개일 때 (JSON.stringfy({비교할 값들})로 사용해도 동일
// ex) JSON.stringify({rowKey, name})
keySet = new Set(searchedDatas.map(({rowKey}) => `${rowKey}`));
result3 = rowDatas.filter(({rowKey}) => !keySet.has(`${rowKey}`));

console.log(result3);

// RESULT
// [{name: "서길자", rowKey: 4}, {name: "최길자", rowKey: 3}]
```