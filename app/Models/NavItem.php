<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class NavItem extends Model
{
    protected $fillable = ['id', 'title', 'href', 'icon', 'order', 'user_id'];
}
