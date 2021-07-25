@extends('layout.basetemplate')

@section('content')
    <div class="content-group">
        <div class="header-group">
            <h1>@lang('messages.my_groups')</h1>
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
                    </tr>
                    </thead>
                    <tbody>
                    @for($i =0; $i < count($user->groups); $i++)
                        <tr>
                            <td>{!! decrypt($user->groups[$i]->name) !!}</td>
                            <td><a href="{{ LaravelLocalization::getLocalizedURL(LaravelLocalization::getCurrentLocale(), '/my-cheqie/cheqies/couple/group/' . $user->groups[$i]->id) . '/' . $cheqieId, true }}" ><button type="button" id="{!!$i!!}" class="btn details">@lang('messages.share_cheqie')</button></a></td>
                        </tr>
                    @endfor
                    </tbody>
                </table>
            @endif
    </div>

@endsection