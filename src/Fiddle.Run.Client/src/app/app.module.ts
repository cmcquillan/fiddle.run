import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MatLegacyAutocompleteModule as MatAutocompleteModule } from '@angular/material/legacy-autocomplete';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyChipsModule as MatChipsModule } from '@angular/material/legacy-chips';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { MatLegacyTabsModule as MatTabsModule } from '@angular/material/legacy-tabs';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChainTransformComponent } from './components/chain-transform/chain-transform.component';
import { CodeDisplayComponent } from './components/code-display/code-display.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LinearLayoutComponent } from './components/linear-layout/linear-layout.component';
import { PalettePageComponent } from './pages/palette-page/palette-page.component';
import { RouteTemplatePageComponent } from './pages/route-template-page/route-template-page.component';
import { ShowErrorDialogComponent } from './components/show-error-dialog/show-error-dialog.component';
import { TestPageComponent } from './pages/test-page/test-page.component';
import { TransformBoxComponent } from './components/transform-box/transform-box.component';
import { TransformBuilderDirective } from './directives/transform-builder.directive';

@NgModule({
  declarations: [
    AppComponent,
    TransformBoxComponent,
    PalettePageComponent,
    CodeDisplayComponent,
    TestPageComponent,
    ChainTransformComponent,
    LinearLayoutComponent,
    RouteTemplatePageComponent,
    ShowErrorDialogComponent,
    TransformBuilderDirective,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatSelectModule,
    MatButtonModule,
    MatTabsModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatIconModule,
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
