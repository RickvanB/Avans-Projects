<?php

/**
 * Class IntervalController
 *
 * PHP version 7.2
 *
 * @category Controllers
 * @package  Cheqie
 * @author   Jip van Heugten <jheugten1@avans.nl>
 * @author   Rick van Beek <rtabeek@avans.nl>
 * @license  https://gnu.org/licenses/gpl-3.0.txt GNU/GPLv3
 * @link     https://www.github.com/rickvanb/Cheqie
 */
namespace App\Http\Controllers;

use App\Model\Bank_account;
use App\Model\Cheqie;
use App\Model\Currency;
use App\Model\EventModel;
use App\Model\Interval;
use App\Model\Pay_request;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

/**
 * IntervalController Class Doc Comment
 *
 * @category Class
 * @package  IntervalController
 * @author   Jip van Heugten <jheugten1@avans.nl>
 * @author   Rick van Beek <rtabeek@avans.nl>
 * @license  https://gnu.org/licenses/gpl-3.0.txt GNU/GPLv3
 * @link     https://www.github.com/rickvanb/Cheqie
 */
class IntervalController extends Controller
{
    /**
     * This method will return an overview of all interval-payments of a user
     *
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function calendar()
    {
        $userId = null;
        if (Auth::check()) {
            $userId = Auth::user()->id;

            // Get all interval-payments
            $eloquentEvents = EventModel::all();

            $events = array();
            foreach ($eloquentEvents as $event) {
                $cheqie = Cheqie::find($event->pay_request);

                $url = url('/cheqie/'.$cheqie->id.'/'.$cheqie->link);
                $events[] = \Calendar::event(
                    decrypt($event->title),
                    false,
                    $event->start,
                    $event->end,
                    $event->link = $url
                );
            }

            $calendar = \Calendar::addEvents($events)
                ->setCallbacks(
                    [
                    'eventClick' => 'function(event) { if(event.id) { window.open(event.id, "_blank"); return false; } }'
                    ]
                );

            $data = [
                'userId'   => $userId,
                'calendar' => $calendar
            ];

            return view('interval/calendar')->with($data);
        }
    }

    /**
     * This method will return a view to create a new interval-payment
     *
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function create()
    {
        $userId = null;
        if (Auth::check()) {
            $userId = Auth::user()->id;

            $currency = Currency::all();
            $bank_acount = Bank_account::all()
                ->where('user_id', $userId);

            $data = array(
                'userId' => $userId, 
                'currency' => $currency, 
                'bank_acounts' => $bank_acount
            );

            return view('interval/createinterval')->with($data);
        }
    }

    /**
     * This method will save the data of the interval-payment form 
     * and will return the next step
     *
     * @param Request $request Get post and get requests
     * 
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function createStep2(Request $request)
    {
        $userId = null;
        if (Auth::check()) {
            $userId = Auth::user()->id;

            // Validate request before saving
            $request->validate(
                [
                'amount' => 'numeric|min:0',
                'amount' => 'numeric|max:2147483647',
                'title' => 'required|max:25',
                'summary' => 'max:65535'
                ]
            );

            // If passed validation tests
            $cheqie = new Cheqie();

            $cheqie->bank_id = Bank_account::all()
                ->where('user_id', $userId)
                ->where('iban', $request->bank_acount)
                ->first()
                ->id;
            $cheqie->currency = $request->currency;
            $cheqie->summary = encrypt($request->summary);
            $cheqie->time = date('Y-m-d H:i:s');
            $cheqie->user_id = $userId;
            $cheqie->amount = encrypt($request->amount);
            $cheqie->link = uniqid();
            $cheqie->name = encrypt($request->title);
            $cheqie->donation = $request->donation;

            $cheqie->save();

            // Get all interval types
            $interval = Interval::all();


            $data = array(
                'userId' => $userId, 
                'interval' => $interval, 
                'cheqie_id' => $cheqie->id
            );

            return view('interval/createintervalstep2')->with($data);
        }
    }

    /**
     * This method will save the actual interval-data into the DB. 
     * Afterwards it will re-direct to the overview
     *
     * @param Request $request Get post and get requests
     * 
     * @return \Illuminate\Http\RedirectResponse
     */
    public function saveInterval(Request $request)
    {
        $userId = null;
        if (Auth::check()) {
            $userId = Auth::user()->id;

            // Validate request before saving
            $request->validate(
                [
                'iban-reciever' => 'required',
                ]
            );

            // Check if al input is filled with correct values
            if ($request->interval == "on") {
                $request->validate(
                    [
                    'interval_type' => 'required',
                    'start_date' => 'required'
                    ]
                );
            } else {
                $request->validate(
                    [
                    'date' => 'required',
                    ]
                );
            }

            // Find created cheqie
            $cheqie = Pay_request::find($request->cheqie_id);

            // If al input is valid -> than save the input
            if ($request->interval == "on") {

                // Set interval
                $cheqie->interval = $request->interval_type;

                // Set execution amount
                $amount = 365;
                if ($request->amount_interval != null) {
                    $amount =  $request->amount_interval;
                }

                $cheqie->amount_interval = $amount;

                // Save Cheqie
                $cheqie->save();

                // Set variable
                $datestring = $request->start_date;
                $date = strtotime($datestring);

                $datetoformat = date('Y-m-d', $date);

                $formatDate = date_create($datetoformat);

                // Insert the interval into the planning table
                for ($i = 0; $i < $amount; $i++) {
                    $interval_action = new EventModel;

                    // Add amount of days depending on the interval type
                    switch ($request->interval_type) {
                    case 1:
                        // Each month
                        date_modify($formatDate, '+1 month');
                        break;
                    case 2:
                        // Each week
                        date_modify($formatDate, '+7 day');
                        break;
                    case 3:
                        // Each year
                        date_modify($formatDate, '+1 year');
                        break;
                    case 4:
                        // Each day
                        date_modify($formatDate, '+1 day');
                        break;
                    default:
                        var_dump("Error!");
                        break;
                    }

                    // Set values
                    $interval_action->start =  $formatDate;
                    $interval_action->end = $interval_action->start;
                    $interval_action->title = $cheqie->name;
                    $interval_action->all_day = 0;
                    $interval_action->pay_request = $cheqie->id;

                    $interval_action->save();
                }
            } else {
                // No interval so only save ones
                $interval_action = new EventModel;

                $interval_action->title = $cheqie->name;
                $interval_action->all_day = 0;
                $interval_action->start = $request->date;
                $interval_action->end = $interval_action->start;
                $interval_action->pay_request = $cheqie->id;

                $interval_action->save();

                // Save interval
                $cheqie->interval = 5;
                $cheqie->amount_interval = 1;
                $cheqie->save();
            }

            // Return to overview
            $lang = \Lang::getLocale();

            if ($lang == "nl") {
                return redirect()
                    ->action('IntervalController@calendar')
                    ->with('flash_message', 'Interval is toegevoegd');
            } else {
                return redirect()
                    ->action('IntervalController@calendar')
                    ->with('flash_message', 'Interval has been added');
            }


        }
    }

