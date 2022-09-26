# 고객 등급 혜택
[**해당월**]월 등급은 [**등급명**]등급, 문자[**발송한도**]건 발송 가능   
[**등급메시지**], [**GOLD한도**]/[**VIP한도**]/[**PLATINUM한도**]

<br>

# 발신번호
  디폴트 발신번호, 추가할 경우 인증 처리

<br>

# 발신유형(즉시발송/예약발송)
	'발송하기' 버튼 클릭 시 즉시발송일 때는 광고여부, 시간 체크
		1) 발송가능한 시간일 경우 발송
		2) 발송불가능한 시간일 경우 알럿
	예약발송일 때는 광고여부, 설정한 시간 체크 (다른 쪽에는 8시부터 20시까지만 지정 가능)

> survey.js

이 메서드에서 체크하는 시간이 08~20시가 맞는지 확인(아래 설명에는 21시라고 되어있음)
```js
//주문 가능 시간대 확인 (08 ~ 20)
export function checkPossibleOrderTime(data) {
  return request({
    url: "/v2/survey/order/possibleOrderTime",
    method: "post",
    headers: { "Content-Type": "application/json" },
    data
  });
}
```

> GorderInfoNormal.vue
```js
// 즉시발송 주문 가능시간 체크
async possibleOrderTime() {
  const { code, message, result } = await checkPossibleOrderTime({});
  console.log(`possibleOrderTime- code:${code}, message:${message}`);
  if (code === 'SUC0000') {
    return true;
  } else
  if (code === 'ERRSV003') {
    await AlarmMsg.showMsg(`주문가능한 시간이 아닙니다. (08시 ~ 21시)`);
  } else {
    await AlarmMsg.showMsg(`오류가 발생하였습니다.`);
  }

  return false;
}
```

# 메시지 제목, 내용
제목 특수문자, 바이트, 입력 가능 문자 체크 => isMmsSpecialCharCheck, chkByteLength(title, 40), isKSC5601Char

> euc-kr 바이트 계산
```js
function calcByteEuckr(str) {
  return str
    .split('') 
    .map(s => s.charCodeAt(0))	// 유니코드 값으로 변환
    .reduce((prev, c) => (prev + ((c === 10) ? 2 : ((c >> 7) ? 2 : 1))), 0); // c 값이 0~127사이에 있으면 1바이트
}
```

> euc-kr 최대 바이트만큼 자르기
```js
function getLimitedByteEuckrText(str, maxByte) {
  if (!str) return;
  let b;
  for (b = i = 0; (c = str.charCodeAt(i)); ) {
    b += (c === 10) ? 2 : ((c >> 7) ? 2 : 1);

    if (maxByte && b > maxByte) {
      break;
    }

    i++;
  }
  return maxByte ? str.substring(0, i) : b;
}
```

> 특수문자 지우기 commonMixins.js
```js
removeEmojis(string) {
  if (!string) return;
  let regex =
    /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0025-\u0039]\ufe0f?\u20e3|\u3299|\u321C|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff]|[\uFFFC-\uFFFD]|[\u2600-\u2604]|[\u2607-\u260D]|[\u260F-\u2659]|\u2662|\u2666|\u2668|[\u2670-\u26FF])/g;
  return string.replace(regex, '');
}
```

> 변수 입력 처리

