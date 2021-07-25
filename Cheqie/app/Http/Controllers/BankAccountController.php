<?php

/**
 * Class BankAccountController
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

use App\Http\Controllers\Controller;
use App\Model\Bank_account;
use App\Model\Interval;
use App\Model\Pay_request;
use App\Model\User_payment;
use BankAccount;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

/**
 * BankAccountController Class Doc Comment
 *
 * @category Class
 * @package  BankAccountController
 * @author   Jip van Heugten <jheugten1@avans.nl>
 * @author   Rick van Beek <rtabeek@avans.nl>
 * @license  https://gnu.org/licenses/gpl-3.0.txt GNU/GPLv3
 * @link     https://www.github.com/rickvanb/Cheqie
 */
class BankAccountController extends Controller
{

    /**
     * Return a list with all bankaccounts of a user
     *
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function getAccounts()
    {
        $userId = null;
        if (Auth::check()) {
            $userId = Auth::user()->id;

            $accounts     = Bank_account::all()->where('user_id', $userId);
            $errorMessage = false;

            $data = array(
                'userId'       => $userId,
                'bankaccounts' => $accounts,
                'uniqueIban'   => $errorMessage,
            );

            return view('bankaccounts/bankaccount_overview')->with($data);
        }
    }

    /**
     * Create a new bankaccount for the signed-in user
     *
     * @param Request $req Get post and get request
     * 
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\Http\RedirectResponse|\Illuminate\View\View
     */
    public function saveNewBankAccount(Request $req)
    {

        // Validate request before saving
        $req->validate(
            [
                'iban'         => 'required|max:45',
                'account_name' => 'required|max:45',
            ]
        );

        // Check if IBAN is unique
        $ibanCheck = Bank_account::all()->where('iban', encrypt($req->iban));

        // If there are no results go on. Otherwise return error
        if ($ibanCheck->isEmpty()) {
            $userId = null;
            if (Auth::check()) {
                $userId = Auth::user()->id;

                // Save bankaccount
                $bankAccount = new Bank_account;

                $bankAccount->name    = encrypt($req->account_name);
                $bankAccount->user_id = $userId;
                $bankAccount->iban    = encrypt($req->iban);

                $bankAccount->save();

                // Return to overview
                return redirect()->action('BankAccountController@getAccounts');
            }
        } else {
            $userId = null;
            if (Auth::check()) {
                $userId = Auth::user()->id;

                $accounts     = Bank_account::all()->where('user_id', $userId);
                $errorMessage = true;

                $data = array(
                    'userId'       => $userId,
                    'bankaccounts' => $accounts,
                    'uniqueIban'   => $errorMessage,
                );

                return view('bankaccounts/bankaccount_overview')->with($data);
            }
        }
    }

    /**
     * This method will remove a bank_account if it is propperty of the user
     *
     * @param int $id Bankaccount id
     * 
     * @return \Illuminate\Http\RedirectResponse
     */
    public function removeBankAccount($id)
    {
        $userId = null;
        if (Auth::check()) {
            $userId = Auth::user()->id;

            // Find bankaccount to remove
            $bankAccount = Bank_account::find($id);

            if ($bankAccount->user_id == $userId) {

                // Get all pay_requests
                $pay_requests = Pay_request::all()->where('bank_id', $id);

                foreach ($pay_requests as $pay_request) {

                    // Get all payments and remove them
                    $payments  = User_payment::all()
                        ->where('request_id', $pay_request->id);
                    $intervals = Interval::all()
                        ->where('pay_request', $pay_request->id);

                    if ($intervals != null) {
                        foreach ($intervals as $interval) {
                            $interval->delete();
                        }
                    }

                    foreach ($payments as $payment) {
                        $payment->delete();
                    }

                    $pay_request->delete();
                }

                $bankAccount->delete();

                // Return to overview
                return redirect()->action('BankAccountController@getAccounts');
            } else {
                // Return home -> User is trying to break the system :(
                return redirect()->action('HomeController@index');
            }
        }
    }
}
