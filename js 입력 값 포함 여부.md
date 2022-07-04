# 자바스크립트 입력 값 포함 여부
```js
let input = '01011112222'
let list = [{
    mobileNo: "01021113222",
    denyDate: "2022-05-05"
  }, {
    mobileNo: "01011112222",
    denyDate: "2022-05-12"
  }];

let result = list.some(x => x.mobileNo === input);
console.log(result);  // true
```