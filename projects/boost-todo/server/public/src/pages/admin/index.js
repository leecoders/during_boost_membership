import { Header } from "../../components/Header/Header.js";
import { SectionForAdmin } from "../../components/SectionForAdmin/SectionForAdmin.js";
import { $ } from "../../utils/util.js";
import {} from "../../utils/fetchAdmin.js";

const header = new Header($("header"), "admin");
const sectionForAdmin = new SectionForAdmin($("section"));
