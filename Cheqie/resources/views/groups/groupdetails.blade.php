@extends('layout.basetemplate')

@section('content')
    <div class="header_group_details">
        <h1>@lang('messages.group'): {!! decrypt($group->name)!!}</h1>
        <hr class="header-border">
    </div>
    <div class="group-actions">
        @if($cheqie == null)
            <p>@lang('messages.group_no_shared_cheqies')</p>
        @else
            <p>@lang('messages.last_shared'): {!! decrypt($cheqie-> name) !!}</p>
            <a href="{{ url('/cheqie/' . $cheqie->id . '/' . $cheqie->link) }}" ><button type="button" class="btn details">@lang('messages.pay_cheqie')</button></a>
        @endif
    </div>

    <div class="attached_users">
        <table class="table">
            <thead>
            <tr>
                <th scope="col" class="name_column">@lang('messages.users_in_group'):</th>
            </tr>
            </thead>
            <tbody>
            <!-- Print each user of the group -->
                @foreach($group->users as $user)
                    <tr>
                        <td>{!!  decrypt($user->name) !!}</td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    </div>
    <div class="redirect_buttons">
        <a href="{{ LaravelLocalization::getLocalizedURL(LaravelLocalization::getCurrentLocale(), '/my-cheqie/group/user', array()) }}" ><button type="button" class="btn details">@lang('messages.back')</button></a>
        <a href="{{ LaravelLocalization::getLocalizedURL(LaravelLocalization::getCurrentLocale(), '/my-cheqie/group/leave/' . $group->id, array()) }}" ><button type="button" class="btn leave">@lang('messages.leave_group')</button></a>
        <div class="change_name">
            <!-- Submit form to change name of a group -->
            <form class="new-group" method="POST" action="{{ LaravelLocalization::getLocalizedURL(LaravelLocalization::getCurrentLocale(), '/my-cheqie/group/change_name/' . $group->id, array()) }}">

                <!-- Security token -->
                {{ csrf_field() }}

                <label for="group_name">@lang('messages.group_name'):</label>
                <input type="text" name="group_name" min="1" max="45">
                <input type="submit" class="btn details" value="@lang('messages.change_name')">
            </form>
        </div>

    </div>

@endsection