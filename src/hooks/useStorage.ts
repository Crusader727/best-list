import { useCallback, useEffect, useState } from "react";
import { defaultStorage, getStorage, setStorage } from "../utils/storage";
import { CurrentFolder, Folder, Item, Storage } from "../types/store";
import _ from "lodash";

const getChildFolderIds = (hierarchy: Record<string, Object>): string[] => {
    //@ts-ignore
    return Object.keys(hierarchy).reduce((acc, el) => {
        //@ts-ignore
        return [...acc, el, ...getChildFolderIds(hierarchy[el])];
    }, []);
};

export const useFolder = (path?: string) => {
    const [store, setStore] = useState<Storage>(defaultStorage);

    useEffect(() => {
        setStore(getStorage());
    }, []);

    const handleAddFolder = useCallback(
        (folder: Folder) => {
            const newFolders = { ...store.folders, [folder.id]: folder };
            const newHierarchy = JSON.parse(JSON.stringify(store.hierarchy));
            _.set(newHierarchy, path ? `${path}.${folder.id}` : folder.id, {});

            const newStore = { folders: newFolders, hierarchy: newHierarchy };

            setStore(newStore);
            setStorage(newStore);
        },
        [store, path]
    );

    const folderId = decodeURIComponent(path?.split(".").pop() || "");

    const handleDeleteFolder = useCallback(() => {
        if (path) {
            let newHierarchy = JSON.parse(JSON.stringify(store.hierarchy));

            const childFolders = [folderId, ...getChildFolderIds(_.get(newHierarchy, path || ""))];

            const newFolders = { ...store.folders };
            childFolders.forEach((f) => {
                delete newFolders[f];
            });

            newHierarchy = _.omit(newHierarchy, [path]);

            const newStore = { folders: newFolders, hierarchy: newHierarchy };

            setStore(newStore);
            setStorage(newStore);
        }
    }, [store, path, folderId]);

    const handleAddItem = useCallback(
        (item: Item) => {
            if (folderId) {
                const newFolders = { ...store.folders };

                if (newFolders[folderId]) {
                    newFolders[folderId].items[item.id] = item;
                }

                const newStore = { folders: newFolders, hierarchy: store.hierarchy };

                setStore(newStore);
                setStorage(newStore);
            }
        },
        [store, folderId]
    );
    const handleDeleteItem = useCallback(
        (item: Item) => {
            if (folderId) {
                const newFolders = { ...store.folders };

                if (newFolders[folderId]) {
                    delete newFolders[folderId].items[item.id];
                }

                const newStore = { folders: newFolders, hierarchy: store.hierarchy };

                setStore(newStore);
                setStorage(newStore);
            }
        },
        [store, folderId]
    );

    if (!store) {
        return { currentFolder: undefined, hierarchy: {}, handleAddFolder, handleAddItem };
    }

    const currentFolder: CurrentFolder = {
        ...(store.folders[folderId || ""] || {}),
        childFolders: path ? Object.keys(_.get(store.hierarchy, path) || {}) : Object.keys(store.hierarchy),
    };

    return {
        store,
        currentFolder,
        hierarchy: store.hierarchy,
        handleAddFolder,
        handleAddItem,
        handleDeleteItem,
        handleDeleteFolder,
    };
};
