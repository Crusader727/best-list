import { useCallback, useEffect, useState } from "react";
import { defaultStorage, getStorage, setStorage } from "../utils/storage";
import { CurrentFolder, Folder, Storage } from "../types/store";
import _ from "lodash";

export const useFolder = (path?: string) => {
    const [store, setStore] = useState<Storage>(defaultStorage);

    useEffect(() => {
        setStore(getStorage());
    }, []);

    const handleAddFolder = useCallback(
        (folder: Folder) => {
            console.log("folder", folder, path);
            const newFolders = { ...store.folders, [folder.name]: folder };
            const newHierarchy = JSON.parse(JSON.stringify(store.hierarchy));
            _.set(newHierarchy, path ? `${path}.${folder.name}` : folder.name, {});

            const newStore = { folders: newFolders, hierarchy: newHierarchy };

            setStore(newStore);
            setStorage(newStore);
        },
        [store, path]
    );

    console.log(store);

    const folderName = path?.split(".").pop();
    const currentFolder: CurrentFolder = {
        ...(store.folders[folderName || ""] || {}),
        childFolders: path ? Object.keys(_.get(store.hierarchy, path)) : Object.keys(store.hierarchy),
    };

    return { currentFolder, handleAddFolder };
};
