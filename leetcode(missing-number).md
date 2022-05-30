내 코드
- (조건) n == nums.length 이고 nums의 모든 숫자는 중복이 없다.
- 최댓값을 n으로 보고 해당 값에서 -1씩 하면서 배열에 없는 숫자를 반환한다.
```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var missingNumber = function(nums) {
    let n = nums.length;
    while (n > -1) {
        if (!nums.includes(n)) {
            return n;
        }
        n--;
    }
};
```
<br>

개선 코드 (0부터 n까지의 합계 - 배열의 합계)
- 0부터 n까지의 합계를 구하고 nums 배열에 있는 값을 뺐을 때 값이 nums 배열에 포함되지 않은 값이다.
- 0부터 n까지의 합계를 구하는 공식은 n(n+1)/2 이다.
```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var missingNumber = function(nums) {
    let sum = nums.length * (nums.length + 1) / 2
    for (let num of nums) sum -= num;
    return sum;
};
```
- 배열의 합계에서 for문 대신 reduce() 함수를 사용한다.
```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var missingNumber = function(nums) {
    let sum = nums.reduce((a,b) => a+b, 0);
    return (nums.length) * (nums.length + 1) / 2 - sum;
};
``` 
<br>

개선 코드 2 (비트 연산자)
```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var missingNumber = function(nums) {
    let res = nums.length;
    for (let i = 0; i < nums.length; i++)
		  res = res ^ i ^ nums[i];
    return res;
};
```

> 비트 XOR 연산자 (^)    
> 대응되는 두 비트가 서로 다르면 1을 반환하고, 서로 같으면 0을 반환한다.