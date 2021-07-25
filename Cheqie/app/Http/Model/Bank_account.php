<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Bank_account extends Model
{
    protected $table = 'bank_acount';
    public $timestamps = false;

    public function users()
    {
        return $this->belongsTo('App\Model\User');
    }

}
