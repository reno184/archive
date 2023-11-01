/* Concernant ngrx, firebase storage se manipule pas de la même manière qu'avec firestore
- chargement des images => identique Ras
- Ajout image => le callback de this.angularFireStorage.ref(...).put(... se trouve côté client, donc à la fin du chargement de l'image
un action ajoute uniquement l'url et le path dans le state pour mettre à jour le tableau.
(idéalement pour savoir si l'image est bien créer dans le storage il faudrait faire un setIntervale avec image.load <> de 404
- Suppression image => dans le callback il faut juste supprimer l'id dans le tableau dans le states
 */
import {createAction, props} from "@ngrx/store";
import {Carousel} from "./carousel.model";

export const LOAD_REQUEST = '[API - Carousel] LOAD_REQUEST';
export const load_request = createAction(LOAD_REQUEST);
export const LOAD_SUCCESS = '[API - Carousel] LOAD_SUCCESS';
export const load_success = createAction(LOAD_SUCCESS, props<{ items: Carousel[] }>());

export const ADD_IMAGE = '[API - Carousel] ADD_IMAGE';
export const add_image = createAction(ADD_IMAGE, props<{ obj: Carousel }>());

export const DELETE_IMAGE = '[API - Carousel] DELETE_IMAGE';
export const delete_image = createAction(DELETE_IMAGE, props<{ id: string }>());

