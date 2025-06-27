import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

export default function Awal() {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Awal',
            href: '/awal',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Awal" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <h1 className="text-center text-2xl font-semibold">Apa kabar anda hari ini ?</h1>
            </div>
        </AppLayout>
    );
}
