# 자바스크립트 CSV 파일 업로드
```js
try {
  let validExts = ['.csv', '.txt'];											// 허용 확장자
  let file = event.target.files[0];											// 파일
  let fileName = file.name;															// 파일명
  let fileExt = this.getExtensionOfFilename(fileName);	// 파일 확장자

  if (!validExts.includes(fileExt)) {
    this.$alert('잘못된 파일입니다. CSV, TXT 파일만 업로드 가능합니다.', '안내', { dangerouslyUseHTMLString: true });
  }

  const reader = new FileReader();
  reader.onload = e => {
    let data = e.target.result;
    let lines = data.split('\n').map(x => x.replace(/\s/,''));
    let headers = lines[0].split(",");
    let result = [];
    for (let i = 1; i < lines.length; i++) {
        let obj = {};
        let currentline = lines[i].split(",");

        for (let j = 0; j < headers.length; j++) {
          obj[headers[j]] = currentline[j];
        }
        result.push(obj);
    }
  };
  reader.readAsText(file);
} catch (error) {
  console.log(error)
} finally {
  this.downloadLoading = false;
}
```