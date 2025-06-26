import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { usePage } from '@inertiajs/react';
import * as Icons from 'lucide-react';

export function AppSidebar() {
    const page = usePage();

    const navItems = page.props.navItems as Array<{ id: number; title: string; href: string; icon: string }>;

    const mainNavItems = (navItems || []).map((item) => ({
        title: item.title,
        href: `${item.href}?id=${item.id}&title=${encodeURIComponent(item.title)}`,
        icon: Icons[item.icon as keyof typeof Icons] ?? Icons.HelpCircle,
    }));

    const footerNavItems: NavItem[] = [];
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <NavUser />

                {/* <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu> */}
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                {/* <NavUser /> ← sudah dipindahkan */}
            </SidebarFooter>
        </Sidebar>
    );
}
