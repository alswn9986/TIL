let o = {};
o.x = 1;
let p = Object.create(o);
p.y = 2;
let q = Object.create(p);
q.z = 3;

console.log(`x: ${q.x}, y: ${q.y}, z: ${q.z}`); // x: 1, y: 2, z: 3

q.x = 100;
console.log(`q.x: ${q.x}`); // q.x: 100
console.log(`o.x: ${o.x}`); // o.x: 1