# 객체 키 이름 변경하기 (객체 배열)
map 인자로 객체를 구조분해하여 다른 이름으로 변경하고 새로운 객체로 리턴한다.
```js
let origins = [{
	old1: 'origins[0].old1',
	old2: 'origins[0].old2',
	old3: 'origins[0].old3'
}, {
	old1: 'origins[1].old1',
	old2: 'origins[1].old2',
	old3: 'origins[1].old3'
}];
 
let results = origins.map(({
	old1: new1,
	old2: new2,
	...rest
}) => ({
	new1,
	new2,
	...rest
}));
```

# 객체 키 이름 변경하기 (객체)
```js
let origin = {
	old1: 'origins[0].old1',
	old2: 'origins[0].old2',
	old3: 'origins[0].old3',
	old4: 'origins[0].old4',
};
 
let func = ({old1: new1, old2: new2, ...rest}) => {
  return {new1, new2, rest}
}
func(origin);
```