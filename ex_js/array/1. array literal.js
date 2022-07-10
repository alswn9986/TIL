// 1. 배열 리터럴
// 배열 리터럴에 상수가 아닌 임의의 표현식을 사용
let base = 1024;
let table = [base, base+1, base+2];

// 배열 리터럴에 콤마를 연속하여 사용
let count = [1,,3];
let undefs = [,,];

console.log(count); // [ 1, <1 empty item>, 3 ]
console.log(undefs);    // [ <2 empty items> ]

// 2. 분해 연산자
let a = [1, 2, 3];
let b = [0, ...a, 4];   // b == [0, 1, 2, 3, 4]

let digits = [..."0123456789ABCDE"];
console.log(digits);    // ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E']

let letters = [..."hello world"];
[...new Set(letters)];  // 배열을 세트로 변환하고 분해연산자로 배열로 되돌림

// 3. Array() 생성자
// 인자 없이 호출
let arr1 = new Array(); // []과 동등

// 배열 길이를 나타내는 숫자 인자 하나로 호출
let arr2 = new Array(10);   // 지정된 길이를 가진 배열 생성

// 배열 요소를 두 개 이상 쓰거나 숫자가 아닌 요소를 하나만 넘겨 호출
let arr3 = new Array(5, 4, 3, 2, 1, "testing");

// 4. Array.of()
Array.of(); // []
Array.of(10);   // [10]
Array.of(1, 2, 3);  // [1, 2, 3]