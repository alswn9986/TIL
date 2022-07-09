let o = {x: 1};

// 1. in
console.log("x" in o);  // true
console.log("y" in o);  // false
console.log("toString" in o);   // true

// 2. hasOwnProperty() 
console.log(o.hasOwnProperty("x")); // true
console.log(o.hasOwnProperty("y")); // false
console.log(o.hasOwnProperty("toString"));  // false

// 3. propertyIsEnumerable()
console.log(o.propertyIsEnumerable("x"));   // true
console.log(o.propertyIsEnumerable("y"));   // false
console.log(o.propertyIsEnumerable("toString"));    // false

// 4. 프로퍼티를 검색하고 undefined가 아님을 확인
console.log(o.x !== undefined); // true
console.log(o.y !== undefined); // false
console.log(o.toString !== undefined);  // true