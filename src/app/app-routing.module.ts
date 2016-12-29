import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './core/login/login.component';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'bang-tin' },
    { path: 'dang-nhap', component: LoginComponent },
    { path: 'quay-so', loadChildren: 'app/+lottery/lottery.module#LotteryModule'},
    { path: 'thiet-lap', loadChildren: 'app/+preferences/preferences.module#PreferencesModule' }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {}

export const routableComponents = []