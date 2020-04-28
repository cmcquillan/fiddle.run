import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';

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
