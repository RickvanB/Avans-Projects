@extends('layout.basetemplate')

@section('content')

    <div class="content-group">
        <div class="header-group">
            <h1>@lang('messages.my_groups')</h1>
        </div>

        <div class="error_messages">
            @if ($errors->any())
                <div class="alert alert-danger">
                    <ul>
                        @foreach ($errors->all() as $error)
                            <li>{{ $error }}</li>
                        @endforeach
                    </ul>
                </div>
            @endif
        </div>

    <!-- Get all groups of a user -->
        <div>
            @if(count($user->groups) == 0)
                <div class="no_results">
                    <h1>@lang('messages.no_results')</h1>
                    <img class="no_result_image" src="/images/no_results.png">
                    <p>@lang('messages.not_in_a_group')</p>
                </div>
            @else
                <table class="table">
                    <thead>
                    <tr>
                        <th scope="col" class="name_column">@lang('messages.group_name'):</th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                    </tr>
                    </thead>
                    <tbody>
                @for($i =0; $i < count($user->groups); $i++)
                    <tr>
                        <td>{!! decrypt($user->groups[$i]->name) !!}</td>
                        <td><a href="{{ LaravelLocalization::getLocalizedURL(LaravelLocalization::getCurrentLocale(), '/my-cheqie/group/details/' . $user->groups[$i]->id, array()) }}" ><button type="button" id="{!!$i!!}" class="btn details">@lang('messages.details')</button></a></td>
                            <td><a href="{{ LaravelLocalization::getLocalizedURL(LaravelLocalization::getCurrentLocale(), '/my-cheqie/group/leave/' . $user->groups[$i]->id, array()) }}" ><button type="button" id="{!!$i!!}" class="btn leave">@lang('messages.leave_group')</button></a></td>
                    </tr>
                @endfor
                    </tbody>
                </table>
            @endif
            <div>
                <!-- Submit form to create a new group -->
                <form class="new-group" method="POST" action="{{ LaravelLocalization::getLocalizedURL(LaravelLocalization::getCurrentLocale(), '/my-cheqie/group/create', array()) }}">

                    <!-- Security token -->
                    {{ csrf_field() }}

                    <label for="group_name">@lang('messages.group_name'):</label>
                    <input type="text" name="group_name" min="1" max="45">
                    <input type="submit" class="btn details" value="@lang('messages.save')">
                </form>
            </div>
        </div>

    </div>

@endsection
