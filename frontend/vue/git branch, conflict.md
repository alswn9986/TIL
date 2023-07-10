# git branch 따서 개발하기, 충돌 대처하기

- branch 생성
```bash
git branch [만들브랜치명] [분기할브랜치명]
```

<br>

- 다른 branch pull 받기
```bash
git pull origin [다른브랜치명]
```

1. 여기서 충돌 발생 시 현재 branch 수정한 파일을 먼저 commit & push 한다.(현재 branch에 올린다.)
2. 다시 위 명령어로 다른 branch를 pull 받으면 Automatic Merge Failed 되며 충돌난 파일과 파일 내 충돌 위치가 뜬다.
3. 원하는 대로 소스를 merge 하여 수정하고 다시 commit & push 한다.
4. 현재 branch에 다른 branch 내용이 합쳐졌다.

<br>

- branch 합치기
```bash
git merge [합칠브랜치명]
```
1. 원본 branch로 checkout 하고 위 명령어를 실행한다.(로컬 원본 branch + 로컬 합칠 branch)
2. 원본 branch의 원격 최신 소스를 pull 받는다.
3. 충돌이 있을 경우 충돌 파일을 확인하여 수정한 후 다시 commit & push 한다.

<br>

- branch 삭제

원본 branch에 개발한 branch를 merge 했으면 개발 branch는 필요없으므로 삭제한다.
```bash
git branch -d [브랜치명]
git push -d origin [브랜치명]
```
1. 첫 번째 줄 명령어로 로컬 브랜치를 삭제한다.
2. 두 번째 줄 명령어로 삭제한 로컬 브랜치를 원격에 반영한다.

<br>

branch를 생성해서 개발하다가 merge할 필요가 없으면 아래 명령어로 merge되지 않은 branch를 삭제한다.
```bash
git branch -D [브랜치명]
```

<br>

- branch 목록 확인
```bash
git branch -v
```

<br>

merged 되지 않은 브랜치 목록만 확인하려면 --merged 옵션을 추가한다.
- branch 목록 확인
```bash
git branch --merged
```

-  파일 되돌리기
checkout이나 revert로 파일을 이전 상태로 되돌린다.
```bash
git revert [커밋해쉬]
```