import { ListItem } from "../../components/ListItem/ListItem.js";
import { $ } from "../../utils/util.js";
import { fetchItemInfoList } from "../../utils/fetch.js";

class ItemListPage {
  constructor(parentElement, categoryIdx, categoryName) {
    this.parentElement = parentElement;
    this.categoryIdx = categoryIdx;
    this.categoryName = categoryName;
    this.ListItemArray = [];
    this.render();
  }

  setListItems = () => {
    for (let i = 0; i < this.itemLength; ++i) {
      this.ListItemArray.push(
        new ListItem(
          $(`#item-list-box-${this.categoryIdx}`),
          this.itemInfoList[i].ITEM_IMG,
          this.itemInfoList[i].ITEM_NAME,
          this.itemInfoList[i].ITEM_CATEGORY,
          this.itemInfoList[i].ITEM_SUMMARY,
          i
        )
      );
    }
  };

  getItemInfoList = async () => {
    const result = await fetchItemInfoList(this.categoryName);
    this.itemInfoList = result.data;
    this.itemLength = this.itemInfoList.length;
  };

  async render() {
    this.parentElement.insertAdjacentHTML(
      "beforeend",
      /*html*/ `
        <div class="item-list-box" id="item-list-box-${this.categoryIdx}"></div>
      `
    );
    await this.getItemInfoList();
    this.setListItems();
  }
}

export { ItemListPage };
