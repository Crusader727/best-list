import { Storage } from "../types/store";

export const defaultStorage: Storage = {
    folders: {
        smth1: { name: "awd", items: {}, id: "smth1" },
        smth2: { name: "awd2", items: {}, id: "smth2" },
        smth3: { name: "awd3", items: {}, id: "smth3" },
        smth4: { name: "awd4", items: {}, id: "smth4" },
        smth5: { name: "awd5", items: {}, id: "smth5" },
    },
    hierarchy: { smth1: { smth3: { smth5: {} }, smth4: {} }, smth2: {} },
};

export const getStorage = (): Storage => {
    const storeStr = window.localStorage.getItem("store");
    return storeStr ? JSON.parse(storeStr) : defaultStorage;
};
export const setStorage = (data: Storage) => {
    return window.localStorage.setItem("store", JSON.stringify(data));
};
