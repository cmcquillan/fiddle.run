import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'fiddle-route-template-page',
  templateUrl: './route-template-page.component.html',
  styleUrls: ['./route-template-page.component.scss']
})
export class RouteTemplatePageComponent implements OnInit {
  private readonly _transforms$: Observable<string[]>;

  get transforms$(): Observable<string[]> { return this._transforms$; }

  constructor(route: ActivatedRoute) {
    this._transforms$ = route.data.pipe(
      map((data) => data.transforms)
    );
  }

  ngOnInit(): void {
  }
}
