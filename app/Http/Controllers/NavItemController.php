<?php

namespace App\Http\Controllers;

use App\Models\NavItem;
use Illuminate\Http\Request;

class NavItemController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'icon' => 'nullable|string|max:255',
        ]);
        $lastItem = NavItem::orderBy('order', 'desc')->first();

        $order = $lastItem ? $lastItem->order + 1 : 1;
        $newItem = NavItem::create([
            'title' => $request->title,
            'icon' => $request->icon,
            'href' => '/dashboard', // atau sesuaikan dengan logika kamu
            'order' => $order,
        ]);

        return response()->json([
            'message' => 'Berhasil menambahkan menu',
            'item' => $newItem,
        ]);
    }
}
