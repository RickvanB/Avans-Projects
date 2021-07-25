<?php

/**
 * Class CheqieController
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
use App\Model\Group;
use App\Model\Pay_request;
use App\Model\User;
use App\Model\User_payment;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\View\View;
use Mollie\Laravel\Facades\Mollie;
use Cache;
use Carbon\Carbon;
use LaravelLocalization;
use Illuminate\Support\Facades\Mail;
use App\Mail\CheqieShareMail;

/**
 * CheqieController Class Doc Comment
 *
 * @category Class
 * @package  CheqieController
 * @author   Jip van Heugten <jheugten1@avans.nl>
 * @author   Rick van Beek <rtabeek@avans.nl>
 * @license  https://gnu.org/licenses/gpl-3.0.txt GNU/GPLv3
 * @link     https://www.github.com/rickvanb/Cheqie
 */
class CheqieController extends Controller
{
    private $_payment;

    /**
     * This method will return a list of all Cheqie's of a user
     * 
     * @return \Illuminate\Contracts\View\Factory|View
     */
    public function overview()
    {
        $userId = null;
        if (Auth::check()) {
            $userId = Auth::user()->id;
        }

        $user = User::find($userId);
        $cheqies = Cheqie::all()
            ->where('user_id', $user->id)
            ->where('interval', null);

        // Get all payments
        $payments = array();
        $dateLocalised = null;

        foreach ($cheqies as $cheqie) {
            if (LaravelLocalization::getCurrentLocale() == 'nl') {
                $dateLocalised = Carbon::parse($cheqie->time)
                    ->format('d-m-Y H:i:s');
                $cheqie->time = $dateLocalised;
            }

            $payments += [$cheqie->id => User_payment::all()
                ->where('request_id', $cheqie->id)];
        }

        $paid_by_user = User_payment::all()
            ->where('user_id', $userId)->where('anonymous', 0);
        $paidCheqies = array();

        foreach ($paid_by_user as $paid_cheqie) {
            $paidCheqies += [$paid_cheqie->request_id => $paid_cheqie->requests()];
        }

        $data = array(
            'user' => $user,
            'cheqies' => $cheqies, 
            'payments' => $payments, 
            'paid_cheqies' => $paidCheqies
        );

        return view('cheqies/cheqieoverview')->with($data);
    }

    /**
     * This method will return the data which is needed to create a new Cheqie
     *
     * @return \Illuminate\Contracts\View\Factory|View
     */
    public function create()
    {
        $userId = null;
        if (Auth::check()) {
            $userId = Auth::user()->id;
        }

        $currency = Currency::all();
        $bank_acount =  Bank_account::all()->where('user_id', $userId);

        $data = array(
            'userId' => $userId, 
            'currency' => $currency, 
            'bank_acounts' => $bank_acount
        );

        return view('cheqies/createcheqie')->with($data);
    }

    /**
     * This method will save a cheqie after the user filled in a small form
     *
     * @param Request $request Get post and get request
     * 
     * @return \Illuminate\Contracts\View\Factory|View
     */
    public function saveCheqie(Request $request)
    {
        // Validate request before saving
        $request->validate(
            [
            'amount' => 'numeric|min:0',
            'amount' => 'numeric|max:2147483647',
            'title' => 'required',
            'summary' => 'max:65535',
            'image' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            ]
        );

        $imagePath = null;
        if (isset($request->image) && $request->image != null) {
            $imageName = uniqid() . '-' . $request->image->getClientOriginalName();
            $path = public_path('images/uploads');
            $imagePath = url('/') . '/images/uploads/' . $imageName;

            request()->image->move($path, $imageName);
        }

        $userId = null;
        if (Auth::check()) {
            $userId = Auth::user()->id;
        }

        if ($request->donation == 'on') {
            $request->donation = 1;
        } elseif ($request->donation == 'off') {
            $request->donation = 0;
        }

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
        $cheqie->image = ($imagePath != null) ? encrypt($imagePath) : null;
        $cheqie->name = encrypt($request->title);
        $cheqie->donation = $request->donation;

        $cheqie->save();

        $payments = User_payment::all()
            ->where('request_id', $cheqie->id);

        $users_payers = array();
        foreach ($payments as $payment) {

            if ($payment->anonymous == 0) {
                $user = User::find($payment->user_id);

                $users_payers += [$user->id => $user];
            }

        }

        $bank_account = Bank_account::all()
            ->where('id', $cheqie->bank_id)
            ->first();

        $data = array(
            'userId' => $userId, 
            'cheqie' => $cheqie, 
            'payments' => $payments, 
            'bank_account' => $bank_account,
            'users_payers' => $users_payers
        );

        return view('cheqies/cheqiedetails')->with($data);
    }