맨 처음에는 기본 문자 지정해서 change trigger
```js
<textarea id="input_textarea" onkeyup="checkContent()"></textarea>
<textarea id="result"></textarea>
<button value="#{변수1}" onclick="addClickedItemToContent(this)">추가하기</button>

function init() {
	detectVariableInput('');
}

function checkContent() {
	let target = document.getElementById('input_textarea');
  // 1. byte 체크
  calcByteEuckrFormat(obj.value);
  
  // 2. 입력 불가 문자 체크(특수문자)
  deleteForbiddenWords(obj.value);
  
  // 3. 변수 입력 체크
  detectVariableInput(target.value);
}

function getVariableType() {
   const acceptVariables = {
   	nameColumn: '#{이름}',
    var1Column: '#{변수1}',
    var2Column: '#{변수2}',
    var3Column: '#{변수3}'
  }
  
  return acceptVariables;
}

function calcByteEuckrFormat(text) {
	const acceptVariables = getVariableType();	// 변수 종류
  const bytePerVariable = 40;									// 변수 당 바이트 수
  
  // #{변수} 바이트 계산 (변수 포함 개수 * 변수 기준 바이트)
  let variableCount = 0;
  for (const [key, value] of Object.entries(acceptVariables)) {
  	variableCount += text.split(value).length - 1;   // 변수가 포함된 개수
    text = text.replaceAll(value, '');
  }
  let variableByte = variableCount * bytePerVariable;
  
  // #{변수} 제외 본문 바이트 게산
  let byte = text
    .split('') 
    .map(s => s.charCodeAt(0))   // 유니코드 값으로 변환
    .reduce((prev, c) => (prev + ((c === 10) ? 2 : ((c >> 7) ? 2 : 1))), 0);
   
  return byte + variableByte;
}

// 특수문자 지우기
function deleteForbiddenWords(text) {
  if (!text) return;
  let regex =
    /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0025-\u0039]\ufe0f?\u20e3|\u3299|\u321C|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff]|[\uFFFC-\uFFFD]|[\u2600-\u2604]|[\u2607-\u260D]|[\u260F-\u2659]|\u2662|\u2666|\u2668|[\u2670-\u26FF])/g;
    
  return text.replace(regex, '');
}

// 변수 클릭 시 또는 직접 입력 시 본문 내용 감지하여 사용한 변수 체크, 컬럼 가변 처리
function detectVariableInput(text) {
	// 본문에 사용할 수 있는 변수 키, 값 쌍
  const acceptVariables = getVariableType();
  // 본문에서 사용한 변수에 따라 가변할 컬럼 설정
  const columnList = {
  	nameColumn : {title: '이름', name: 'name'},
    mobileNoColumn: {title: '전화번호', name: 'mobileNo'},
    var1Column: {title: '변수1', name: 'var1'},
    var2Column: {title: '변수2', name: 'var2'},
    var3Column: {title: '변수3', name: 'var3'}
  }
  // 전화번호는 디폴트 컬럼
  let columns = [columnList.mobileNoColumn];
  // 사용 가능한 변수 쌍 중에 본문에 포함된 값은 컬럼 리스트에 추가
  for (const [key, value] of Object.entries(acceptVariables)) {
     if (text.includes(value))   columns.push(columnList[key]);
  }
  
  // 이전 컬럼 리스트랑 지금 구한 컬럼 리스트랑 다를 경우 다시 로드
  let temp1 = [columnList.nameColumn, columnList.mobileNoColumn];
  let temp2 = [columnList.nameColumn, columnList.mobileNoColumn, columnList.var1Column];
  let isChanged = false;
  if (JSON.stringify(temp1) !== JSON.stringify(temp2))   isChanged = true;
	
  document.getElementById('result').value = columns.map(x => x.title).toString();
}

// 특수문자, 변수 클릭하여 선택 시 클릭한 값 본문에 넣어주기
function addClickedItemToContent(target) {
	// 클릭한 버튼 텍스트 읽어오기
  let newData = target.value;
  // 텍스트 영역에 넣기
  insertTextAtLastCursorPostion(newData);
}

// 특수문자, 변수 클릭 시 마지막 커서 위치에 데이터 넣어주기
function insertTextAtLastCursorPostion(addTxt) {
	// 텍스트 영역, 커서 정보
  let txtArea = document.getElementById('input_textarea');					// 텍스트 영역
  let txtValue = txtArea.value;																			// 텍스트 입력 값
  let txtValueLength = txtValue.length;															// 텍스트 길이
  let selectionStart = txtArea.selectionStart;											// 커서 시작지점
  let selectionEnd = txtArea.selectionEnd;													// 커서 끝지점
  
  // 마지막 커서 위치에 특수문자 삽입
  let beforeTxt = txtValue.substring(0, selectionStart);						// 기존텍스트 ~ 시작지점
  let afterTxt = txtValue.substring(selectionEnd, txtValueLength);	// 끝지점 ~ 기존텍스트
  let mergedTxt = beforeTxt + addTxt + afterTxt;
  txtArea.value = mergedTxt;
  
  // 특수문자 삽입된 위치로 focus
  selectionStart = selectionStart + addTxt.length;
  txtArea.selectionStart = selectionStart;
  txtArea.selectionEnd = selectionStart;
  txtArea.focus();
  
  // trigger 본문 변수 사용 내용 감지
  detectVariableInput(mergedTxt);
}


init();
```

<br>

