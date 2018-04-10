import _ from "lodash";
export function standardVendorWines(vendorWines) {
  return vendorWines.map(vendorWine => {
    let createdAt = new Date(vendorWine.createdAt);

    if (createdAt.getFullYear() == 2030) {
      createdAt = new Date();
    }
    return {
      createdAt: createdAt.toISOString().split("T")[0],
      perBottomPrice: Number(vendorWine.customerPrice),
      quantity: vendorWine.quantity
    };
  });
}
export function getDays(briefVendorWines) {
  return _.uniq(
    briefVendorWines.map(briefVendorWine => briefVendorWine.createdAt)
  );
}
export function getBreifVendorWinePerDays(days, briefVendorWines) {
  return days.map(day => {
    let relatedBriefVendorWines = briefVendorWines.filter(
      briefVendorWine => briefVendorWine.createdAt == day
    );
    let result = { total: 0, quantity: 0 };
    relatedBriefVendorWines.forEach(briefVendorWine => {
      result.total += briefVendorWine.perBottomPrice * briefVendorWine.quantity;
      result.quantity += briefVendorWine.quantity;
      result.createdAt = briefVendorWine.createdAt;
    });
    return result;
  });
}
export function getBreifVendorWinePerDaysData(briefVendorWinePerDays) {
  return briefVendorWinePerDays.map(element => ({
    ...element,
    averageBottomPrice: element.total / element.quantity,
    x: element.createdAt,
    y: element.total / element.quantity
  }));
}
export function vendorWinesToChartData(vendorWines) {
  let briefVendorWines = standardVendorWines(vendorWines);

  let days = getDays(briefVendorWines);

  let briefVendorWinePerDays = getBreifVendorWinePerDays(
    days,
    briefVendorWines
  );
  // briefVendorWinePerDays = _.keyBy(briefVendorWinePerDays, "createdAt");

  let briefVendorWinePerDaysData = getBreifVendorWinePerDaysData(
    briefVendorWinePerDays
  );
  return briefVendorWinePerDaysData;
}
