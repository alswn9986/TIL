# 배열 순회
## for/of 루프
- 내장 이터레이터는 오름차순으로 요소를 반환한다.
- 존재하지 않는 배열 요소에 대해서는 undefined를 반환한다.

```js
let letters = [..."hello world"];
let string = '';
for(let letter of letters) {
    string += letter;
}
string  // hello world
```

```js
let letters = [..."hello world"];
for(let [index, letter] of letters.entries()) {
    console.log(`index: ${index}, letter: ${letter}`);
}
```

<br>

## forEach()
- 배열 순회를 함수형으로 바꾼 배열 메서드이다.
- 성긴 배열을 인식하고 존재하지 않는 요소에 대해서는 함수를 호출하지 않는다.
- for 루프를 사용하면 인덱스로 접근하기 때문에 성긴배열인지 아닌지 해당 요소를 체크해주어야 하는데, forEach는 그럴 필요가 없다.
  
```js
let letters = [..."hello world"];
let uppercase = '';
letters.forEach(letter => {
    uppercase += letter.toUpperCase();
});
```