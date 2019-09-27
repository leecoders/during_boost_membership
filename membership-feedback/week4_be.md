## 배운 내용

### passport-local

- local 로그인
- passport-github, passport-google 등이 있다.

### 맥 터미널 명령어 pbcopy, pbpaste

### 정적 파일 관리

- 초기 상태의 정적 파일은 public 폴더에 위치
- 관리자가 업로드하는 이미지는 static_root 폴더에 위치

### Admin tool

### REST API -> HTTP API가 맞는 말

### 최근 개발 트렌드

- 최근 웹 및 앱 개발은 프론트엔드와 백엔드로 나뉘며 프론트 프레임워크가 백엔드에서 제공하는 RESTful API (또는 HTTP API)를 호출하는 경우가 많다.
- 따라서 프론트엔드 및 백엔드 개발 양측 모두 RESTful API가 무엇인지 정확하게 이해하는 것이 중요하다.

### semantic URL을 지키자.

- URL만 읽어도 의미가 이해되도록

### 인증과 권한

- 인증(Authentication) : 자신이라고 주장하는 사람을 확인하는 절차
- 권한(authorization) : 원하는 곳으로 가거나 정보를 얻도록 허용하는 과정
- [passport.js](http://www.passportjs.org/docs/)

### Oauth

- 인증 정보의 유출 없이 제 3의 기관에서 사용자를 인증해 주는 수단
- [Oauth](https://oauth.net/)
- [이고잉님의 강의](https://opentutorials.org/course/3405)

### 쿠키와 세션

- 쿠키와 세션은 복호화될 수 없는 방식으로 암호화된다.
- 세션 DB가 필요한 이유
  - 서버가 죽었다 다시 켜졌을 때를 위해서
  - 서버 이중화를 위해서
- 세션 DB는 별도의 Redis, mongoDB 등을 사용한다.
  - MySQL 같은 RDB(관계형 DB)는 사용자 많으면 너무 느리다.

### serializeUser, deserializeUser

### Data, Database, and DBMS(Database Management System)

- 우리가 아는 DB는 DBMS라는 DB 관리 소프트웨어
- 최대한 적은(필요한 만큼의) 데이터를 저장하는 것이 좋다.

### Data, Information, Knowledge, and Wisdom

- Data : 가공되지 않은 정보
- Information : 의미를 갖는 정보 ex) 로그인 횟수
- Knowledge : 좀 더 가공되어 의미가 높은 정보 ex) 어뷰저로 의심되는 사용자
- Wisdom : 미래를 예측할 수 있는 정보(과거를 통해 미래를 예측하려는 시도)
- 빅데이터 : 한 번에 처리하기 힘든 양의 데이터

### RDBMS

- 데이터를 중복되지 않게 잘 저장할 수 있다. (메모리 효율적)
  - 과거에는 메모리가 너무 비싸고 부족했기 때문에 중요하게 여겼다.

### SQL

- 선언적 언어(절차적 언어와 반대)
  - 선언적 언어는 `What` ex) 어떻게 하는지는 몰라도 OO와 같은 정보를 찾아줘.
  - 절차적 언어는 `How` ex) C언어에서는 동작에 대한 알고리즘을 작성한다.
- RDBMS를 제어하기 위해 사용됨

### CAP

- Consistency, Availability, Partition Tolerence
- 이상적인 분산 시스템이 가져야 할 세 가지 특성
  - Consistency : 어느 곳으로 요청이 가더라도 일관된 응답을 주어야 함(동기화의 중요성)
  - Availability : 은행 점검 시간처럼 사용할 수 없는 시간이 있으면 안됨(가용성)
  - Partition Tolerence : 서버 한 대가 고장나도 유지할 수 있는 성질
- 이 세 가지를 모두 만족시키는 것이 완벽한 분산 시스템 -> 사실상 불가능하다는 것이 결론(이론적으로 안되는 것이 증명되었음)
- 그래서 세 가지 중에 희생할 것을 선택해야 함
  - 최근 트렌드는 Consistency를 어느 정도 희생하고 Eventually Consistency(일정 시간이 소요된 후에 일관성 보장)를 보장하는 경향이 있다.

### ACID

