@extends('layout.basetemplate', ['userId' => $userId])

@section('content')
    <div class="row buttons">
        <div class="col-6"><a href="{{ LaravelLocalization::getLocalizedURL(LaravelLocalization::getCurrentLocale(), '/my-cheqie/cheqies', array()) }}"><button  type="button" class="btn btn-secondary btn-lg">@lang('messages.my_cheqies')</button></a>
        </div>
    </div>
    <div class="row  buttons">
        <div class="col-6"><a href="{{ LaravelLocalization::getLocalizedURL(LaravelLocalization::getCurrentLocale(), 'my-cheqie/cheqies/create/new', array()) }}"><button type="button" class="btn btn-primary btn-lg">@lang('messages.create_cheqie')</button></a>
        </div>
    </div>
@endsection