import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';

export default function Dashboard({ notes = {}, nav = {} }: { notes?: any; nav?: any }) {
    const { url } = usePage(); // Ambil URL lengkap
    const searchParams = new URLSearchParams(url.split('?')[1]); // Pisahkan query param
    const dynamicTitle = searchParams.get('title') || 'Dashboard';

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Note / ' + dynamicTitle,
            href: '/dashboard',
        },
    ];

    const { data, setData, post, errors, processing, recentlySuccessful } = useForm({
        title: notes?.title || '',
        nav_id: nav?.id || '',
        content: notes?.content || '',
    });

    const submitTitle = (e: any) => {
        e.preventDefault();
        if (!data.title.trim()) return; // Jangan kirim jika kosong

        post(route('update', nav?.id), {
            preserveScroll: true,
        });
    };

    const submitContent = (e: any) => {
        e.preventDefault();
        if (!data.content.trim()) return; // Jangan kirim jika kosong

        post(route('update_content', nav?.id), {
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={dynamicTitle} />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <input
                    className="border-none text-center text-4xl font-semibold focus:border-none focus:outline-none"
                    type="text"
                    id="title"
                    placeholder="Judul catatan"
                    onChange={(e) => setData('title', e.target.value)}
                    onBlur={submitTitle}
                    value={data.title}
                />

                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <textarea
                        id="content"
                        onChange={(e) => setData('content', e.target.value)}
                        onBlur={submitContent}
                        value={data.content}
                        placeholder="Tulis isi catatan di sini..."
                        className="h-full w-full resize-none border-none bg-background p-4 text-foreground focus:outline-none"
                    />
                </div>
            </div>
        </AppLayout>
    );
}
