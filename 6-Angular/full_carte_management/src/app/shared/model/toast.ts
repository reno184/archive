export interface Toast {
    id: string,
    message: string;
    color: string;
    title :string;
    delay : number;
    autoclose?: boolean;
}
