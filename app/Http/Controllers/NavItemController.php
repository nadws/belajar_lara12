<?php

namespace App\Http\Controllers;

use App\Models\NavItem;
use App\Models\Note;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NavItemController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'judul' => 'required|string|max:255',
            'icon' => 'nullable|string|max:255',
        ]);

        $lastItem = NavItem::orderBy('order', 'desc')->first();
        $order = $lastItem ? $lastItem->order + 1 : 1;

        $id_nav = NavItem::create([
            'title' => $request->judul,
            'icon' => $request->icon,
            'href' => '/dashboard',
            'order' => $order,
            'user_id' => auth()->id(),
        ]);

        Note::create([
            'nav_item_id' => $id_nav->id,
            'title' => $request->judul,
            'content' => '',
            'user_id' => auth()->id(),
        ]);

        return redirect()->route('dashboard', ['id' => $id_nav->id, 'title' => $request->judul])->with('success', 'Produk berhasil ditambahkan');
    }
}
