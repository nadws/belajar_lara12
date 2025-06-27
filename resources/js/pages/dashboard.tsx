import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';

export default function Dashboard({ notes, nav }: { notes: any; nav: any }) {
    const { url } = usePage(); // Ambil url lengkap
    const searchParams = new URLSearchParams(url.split('?')[1]); // pisahkan query param
    const dynamicTitle = searchParams.get('title') || 'Dashboard';
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Note / ' + dynamicTitle,
            href: '/dashboard',
        },
    ];
    const { data, setData, post, errors, processing, recentlySuccessful } = useForm({
        title: notes.title || '',
        nav_id: nav.id,
        content: notes.content || '',
    });
    const submit = (e: any) => {
        e.preventDefault();

        post(route('update', nav.id), {
            preserveScroll: true,
        });
    };
    const submit2 = (e: any) => {
        e.preventDefault();

        post(route('update_content', nav.id), {
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
                    onChange={(e) => setData('title', e.target.value)}
                    onBlur={submit}
                    value={data.title}
                />

                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <textarea
                        id="content"
                        onChange={(e) => setData('content', e.target.value)}
                        onBlur={submit2}
                        className="h-full w-full resize-none border-none bg-background p-4 text-foreground focus:outline-none"
                    >
                        {notes.content}
                    </textarea>
                </div>
            </div>
        </AppLayout>
    );
}
