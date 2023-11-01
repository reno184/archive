import {QuerySnapshot} from "@angular/fire/compat/firestore";
import {WikiModelApi, WikiModelApp} from "./wikiFeature.model";

export const wikiFeatureMapper = function(result : QuerySnapshot<WikiModelApi>): WikiModelApp[] {
    return result.docs.map(doc =>  {return { id : doc.id , ...doc.data()}})
}
