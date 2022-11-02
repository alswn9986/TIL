# 문제
Given a non-empty array of integers nums, every element appears twice except for one. Find that single one.   

=> nums 배열 내 모든 요소는 한 요소만 빼고 같은 값이 2번씩 나타난다. 하나만 있는 요소를 찾아라.


## 내 코드
- nums 배열을 정렬하여 같은 숫자는 같이 모여있도록 한다.
- nums 배열을 2칸씩 체크하여 인접한 배열이 같은 값인지 확인한다.
```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function(nums) {
    nums.sort();
    for (let i = 0; i < nums.length; i = i + 2) {
        if (nums[i] !== nums[i + 1]) {
            return nums[i]
        }
    }
};
```

## 개선 코드
- 비트 연산자 중 ^(XOR) 연산자는 같은 값을 두 번 연산하면 0이 된다.
```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function(nums) {
    return nums.reduce((ans, n) => ans ^= n, 0);
};
```