# 수신자 등록
## 변수 하나하나 체크
```js
function checkVariableValue() {
	// 1. 길이 체크
  isMoreThanMaxLength('변수길이를 체크하자');
  // 2. 금지어 체크
  isDenyStr('넌 바보야');
  // 3. 특수문자 체크
  isInvalidEmojis('###🐶');	// true면 사용할 수 없는 문자가 들어간 것
}

function isMoreThanMaxLength(input) {
	const maxLength = 40;
  const inputLength = input.length; // input.length 말고 byte 구하는 걸로 바꾸기
  return inputLength > maxLength;	
}

function isDenyStr(input) {
  const list = ["바보", "멍청이"];	// 금지어 목록
  return list.some(x => input.includes(x));
}

function isInvalidEmojis(input) {
	let regex =
    /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0025-\u0039]\ufe0f?\u20e3|\u3299|\u321C|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff]|[\uFFFC-\uFFFD]|[\u2600-\u2604]|[\u2607-\u260D]|[\u260F-\u2659]|\u2662|\u2666|\u2668|[\u2670-\u26FF])/g;
  return regex.test(input);
}
```
### 중복 번호 검사
```js
let rows = [{
    "name": "한민주",
    "mobileNo": "010-1111-1111",
    "rowKey": 0,
    "alrimTalkVar1": "변수1값",
    "alrimTalkVar2": "변수2값",
    "alrimTalkVar3": "변수3값"
  }, {
    "name": "한민주",
    "mobileNo": "010-1111-1111",
    "rowKey": 1,
    "alrimTalkVar1": "변수1값",
    "alrimTalkVar2": "변수2값",
    "alrimTalkVar3": "변수3값"
  }, {
    "name": "한민주",
    "mobileNo": "010-3333-3333",
    "rowKey": 3,
    "alrimTalkVar1": "변수1값",
    "alrimTalkVar2": "변수2값",
    "alrimTalkVar3": "변수3값"
  }, {
    "name": "한민주",
    "mobileNo": "010-4444-4444",
    "rowKey": 2,
    "alrimTalkVar1": "변수1값",
    "alrimTalkVar2": "변수2값",
    "alrimTalkVar3": "변수3값"
  }, {
    "name": "한민주",
    "mobileNo": "010-5555-5555",
    "rowKey": 4,
    "alrimTalkVar1": "변수1값",
    "alrimTalkVar2": "변수2값",
    "alrimTalkVar3": "변수3값"
  }];

// 전화번호만 추출
let arr = rows.map(x => x.mobileNo);

// CASE01 : Set() 사용
function toFindDuplicates1(arry) {
    const uniqueElements = new Set(arry);	// 1, 2, 3, 4, 5
    const filteredElements = arry.filter(item => {
        if (uniqueElements.has(item)) {
            uniqueElements.delete(item);
        } else {
            return item;
        }
    });

    return [...new Set(filteredElements)]
}
console.log(toFindDuplicates1(arr));

// CASE02 : indexOf() 사용
const toFindDuplicates2 = x => x.filter((item, index) => arr.indexOf(item) !== index)
console.log(toFindDuplicates2(arr));
```

### 핸드폰 번호 검사
```js
function isPhoneNumber(phoneNumber) {
	// var regPhoneNumber = /^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})([0-9]{3,4})([0-9]{4})$/
	let regPhoneNumber = /^(01[016789]{1})-?([0-9]{3,4})-?([0-9]{4})$/;

	if (regPhoneNumber.test(phoneNumber)) {
		return true;
	}

	return false;
}
```

### 한글, 영문만 입력 가능(영문은 띄어쓰기 가능)
```js
function isHangleEnglishSpace(str) {
	let value1 = /^[가-힣\s]+$/;
	let value2 = /^[a-zA-Z\s]+$/;
	let value3 = /^[가-힣a-zA-Z\s]+$/;
	if (value1.test(str) || value2.test(str) || value3.test(str)) {
		return true;
	}

	return false;
}
```

### 변수 길이 체크 => 바이트로 체크해야 할 듯
```js
function isVarLengthCheck(str) {
	if (str === null || str === undefined || str === '') str = '';
	if (str.length < 50) {
		return true;
	}
	return false;
}
```

### 수신 불가 번호 체크
```js
let list = [{
    mobileNo: "01043259852",
    denyDate: "2022-05-05"
  }, {
    mobileNo: "01011112222",
    denyDate: "2022-05-12"
  }];

function isDenyMobileNumber(input) {
  let result = list.some(x => x.mobileNo === input);
  return result;
}

console.log(isDenyMobileNumber('01043259852'));
```

### 금지어 포함 여부
```js
let str = '넌 바보야';
let list = ["바보", "멍청이"];

function isDenyStr(input) {
  let result = list.some(x => input.includes(x));
  return result;
}

console.log(isDenyStr(str));
```

