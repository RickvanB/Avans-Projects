<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Pay_request extends Model
{

    protected $table = 'pay_request';
    public $timestamps = false;


    public function paid_by()
    {
        return $this->belongsToMany('App\Model\User', 'user_payment');
    }
}
