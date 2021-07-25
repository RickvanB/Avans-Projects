<?php

/**
 * Class HomeController
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
use Illuminate\Http\Request;

/**
 * HomeController Class Doc Comment
 *
 * @category Class
 * @package  HomeController
 * @author   Jip van Heugten <jheugten1@avans.nl>
 * @author   Rick van Beek <rtabeek@avans.nl>
 * @license  https://gnu.org/licenses/gpl-3.0.txt GNU/GPLv3
 * @link     https://www.github.com/rickvanb/Cheqie
 */
class HomeController extends Controller
{
    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        $userId = null;
        if (Auth::check()) {
            $userId = Auth::user()->id;
        }

        return view('index')->with(['userId' => $userId]);
    }
}
