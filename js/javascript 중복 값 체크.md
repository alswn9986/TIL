# 배열 내에서 중복 값 추출하기

### 기초 데이터
```js
// 데이터
let arr = [{
    "name": "홍길동",
    "phoneNumber": "010-1111-1111"
  }, {
    "name": "김길동",
    "phoneNumber": "010-2222-2222"
  }, {
    "name": "고길동",
    "phoneNumber": "010-3333-3333"
  }, {
    "name": "서길동",
    "phoneNumber": "010-1111-1111"
  }, {
    "name": "서길동",
    "phoneNumber": "010-4444-4444"
  }, {
    "name": "여길동",
    "phoneNumber": "010-5555-5555"
}];ㄴ
 
// 전화번호만 추출
// ["010-1111-1111", "010-2222-2222", "010-3333-3333", "010-1111-1111", "010-4444-4444", "010-5555-5555"]
let phoneNumbers = arr.map(x => x.phoneNumber);
```

<br>

### indexOf() 사용하기
```js
function findDuplication(arr) {
  return arr.filter((item, index) => arr.indexOf(item) !== index);
}
console.log(findDuplication(phoneNumbers));	// ["010-1111-1111"]
```

<br>

### Set 사용하기
```js
function findDuplication(arr) {
    const uniqueSet = new Set(arr);
    const filtered = arr.filter(item => {
        if (uniqueSet.has(item)) {
            uniqueSet.delete(item);
        } else {
            return item;
        }
    });
 
    return [...new Set(filtered)]
}
console.log(findDuplication(phoneNumbers));	// ["010-1111-1111"]
```