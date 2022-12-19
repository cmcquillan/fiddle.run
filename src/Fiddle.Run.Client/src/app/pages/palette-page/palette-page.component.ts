import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { TransformStoreService } from 'src/app/services/transform-store.service';
import { UntypedFormControl } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { MatLegacyAutocomplete as MatAutocomplete, MatLegacyAutocompleteSelectedEvent as MatAutocompleteSelectedEvent } from '@angular/material/legacy-autocomplete';

@Component({
  selector: 'fiddle-palette-page',
  templateUrl: './palette-page.component.html',
  styleUrls: ['./palette-page.component.scss'],
})
export class PalettePageComponent implements OnInit {
  transformCtrl = new UntypedFormControl();
  filteredTransforms$: Observable<string[]>;
  @ViewChild('trInput') trInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  private readonly _transforms = new BehaviorSubject<string[]>(['textInput']);
  transforms$ = this._transforms.asObservable();

  constructor(private readonly _store: TransformStoreService) {
    this.filteredTransforms$ = this.transformCtrl.valueChanges.pipe(
      startWith(null),
      map((transform: string | null) => this._filter(transform))
    );
  }

  ngOnInit(): void {
  }

  addTransform(transform: string) {
    const val = this._transforms.value;
    this._transforms.next([...val, transform]);
  }

  selected(event: MatAutocompleteSelectedEvent) {
    const val = this._transforms.value;
    this._transforms.next([...val, event.option.value]);
    this.trInput.nativeElement.value = '';
    this.transformCtrl.setValue(null);
  }

  remove(index: number) {
    const newArray = this._transforms.value.filter((v, i) => i !== index);
    this._transforms.next(newArray);
  }


  private _filter(val: string | null) {
    const filterVal = val ? val.toLowerCase() : '';
    return filterVal ? this._store.list().filter(v => v.toLowerCase().indexOf(filterVal) === 0) : [];
  }

  getList(): string[] {
    return this._store.list();
  }

}