    /**
     * This method will show the details of a selected cheqie
     *
     * @param int $cheqieId Cheqie Id
     * 
     * @return \Illuminate\Contracts\View\Factory|View
     */
    public function details($cheqieId)
    {
        $userId = null;
        if (Auth::check()) {
            $userId = Auth::user()->id;
        }

        $cheqie = Pay_request::find($cheqieId);
        $payments = User_payment::all()
            ->where('request_id', $cheqieId);

        $users_payers = array();
        foreach ($payments as $payment) {

            if ($payment->anonymous == 0) {
                $user = User::find($payment->user_id);

                $users_payers += [$user->id => $user];
            }

        }

        $bank_account = Bank_account::all()
            ->where('id', $cheqie->bank_id)
            ->first();

        $data = array(
            'userId' => $userId, 
            'cheqie' => $cheqie, 
            'payments' => $payments, 
            'bank_account' => $bank_account,
            'users_payers' => $users_payers
        );

        return view('cheqies/cheqiedetails')->with($data);

    }

    /**
     * Deletes a Cheqie
     * 
     * @param int $cheqieId Cheqie id
     * 
     * @return \Illuminate\Http\RedirectResponse
     */
    public function remove($cheqieId)
    {
        $userId = null;
        if (Auth::check()) {
            $userId = Auth::user()->id;
        }

        $payments = User_payment::all()->where('request_id', $cheqieId);

        if (count($payments) == 0) {
            $cheqie = Pay_request::find($cheqieId);

            if ($cheqie->user_id == $userId) {
                $cheqie->delete();
            }
        }

        // Return to overview
        return redirect()->action('CheqieController@overview');
    }

    /**
     * This method will return the groups where the signed in user is in
     *
     * @param int $cheqieId Cheqie id
     * 
     * @return \Illuminate\Contracts\View\Factory|View
     */
    public function coupleToGroup($cheqieId)
    {
        $userId = null;
        if (Auth::check()) {
            $userId = Auth::user()->id;

            $user = User::find($userId);

            $data = array('user' => $user, 'cheqieId' => $cheqieId);

            return view('cheqies/couplecheqie')->with($data);
        }
    }

    /**
     * This method will link a cheqie to a selected group
     *
     * @param int $id       Id
     * @param int $cheqieId Cheqie id
     * 
     * @return \Illuminate\Http\RedirectResponse
     */
    public function shareWithGroup($id, $cheqieId)
    {
        $group = Group::find($id);
        $cheqie = Cheqie::find($cheqieId);

        $group->link = $cheqie->link;

        $group->save();

        // Return to overview
        $lang = \Lang::getLocale();

        // Send email
        $url = url('/cheqie/' . $cheqieId . '/' . $cheqie->link . '');
        $toEmail = '033b29580b-ba41bd@inbox.mailtrap.io';
        Mail::to($toEmail)
            ->locale(LaravelLocalization::getLocale())
            ->send(new CheqieShareMail($url));

        if ($lang == "nl") {
            // Return to overview
            return redirect()
                ->action('CheqieController@overview')
                ->with(
                    'flash_message', 
                    'Cheqie link is succesvol gedeeld met de groep'
                );
        } else {
            return redirect()
                ->action('CheqieController@overview')
                ->with(
                    'flash_message', 
                    'Cheqie link is succesfully shared with the group'
                );
        }
    }

    /**
     * Share view for sharing by email to a single user
     *
     * @param int $cheqie_id Cheqie id
     *
     * @return \Illuminate\Contracts\View\Factory|View
     */
    public function share($cheqie_id)
    {
        $users = User::all();
        $cheqie = Pay_request::where('id', $cheqie_id)->first();

        $data = array(
            'cheqie' => $cheqie,
            'users' => $users
        );


        return view('cheqies.sharecheqie')->with($data);
    }

    /**
     * This function manages that the user gets an email to pay a Cheqie
     *
     * @param object $req       Gets a post and get request
     * @param id     $cheqie_id Cheqie id
     *
     * @return \Illuminate\Http\RedirectResponse
     */
    public function shareByEmail(Request $req, $cheqie_id)
    {
        $cheqie = Pay_request::where('id', $cheqie_id)->first();

        $url = url('/cheqie/' . $cheqie_id . '/' . $cheqie->link . '');
        $toEmail = '033b29580b-ba41bd@inbox.mailtrap.io';
        Mail::to($toEmail)
            ->locale(\Lang::getLocale())
            ->send(new CheqieShareMail($url));

        // Return to overview
        $lang = \Lang::getLocale();

        if ($lang == "nl") {
            // Return to overview
            return redirect()
                ->action('CheqieController@overview')
                ->with(
                    'flash_message', 
                    'Cheqie link is succesvol gedeeld met de gebruiker'
                );
        } else {
            return redirect()
                ->action('CheqieController@overview')
                ->with(
                    'flash_message', 
                    'Cheqie link is succesfully shared with the user'
                );
        }
    }
}
