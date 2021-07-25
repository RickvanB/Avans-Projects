<?php

/**
 * Class PaymentController
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

use Illuminate\Http\Request;
use App\Model\Bank_account;
use App\Model\Cheqie;
use App\Model\Currency;
use App\Model\Group;
use App\Model\Pay_request;
use App\Model\User;
use App\Model\User_payment;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\View\View;
use Mollie\Laravel\Facades\Mollie;
use Cache;
use Carbon\Carbon;
use LaravelLocalization;

/**
 * PaymentController Class Doc Comment
 *
 * @category Class
 * @package  PaymentController
 * @author   Jip van Heugten <jheugten1@avans.nl>
 * @author   Rick van Beek <rtabeek@avans.nl>
 * @license  https://gnu.org/licenses/gpl-3.0.txt GNU/GPLv3
 * @link     https://www.github.com/rickvanb/Cheqie
 */
class PaymentController extends Controller
{
    /**
     * Shows the Cheqie page and possibility to pay
     *
     * @param int $cheqieId Cheqie id
     * @param int $uniqid   Unique id of a Cheqie
     *
     * @return \Illuminate\Http\RedirectResponse
     */
    public function detailAndPay($cheqieId, $uniqid)
    {
        $cheqie = Pay_request::where('link', $uniqid)
            ->first();
        $payments = User_payment::all()
            ->where('request_id', $cheqieId);
        $bank_account = Bank_account::all()
            ->where('id', $cheqie->bank_id)
            ->first();
        $user = User::find($cheqie->user_id);

        $data = array(
            'user' => $user,
            'cheqie' => $cheqie,
            'payments' => $payments,
            'bank_account' => $bank_account
        );

        return view('cheqies.detailandpay')->with($data);
    }

    /**
     * Creates a new Mollie payment.
     *
     * @param Request $request Get post and get request
     *
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Routing\Redirector
     */
    public function pay(Request $request)
    {
        // Convert dollars to euro's
        if ($request->currency == 'Dollar') {

            if (isset($request->donation_amount) 
                && $request->donation_amount != null
            ) {
                $request->amount = $request->donation_amount;
            }

            $request->amount = $this->_dollarToEuro($request->amount);
        }

        // Set API key, just in case
        Mollie::api()->setApiKey(env('MOLLIE_KEY'));

        // If donation, overwrite amount value for payment
        if (isset($request->donation_amount) && $request->donation_amount != null) {
            $encryptedDonation = encrypt($request->donation_amount);

            $cheqie = Pay_request::where('link', $request->link)
                ->first();
            $cheqie->donation_amount = $encryptedDonation;
            $cheqie->save();
        }

        $value = number_format((float)$request->amount, 2, '.', '');

        // Create payment
        $this->_payment = Mollie::api()->payments()->create(
            [
                'amount' => [
                    'currency' => 'EUR',
                    'value' => $value,
                ],
                'description' => ($request->summary != null) ? $request->summary : "Betaling/Payment",
                'webhookUrl' => 'https://www.google.nl/',
                'redirectUrl' => url('/cheqie/' . $request->link . '/payment/success'),
            ]
        );

        // Put payment Id in the cache,
        // for checking if it was succesful when redirected
        Cache::put(
            $request->link,
            $this->_payment->id,
            30
        );

        $this->_payment = Mollie::api()
            ->payments()
            ->get($this->_payment->id);

        // redirect customer to Mollie checkout page
        return redirect($this->_payment->getCheckoutUrl(), 303);
    }

