import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentComponent } from './student/student.component';

const routes: Routes = [
  { path: 'student', component: StudentComponent },

  { path: '**', redirectTo: '' },

  /*Clide routes
   *
   * { path:'products' children:[
   *   { path:'', component: ProductsComponent }
   *   { path:'laptop', component:LaptopComponent }
   *   { path:'mobile', component:MoblieComponent }
   * ]}
   */

  /*Nested routes
   *
   * //--With neste route we use multiple router-outlet --//
   *
   * { path:'products', component: ProductsComponent children:[
   *   { path:'laptop', component:LaptopComponent }
   *   { path:'mobile', component:MoblieComponent }
   * ]}
   */
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
