## IntelliJ with Git
윈도우 cmd or git bash or IntelliJ Terminal 에 입력
```bash
git config --global user.name "사용자 이름" 
git config --global user.email "사용자 이메일 주소"
```

### Git branch 생성
1. 좌측 하단 + 버튼 또는 우측 하단의 현재 branch 명 클릭
2. + New Branch 클릭
3. Branch 는 Local 에만 생기고, Remote 에는 생성되지 않음
4. Push(녹색 화살표 모양 버튼) 클릭하여 Remote 에도 브랜치 생성

### Git Branch Checkout
- 우측 하단(또는 좌측 상단)의 현재 branch 명 클릭 후 변경할 branch checkout
- Git 탭에서 변경할 branch checkout

### Git Index 추가
Git 은 Index(Staging Area)에 있는 파일만 commit 가능
파일을 Index 에 추가하려면 좌측의 파일목록 트리에서 파일 우클릭 > Git > Add 클릭(Ctrl + Alt + A)
- 파일명이 녹색: 새로운 파일을 생성하고 Index에도 추가한 상태
- 파일명이 빨간색: 새로운 파일을 생성하고 Index에는 추가하지 않은 상태
- 파일명이 파란색: 기존에 있던 파일의 내용을 수정하여 Index에도 추가된 상태

### Git Commit
1. Commit 버튼(우측 상단의 녹색 체크 모양)을 클릭하면 좌측 상단에 Commit 가능한 파일 목록이 표시
   - Changes 하위에 있는 파일은 Index 에 추가된 파일들
   - Unversioned Files 하위에 있는 파일은 수정되었지만 Index 에 추가되지 않은 파일들
2. commit 할 파일을 체크하고, 파일 목록 아래에 commit 메시지를 작성한 후 commit 하면 local branch에 commit 완료
    - IntelliJ 에서는 Git Index 에 추가되지 않은 파일도 체크하고 Commit 하면 자동으로 Git Index 에 추가하고 Commit 함
3. Git History 에서 아직 Push 되지 않은 이력을 우클릭하고 Undo Commit 을 클릭하면 Commit 이 취소됨

### Git Push
1. Git Commit 시 Commit 버튼 말고 Commit and Push 버튼 클릭
2. 또는 우측 상단의 Push 버튼(녹색 화살표 모양 버튼)을 클릭하면 Index에 추가된 파일이 Remote Branch 에 올라감

### Git History
- Commit 만 했을 때는 Branch 명이 develop 라고만 되어있고, Push 까지 완료하면 origin & develop 로 변경됨

### Git Rollback
- 소스 우클릭 > Git > Rollback 을 클릭하여 수정된 내용을 가장 최근 History 로 되돌릴 수 있음

### Git Branch Merge
develop branch 에서 변경한 항목들을 master branch 에도 적용하기
1. master branch 로 이동 (master branch checkout)
   - local branch 로 체크아웃 하던, remote branch 로 체크아웃 하던 똑같이 local branch 로 체크아웃됨 
2. branch 목록에서 develop branch 를 우클릭한 후 Merge 'develop' into 'master'을 클릭
3. master local branch 에 develop branch 의 변경 내용이 반영됨
    - local branch 를 merge 하면 commit 한 내용만 반영
    - remote branch 를 merge 하면 push 까지 완료한 내용이 반영

### Git 사용 참고
- https://its-easy.tistory.com/27
- https://hajoung56.tistory.com/113