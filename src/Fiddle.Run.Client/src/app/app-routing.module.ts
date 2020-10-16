import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PalettePageComponent } from './pages/palette-page/palette-page.component';
import { TestPageComponent } from './pages/test-page/test-page.component';
import { RouteTemplatePageComponent } from './pages/route-template-page/route-template-page.component';


const routes: Routes = [
  {
    path: 'templates/format-json',
    component: RouteTemplatePageComponent,
    data: {
      transforms: ['textInput', 'parseJSON', 'formatJSON', 'textOutput']
    }
  },
  {
    path: 'templates/uri-encode',
    component: RouteTemplatePageComponent,
    data: {
      transforms: ['textInput', 'uriEncode', 'textOutput']
    }
  },
  {
    path: 'test-page',
    component: TestPageComponent,
  },
  {
    path: 'palette',
    component: PalettePageComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    component: RouteTemplatePageComponent,
    data: {
      transforms: ['textInput', 'atob', 'textOutput']
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
