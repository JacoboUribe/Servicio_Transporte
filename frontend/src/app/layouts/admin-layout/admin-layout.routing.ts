import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'tables',         component: TablesComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    {
        path: 'bills',
        children: [
            {
                path: '',
                loadChildren: () => import('src/app/pages/bills/bills.module').then(m => m.BillsModule)
            }
        ]
    },
    {
        path: 'cities',
        children: [
            {
                path: '',
                loadChildren: () => import('src/app/pages/cities/cities.module').then(m => m.CitiesModule)
            }
        ]
    },
    {
        path: 'contracts',
        children: [
            {
                path: '',
                loadChildren: () => import('src/app/pages/contracts/contracts.module').then(m => m.ContractsModule)
            }
        ]
    },
    {
        path: 'customers',
        children: [
            {
                path: '',
                loadChildren: () => import('src/app/pages/customers/customers.module').then(m => m.CustomersModule)
            }
        ]
    },
    {
        path: 'departments',
        children: [
            {
                path: '',
                loadChildren: () => import('src/app/pages/departments/departments.module').then(m => m.DepartmentsModule)
            }
        ]
    },
    {
        path: 'order-routes',
        children: [
            {
                path: '',
                loadChildren: () => import('src/app/pages/order-routes/order-routes.module').then(m => m.OrderRoutesModule)
            }
        ]
    },
    {
        path: 'routes',
        children: [
            {
                path: '',
                loadChildren: () => import('src/app/pages/routes/routes.module').then(m => m.RoutesModule)
            }
        ]
    },
    {
        path: 'shares',
        children: [
            {
                path: '',
                loadChildren: () => import('src/app/pages/shares/shares.module').then(m => m.SharesModule)
            }
        ]
    },
    {
        path: 'vehicles',
        children: [
            {
                path: '',
                loadChildren: () => import('src/app/pages/vehicles/vehicles.module').then(m => m.VehiclesModule)
            }
        ]
    },
    {
        path: 'natural-peoples',
        children: [
            {
                path: '',
                loadChildren: () => import('src/app/pages/natural-peoples/natural-peoples.module').then(m => m.NaturalPeoplesModule)
            }
        ]
    },
    {
        path: 'addresses',
        children: [
            {
                path: '',
                loadChildren: () => import('src/app/pages/addresses/addresses.module').then(m => m.AddressesModule)
            }
        ]
    },
];
