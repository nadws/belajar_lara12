import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { ListPlus } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';

export function NavMain({ items = [] }: { items: NavItem[] }) {
    const page = usePage();

    const [isAdding, setIsAdding] = useState(false);
    const [newMenu, setNewMenu] = useState({ title: '', href: '', icon: '' });

    const handleAdd = () => {
        // ⛳ Kirim ke backend pakai fetch/axios/Inertia.post
        console.log('Tambah menu:', newMenu);

        // Reset
        setIsAdding(false);
        setNewMenu({ title: '', href: '', icon: '' });
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
                    <Card className="w-full max-w-md">
                        <CardHeader>
                            <CardTitle>Tambah Note Baru</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    handleAdd();
                                }}
                                className="space-y-4"
                            >
                                <div>
                                    <label className="mb-1 block text-sm">Judul</label>
                                    <input
                                        type="text"
                                        className="w-full rounded border bg-background px-3 py-2 text-sm text-foreground"
                                        value={newMenu.title}
                                        onChange={(e) => setNewMenu({ ...newMenu, title: e.target.value })}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="mb-1 block text-sm">Link (href)</label>
                                    <input
                                        type="text"
                                        className="w-full rounded border bg-background px-3 py-2 text-sm text-foreground"
                                        value={newMenu.href}
                                        onChange={(e) => setNewMenu({ ...newMenu, href: e.target.value })}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="mb-1 block text-sm">Icon (misal: LayoutGrid)</label>
                                    <input
                                        type="text"
                                        className="w-full rounded border bg-background px-3 py-2 text-sm text-foreground"
                                        value={newMenu.icon}
                                        onChange={(e) => setNewMenu({ ...newMenu, icon: e.target.value })}
                                    />
                                </div>
                            </form>
                        </CardContent>
                        <CardFooter className="flex justify-end gap-2">
                            <Button type="button" variant={'secondary'} onClick={() => setIsAdding(false)}>
                                Batal
                            </Button>
                            <Button type="submit" variant="default" onClick={handleAdd}>
                                Simpan
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            )}
        </SidebarGroup>
    );
}
