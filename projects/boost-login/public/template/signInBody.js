export default /*html*/ `
<div class="simple-sign-in-container">
    <span>
    <h1 class="sign-in-text">로그인</h1>
    </span>
    <form id="sign-in-form">
    <div class="row">
        <div class="col-md-12 form-group">
        <!-- form-group들을 하나의 form 그룹으로 본다. -> submit 시 하나로 묶임 -->
        <input
            id="sign-in-id"
            type="text"
            class="form-control"
            placeholder="아이디"
        />
        </div>
    </div>
    <div class="row">
        <div class="col-md-12 form-group">
        <input
            id="sign-in-password"
            type="password"
            class="form-control"
            placeholder="비밀번호"
        />
        </div>
    </div>
    <div class="row">
        <div class="col-md-12 form-group">
        <input
            id="sign-in-button"
            type="button"
            value="로그인"
            class="btn btn-block btn-sign-in"
            placeholder="Enter your Password"
        />
        </div>
    </div>
    </form>
    <div class="row">
    <div class="col-md-12">
        <div class="over-line">
        <h6 class="sign-up-button">회원가입</h6>
        <div>
    </div>
    </div>
</div>
<section></section>
`;
