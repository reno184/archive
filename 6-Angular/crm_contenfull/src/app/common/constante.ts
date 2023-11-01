export const CAROUSEL = 'carousel'
export const TITLECONTENT = 'titlecontent';

import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class AppDatas {
    categories = [{val: '', lib: ''}];
    levels = ['beginner', 'intermediate', 'advanced'];
}
