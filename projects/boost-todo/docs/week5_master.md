# 마스터 클래스

## DAY1

### field, record, table

### table은 객체 단위

### table이 여러 개 필요한 이유?
- 테이블이 커질 수록 데이터의 중복이 많아짐

### 이상 현상(anomaly)

### 정규화
- 이상 현상을 막기 위해 하는 것

### 역정규화

### JOIN은 별다른 알고리즘이 없다면 O(N*M)의 시간이 걸린다.

### Index와 효과적인 탐색
- Primary Key, Foreign Key 컬럼에는 기본적으로 Index가 자동으로 생성된다.
- Index가 있을 컬럼의 경우 O(log n) 으로 탐색 가능
- Index가 없는 컬럼은 O(n) 시간 소요

## DAY5

### 불필요한 commit 줄이기
- git commit --amend : 특정 커밋 로그 조작

### Connection Pool
- Oracle에서도 엔터프라이즈 버전에는 커넥션 풀을 자체적으로 지원한다고 자랑할 만큼 중요한 기능이다.
- 미리 여러 개의 커넥션을 만들어두었다가 요청이 올때 반환하는 것(그때마다 만들어 쓰는 것보다 오버헤드가 적다.)

### SQL Injection
- 원하지 않는 쿼리문으로 데이터베이스를
![예시](https://user-images.githubusercontent.com/47619140/66185019-f9c02180-e6b8-11e9-8b0e-096fa935689d.png)

### MySQL 메서드 중에 `query`와 `execute`가 있다.
- execute는 자주 사용하는 쿼리문을 캐시해두고 사용하기 때문에 빠르다. (되도록 execute로 쓰는 것이 좋음)
- MySQL이 자체적으로 자주 사용되지 않는 것은 LRU 캐싱을 한다.

### DB insert 성능이 중요하다면 FK를 걸어주지 않는 방법도 있다.
- index를 넣지 않아서 빠르다.
- 하지만 개발자가 전부 검사해주어야 한다. -> 까다로울 수 있다.

### 오브젝트 스토리지
- multer의 대상을 오브젝트 스토리지로 잡으면 서버의 부하를 줄일 수 있다.