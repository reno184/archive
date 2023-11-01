import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { SetupFormService } from '../../../../../../shared/services/setup-form.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-tab-pci',
  templateUrl: './tab-pci.component.html'
})
export class TabPciComponent implements OnInit, OnDestroy {


  rootGroup: FormGroup;
  sub3: Subscription;
  selectedFoId: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private setupFormService: SetupFormService) {
  }

  ngOnInit() {
    this.rootGroup = this.setupFormService.rootFormGroup();
    this.sub3 = this.activatedRoute.params.pipe(
    ).subscribe(params => this.setupFormService.pciSelected = parseInt(params.pci.substr(params.pci.length - 1, 1), 0) - 1);
  }

  onClickDetail(id: string) {
    this.selectedFoId = id;
  }

  ngOnDestroy(): void {
    this.sub3.unsubscribe();
  }

  get pciSelected(): number {
    return this.setupFormService.pciSelected;
  }

  isActive(index: number): boolean {
    return this.setupFormService.isActive(index);
  }

}
