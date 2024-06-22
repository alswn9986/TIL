function solution(a, b) {
	return (a + b) * (Math.abs(b - a) + 1) / 2;
}

console.log(solution(3, 6));