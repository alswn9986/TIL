객체 값을 키로 가지는 객체 복사
```js
let tab = {
	abc: 1,
	def: 40,
	xyz: 50
}

let keymap = {
	abc: "newabc",
	def: "newdef",
	xyz: "newxyz"
}

const newmap = _.mapKeys(tab, function(value, key) {
	return keymap[key] ? keymap[key] : key;
}
```