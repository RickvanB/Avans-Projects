@extends('layout.basetemplate')

@section('content')


@if($success)
	<div class="col-xs-6 col-xs-offset-6 pt-4">
        <div class="alert alert-success" role="alert">
            @lang('messages.payment_success') <a href="{{ LaravelLocalization::getLocalizedURL(LaravelLocalization::getCurrentLocale(), 'my-cheqie/cheqies', array()) }}">@lang('messages.go_back')</a>
        </div>
    </div>
@else 
	<div class="col-xs-6 col-xs-offset-6 pt-4">
		<div class="alert alert-danger" role="alert">
			@lang('messages.payment_failed') <a href="{{ LaravelLocalization::getLocalizedURL(LaravelLocalization::getCurrentLocale(), 'my-cheqie/cheqies', array()) }}">@lang('messages.go_back_failed')</a>
		</div>
	</div>
@endif
@endsection