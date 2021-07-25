<?php

namespace App\Model;

use DateTime;
use Illuminate\Database\Eloquent\Model;

class EventModel extends Model implements \MaddHatter\LaravelFullcalendar\Event
{

    protected $table = 'payment_planning';
    public $timestamps = false;

    protected $dates = ['start', 'end'];

    /**
     * Get the event's id number
     *
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Get the event's title
     *
     * @return string
     */
    public function getTitle()
    {
        $cheqie = Cheqie::find($this->pay_request);

        return  decrypt($cheqie->amount) . " " . $cheqie->currency . " " . decrypt($this->title);

    }

    /**
     * Is it an all day event?
     *
     * @return bool
     */
    public function isAllDay()
    {
        return (bool)$this->all_day;
    }

    /**
     * Get the start time
     *
     * @return DateTime
     */
    public function getStart()
    {
        return $this->start;
    }

    /**
     * Get the end time
     *
     * @return DateTime
     */
    public function getEnd()
    {
        return $this->end;
    }

    public function cheqies()
    {
        return $this->hasOne('App\Model\Cheqie');
    }
}