    /**
     * Checks if payment was successful, if so, show it to the user.
     *
     * @param int $uniqid Unique id of a Cheqie
     *
     * @return \Illuminate\Contracts\View\Factory|View
     */
    public function paymentSuccess($uniqid)
    {
        // Get payment id from the cache
        $paymentId = Cache::pull($uniqid);
        $this->_payment = Mollie::api()->payments()->get($paymentId);

        // Check if payment was successful
        if ($this->_payment->isPaid()) {

            if (Auth::check()) {
                $userId = Auth::user()->id;


                $user = User::find($userId);

                $paymentRequest = Pay_request::where('link', $uniqid)->first();
                $user->paid_requests()->attach($paymentRequest);

                // Update bank saldo
                $this->_updateSaldoPayer($paymentRequest, $userId);
            } else {

                $paymentRequest = Pay_request::where('link', $uniqid)->first();
                $user = User::find($paymentRequest->user_id);

                $user->paid_requests()->attach($paymentRequest, ['anonymous' => 1]);

            }

            // Update bank saldo reciever
            $this->_updateSaldoReciever($paymentRequest);

            return view('cheqies.paymentSuccess')->with(array('success' => true));
        }

        return view('cheqies.paymentSuccess')->with(array('success' => false));
    }

    /**
     * This method will update the saldo of the payer of a Cheqie
     *
     * @param int $paymentRequest This is the payment request
     * @param int $userId         User id
     *
     * @return void 
     */
    private function _updateSaldoPayer($paymentRequest, $userId)
    {
        // Get bankaccount of payer
        $bankaccount_payer = Bank_account::where('default', 1)
            ->where('user_id', $userId)
            ->first();

        // If no bankaccount is selected as default pick the first option
        if ($bankaccount_payer == null) {
            $bankaccount_payer = Bank_account::where('user_id', $userId)->first();
        }

        // If no bank saldo set yet set it to default value
        if ($bankaccount_payer->saldo == null) {
            $bankaccount_payer->saldo = encrypt(0);
        }

        // check if it is an donation
        if (isset($paymentRequest->donation_amount) 
            && $paymentRequest->donation_amount != null
        ) {
            $amount = decrypt($paymentRequest->donation_amount);
        } else {
            $amount = decrypt($paymentRequest->amount);
        }

        // Convert dollars to euro's
        if ($paymentRequest->currency == 'Dollar') {

            $balance = $bankaccount_payer->saldo;

            $bankaccount_payer->saldo = encrypt(decrypt($balance) - $this->_dollarToEuro($amount));
        } else {

            // Change saldo and check if saldo is encrypted
            $balance = $bankaccount_payer->saldo;

            $bankaccount_payer->saldo = encrypt(decrypt($balance) - $amount);

        }

        // Save changes
        $bankaccount_payer->save();

    }

    /**
     * This method will update the bank saldo of the reciever of this payment
     *
     * @param object $paymentRequest Payment request
     *
     * @return void
     */
    private function _updateSaldoReciever($paymentRequest) 
    {
        // Update bank saldo of user
        $bankaccount = Bank_account::find($paymentRequest->bank_id);

        // Safety check
        if ($bankaccount != null) {

            // If no bank saldo set yet set it to default value
            if ($bankaccount->saldo == null) {
                $bankaccount->saldo = encrypt(0);
            }

            if (isset($paymentRequest->donation_amount) 
                && $paymentRequest->donation_amount != null
            ) {
                $amount = decrypt($paymentRequest->donation_amount);
            } else {
                $amount = decrypt($paymentRequest->amount);
            }

            // Convert dollars to euro's
            if ($paymentRequest->currency == 'Dollar') {

                $balance = $bankaccount->saldo;

                $bankaccount->saldo = encrypt(decrypt($balance) + $this->_dollarToEuro($amount));
            } else {

                $balance = $bankaccount->saldo;

                $bankaccount->saldo = encrypt(decrypt($balance) + $amount);
            }

            $bankaccount->save();
        }
    }

    /**
     * This method will transform dollar's to euro's
     *
     * @param int $amount Amount of money
     *
     * @return integer
     */
    private function _dollarToEuro($amount)
    {
        $url = 'https://forex.1forge.com/1.0.3/convert?from=USD&to=EUR&quantity='. $amount .'&api_key=tmKK1bFjocI01zsHC2oJRdo3pHScpQeF';
        $json = json_decode(file_get_contents($url), true);

        return $json['value'];
    }
}
