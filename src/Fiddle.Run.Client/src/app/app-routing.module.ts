import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PalettePageComponent } from './pages/palette-page/palette-page.component';
import { Base64PageComponent } from './pages/base64-page/base64-page.component';
import { FormatJsonPageComponent } from './pages/format-json-page/format-json-page.component';


const routes: Routes = [
  {
    path: 'templates/base64',
    component: Base64PageComponent,
  },
  {
    path: 'templates/format-json',
    component: FormatJsonPageComponent,
  },
  {
    path: '',
    component: PalettePageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
