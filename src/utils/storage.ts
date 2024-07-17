import { Storage } from "../types/store";

export const defaultStorage: Storage = {
    folders: {
        awd: { name: "awd", items: [] },
        awd2: { name: "awd2", items: [] },
        awd3: { name: "awd3", items: [] },
        awd4: { name: "awd4", items: [] },
        awd5: { name: "awd5", items: [] },
    },
    hierarchy: { awd: { awd3: { awd5: {} }, awd4: {} }, awd2: {} },
};

export const getStorage = (): Storage => {
    const storeStr = window.localStorage.getItem("store");
    return storeStr ? JSON.parse(storeStr) : defaultStorage;
};
export const setStorage = (data: Storage) => {
    return window.localStorage.setItem("store", JSON.stringify(data));
};
