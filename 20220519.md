# github - vscode 연동
vscode에서 github에 있는 원격 저장소를 로컬 PC에 복제하는 방법

< github >
1. 회원 가입하여 계정 생성
2. Repositories 탭에서 [New] 버튼을 눌러 저장소 생성
3. 생성된 Repository 에 들어와 [Code] 버튼을 눌러 clone 할 url 복사

< vscode >

4. F1 누른 후 git clone 검색
5. clone 할 Repository로 복사한 url 입력
6. 로컬 PC 에 저장될 위치 선택
7. cloned repository open

<br>

# vscode github markdown 사용하기
github 저장소를 로컬 PC에 clone하고 .md 파일을 생성하여 원격 저장소에 올리는 방법

1. clone 할 때 지정한 로컬 PC 위치로 vscode 실행
2. 파일 생성 후 markdown 문법으로 내용을 작성
3. markdown 문법이 렌더링 되어 표시되는 형태를 확인하려면 [Open Preview to the side] 버튼 클릭
4. Source Control 탭에서 변경사항 확인하고 [Stage Changes] 버튼 클릭
5. Staged Changes 에서 올릴 파일들 확인하고 [commit] 버튼 클릭

<br>

# fork 사용법
- git 기본 명령어   

    가져오기(remote → local): fetch & pull   
    올리기(local → remote): commit & push

- clone: 원격 저장소 복제하기

  Bitbucket(stash.ktalpha.com): clone → url 복사   
  Fork: File → Clone → url, 저장소 위치 및 이름 지정


- checkout: 브랜치 간 전환, 내용 되돌리기

  Fork Remotes 탭에서 가져올 브랜치를 선택하여 더블 클릭 또는 checkout '브랜치명'

- stash: 아직 마무리하지 않은 작업을 스택에 임시 저장

  Local Changed > unStaged 탭에서 임시 저장할 내용 선택 후 우클릭 → Stash n File → Save Stash (Stashes에서 임시 저장된 내역 확인)

- fetch & pull: 원격 저장소 최신 내용을 로컬 저장소로 가져오기

  상단 도구 상자에서 fetch로 원격 저장소와 로컬 저장소를 동기화한 후 pull 받으면 원격 저장소에 있는 변경사항이 로컬로 반영   
  로컬 소스 변경사항이 있을 경우 fetch & pull 하기 전에 stash로 임시저장 해놓고 pull 받아 merge 하는 것이 좋음   
  (stash 한 소스가 있을 경우 pull까지 받은 후 stashes에 저장된 내용 더블 클릭하여 로컬 소스에 merge)

- commit & push: 로컬 저장소에 변경사항 반영하기

  Unstaged에 변경된 모든 파일이 보이고, 올릴 파일은 Staged로 이동시킴   
  Commit Subject에는 간추린 내용, Description에는 자세한 내용을 적고 commit하면 로컬 저장소에 변경사항 저장, push하면 원격 저장소에 변경사항 저장   
  (commit한 내용을 되돌리려면 All Commits > 브랜치 이력 선택하여 revert commit)   
  (변경했지만 commit 하고 싶지 않고 내용을 되돌리려면 소스 창에서 discard or delete)   

- branch: 독립적인 작업 영역(저장소) 사용

  (보통 새로 생성할 기능 단위 개발이 끝난 후 브랜치 생성)   
  Fork Repository > new branch > features 아래에 기능 이름으로 브랜치 생성 후 Branches에 생성되었는지 확인 ex) features/test 경로까지 적어줌   
  브랜치 생성 시 new branch에서 대상으로 선택했던 브랜치가 저장되어 있고, 내가 개발한 소스를 해당 브랜치를 선택하여 commit & push 하면 됨   

- branch merge

  기능별 브랜치에 commit & push 를 하고 merge할 대상 브랜치를 checkout 받음(대상 branch에서 최근 변경본이 로컬로 들어옴)   
  merge할 브랜치를 우클릭하여 Merge into '대상 브랜치'	Merge: 이 브랜치를, into: 여기에 merge   

- branch delete

  다 사용한 branch 를 우클릭하여 delete(local과 remote 모두 삭제)