import makeRequest from "../httpClient.ts";

export const fetchRoot = () =>
    makeRequest({
        method: "GET",
    });

export const sendBusinessBudgetTypes = (data: object) =>
    makeRequest({
        url: `/test/`,
        method: "POST",
        data,
    });