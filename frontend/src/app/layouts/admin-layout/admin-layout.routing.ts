import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { AuthGuard } from 'src/app/guards/auth.guard';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'tables',         component: TablesComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    {
        path: 'bills',
        // canActivate:[AuthGuard],
        children: [
            {
                path: '',
                loadChildren: () => import('src/app/pages/bills/bills.module').then(m => m.BillsModule)
            }
        ]
    },
    {
        path: 'cities',
        // canActivate:[AuthGuard],
        children: [
            {
                path: '',
                loadChildren: () => import('src/app/pages/cities/cities.module').then(m => m.CitiesModule)
            }
        ]
    },
    {
        path: 'contracts',
        // canActivate:[AuthGuard],
        children: [
            {
                path: '',
                loadChildren: () => import('src/app/pages/contracts/contracts.module').then(m => m.ContractsModule)
            }
        ]
    },
    {
        path: 'customers',
        // canActivate:[AuthGuard],
        children: [
            {
                path: '',
                loadChildren: () => import('src/app/pages/customers/customers.module').then(m => m.CustomersModule)
            }
        ]
    },
    {
        path: 'departments',
        // canActivate:[AuthGuard],
        children: [
            {
                path: '',
                loadChildren: () => import('src/app/pages/departments/departments.module').then(m => m.DepartmentsModule)
            }
        ]
    },
    {
        path: 'order-routes',
        // canActivate:[AuthGuard],
        children: [
            {
                path: '',
                loadChildren: () => import('src/app/pages/order-routes/order-routes.module').then(m => m.OrderRoutesModule)
            }
        ]
    },
    {
        path: 'routes',
        // canActivate:[AuthGuard],
        children: [
            {
                path: '',
                loadChildren: () => import('src/app/pages/routes/routes.module').then(m => m.RoutesModule)
            }
        ]
    },
    {
        path: 'shares',
        // canActivate:[AuthGuard],
        children: [
            {
                path: '',
                loadChildren: () => import('src/app/pages/shares/shares.module').then(m => m.SharesModule)
            }
        ]
    },
    {
        path: 'vehicles',
        // canActivate:[AuthGuard],
        children: [
            {
                path: '',
                loadChildren: () => import('src/app/pages/vehicles/vehicles.module').then(m => m.VehiclesModule)
            }
        ]
    },
    {
        path: 'natural-peoples',
        // canActivate:[AuthGuard],
        children: [
            {
                path: '',
                loadChildren: () => import('src/app/pages/natural-peoples/natural-peoples.module').then(m => m.NaturalPeoplesModule)
            }
        ]
    },
    {
        path: 'addresses',
        // canActivate:[AuthGuard],
        children: [
            {
                path: '',
                loadChildren: () => import('src/app/pages/addresses/addresses.module').then(m => m.AddressesModule)
            }
        ]
    },
];
