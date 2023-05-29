<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\user;

class Todo extends Model
{
    use HasFactory;
    protected $fillable = ['title', 'description'];

 /*   public function user()
{
    return $this->belongsTo(User::class);
} */
}
