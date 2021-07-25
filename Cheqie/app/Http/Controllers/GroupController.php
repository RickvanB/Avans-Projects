<?php

/**
 * Class GroupController
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

use App\Model\Cheqie;
use App\Model\Group;
use App\Model\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

/**
 * GroupController Class Doc Comment
 *
 * @category Class
 * @package  GroupController
 * @author   Jip van Heugten <jheugten1@avans.nl>
 * @author   Rick van Beek <rtabeek@avans.nl>
 * @license  https://gnu.org/licenses/gpl-3.0.txt GNU/GPLv3
 * @link     https://www.github.com/rickvanb/Cheqie
 */
class GroupController extends Controller
{
    /**
     * Show all groups of a user
     * 
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function getGroups()
    {
        $userId = null;
        if (Auth::check()) {
            $userId = Auth::user()->id;
        }

        $user = User::find($userId);

        return view('groups/groupoverview', ['user' => $user]);
    }

    /**
     * Leave a group a user is in
     *
     * @param int $groupId Group id
     * 
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function leaveGroup($groupId)
    {
        $userId = null;
        if (Auth::check()) {
            $userId = Auth::user()->id;
        }

        $user = User::find($userId);
        $user->groups()->detach($groupId);

        return view('groups/groupoverview', ['user' => $user]);
    }

    /**
     * Show details of a selected group
     *
     * @param int $groupId Group id
     * 
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function showDetails($groupId)
    {
        $userId = null;
        if (Auth::check()) {
            $userId = Auth::user()->id;

            $group = Group::find($groupId);

            $lastCheqie = null;
            if ($group->link != null) {
                $lastCheqie = Cheqie::where('link', $group->link)->first();
            }

            $data = [
                'userId'  => $userId,
                'cheqie'   => $lastCheqie,
                'group' => $group
            ];


            return view('groups/groupdetails')->with($data);
        }
    }

    /**
     * This function will lead to the create page
     *
     * @param Request $req Get post and get requests
     * 
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function createGroup(Request $req)
    {

        // Validate request before saving
        $req->validate(
            [
            'group_name' => 'required|max:45',
            ]
        );

        $userId = null;
        if (Auth::check()) {
            $userId = Auth::user()->id;
        }

        $users = User::all();
        $creator = User::find($userId);

        $group = new Group();
        $group->name = encrypt($req->group_name);

        $group->save();

        // Attach creator to the group
        $group->users()->attach($creator);

        $data = [
            'users'  => $users,
            'userId'   => $userId,
            'group' => $group
        ];


        return view('groups/creategroup')->with($data);
    }


    /**
     * This method will add or remove a user from a group
     * 
     * @param int $groupId Group Id
     * @param int $ownerId Owner Id of the group
     * @param int $userId  User id
     * 
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function addOrRemove($groupId, $ownerId, $userId)
    {
        $group = Group::find($groupId);
        $user = User::find($userId);

        if ($group->users->contains($user->id)) {
            $group->users()->detach($user);
        } else {
            $group->users()->attach($user);
        }

        $users = User::all();
        $group = Group::find($groupId);

        $data = [
            'users'  => $users,
            'userId'   => $ownerId,
            'group' => $group
        ];


        return view('groups/creategroup')->with($data);
    }

    /**
     * Change the name of the group
     *
     * @param int     $groupId Group id
     * @param Request $req     Illuminate/Request
     *
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function changeGroupName($groupId, Request $req)
    {
        $userId = null;
        if (Auth::check()) {
            $userId = Auth::user()->id;
        }

        $group = Group::find($groupId);

        // If exists change name
        if ($group != null) {
            $group->name = encrypt($req->group_name);

            $group->save();
        }

        $lastCheqie = null;
        if ($group->link != null) {
            $lastCheqie = Cheqie::where('link', $group->link)->first();
        }

        $data = [
            'userId'  => $userId,
            'cheqie'   => $lastCheqie,
            'group' => $group
        ];

        return view('groups/groupdetails')->with($data);
    }
}