## 휴대전화 번호 검색
```js
const rowDatas = [{
    "name": "가",
    "mobileNo": "010-1111-1111",
    "rowKey": 0,
    "alrimTalkVar1": "변수1값",
    "alrimTalkVar2": "변수2값",
    "alrimTalkVar3": "변수3값"
  }, {
    "name": "나",
    "mobileNo": "010-1111-1111",
    "rowKey": 1,
    "alrimTalkVar1": "변수1값",
    "alrimTalkVar2": "변수2값",
    "alrimTalkVar3": "변수3값"
  }, {
    "name": "라",
    "mobileNo": "010-3333-3333",
    "rowKey": 3,
    "alrimTalkVar1": "변수1값",
    "alrimTalkVar2": "변수2값",
    "alrimTalkVar3": "변수3값"
  }, {
    "name": "다",
    "mobileNo": "010-4444-4444",
    "rowKey": 2,
    "alrimTalkVar1": "변수1값",
    "alrimTalkVar2": "변수2값",
    "alrimTalkVar3": "변수3값"
  }, {
    "name": "마",
    "mobileNo": "010-5555-5555",
    "rowKey": 4,
    "alrimTalkVar1": "변수1값",
    "alrimTalkVar2": "변수2값",
    "alrimTalkVar3": "변수3값"
  }];

// 검색, 데이터 필터링
const searchedDatas = rowDatas.filter(x => x.mobileNo.replaceAll('-', '').includes('0101'));
const notSearchedDatas = rowDatas.filter(row => {
  return !searchedDatas.some(item => row.rowKey === item.rowKey)
});

// 오름차순 정렬 (나중에 num으로 변경)
searchedDatas.sort((a, b) => a.rowKey < b.rowKey ? -1 : 1);
notSearchedDatas.sort((a, b) => a.rowKey < b.rowKey ? -1 : 1);

// 검색된 목록 + 나머지 목록
const resultDatas = [...searchedDatas, ...notSearchedDatas];
console.log(resultDatas)
```

## 입력오류 우선 정렬
맨 처음 데이터 세팅할 때부터 각 항목의 유효성 체크 여부를 가지고 있어야 함
컬럼에 들어가야 하는 데이터
rowkey, 데이터 번호, 이름, 이름체크, 전화번호, 전화번호체크여부, 변수1, 변수1체크여부, 변수2, 변수2체크여부, 변수3, 변수3체크여부, 행체크여부
이름 체크 여부, 전화번호 체크 여부, 변수1 체크 여부, 변수2 체크 여부, 변수3 체크 여부, (이 데이터를 다 포함하는)행 체크 여부
```js
// 입력오류 우선 정렬은 데이터 포커스 아웃 시마다 체크하는 건 순서만 바꾸어주면 됨 = CASE 1
// 데이터 포커스 아웃 시마다 체크할 수 없으면 입력오류 정렬 시 재검사하여 순서를 바꾸어주어야 함 = CASE 2

// CASE 1
const rowDatas = [{
    "name": "가",
    "mobileNo": "010-1111-1111",
    "rowKey": 0,
    "alrimTalkVar1": "변수1값",
    "alrimTalkVar2": "변수2값",
    "alrimTalkVar3": "변수3값",
    "isValidRow": true
  }, {
    "name": "나",
    "mobileNo": "010-1111-1111",
    "rowKey": 1,
    "alrimTalkVar1": "변수1값",
    "alrimTalkVar2": "변수2값",
    "alrimTalkVar3": "변수3값",
    "isValidRow": true
  }, {
    "name": "라",
    "mobileNo": "010-3333-3333",
    "rowKey": 3,
    "alrimTalkVar1": "변수1값",
    "alrimTalkVar2": "변수2값",
    "alrimTalkVar3": "변수3값",
    "isValidRow": false
  }, {
    "name": "다",
    "mobileNo": "010-4444-4444",
    "rowKey": 2,
    "alrimTalkVar1": "변수1값",
    "alrimTalkVar2": "변수2값",
    "alrimTalkVar3": "변수3값",
    "isValidRow": false
  }, {
    "name": "마",
    "mobileNo": "010-5555-5555",
    "rowKey": 4,
    "alrimTalkVar1": "변수1값",
    "alrimTalkVar2": "변수2값",
    "alrimTalkVar3": "변수3값",
    "isValidRow": true
  }];
 
// 유효한 데이터와 아닌 데이터 필터링 및 정렬
const invalidDatas = rowDatas.filter(x => !x.isValidRow).sort((a, b) => a.rowKey < b.rowKey ? -1 : 1);
const validDatas = rowDatas.filter(x => x.isValidRow).sort((a, b) => a.rowKey < b.rowKey ? -1 : 1);

// 유효한 데이터 + 유효하지 않은 데이터
const resultDatas = [...invalidDatas, ...validDatas];
```

