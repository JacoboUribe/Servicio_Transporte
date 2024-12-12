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
        path: 'addresses',
        children: [
            {
                path: '',
                loadChildren: () => import('src/app/pages/addresses/addresses.module').then(m => m.AddressesModule)
            }
        ]
    },
    {
        path: 'administrators',
        children: [
            {
                path: '',
                loadChildren: () => import('src/app/pages/administrators/administrators.module').then(m => m.AdministratorsModule)
            }
        ]
    },
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
        path: 'drivers',
        children: [
            {
                path: '',
                loadChildren: () => import('src/app/pages/customers/customers.module').then(m => m.CustomersModule)
            }
        ]
    },
    {
        path: 'lots',
        children: [
            {
                path: '',
                loadChildren: () => import('src/app/pages/customers/customers.module').then(m => m.CustomersModule)
            }
        ]
    },
    {
        path: 'operations',
        children: [
            {
                path: '',
                loadChildren: () => import('src/app/pages/operations/operations.module').then(m => m.OperationsModule)
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
        path: 'owners',
        children: [
            {
                path: '',
                loadChildren: () => import('src/app/pages/owners/owners.module').then(m => m.OwnersModule)
            }
        ]
    },
    {
        path: 'products',
        children: [
            {
                path: '',
                loadChildren: () => import('src/app/pages/products/products.module').then(m => m.ProductsModule)
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
        path: 'services',
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
                loadChildren: () => import('src/app/pages/routes/routes.module').then(m => m.RoutesModule)
            }
        ]
    },
    {
        path: 'spents',
        children: [
            {
                path: '',
                loadChildren: () => import('src/app/pages/routes/routes.module').then(m => m.RoutesModule)
            }
        ]
    },
    {
        path: 'vehicle-drivers',
        children: [
            {
                path: '',
                loadChildren: () => import('src/app/pages/vehicle-drivers/vehicle-drivers.module').then(m => m.VehicleDriversModule)
            }
        ]
    },
    {
        path: 'vehicle-owners',
        children: [
            {
                path: '',
                loadChildren: () => import('src/app/pages/vehicle-owners/vehicle-owners.module').then(m => m.VehicleOwnersModule)
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
];
