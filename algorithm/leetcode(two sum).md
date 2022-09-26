내 코드
```js
var twoSum = function(nums, target) {
    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            if (nums[i] + nums[j] == target) {
                return [i, j];
            }
        }
    }
};
```

<br>

개선 코드
```js
var twoSum = function(nums, target) {
    let storage = {};
    
    for (let [index, num] of nums.entries()) {
        console.log(`index : ${index}, num: ${num}`);
        if (storage[num] !== undefined) return [storage[num], index];
        storage[target - num] = index;
    }
};
```

<br>

테스트 케이스   
- Input: nums = [2,7,11,15]   
- target = 9   
- Output: [0,1]