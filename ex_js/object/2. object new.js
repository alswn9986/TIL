// 2. new 생성자
let objByNew = new Object(); // 빈 객체 {}
console.log(objByNew); // {} 

let Animal = function(){
    this.cry = '멍멍';
    this.sound = function() {
        console.log(this.cry)
    }
};

let dog = new Animal;
console.log(dog instanceof Animal); // true
dog.sound(); // 멍멍