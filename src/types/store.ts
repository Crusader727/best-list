export interface Item {
    id: string;
    name: string;
    description: string;
    imageURL?: string;
}

export interface Folder {
    id: string;
    name: string;
    items: Record<string, Item>;
}

export interface CurrentFolder {
    name: string;
    items: Record<string, Item>;
    childFolders: string[];
}

export interface Storage {
    folders: Record<string, Folder>;
    hierarchy: Record<string, Object>;
}
