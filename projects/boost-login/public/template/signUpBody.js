export default /*html*/ `
<header class="header">
    <h1>회원가입</h1>
</header>
<section>
    <form id="sign-up-form">
        <div class="sign-up-row">
            <h3>아이디</h3>
            <span>
                <input type="text" id="id" />
                <div id="id-message"></div>
            </span>
        </div>
        <div class="sign-up-row">
            <h3>비밀번호</h3>
            <span>
                <input type="password" id="password" />
                <div id="password-message"></div>
            </span>
        </div>
        <div class="sign-up-row">
            <h3>비밀번호 재확인</h3>
            <span>
                <input type="password" id="password-check" />
                <div id="password-check-message"></div>
            </span>
        </div>
        <div class="sign-up-row">
            <h3>이름</h3>
            <span>
                <input type="text" id="name" />
            </span>
        </div>
        <div class="sign-up-row">
            <h3>생년월일</h3>
            <div class="birth-area">
                <span>
                    <input type="text" id="year" placeholder="년(4자)" />
                </span>
                <span class="select-box">
                    <select id="month">
                        <option value="">월</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                    </select>
                </span>
                <span>
                    <input type="text" id="day" placeholder="일" />
                </span>
            </div>
            <div id="birth-message"></div>
        </div>
        <div class="sign-up-row">
            <h3>성별</h3>
            <div class="gender-area">
                <span class="select-box">
                    <select id="gender">
                        <option value="">성별</option>
                        <option value="남자">남자</option>
                        <option value="여자">여자</option>
                    </select>
                </span>
            </div>
        </div>
        <div class="sign-up-row">
            <h3>이메일</h3>
            <span>
                <input type="text" id="email" />
                <div id="email-message"></div>
            </span>
        </div>
        <div class="sign-up-row">
            <h3>휴대전화</h3>
            <span>
                <input type="text" id="phone" placeholder="- 없이 입력해주세요. 예) 0101231234" />
                <div id="phone-message"></div>
            </span>
        </div>
        <div class="sign-up-row">
            <h3>관심사</h3>
            <span>
                <div type="text" class="interests-area" id="interests-area">
                    <input type="text" id="interests" />
                </div>
                <div id="interests-message"></div>
            </span>
        </div>
        <div id="agree-area">
            <a id="agree-button">약관에 동의합니다.</a>
            <input id="agree-checkbox" type="checkbox">
        </div>
        <div class="button-area">
            <button type="button" id="reset-button">
                <span>초기화</span>
            </button>
            <button type="button" id="submit-button">
                <span>가입하기</span>
            </button>
        </div>
    </form>
</section>
`;
