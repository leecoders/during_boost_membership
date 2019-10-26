import { Header } from "../../components/Header/Header.js";
import { Section } from "../../components/Section/Section.js";
import { $ } from "../../utils/util.js";
import { fetchUserInfo } from "../../utils/fetchTodo.js";
import { Slide } from "../../components/Slide/Slide.js";

document.addEventListener("DOMContentLoaded", async () => {
  const todoOwner = document.title.split("'s todo")[0];
  const userInfo = await fetchUserInfo(); // 쿠키로 해당 사용자 정보만 가져옴
  const header = new Header($("header"), "todo");
  const section = new Section($("section"), todoOwner);
  const slide = new Slide($(".slide-container"));
});
