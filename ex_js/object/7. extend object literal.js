// 1. 단축 프로퍼티
let x = 1, y = 2;

let o1 = {x: x, y: y};
let o2 = {x, y};

// 2. 계산된 프로퍼티 이름
const PROPERTY_NAME = "p1";
function computePropertyName() {return "p" + 2;}

let o3 = {};
o3[PROPERTY_NAME] = 1;
o3[computePropertyName()] = 2;

let o4 = {
    [PROPERTY_NAME]: 1,
    [computePropertyName()]: 2
};

// 3. 분해 연산자
let o5 = {x: 1};
let p = {x: 0, ...o5};
p.x;    // 1
let q = {...o5, x: 2};
q.x;    // 2

let o6 = Object.create({x: 1});
let z = {...o};
z.x;    // undefined, 자체 프로퍼티만 분해하고 상속된 프로퍼티에는 적용되지 않음

// 4. 단축 메서드
let square1 = {
    area: function() {return this.side * this.side;},
    side: 10
};
square1.area()   // 100

let square2 = {
    area() {return this.side * this.side;},
    side: 10
};
square2.area()  // 100