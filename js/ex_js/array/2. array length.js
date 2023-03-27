let a = [1, 2, 3, 4, 5];
a.length = 3;   // [1, 2, 3]
a.length = 5;   // [ 1, 2, 3, <2 empty items> ]
a.length = 0;   // []
a.length = 4;   // new Array(4), [ <4 empty items> ]