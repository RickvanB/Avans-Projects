<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class User_payment extends Model
{
    protected $table = 'user_payment';
    protected $primaryKey = 'request_id';


    public function users()
    {
        return $this->belongsToMany('App\Model\User', 'users');
    }

    public function requests()
    {
        return $this->hasOne('App\Model\Cheqie', 'pay_request');
    }
}