    /**
     * Delete an interval 
     * 
     * @param Request $request Get post and get requests
     * 
     * @return \Illuminate\Http\RedirectResponse
     */
    public function deleteInterval(Request $request)
    {
        $userId = null;
        if (Auth::check()) {
            $userId = Auth::user()->id;

            // Validate request
            $request->validate(
                [
                'interval' => 'required'
                ]
            );

            // Find intervals to remove
            $toRemove = EventModel::all()
                ->where('pay_request', $request->interval)
                ->where('start', '>=', date('Y-m-d'));

            // Delete all interval items of this cheqie
            foreach ($toRemove as $interval) {
                $interval->delete();
            }

            // Return to overview
            return redirect()
                ->action('IntervalController@calendar')
                ->with('flash_message', 'Interval is verwijderd');
        }
    }

    /**
     * This method will delete an existing interval-payment
     *
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function delete()
    {
        $userId = null;
        if (Auth::check()) {
            $userId = Auth::user()->id;

            // Get all interval cheqies
            $cheqies = Cheqie::all()
                ->where('user_id', $userId)
                ->where('interval', '!=', null);

            $interval_type = array();
            foreach ($cheqies as $cheqie) {
                $interval_type += [$cheqie->id => Interval::all()
                    ->where('id', $cheqie->interval)
                    ->first()
                    ->name
                ];
            }

            $data = array(
                'userId' => $userId, 
                'cheqies' => $cheqies, 
                'interval_type' => $interval_type
            );

            return view('interval/removeinterval')->with($data);
        }
    }
}
