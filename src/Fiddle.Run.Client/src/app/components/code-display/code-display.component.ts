import { Component, Input, ElementRef, ViewChild } from '@angular/core';
// declare var Prism: any;

@Component({
  selector: 'fiddle-code-display',
  template: `<pre class="mat-elevation-z2"><code>{{ code }}</code></pre>`,
  styleUrls: ['./code-display.component.scss']
})
export class CodeDisplayComponent {
  @Input() code: string;
  @Input() language: string;

  constructor() {
  }
}