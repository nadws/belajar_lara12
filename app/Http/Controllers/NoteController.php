<?php

namespace App\Http\Controllers;

use App\Models\Note;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\NavItem;
use Laravel\Prompts\Prompt;

class NoteController extends Controller
{
    public function index(Request $r)
    {
        $note = Note::where('user_id', auth()->id())
            ->where('nav_item_id', $r->id)
            ->first();

        $nav = NavItem::where('id', $r->id)->first();

        return Inertia::render('dashboard', [
            'notes' => $note,
            'nav' => $nav,
        ]);
    }

    public function update(Request $r, $id)
    {
        NavItem::where('id', $id)->update([
            'title' => $r->title,
        ]);

        Note::where('nav_item_id', $id)->update([
            'title' => $r->title,
        ]);

        return redirect()->route('catatan', ['id' => $id, 'title' => $r->title])->with('success', 'Produk berhasil ditambahkan');
    }
    public function update_content(Request $r, $id)
    {


        Note::where('nav_item_id', $id)->update([
            'content' => $r->content,
        ]);

        return redirect()->route('catatan', ['id' => $id, 'title' => $r->title])->with('success', 'Produk berhasil ditambahkan');
    }
}
