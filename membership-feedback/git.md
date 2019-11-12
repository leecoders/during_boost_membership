### 다른 저장소 commit log 포함해서 그대로 가져오기
1. new repo 생성
2. `git clone --mirror <old_url> [-b OO --single-branch]`
3. `cd OO.git`
4. `git push <new_url> --mirror`