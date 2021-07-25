<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Group extends Model
{
    public $timestamps = false;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'group';

    public function users()
    {
        return $this->belongsToMany('App\Model\User', 'user_group');
    }
}
