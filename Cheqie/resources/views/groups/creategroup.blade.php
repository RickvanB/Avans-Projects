@extends('layout.basetemplate')

@section('content')

    <div class="create_content">
        <!-- Table of all users -->
        <table class="table">
            <thead>
            <tr>
                <th scope="col" class="name_column">@lang('messages.group_username'):</th>
                <th scope="col"></th>
            </tr>
            </thead>
            <tbody>
            <!-- Print all users on screen -->
            @for($i =0; $i < count($users); $i++)
                <tr>
                    <td>{!! decrypt($users[$i]->name) !!}</td>
                    <!-- Check if this user is the user who creates the group -->
                    @if($users[$i]->id != $userId)

                        <div id="text">
                            {{$found = false}}
                        </div>


                         <!-- Get all user of a group -->
                        @foreach($group->users as $userInGroup)
                            <!-- Check if user is already in this group -->
                            @if($userInGroup->id == $users[$i]->id)
                                <td><a href="{{ LaravelLocalization::getLocalizedURL(LaravelLocalization::getCurrentLocale(), '/my-cheqie/group/create/add_remove/' . $group->id . "/" . $userId. "/" . $users[$i]->id, array()) }}" ><button type="button" id="{!!$i!!}" class="btn leave">@lang('messages.delete')</button></a></td>
                                    <div id="text">
                                        {{$found = true}}
                                    </div>
                            @endif

                        @endforeach
                         <!-- If no match was found draw this button -->
                        @if($found == false)
                            <td><a href="{{ LaravelLocalization::getLocalizedURL(LaravelLocalization::getCurrentLocale(), '/my-cheqie/group/create/add_remove/' . $group->id . "/" . $userId . "/" . $users[$i]->id, array()) }}" ><button type="button" id="{!!$i!!}" class="btn details">@lang('messages.add')</button></a></td>
                        @endif
                    @endif
                </tr>
            @endfor
            </tbody>
        </table>
        <a href="{{ LaravelLocalization::getLocalizedURL(LaravelLocalization::getCurrentLocale(), '/my-cheqie/group/user', array()) }}" ><button type="button" class="btn details">@lang('messages.back')</button></a>
    </div>

@endsection