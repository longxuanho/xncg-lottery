import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PreferencesComponent } from './preferences.component';
import { PreferencesDuLieuChuongTrinhComponent } from './preferences-du-lieu-chuong-trinh/preferences-du-lieu-chuong-trinh.component';
import { PreferencesThongTinHienThiComponent } from './preferences-thong-tin-hien-thi/preferences-thong-tin-hien-thi.component';
import { PreferencesThuatToanComponent } from './preferences-thuat-toan/preferences-thuat-toan.component';

const routes: Routes = [
    {
        path: '',
        component: PreferencesComponent
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PreferencesRoutingModule { }

export const routedComponents = [
    PreferencesComponent, PreferencesDuLieuChuongTrinhComponent, PreferencesThongTinHienThiComponent, PreferencesThuatToanComponent
];