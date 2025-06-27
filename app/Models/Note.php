<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Note extends Model
{
    protected $fillable = [
        'nav_item_id',
        'title',
        'content',
        'user_id',
    ];
}
