@extends('layout.basetemplate')

@section('content')
    <div class="container">
        <div class="header-interval">
            <h1>@lang('messages.cheqie_planned_payment'):</h1>
            <div class="buttons-interval">
                <a href="{{ LaravelLocalization::getLocalizedURL(LaravelLocalization::getCurrentLocale(), '/my-cheqie/interval/create', array()) }}"><button type="button" class="btn btn-primary">@lang('messages.plan_payment')</button></a>
                <a href="{{ LaravelLocalization::getLocalizedURL(LaravelLocalization::getCurrentLocale(), '/my-cheqie/interval/delete', array()) }}"><button type="button" class="btn btn-danger margin-interval">@lang('messages.delete_payment')</button></a>
            </div>
        </div>
        <div class="messages">
            @if (Session::has('flash_message'))
                <div class="alert alert-success">{{ Session::get('flash_message') }}</div>
            @endif
        </div>
        <div class="calendar" id="calendar">
            {!! $calendar->calendar() !!}
            {!! $calendar->script() !!}
        </div>
    </div>
@endsection