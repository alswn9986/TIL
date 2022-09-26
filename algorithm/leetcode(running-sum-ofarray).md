내 코드
```js
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var runningSum = function(nums) {
    let sum = 0;
    let arr = [];
    for (let i = 0; i < nums.length; i++) {
        sum = sum + nums[i];
        arr.push(sum);
    }
    return arr;
};
```

<br>

개선 코드
```js
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var runningSum = function(nums) {
    for (let i = 1; i < nums.length; i++) {
        nums[i] = nums[i] + nums[i-1];
    }
    return nums;
};
```