## 변수 컬럼 전체 빈 값 체크
```js
const rowDatas = [{
    "name": "가",
    "mobileNo": "010-1111-1111",
    "rowKey": 0,
    "alrimTalkVar1": "",
    "alrimTalkVar2": "변수2값",
    "alrimTalkVar3": "변수3값",
    "isValidRow": true
  }, {
    "name": "나",
    "mobileNo": "010-1111-1111",
    "rowKey": 1,
    "alrimTalkVar1": "",
    "alrimTalkVar2": "변수2값",
    "alrimTalkVar3": "변수3값",
    "isValidRow": true
  }, {
    "name": "라",
    "mobileNo": "010-3333-3333",
    "rowKey": 3,
    "alrimTalkVar1": "변수1값",
    "alrimTalkVar2": "변수2값",
    "alrimTalkVar3": "변수3값",
    "isValidRow": false
  }, {
    "name": "다",
    "mobileNo": "010-4444-4444",
    "rowKey": 2,
    "alrimTalkVar1": null,
    "alrimTalkVar2": "변수2값",
    "alrimTalkVar3": "변수3값",
    "isValidRow": false
  }, {
    "name": "마",
    "mobileNo": "010-5555-5555",
    "rowKey": 4,
    "alrimTalkVar2": "변수2값",
    "alrimTalkVar3": "변수3값",
    "isValidRow": true
  }];
  
let result = rowDatas.some(x => x.alrimTalkVar1);	// 알림톡1 변수에 값이 하나라도 있으면 true
console.log(result);	// true or false

// let result = rowDatas.reduce((acc, curr) => curr.alrimTalkVar1 ? acc + 1 : acc, 0);
// console.log(result);	// 결과가 포함된 개수
```

발송하기 할 때 전달할 값 전화번호 '-' 제거
```js
const rowDatas = [{
    "name": "가",
    "mobileNo": "010-1111-1111",
    "rowKey": 0,
    "alrimTalkVar1": "",
    "alrimTalkVar2": "변수2값",
    "alrimTalkVar3": "변수3값",
    "isValidRow": true
  }, {
    "name": "나",
    "mobileNo": "010-1111-1111",
    "rowKey": 1,
    "alrimTalkVar1": "",
    "alrimTalkVar2": "변수2값",
    "alrimTalkVar3": "변수3값",
    "isValidRow": true
  }, {
    "name": "라",
    "mobileNo": "010-3333-3333",
    "rowKey": 3,
    "alrimTalkVar1": "변수1값",
    "alrimTalkVar2": "변수2값",
    "alrimTalkVar3": "변수3값",
    "isValidRow": false
  }, {
    "name": "다",
    "mobileNo": "010-4444-4444",
    "rowKey": 2,
    "alrimTalkVar1": null,
    "alrimTalkVar2": "변수2값",
    "alrimTalkVar3": "변수3값",
    "isValidRow": false
  }, {
    "name": "마",
    "mobileNo": "010-5555-5555",
    "rowKey": 4,
    "alrimTalkVar2": "변수2값",
    "alrimTalkVar3": "변수3값",
    "isValidRow": true
  }];
  
let result = rowDatas.map(x => {
	x.mobileNo = x.mobileNo.replaceAll('-', '');
  return x;
});
```

# 특수문자 클릭 시 마지막 커서 위치에 삽입
```js
<textarea id="txtForm" style="width:100%; height:300px;"></textarea>
<input type="text" id="addInput">
<input type="button" onclick="insertSpecialSymbol()" value="추가하기">

function insertSpecialSymbol() {
	// 텍스트 영역, 커서 정보
  let txtArea = document.getElementById('txtForm');									// 텍스트 영역
  let txtValue = txtArea.value;																			// 텍스트 입력 값
  let txtValueLength = txtValue.length;															// 텍스트 길이
  let selectionStart = txtArea.selectionStart;											// 커서 시작지점
  let selectionEnd = txtArea.selectionEnd;													// 커서 끝지점
  
  // 마지막 커서 위치에 특수문자 삽입
  let beforeTxt = txtValue.substring(0, selectionStart);						// 기존텍스트 ~ 시작지점
  let afterTxt = txtValue.substring(selectionEnd, txtValueLength);	// 끝지점 ~ 기존텍스트
  let addTxt = document.getElementById('addInput').value; 					// 클릭한 특수문자
  txtArea.value = beforeTxt + addTxt + afterTxt;
  
  // 특수문자 삽입된 위치로 focus
  selectionStart = selectionStart + addTxt.length;
  txtArea.selectionStart = selectionStart;
  txtArea.selectionEnd = selectionStart;
  txtArea.focus();
}
```

