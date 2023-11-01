import {Block} from "./block";

export interface Group {
    id: string;
    name: string;
    counter: number;
    blocks: Block[];
    type: string;
}