- Atomicity(all or nothing), Consistency, Isolation, Durability
- 관계형 DB이 가져야 할 특성
  - Atomicity : 은행에서 송금할 때 보내는 사람과 받는 사람이 다르게 처리되면 안됨
  - Consistency
  - Isolation : 동시에 처리되지만 하나씩 처리되는 것처럼 보이는 것
  - Durability : 성공적으로 수행된 트랜잭션은 영원히 유지되어야 함

### 확장성

- 수평 확장 vs 수직 확장

### MySQL

- 리눅스에서 root 사용자는 sudo로 접속하면 비밀번호 없이 자동 로그인되는 기능을 지원한다.

### 포트포워딩 vs 공인IP 발급

### 우분투 한글 설정 및 MySQL 설정

#### 최초 접속 후 우분투 패키지 업그레이드 및 한글 설정

```
$ sudo apt-get update
$ sudo apt-get upgrade
$ sudo apt-get install language-pack-ko
$ sudo locale-gen ko_KR.UTF-8
```

#### 이어서 한글 로케일 설정

```
$ locale
$ sudo -i
$ cat << 'EOF' > /etc/default/locale
LANG="ko_KR.UTF-8"
LANGUAGE="ko_KR:ko:en_US:en"
EOF
```

- bash 재시작 후 확인

#### 설치 스크립트

```
$ sudo apt install mysql-server
$ sudo systemctl start mysql
$ sudo mysql_secure_installation
```

#### 18.04 root 접속

```
# root 접속
$ sudo mysql
mysql> quit
```

#### utf-8 설정

```
mysql> status
```

```
$ sudo -i #root
$ cat /etc/mysql/my.cnf
$ cat << 'EOF' > /etc/mysql/mysql.conf.d/utf8.cnf
# for utf8 characterset
[client]
default-character-set = utf8

[mysqld]
init_connect = SET collation_connection = utf8_general_ci
init_connect = SET NAMES utf8
character-set-server = utf8
collation-server = utf8_general_ci

[mysqldump]
default-character-set = utf8

[mysql]
default-character-set = utf8
EOF
```

```
$ cat /etc/mysql/mysql.conf.d/utf8.cnf
# ctrl + d 로 root 로그아웃, 일반 사용자로 돌아옴
$ sudo systemctl restart mysql
$ sudo mysql
mysql> status
```

#### 일반사용자 외부 접속 허용

```
$ sudo -i
$ cd /etc/mysql
$ grep -r 'bind'
# bind-adress=127.0.0.1 내용 주석처리 (앞에 #을 붙임)
$ cd /etc/mysql/mysql.conf.d
$ sed -i 's/bind/# bind/' mysqld.cnf
$ cat mysqld.cnf | grep bind
$ sudo systemctl restart mysql
$ exit
```

- 주의: root 사용자의 외부 접속은 허용하면 안 됩니다.

#### 재부팅시 mysqld 자동 실행

```
$ sudo reboot
$ mysql -u root -p
$ sudo update-rc.d mysql defaults
# 자동 실행 취소 명령 (참고용, 타이핑하지 마세요)
# sudo update-rc.d mysql remove
$ sudo reboot
$ mysql -u root -p
```

#### 데이터베이스 및 일반 사용자 생성

```SQL
CREATE DATABASE mydb;
--- 아이디 및 패스워드 설정
CREATE USER 'myuserid'@'%' IDENTIFIED BY 'mypassword';
GRANT ALL ON mydb.* TO 'myuserid'@'%';
FLUSH PRIVILEGES;
```

- mydb: 데이터베이스 이름
- myuserid: 사용자 id
- mypassword: 사용자 패스워드

#### 사용자 패스워드가 생각나지 않을 때

- 루트 사용자로 로그인 후 일반 사용자 패스워드는 쉽게 변경 가능

```
SET PASSWORD FOR 'honux'@'%'='new_password';
FLUSH PRIVILEGES;
```

#### security group 설정

- mysql (inbound, 3306, any address) 로 허용해 줘야 합니다.

### CORS(Cross-Origin Resource Sharing) 이슈

