import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, useForm, usePage } from '@inertiajs/react';
import { ListPlus } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';

export function NavMain({ items = [] }: { items: NavItem[] }) {
    const page = usePage();

    const [isAdding, setIsAdding] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const { data, setData, post, errors, processing, recentlySuccessful } = useForm({
        judul: '',
        icon: '',
    });

    const submit = (e: any) => {
        e.preventDefault();
        post(route('nav-items.store'), {
            preserveScroll: true,
            onSuccess: () => {
                setIsAdding(false);
                alert('Berhasil menambahkan menu');
            },
            onError: (errors) => {
                alert('Gagal menambahkan menu');
            },
        });
    };

    return (
        <SidebarGroup className="px-2 py-0">
            <div className="flex items-center justify-between">
                <SidebarGroupLabel>Note</SidebarGroupLabel>
                <Button onClick={() => setIsAdding(!isAdding)} variant="outline" size="sm" className="ml-2">
                    <ListPlus className="h-4 w-4" />
                </Button>
            </div>

            <SidebarMenu>
                {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild isActive={page.url.startsWith(item.href)} tooltip={{ children: item.title }}>
                            <Link href={item.href} prefetch>
                                {item.icon && <item.icon />}
                                <span>{item.title}</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>

            {isAdding && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                    <form onSubmit={submit} className="w-full max-w-md">
                        <Card className="w-full max-w-md">
                            <CardHeader>
                                <CardTitle>Tambah Note Baru</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div>
                                    <label className="mb-1 block text-sm">Judul</label>
                                    <input
                                        type="text"
                                        id="judul"
                                        className="w-full rounded border bg-background px-3 py-2 text-sm text-foreground"
                                        value={data.judul}
                                        onChange={(e) => setData('judul', e.target.value)}
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="mb-1 block text-sm">Icon (misal: LayoutGrid)</label>
                                    <input
                                        type="text"
                                        id="icon"
                                        className="w-full rounded border bg-background px-3 py-2 text-sm text-foreground"
                                        value={data.icon}
                                        onChange={(e) => setData('icon', e.target.value)}
                                    />
                                </div>
                            </CardContent>
                            <CardFooter className="flex justify-end gap-2">
                                <Button type="button" variant={'secondary'} onClick={() => setIsAdding(false)}>
                                    Batal
                                </Button>
                                <Button type="submit" variant="default" disabled={isLoading}>
                                    {isLoading ? 'Menyimpan...' : 'Simpan'}
                                </Button>
                            </CardFooter>
                        </Card>
                    </form>
                </div>
            )}
        </SidebarGroup>
    );
}
