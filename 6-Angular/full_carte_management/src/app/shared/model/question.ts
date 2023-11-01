export interface Question {
    id: string;
    name: string;
    counter: number;
    articles: string[];
    uiEditingRow?: boolean;
    uiSelectingRow?: boolean;
    type: string;
}
