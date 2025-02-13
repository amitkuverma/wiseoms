import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { UploadComponent } from './components/upload/upload.component';
import { TableComponent } from './components/table/table.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { LayoutComponent } from './components/layout/layout.component';
import { PricingComponent } from './components/pricing/pricing.component';
import { HelpCenterComponent } from './components/help-center/help-center.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { BillingComponent } from './components/billing/billing.component';
import { UpgradeComponent } from './components/upgrade/upgrade.component';
import { HeroComponent } from './components/hero/hero.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
      path: '', component: LayoutComponent,
      canActivate: [AuthGuard],
      children: [
        { path: 'home', component: HeroComponent },
        { path: 'upload', component: UploadComponent },
        { path: 'pricing', component: PricingComponent },
        { path: 'help', component: HelpCenterComponent },
        { path: 'table', component: TableComponent },
        {path: '', redirectTo: 'home', pathMatch: 'full'}
      ]
    },
    {
      path: 'account',
      component: DashboardComponent,
      canActivate: [AuthGuard], // Protect the entire account section
      children: [
        { path: 'profile', component: ProfileComponent },
        { path: 'billing', component: BillingComponent },
        { path: 'upgrade', component: UpgradeComponent },
        {path: '', redirectTo: 'profile', pathMatch: 'full'}
      ]
    },
    { path: 'login', component: LoginComponent },
    { path: 'registration', component: RegistrationComponent },
    { path: '**', component: LoginComponent } // Catch-all route
  ];
