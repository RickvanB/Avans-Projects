<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Cheqie extends Model
{
    public $timestamps = false;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'pay_request';

    public function paid_users()
    {
        return $this->belongsToMany('App\Model\User', 'user_payment');
    }


}
