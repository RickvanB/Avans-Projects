<?php

/**
 * Class DataExportController
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

use Auth;
use Response;
use App\Model\User;
use App\Model\Pay_request;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;

/**
 * DataExportController Class Doc Comment
 *
 * @category Class
 * @package  DataExportController
 * @author   Jip van Heugten <jheugten1@avans.nl>
 * @author   Rick van Beek <rtabeek@avans.nl>
 * @license  https://gnu.org/licenses/gpl-3.0.txt GNU/GPLv3
 * @link     https://www.github.com/rickvanb/Cheqie
 */
class DataExportController extends Controller
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
     * Creates a data export for a single user
     * 
     * @return Illuminate/Response
     */
    public function getDataAndConvert()
    {
        if (Auth::check()) {
            $user = Auth::user();
            $payRequests = Pay_request::all()->where('user_id', $user->id);

            // Gather data
            foreach ($user->bank_accounts as $value) {
                $data = [
                    ['name', 'email', 'bank_accounts'],
                    [decrypt($user->name), $user->email, decrypt($value->iban)],
                ];
            }

            $payData = array();
            $values = array();
            foreach ($payRequests as $payRequest) {

                // Check if value can be decrypted
                if ($payRequest->summary == null) {
                    $summary = "";
                } else {
                    $summary = decrypt($payRequest->summary);
                }

                // Check if value can be decrypted
                if ($payRequest->donation_amount == null) {
                    $donation = "";
                } else {
                    $donation = decrypt($payRequest->donation_amount);
                }

                $values[] = [
                    decrypt($payRequest->name), $payRequest->currency,
                    $summary, $payRequest->time,
                    decrypt($payRequest->amount), $donation
                ];

                $payData = [
                    [
                        'name', 
                        'currency', 
                        'summary', 
                        'creation', 
                        'amount', 
                        'donation amount'
                    ],
                    $values
                ];
            }

            // Setup location and name file
            $storagePath  = Storage::disk('local')
                ->getDriver()
                ->getAdapter()
                ->getPathPrefix();
            $name = 'export-' . uniqid() . '.csv';
            $pathToGenerate = $storagePath . 'csv/' . $name;

            // Generate CSV file
            $header = null;
            $createFile = fopen($pathToGenerate, "w+");
            foreach ($data as $row) {
                if (!$header) {
                    fputcsv($createFile, $row);
                    $header = true;
                } else {
                    fputcsv($createFile, $row);
                }
            }

            $header = null;
            foreach ($payData as $row) {

                if (!$header) {
                    fputcsv($createFile, $row);
                    $header = true;
                } else {
                    foreach ($row as $payment) {
                        fputcsv($createFile, $payment);
                    }
                }
            }

            fclose($createFile);

            // Copy file to dropbox
            Storage::disk('dropbox')->put($name, Storage::get('csv/' . $name));

            // Generate download
            return response()->download($pathToGenerate);
        }

        return;
    }
}
