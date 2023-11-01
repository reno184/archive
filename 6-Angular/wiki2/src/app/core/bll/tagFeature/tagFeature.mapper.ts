import {QuerySnapshot} from "@angular/fire/compat/firestore";
import {TagModelApi, TagModelApp} from "./tagFeature.model";

export const tagFeatureMapper = function(result : QuerySnapshot<TagModelApi>): TagModelApp[] {
   return result.docs.map(doc =>  {return { id : doc.id , ...doc.data()}})
}
