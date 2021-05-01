import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddImageComponent } from './areas/add-image/add-image.component';
import { HomeComponent } from './areas/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: {componentName: 'HomeComponent'}
  },
  {
    path: 'addImages',
    component: AddImageComponent,
    data: {componentName: 'AddImageComponent'}
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
