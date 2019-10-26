import manageItemPageTemplate from "./template.js";
import { $ } from "../../utils/util.js";
import {
  fetchCheckItemName,
  fetchAddItem,
  fetchDeleteItem
} from "../../utils/fetch.js";
import { ItemListPage } from "../../components/ItemListPage/ItemListPage.js";

class ManageItemPage {
  constructor(parentElement) {
    this.parentElement = parentElement;
    this.itemImage;
    this.itemListPageArray = [];
    this.render();
  }

  submitItem = async () => {
    const resultCheckDupicate = await fetchCheckItemName(this.itemName);
    if (resultCheckDupicate.data) {
      console.log("이미 존재하는 아이템입니다.");
      return;
    }
    const result = await fetchAddItem(
      this.itemImage,
      this.itemName,
      this.itemCategory,
      this.itemSummary
    );
  };

  highlightCategory = idx => {
    for (let i = 0; i < this.categoryContainer.children.length; ++i) {
      $("#item-category-" + i).style.opacity = "1";
    }
    $("#item-category-" + idx).style.opacity = "0.3";
  };

  selectCategory = categoryIdx => {
    this.highlightCategory(categoryIdx);
    for (let i = 0; i < this.categoryContainer.children.length; ++i) {
      $(`#item-list-box-${i}`).style.display = "none";
    }
    $(`#item-list-box-${categoryIdx}`).style.display = "";
  };

  setAddItemEvent = async () => {
    this.itemImageContainer.addEventListener("click", () => {
      $("#item-upload-button").click();
    });
    this.selectImageButton.addEventListener("change", e => {
      // 파일 등록 완료 이벤트
      if (!e.target.files[0]) return; // 취소 버튼 -> target.files에 이미지 없음 -> 예외 처리
      this.itemImage = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(this.itemImage);
      reader.onload = e => {
        this.itemImageContainer.style.background = `url(${e.target.result}) no-repeat 50% 50%`;
        this.itemImageContainer.style.backgroundSize = `10rem 10rem`;
      };
    });
    this.itemSubmitButton.addEventListener("click", async () => {
      this.itemName = $("#item-input-name").value;
      this.itemCategory = $("#item-input-category").value;
      this.itemSummary = $("#item-input-summary").value;
      if (this.checkFillingAllContents()) {
        await this.submitItem();
        location.reload();
      } else {
        console.log("모든 목록을 채워주세요.");
      }
    });
  };

  setOthersEvent = () => {
    this.categoryContainer.addEventListener("click", e => {
      if (e.target.className != "item-category-name") return;
      this.selectCategory(e.target.id.split("category-")[1]);
    });
  };

  findCategoryIdx = category => {
    for (let i = 0; i < this.categoryContainer.children.length; ++i) {
      if (this.itemListPageArray[i].categoryName == category) {
        return i;
      }
    }
  };

  setDeleteEvent = async () => {
    $("body").addEventListener("click", async e => {
      if (e.target.className != "item-delete-button") return;
      const categoryAndItem = e.target.id.split("button-")[1];
      const [categoryName, itemIdx] = categoryAndItem.split("-");
      const categoryIdx = this.findCategoryIdx(categoryName);
      const itemName = this.itemListPageArray[categoryIdx].itemInfoList[itemIdx]
        .ITEM_NAME;
      const result = await fetchDeleteItem(categoryName, itemName);
      location.reload();
    });
  };

  setItemLists = () => {
    for (let i = 0; i < this.categoryContainer.children.length; ++i) {
      this.itemListPageArray.push(
        new ItemListPage(
          $(".item-list-container"),
          i,
          $(`#item-category-${i}`).innerHTML
        )
      );
    }
  };

  render() {
    this.parentElement.insertAdjacentHTML("beforeend", manageItemPageTemplate);
    this.itemImageContainer = $(".item-add-image");
    this.selectImageButton = $("#item-upload-button");
    this.itemSubmitButton = $("#item-add-button");
    this.categoryContainer = $(".manage-item-category-container");
    this.setItemLists();
    this.setAddItemEvent();
    this.setOthersEvent();
    this.setDeleteEvent();
    this.selectCategory(0);
  }
}

export { ManageItemPage };
