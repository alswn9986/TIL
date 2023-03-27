# 문제
numbers가 매개변수로 주어질 때 numbers를 정수로 바꿔라.

## 내 풀이
```js
function solution(numbers) {
    const obj = {
        'zero': 0,
        'one': 1,
        'two': 2,
        'three': 3,
        'four': 4,
        'five': 5,
        'six': 6,
        'seven': 7,
        'eight': 8,
        'nine': 9
    };

    Object.keys(obj).map(x => {
        const regex = new RegExp(`${x}`, 'g');
        numbers = numbers.replace(regex, obj[x]);
    });

    return +numbers;
}
```

## 개선 풀이 1
- replace()의 두번 째 인자로 콜백함수를 잘 활용하기
- replace() 두번 째 인자 함수는 one, two, three... 등의 정규식을 통해 검색된 문자열 반환
```js
function solution(numbers) {
    const obj = {
        zero: 0, one: 1, two: 2, three: 3, four: 4,
        five: 5, six: 6, seven: 7, eight: 8, nine: 9
    };

    const num = numbers.replace(/zero|one|two|three|four|five|six|seven|eight|nine/g, (v) => {
        return obj[v];
    });

    return Number(num);
}
```

## 개선 풀이 2
- 내 풀이 + 개선 풀이 1
- obj key가 변경될 수 있으므로 key로 정규식을 생성하도록 변경
```js
function solution(numbers) {
    const obj = {
        zero: 0, one: 1, two: 2, three: 3, four: 4,
        five: 5, six: 6, seven: 7, eight: 8, nine: 9
    };
    
    let regex = new RegExp(`${Object.keys(obj).join('|')}`, 'g');
    const num = numbers.replace(regex, (v) => obj[v]);

    return +num;
}
```