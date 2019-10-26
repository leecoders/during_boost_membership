export const util = {
  getRangePortionByCost: cost => {
    let value = cost - 12000;
    if (value < 0) value = 0;
    if (value > 988000) value = 988000;
    const portion = value / 988000;
    return portion > 1 ? 1 : portion;
  },
  getCostPortionByRange: range => {
    const portion = range / 320;
    return portion > 1 ? 1 : portion;
  },
  convertCostToCurrencyFormat: cost => {
    let rev = (cost + "").split("").reverse();
    let result = [];
    for (let i = 0; i < rev.length; ++i) {
      if (i !== 0 && i % 3 === 0) result.push(",");
      result.push(rev[i]);
    }
    return result.reverse().join("");
  },
  parseDateInfo: dateInfo => {
    if (dateInfo === "날짜") return;
    let ret = {};
    const checkIn = dateInfo.split(" - ")[0];
    const checkOut = dateInfo.split(" - ")[1];
    if (checkIn !== "체크인") {
      ret.checkIn = {
        year: checkIn.split("년")[0],
        month: checkIn.split("년 ")[1].split("월")[0],
        day: checkIn.split("월 ")[1].split("일")[0]
      };
    }
    if (checkOut !== "체크아웃") {
      ret.checkOut = {
        year: checkOut.split("년")[0],
        month: checkOut.split("년 ")[1].split("월")[0],
        day: checkOut.split("월 ")[1].split("일")[0]
      };
    }
    return ret;
  },
  parsePersonnelInfo: personnelInfo => {
    if (personnelInfo === "인원") return;
    let ret = {};
    ret.guest = +personnelInfo.split("게스트 ")[1].split("명")[0];
    if (personnelInfo.indexOf("유아") !== -1) {
      ret.infant = +personnelInfo.split("유아 ")[1].split("명")[0];
    }
    return ret;
  },
  parseCostInfo: costInfo => {
    if (costInfo === "가격") return;
    let ret = {};
    if (costInfo.indexOf("최대") !== -1) {
      ret.maxCost = +costInfo
        .split("최대 ")[1]
        .split("원")[0]
        .split(",")
        .join("");
    } else if (costInfo.indexOf("+") !== -1) {
      ret.minCost = +costInfo
        .split("원+")[0]
        .split(",")
        .join("");
    } else if (costInfo.indexOf("-") !== -1) {
      ret.minCost = +costInfo
        .split("원 - ")[0]
        .split(",")
        .join("");
      ret.maxCost = +costInfo
        .split("원 - ")[1]
        .split("원")[0]
        .split(",")
        .join("");
    }
    return ret;
  }
};

export default util;
