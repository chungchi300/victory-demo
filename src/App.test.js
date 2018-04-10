import _ from "lodash";
import {
  standardVendorWines,
  getDays,
  getBreifVendorWinePerDays,
  getBreifVendorWinePerDaysData,
  vendorWinesToChartData
} from "./helper.js";
it("prepare data", () => {
  let vendorWines = [
    {
      id: 9650,
      masterWineId: 9336,
      vendorId: 13,
      productCode: "dummy wine",
      originalName: "dummy wine",
      createdAt: "2015-07-28 11:05:47",
      customerPrice: "100.00",
      vendorPrice: "100.00",
      updatedAt: "2015-07-28 19:05:47",
      deletedAt: "2015-07-28 19:05:47",
      vintage: 2015,
      wineCondition: null,
      isGroupBuy: 0,
      isVyExpress: 0,
      quantity: 3,
      price: "100.00"
    },
    {
      id: 9651,
      masterWineId: 9336,
      vendorId: 13,
      productCode: "dummy wine",
      originalName: "dummy wine",
      createdAt: "2015-07-28 11:05:47",
      customerPrice: "200.00",
      vendorPrice: "100.00",
      updatedAt: "2015-07-28 19:05:47",
      deletedAt: "2015-07-28 19:05:47",
      vintage: 2015,
      wineCondition: null,
      isGroupBuy: 0,
      isVyExpress: 0,
      quantity: 1,
      price: "200.00"
    },
    {
      id: 9652,
      masterWineId: 9336,
      vendorId: 2,
      productCode: "dummy wine",
      originalName: "dummy wine",
      createdAt: "2015-06-18 07:41:06",
      customerPrice: "100.00",
      vendorPrice: "100.00",
      updatedAt: "2015-06-18 15:41:06",
      deletedAt: "2015-06-18 15:41:06",
      vintage: 2015,
      wineCondition: null,
      isGroupBuy: 0,
      isVyExpress: 0,
      quantity: 96,
      price: "100.00"
    },
    {
      id: 9653,
      masterWineId: 9336,
      vendorId: 2,
      productCode: "dummy wine",
      originalName: "dummy wine",
      createdAt: "2015-06-18 07:41:07",
      customerPrice: "100.00",
      vendorPrice: "100.00",
      updatedAt: "2015-06-18 15:41:07",
      deletedAt: "2015-06-18 15:41:07",
      vintage: 2015,
      wineCondition: null,
      isGroupBuy: 0,
      isVyExpress: 0,
      quantity: 4,
      price: "100.00"
    }
  ];

  let briefVendorWines = standardVendorWines(vendorWines);
  expect(briefVendorWines).toEqual([
    { createdAt: "2015-07-28", perBottomPrice: 100, quantity: 3 },
    { createdAt: "2015-07-28", perBottomPrice: 200, quantity: 1 },
    { createdAt: "2015-06-17", perBottomPrice: 100, quantity: 96 },
    { createdAt: "2015-06-17", perBottomPrice: 100, quantity: 4 }
  ]);
  let days = getDays(briefVendorWines);
  expect(days).toEqual(["2015-07-28", "2015-06-17"]);
  let briefVendorWinePerDays = getBreifVendorWinePerDays(
    days,
    briefVendorWines
  );
  // briefVendorWinePerDays = _.keyBy(briefVendorWinePerDays, "createdAt");
  expect(briefVendorWinePerDays).toEqual([
    { createdAt: "2015-07-28", quantity: 4, total: 500 },
    { createdAt: "2015-06-17", quantity: 100, total: 10000 }
  ]);
  let briefVendorWinePerDaysData = getBreifVendorWinePerDaysData(
    briefVendorWinePerDays
  );
  expect(briefVendorWinePerDaysData).toEqual([
    {
      averageBottomPrice: 125,
      createdAt: "2015-07-28",
      quantity: 4,
      total: 500,
      x: "2015-07-28",
      y: 125
    },
    {
      averageBottomPrice: 100,
      createdAt: "2015-06-17",
      quantity: 100,
      total: 10000,
      x: "2015-06-17",
      y: 100
    }
  ]);
});
