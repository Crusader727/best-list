import { useCallback, useEffect, useState } from "react";
import { defaultStorage, getStorage, setStorage } from "../utils/storage";
import { CurrentFolder, Folder, Item, Storage } from "../types/store";
import _ from "lodash";

export const useFolder = (path?: string) => {
    const [store, setStore] = useState<Storage>(defaultStorage);

    useEffect(() => {
        setStore(getStorage());
    }, []);

    const handleAddFolder = useCallback(
        (folder: Folder) => {
            const newFolders = { ...store.folders, [folder.name]: folder };
            const newHierarchy = JSON.parse(JSON.stringify(store.hierarchy));
            _.set(newHierarchy, path ? `${path}.${folder.name}` : folder.name, {});

            const newStore = { folders: newFolders, hierarchy: newHierarchy };

            setStore(newStore);
            setStorage(newStore);
        },
        [store, path]
    );

    const folderName = path?.split(".").pop();

    const handleAddItem = useCallback(
        (item: Item) => {
            if (path && folderName) {
                const newFolders = { ...store.folders };

                newFolders[folderName]?.items.push(item);

                const newStore = { folders: newFolders, hierarchy: store.hierarchy };

                setStore(newStore);
                setStorage(newStore);
            }
        },
        [store, path, folderName]
    );

    if (!store) {
        return { currentFolder: undefined, hierarchy: {}, handleAddFolder, handleAddItem };
    }

    const currentFolder: CurrentFolder = {
        ...(store.folders[folderName || ""] || {}),
        childFolders: path ? Object.keys(_.get(store.hierarchy, path) || {}) : Object.keys(store.hierarchy),
    };

    return { currentFolder, hierarchy: store.hierarchy, handleAddFolder, handleAddItem };
};