# 주소록 가져오기 검색
```js
let rows = [{
	'group': 'A',
  'phoneNumber': '01011111111',
  'name': '김감자',
  'isChecked': false
}, {
	'group': 'A',
  'phoneNumber': '01022222222',
  'name': '김고구마',
  'isChecked': false
}, {
	'group': 'B',
  'phoneNumber': '01033333333',
  'name': '김오이',
  'isChecked': false
}, {
	'group': 'A',
  'phoneNumber': '01044444444',
  'name': '김당근',
  'isChecked': true
}];


// 그룹 탭 / 연락처 탭 변경 시에는 새로고침
// 검색 시에는 남아있음
// 그룹 탭
function searchGroup(group) {
	return rows.filter(x => x.group === group);
}

// 주소록 탭
function searchContact() {
	return rows;
}

// 전화번호 검색
function searchByPhoneNumber(rows, phoneNumber) {
	// 그룹 (또는 전체)으로 정제된 데이터에서 검색
  return rows.filter(x => x.phoneNumber.includes(phoneNumber.replaceAll('-', '')));
}

// 그룹 + 전화번호 검색
console.log(searchByPhoneNumber(searchGroup('A'), '4444'));

// 전화번호 검색
console.log(searchByPhoneNumber(searchContact(), '3333'));
```

# 파일 업로드 결과 화면
성공, 실패는 결과에 대한 것
수신거부는 그냥 수신거부 목록

# 발신번호 변경 시 그리드 다시 체크

# 마지막엔
발신번호별 수신거부 번호 체크
수신불가번호 체크
각 값 항목 체크(길이, 특수문자, 금지어 등)
중복 체크

# 주소록이나 파일업로드에서 중복체크
## 주소록
주소록에서 체크한 목록 내 중복이 있을 경우 하나만 남기고 없애기
기존 수신자랑 주소록이랑 중복일 경우 주소록에서 없애기
```js
let addresses = [{
	'name': '홍길자',
  'number': '010-1111-1111'
}, {
	'name': '홍길동',
  'number': '010-2222-2222'
}, {
	'name': '홍길서',
  'number': '010-1111-1111'
}];

const origins = [{
  "name": "가",
  "mobileNo": "010-1111-1111",
  "rowKey": 0,
  "alrimTalkVar1": "",
  "alrimTalkVar2": "변수2값",
  "alrimTalkVar3": "변수3값",
  "isValidRow": true
}, {
  "name": "나",
  "mobileNo": "010-1111-1111",
  "rowKey": 1,
  "alrimTalkVar1": "",
  "alrimTalkVar2": "변수2값",
  "alrimTalkVar3": "변수3값",
  "isValidRow": true
}, {
  "name": "라",
  "mobileNo": "010-3333-3333",
  "rowKey": 3,
  "alrimTalkVar1": "변수1값",
  "alrimTalkVar2": "변수2값",
  "alrimTalkVar3": "변수3값",
  "isValidRow": false
}];

// 주소록에서 추가할 데이터들
// 1. 추가할 데이터들 중 중복이 있으면 제거
const uniqueAddresses = Array.from(new Set(addresses.map(x => x.number)))
													.map(number => addresses.find(x => x.number === number));

// 2. 중복이 제거된 추가할 데이터들과 기존 데이터 비교
const originNumbers = origins.map(x => x.mobileNo);	// 원래 그리드에 있던 번호들
const denyNumbers = [];	// 수신거부된 번호들
const result = uniqueAddresses.filter(x => !originNumbers.includes(x.number));
```

