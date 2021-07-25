<?php

/**
 * Class SettingsController
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
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Auth;

/**
 * SettingsController Class Doc Comment
 *
 * @category Class
 * @package  SettingsController
 * @author   Jip van Heugten <jheugten1@avans.nl>
 * @author   Rick van Beek <rtabeek@avans.nl>
 * @license  https://gnu.org/licenses/gpl-3.0.txt GNU/GPLv3
 * @link     https://www.github.com/rickvanb/Cheqie
 */
class SettingsController extends Controller
{
    /**
     * Creates a new controller instance
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show settings index page
     * 
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function index()
    {
        $userId = Auth::user()->id;

        $bankAccount = Bank_account::all()->where('user_id', $userId);

        $data = array(
            'bank_acounts' => $bankAccount
        );

        return view('settings.index')->with($data);
    }

    /**
     * Sets default bank account for a user
     * 
     * @param Request $request Gets post and get requests
     *
     * @return \Illuminate\Http\RedirectResponse
     */
    public function setDefault(Request $request)
    {
        $userId = Auth::user()->id;

        $bankAccount = Bank_account::all()->where('user_id', $userId);

        foreach ($bankAccount as $bank) {

            if ($request->selectedDefault == $bank->id) {
                $bank->default = 1;
            } else {
                $bank->default = 0;
            }

            $bank->save();
        }

        return redirect()
            ->back()
            ->with('success', 'Default: ' . decrypt($bank->iban));
    }
}
