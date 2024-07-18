import { Storage } from "../types/store";

export const defaultStorage: Storage = {
    folders: {},
    hierarchy: {},
};

export const getStorage = (): Storage => {
    const storeStr = window.localStorage.getItem("store");
    return storeStr ? JSON.parse(storeStr) : defaultStorage;
};
export const setStorage = (data: Storage) => {
    return window.localStorage.setItem("store", JSON.stringify(data));
};

export const setRawStorage = (data: string) => {
    return window.localStorage.setItem("store", data);
};
