import makeRequest from "../httpClient.ts";

export const fetchRoot = () =>
    makeRequest({
        url: "",
        method: "GET",
    });

export const fetchDocuments = () =>
    makeRequest({
        url: "/documents",
        method: "GET",
    });

export const sendQuery = (question: string) =>
    makeRequest({
        url: `/query`,
        method: "POST",
        data: { question },
    });

export const resetDataBase = () =>
    makeRequest({
        url: `/query`,
        method: "POST",
    });

export const addDocument = (form: any) =>
    makeRequest({
        url: `/add-document`,
        method: "POST",
        data: form,
    });