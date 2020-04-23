import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TransformBoxComponent } from './components/transform-box/transform-box.component';
import { PalettePageComponent } from './pages/palette-page/palette-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { CodeDisplayComponent } from './components/code-display/code-display.component';
import { TestPageComponent } from './pages/test-page/test-page.component';
import { TransformApplierDirective } from './directives/transform-applier.directive';
import { ChainTransformComponent } from './components/chain-transform/chain-transform.component';
import { LinearLayoutComponent } from './components/linear-layout/linear-layout.component';
import { RouteTemplatePageComponent } from './pages/route-template-page/route-template-page.component';

@NgModule({
  declarations: [
    AppComponent,
    TransformBoxComponent,
    PalettePageComponent,
    CodeDisplayComponent,
    TestPageComponent,
    TransformApplierDirective,
    ChainTransformComponent,
    LinearLayoutComponent,
    RouteTemplatePageComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatSelectModule,
    MatButtonModule,
    MatTabsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
