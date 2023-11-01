import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FoListComponent } from './fo/fo-list/fo-list.component';
import { FoDetailComponent } from './fo/fo-detail/fo-detail.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormDirectivesModule } from '../../shared/directives/form-directives.module';
import { SharedComponentsModule } from '../../shared/components/shared-components.module';
import { FrontComponent } from './front.component';

import { LocationBackDirectiveModule } from '../../shared/directives/location-back.directive';
import { GeoListComponent } from './point/point-list/geo-list.component';
import { PointFormComponent } from './point/geo-element/point-form.component';
import { FrontGeoComponent } from './point/front-geo.component';


@NgModule({
  declarations: [FrontComponent, FoListComponent, FoDetailComponent, FrontGeoComponent, PointFormComponent, GeoListComponent],
  imports: [
    CommonModule,
    LocationBackDirectiveModule,
    ReactiveFormsModule,
    FormDirectivesModule,
    SharedComponentsModule,
    RouterModule.forChild([{
      path: '', component: FrontComponent, children: [
        { path: 'fo/list', component: FoListComponent },
        { path: 'fo/detail', component: FoDetailComponent },
        {
          path: 'geo',
          component: FrontGeoComponent,
          children: [
            { path: 'list', component: GeoListComponent },
            { path: 'detail', component: PointFormComponent }
          ]
        }
      ]
    }])
  ]
})
export class FrontModule {
}
