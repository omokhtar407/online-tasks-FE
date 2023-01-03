import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () =>
      import(`./dashboard/dashboard.module`).then((m) => m.DashboardModule),
  },
  {
    path: '',
    loadChildren: () => import(`./auth/auth.module`).then((m) => m.AuthModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