# 파일 업로드 내역 중 성공, 실패, 수신거부 데이터 구분하기
```js
const rowDatas = [{
  "name": "가",
  "mobileNo": "010-1111-1111",
  "rowKey": 0,
  "var1": "변수1값",
  "var2": "변수2값",
  "var3": "변수3값"
}, {
  "name": "나",
  "mobileNo": "010-1111-1111",
  "rowKey": 1,
  "var1": "변수1값",
  "var2": "변수2값",
  "var3": "변수3값"
}, {
  "name": "라",
  "mobileNo": "010-3333-3333",
  "rowKey": 3,
  "var1": "변수1값",
  "var2": "변수2값",
  "var3": "변수3값"
}, {
  "name": "다",
  "mobileNo": "010-4444-4444",
  "rowKey": 2,
  "var1": "변수1값",
  "var2": "변수2값",
  "var3": "변수3값"
}, {
  "name": "마",
  "mobileNo": "010-5555-5555",
  "rowKey": 4,
  "var1": "변수1값",
  "var2": "변수2값",
  "var3": "변수3값"
}];

let checkedRowDatas = [];
rowDatas.forEach((item, index) => {
	let obj = {};
	// 이름
  let name = item.name;
  obj.name = name;
  obj.isCheckedName = checkVariable(name);
  
  // 전화번호
  let mobileNo = item.mobileNo;
  obj.mobileNo = name;
  obj.isCheckedMobileNo = checkMobileNo(mobileNo);
  obj.isDenyMobileNo = checkDenyMobileNo(mobileNo)
  
  // 변수1
  let var1 = item.var1;
  obj.var1 = var1;
  obj.isCheckedVar1 = checkVariable(var1);
  
  // 변수2
  let var2 = item.var2;
  obj.var2 = var2;
  obj.isCheckedVar2 = checkVariable(var2);
  
  // 변수3
  let var3 = item.var3;
  obj.var3 = var3;
  obj.isCheckedVar3 = checkVariable(var3);
  
  obj.isRowChecked =
  		obj.isCheckedName &&
      obj.isCheckedMobileNo &&
      obj.isDenyMobileNo &&
      obj.isCheckedVar1 &&
      obj.isCheckedVar2 &&
      obj.isCheckedVar3;
  
  checkedRowDatas.push(obj)
});

let denys = checkedRowDatas.filter(x => x.isDenyMobileNo);											// 수신거부 리스트
let fails = checkedRowDatas.filter(x => !x.isDenyMobileNo && !x.isRowChecked);	// 실패 리스트
let succes = checkedRowDatas.filter(x => x.isRowChecked);												// 성공 리스트

function checkVariable(val) {
	// 1. 길이 체크
  // 2. 특수문자 체크
  // 3. 금지어 체크
	return false;
}

function checkMobileNo(val) {
	// 1. 번호 형식 체크
  // 4. 중복 번호 체크
	return true;
}

function checkDenyMobileNo(val) {
	// 2. 수신 불가 번호 체크
  // 3. 수신 거부 번호 체크
  return false;
}
```

## 파일업로드
파일 업로드 목록 내에서 중복 가능 그대로 올리기
파일 업로드 시 이전 목록 지우기

  주소록, 파일업로드 탭 이동: 이전 데이터 유지
  주소록: 중복 및 수신거부 지워주기, 이전 수신자 목록에 추가, 건수 초과 시 alert(마지막 데이터 자르기?)
  파일업로드: 중복 그대로 넣기, 이전 수신자 목록 지우고 새로 넣기
  파일업로드 결과 수신거부 목록: 업로드한 내역 중 수신거부에 해당하는 데이터 표시 

# 발신번호 추가
기본 발신번호인 쿠폰 발송번호? 안 뜨는지 확인

# 이름,번호,변수 별로 체크 한 번에 만들기
checkVariable
checkMobileNo
checkCommon

// 제목에서 체크
바이트 자르기, 특수문자 없애기
// 본문에서 체크
바이트 자르기, 특수문자 없애기, 변수 감지하기
// 수신자에서 체크
바이트 구하기(구해서 기준으로 체크), 특수문자 여부, 금지어 여부, 번호 형식 여부, 수신불가번호 여부, 수신거부번호 여부, 중복번호 여부


