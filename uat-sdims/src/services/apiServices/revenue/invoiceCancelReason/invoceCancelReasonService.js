import apiUrls from "../../../apiUrls";
import { revenueApi } from "../../../apiHelpers";

export const invoiceCancelReason = async () => {
  let response = await revenueApi(
    apiUrls.revenue.invoiceCancelReason.invoiceCancelReason.method,
    apiUrls.revenue.invoiceCancelReason.invoiceCancelReason.url,
  );
  return response
};
export const createInvoiceCancelReason = async (data) => {
  let response = await revenueApi(
    apiUrls.revenue.invoiceCancelReason.createInvoiceCancelReason.method,
    apiUrls.revenue.invoiceCancelReason.createInvoiceCancelReason.url,
    data
  );
  return response;
};
