export interface Item {
    name: string;
    description: string;
}

export interface Folder {
    name: string;
    items: Array<Item>;
}

export interface CurrentFolder {
    name: string;
    items: Array<Item>;
    childFolders: string[];
}

export interface Storage {
    folders: Record<string, Folder>;
    hierarchy: Record<string, Object>;
}
