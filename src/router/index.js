import { createRouter, createWebHistory } from 'vue-router';
import AppLayout from '@/layout/AppLayout.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'login',
            component: () => import('@/views/pages/auth/Login.vue')
        },
        {
            path: '/',
            component: AppLayout,
            children: [
                {
                    path: '/all-departments',
                    name: 'dashboard',
                    component: () => import('@/views/Dashboard.vue')
                },
                {
                    path: '/team',
                    name: 'team',
                    component: () => import('@/views/pages/Team.vue')
                },
                {
                    path: '/messages',
                    name: 'messages',
                    component: () => import('@/views/pages/Messages.vue')
                },
                {
                    path: '/reports',
                    name: 'reports',
                    component: () => import('@/views/pages/Reports.vue')
                },
                {
                    path: '/calendar',
                    name: 'calendar',
                    component: () => import('@/views/pages/Calendar.vue')
                },
                {
                    path: '/artist-bookings',
                    name: '',
                    component: () => import('@/views/departments/ArtistBookingsView.vue')
                },
                {
                    path: '/gastronomy',
                    name: 'gastronomy',
                    component: () => import('@/views/departments/GastronomyView.vue')
                },
                {
                    path: '/legal-security-control',
                    name: 'legalsecurity&control',
                    component: () => import('@/views/departments/LegalSecurityControlView.vue')
                },
                {
                    path: '/marketing-sponsors',
                    name: 'marketing-sponsors',
                    component: () => import('@/views/departments/MarketingSponsorsView.vue')
                },
                {
                    path: '/ticketing-presale',
                    name: 'ticketing-presale',
                    component: () => import('@/views/departments/TicketingPresaleView.vue')
                },
                {
                    path: '/stage-equipment',
                    name: 'stage-equipment',
                    component: () => import('@/views/departments/StageEquipmentView.vue')
                }
            ]
        },
        
    ]
});

export default router;
