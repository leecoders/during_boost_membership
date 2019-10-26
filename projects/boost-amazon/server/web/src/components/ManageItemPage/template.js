export default /*html*/ `
<div class="manage-item-container">
    <div class="manage-item-header">
        <div class="manage-item-title">아이템 관리</div>
        <div class="manage-item-category-container">
            <div class="item-category-box"><span class="item-category-name" id="item-category-0">상의</span></div>
            <div class="item-category-box"><span class="item-category-name" id="item-category-1">아우터</span></div>
            <div class="item-category-box"><span class="item-category-name" id="item-category-2">하의</span></div>
            <div class="item-category-box"><span class="item-category-name" id="item-category-3">신발</span></div>
            <div class="item-category-box"><span class="item-category-name" id="item-category-4">모자</span></div>
        </div>
    </div>
    <div class="item-page-container">
        <div class="item-add-container">
            <div class="item-image-container">
                <div class="item-add-image"></div>
                <input type="file" id="item-upload-button" accept=".jpg, .jpeg, .png">
            </div>
            
            <div class="item-add-info">
                <div class="item-add-name">
                    <span class="item-add-info-title">상품명</span>
                    <input id="item-input-name" type="text">
                </div>
                <div class="item-add-category">
                    <span class="item-add-info-title">분류</span>
                    <select id="item-input-category">
                        <option value="상의">상의</option>
                        <option value="아우터">아우터</option>
                        <option value="하의">하의</option>
                        <option value="신발">신발</option>
                        <option value="모자">모자</option>
                    </select>
                </div>
                <div class="item-add-summary">
                    <span class="item-add-info-title">요약</span>
                    <textarea id="item-input-summary" type="text"></textarea>
                </div>
            </div>
            <div class="item-add-button-container">
                <button id="item-add-button" type="button"></button>
            </div>
        </div>
        <div class="item-list-container">
        </div>
    </div>
</div>
`;
