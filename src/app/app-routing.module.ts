import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './core/login/login.component';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'dang-nhap' },
    { path: 'dang-nhap', component: LoginComponent },
    { path: 'quay-so', loadChildren: 'app/+lottery/lottery.module#LotteryModule'},
    { path: 'ket-qua', loadChildren: 'app/+result/result.module#ResultModule' },
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