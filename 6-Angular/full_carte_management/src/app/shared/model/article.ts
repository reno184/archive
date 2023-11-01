export interface Article {
    id: string;
    name: string;
    counterBlock: number;
    desc?: string,
    questions?: any;
    counter: number;
    price?: number;
    itemAttachedId?: string,
    uiEditingRow?: boolean;
    uiSelectingRow?: boolean;
}
