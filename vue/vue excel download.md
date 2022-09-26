## Vue 엑셀 다운로드
서버를 거치지 않고 화면 상에서 xlsx 라이브러리를 사용해 엑셀 다운로드를 하는 방법이다.

<br>

## xlsx 라이브러리 설치
```bash
npm install --save xlsx
```
<br>

## xlsx 를 사용한 엑셀 다운로드 기능 구현
```js
import xlsx from 'xlsx';

...

methods: {
	excelDownload() {
    const fileName = 'excelFile';	// 파일명
    const sheetName = 'sheet1';	// 시트명
    const header = [['이름', '나이', '이메일']];
    const list = [{
      name: '홍길동',
      age: 15,
      email: '홍길동@naver.com'
    }, {
      name: '김길동',
      age: 44,
      email: '김길동@naver.com'
    }, {
      name: '박길동',
      age: 26,
      email: '박길동@naver.com'
    }];
    
    const workBook = xlsx.utils.book_new();
    const workSheet = xlsx.utils.json_to_sheet(list);
      
    xlsx.utils.sheet_add_aoa(workSheet, header);
    xlsx.utils.book_append_sheet(workBook, workSheet, sheetName);
    xlsx.writeFile(workBook, fileName);
	}
}
```