// 바이트(길이) 체크 - 구하기/자르기
// 특수문자 - 여부/없애기
// 금지어 - 여부
// 번호 형식 - 여부
// 수신불가번호 - 여부
// 수신거부번호 - 여부
// 중복번호 - 여부/추출
```js
// 바이트 구하기
function calcByte(str) {
  return str
    .split('') 
    .map(s => s.charCodeAt(0))	// 유니코드 값으로 변환
    .reduce((prev, c) => (prev + ((c === 10) ? 2 : ((c >> 7) ? 2 : 1))), 0); // c 값이 0~127사이에 있으면 1바이트
}

// 최대 바이트만큼 자르기
function splitByte(str, maxByte) {
  if (!str) return;
  let b;
  for (b = i = 0; (c = str.charCodeAt(i)); ) {
    b += (c === 10) ? 2 : ((c >> 7) ? 2 : 1);

    if (maxByte && b > maxByte) {
      break;
    }

    i++;
  }
  return maxByte ? str.substring(0, i) : b;
}

// 특수문자 포함 여부
function isInvalidEmojis(input) {
	let regex =
    /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0025-\u0039]\ufe0f?\u20e3|\u3299|\u321C|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff]|[\uFFFC-\uFFFD]|[\u2600-\u2604]|[\u2607-\u260D]|[\u260F-\u2659]|\u2662|\u2666|\u2668|[\u2670-\u26FF])/g;
  return regex.test(input);
}

// 특수문자 없애기
function removeInvalidEmojis(input) {
	if (!string) return;
  let regex =
    /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0025-\u0039]\ufe0f?\u20e3|\u3299|\u321C|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff]|[\uFFFC-\uFFFD]|[\u2600-\u2604]|[\u2607-\u260D]|[\u260F-\u2659]|\u2662|\u2666|\u2668|[\u2670-\u26FF])/g;
  return string.replace(regex, '');
}

// 금지어 포함 여부
function isForbiddenWord(input) {
  let list = ["바보", "멍청이"];	// 금지어 목록
  return list.some(x => input.includes(x));
}

// 번호 형식 일치 여부
function isPhoneNumber(input) {
	let regPhoneNumber = /^(01[016789]{1})-?([0-9]{3,4})-?([0-9]{4})$/;

	if (regPhoneNumber.test(input)) {
		return true;
	}

	return false;
}

// 수신 거부 번호 여부
function isDenyReceiveNumber(input) {
	// 수신 거부 번호 목록
	let list = [{
    mobileNo: "01043259852",
    denyDate: "2022-05-05"
  }, {
    mobileNo: "01011112222",
    denyDate: "2022-05-12"
  }];
  
  return list.some(x => x.mobileNo === input);
}

// 수신 불가 번호 여부
function isUnableToReceiveNumber() {
	// 수신 불가 번호 목록
	let list = [{
    mobileNo: "01043259852",
    denyDate: "2022-05-05"
  }, {
    mobileNo: "01011112222",
    denyDate: "2022-05-12"
  }];
  
  return list.some(x => x.mobileNo === input);
}

// 중복 번호 추출 (한 리스트 내에서 중복 번호 추출)
function findDuplicateNumber() {
	let rows = [{
    "name": "한민주",
    "mobileNo": "010-1111-1111",
    "rowKey": 0,
    "alrimTalkVar1": "변수1값",
    "alrimTalkVar2": "변수2값",
    "alrimTalkVar3": "변수3값"
  }, {
    "name": "한민주",
    "mobileNo": "010-1111-1111",
    "rowKey": 1,
    "alrimTalkVar1": "변수1값",
    "alrimTalkVar2": "변수2값",
    "alrimTalkVar3": "변수3값"
  }, {
    "name": "한민주",
    "mobileNo": "010-3333-3333",
    "rowKey": 3,
    "alrimTalkVar1": "변수1값",
    "alrimTalkVar2": "변수2값",
    "alrimTalkVar3": "변수3값"
  }, {
    "name": "한민주",
    "mobileNo": "010-4444-4444",
    "rowKey": 2,
    "alrimTalkVar1": "변수1값",
    "alrimTalkVar2": "변수2값",
    "alrimTalkVar3": "변수3값"
  }, {
    "name": "한민주",
    "mobileNo": "010-5555-5555",
    "rowKey": 4,
    "alrimTalkVar1": "변수1값",
    "alrimTalkVar2": "변수2값",
    "alrimTalkVar3": "변수3값"
  }];
  
  // 전화번호만 추출
  let arr = rows.map(x => x.mobileNo);
  
  const uniqueElements = new Set(arr);
  const filteredElements = arr.filter(item => {
    if (uniqueElements.has(item)) {
      uniqueElements.delete(item);
    } else {
      return item;
    }
  });
  return [...new Set(filteredElements)];
}

// 중복 번호 추출 (두 리스트를 비교하여 중복 번호 추출)
function compareDuplicateNumber() {
	let addresses = [{
    'name': '홍길자',
    'number': '010-1111-1111'
  }, {
    'name': '홍길동',
    'number': '010-2222-2222'
  }, {
    'name': '홍길서',
    'number': '010-1111-1111'
  }];

  const origins = [{
    "name": "가",
    "mobileNo": "010-2222-2222",
    "rowKey": 0,
    "alrimTalkVar1": "",
    "alrimTalkVar2": "변수2값",
    "alrimTalkVar3": "변수3값",
    "isValidRow": true
  }, {
    "name": "나",
    "mobileNo": "010-1111-1111",
    "rowKey": 1,
    "alrimTalkVar1": "",
    "alrimTalkVar2": "변수2값",
    "alrimTalkVar3": "변수3값",
    "isValidRow": true
  }, {
    "name": "라",
    "mobileNo": "010-3333-3333",
    "rowKey": 3,
    "alrimTalkVar1": "변수1값",
    "alrimTalkVar2": "변수2값",
    "alrimTalkVar3": "변수3값",
    "isValidRow": false
  }];
  
  // 추가할 데이터에 중복이 있으면 제거
  const uniqueAddresses = Array.from(new Set(addresses.map(x => x.number))).map(number => addresses.find(x => x.number === number));
  const originNumbers = origins.map(x => x.mobileNo);	// 원래 그리드에 있던 번호들
  return uniqueAddresses.filter(x => originNumbers.includes(x.number));	// 두 리스트에 모두 중복된 번호
}
```

맨 처음에 default로 해줘야 할 것들
      기본 바이트 계산
      전화번호 변수 감지