[링크](https://developer.mozilla.org/ko/docs/Web/HTTP/Access_control_CORS)

- 상황 : 프론트엔드, 백엔드를 다른 프로젝트로 분리하고 서로 다른 URL로 관리하도록 했다.
- 이슈 : fetch 요청에 `"Content-Type": "application/json"`의 헤더로 json을 아무리 보내도 서버에서는 `req.body`가 `undefined`가 넘어왔다.
- 이유 : 보안 상의 이유로, 브라우저들은 스크립트 내에서 초기화되는 cross-origin HTTP 요청을 제한한다고 한다.
  - cross-origin HTTP 요청 : 처음 전송되는 리소스의 도메인과 다른 도메인으로부터 리소스가 요청될 경우 해당 리소스는 cross-origin HTTP 요청에 의해 요청된다.
- 해결 : `app.use(cors());` cors라는 미들웨어로 CORS 이슈를 처리해줄 수 있었다.

### 파일 전송 -> 요청(req) 객체가 너무 큰 경우 `Payload Too Large(413)` 에러가 발생한다.

### 파일 객체는 req.file에 담겨 온다.

### multer를 통해 이미지를 받을 때, storage, upload 객체가 추가적으로 필요하다.

- storage를 통해 destination, filename을 설정한 뒤 upload 객체로 넘겨준다.
- filename을 설정하지 않으면 req에서 넘어올 때 base64로 인코딩되어 넘어오기 때문에 확장자가 없는 raw한 데이터가 넘어온다.
- filename을 file.originalname으로 설정하면 확장자까지 붙어서 제대로 저장된다!

### DB) AUTO_INCREMENT

- 디폴트로 1부터 시작한다.
- `insert into TABLE values (?, ?, ?, ?, ?)`할 때, `AUTO_INCREMENT`가 위치한 `column` 자리도 채워주어야 한다.
  - 통상적으로 `null`을 넣음

### 좋은 저장소 = 읽기 좋은 저장소

- 커밋 작성에 2분 정도는 공을 들이자.
- 제목 포함 최소 3줄 정도는 적어야 한다.

### 변수, 메소드 이름은 조금 더 고민해서 짓자!

- 너무 일반적인 이름은 명확하지 않다.

### 매개변수가 많거나 옵션이 있다면 객체 사용

### 사용하는 패키지의 공식 문서는 꼭 읽자

- getting started도 괜찮다.

### 동작이 비동기적으로 일어날 때 완료되기 전까지 사용자가 다른 작업을 못하게 막아야 하는가?

- 예를 들어, 사용자가 글을 남겼을 때 동작이 완료되기 전에 사용자가 다른 작업을 할 수 있다면 글이 올라가지 않았다고 생각해서 중복 요청을 할 수도 있다.
  - 다른 한 편으로는 계속 기다리면 답답할 수도 있다.
  - 다른 작업을 할 수 있도록 하되, 중복 요청은 서버에서 막아주는 방법도 있다.

### Node.js 개발 시에는 `nodemon`, 서버 운영 시에는 `pm2` 사용하면 편하다.

### `package.json`에서 사용하지 않는 패키지는 나중에라도 꼭 지워주도록 하자.

### `.env`같은 설정 파일은 private하기 때문에 git에 push하지는 않더라도 dev모드로 실행하기 위해 필요한 `변수명`정도는 남겨주는 것이 좋다.

### DB 접근(query)하는 메서드는 model 폴더를 만들고 적당한(?) 분류를 한 파일에 모아두는 것이 좋다. ex) `Users.js`

### query문으로 접근할 때 `*`는 좋지 않다.

- 나중에 어떤 필드가 있는지 몰라서 DB를 다시 한 번 뒤져야 하는 불편함이 생길 수 있다.
- 어떤 컬럼(필드)를 select하기 원하는지 구체적으로 적는다.
  - 모든 컬럼을 쓰다보면 코드가 지저분해질 수 있다. 그래서 위에 말한 것처럼 모듈화하라는 것!

### 쉘 스크립트로 짤 수 있는 것은 자바스크립트로 짜는 것이 더 좋다.

### DB를 초기화할 때 database는 삭제하지 않고 table만 삭제하고 다시 생성하는 것이 낫다.

### MySQL에서 본문 내용을 `TEXT` 타입으로 지정한다.

- varchar보다 긴 string 넣을 수 있음
