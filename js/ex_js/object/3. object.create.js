// 3. Object.create()
let objByObject = Object.create(Object.prototype);  // 임의의 프로토타입을 사용해 새 객체 생성 가능 {}과 동일
let Animal = {
    sound: function() {
        console.log(this.cry)
    }
};

let dog = Object.create(Animal);
console.log(Animal.isPrototypeOf(dog)); // true
dog.cry = '멍멍';
dog.sound();    // 멍멍