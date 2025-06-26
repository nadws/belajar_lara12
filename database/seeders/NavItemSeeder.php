<?php

namespace Database\Seeders;

use App\Models\NavItem;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class NavItemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $items = [
            [
                'title' => 'Dashboard',
                'href' => '/dashboard',
                'icon' => 'LayoutGrid',
                'order' => 1,
            ],
            [
                'title' => 'User Profile',
                'href' => '/profile',
                'icon' => 'User',
                'order' => 2,
            ],
            [
                'title' => 'Settings',
                'href' => '/settings',
                'icon' => 'Settings',
                'order' => 3,
            ],
        ];

        foreach ($items as $item) {
            NavItem::updateOrCreate(
                ['href' => $item['href']],
                $item
            );
        }
    }
}
