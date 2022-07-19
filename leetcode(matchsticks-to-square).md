# 성냥 연결해서 사각형 만들기
> **NOTE**   
> DFS, 깊이 우선 탐색   
> 루트 노드에서 시작해서 다음 분기로 넘어가기 전에 해당 분기를 완벽하게 탐색하는 방식이다.
> 최대한 한 방향으로 갈 수 있을 때까지 가다가 더 이상 갈 수 없게되면 가장 가까운 갈림길로 돌아와 다른 방향으로 탐색을 진행한다.

```js
/**
 * @param {number[]} matchsticks
 * @return {boolean}
 */
var makesquare = function(matchsticks) {
    let n = matchsticks.length;
    if (n === null || n < 4) {
        return false;
    }
    let sum = matchsticks.reduce((acc, curr) => acc + curr, 0);
    
    matchsticks.sort((a, b) => a > b? -1 : 1);
    let side = sum / 4;
    let square = [0, 0, 0, 0];
    
    function dfs(i) {
        if (i === n) {
            return true;
        }
        
        for (let j = 0; j < square.length; j++) {
            if (matchsticks[i] + square[j] > side) {
                continue;
            }
            square[j] += matchsticks[i];
            if (dfs(i + 1)) {
                return true;
            }
            square[j] -= matchsticks[i];
        }
        return false;
    }
    
    return dfs(0);
};
```