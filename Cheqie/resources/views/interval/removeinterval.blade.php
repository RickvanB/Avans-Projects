@extends('layout.basetemplate')

@section('content')
    <div class="container">
        <div class="header-interval">
            <h1>@lang('messages.cheqie_remove_interval')</h1>
        </div>
        <form action="{{ LaravelLocalization::getLocalizedURL(LaravelLocalization::getCurrentLocale(), '/my-cheqie/interval/delete/confirmed', array()) }}" class="form-remove" method="POST">
            <!-- Security token -->
            {{ csrf_field() }}

            <div class="content-create">
                <div class="create-details">
                    <div class="form-group">
                        <h4>@lang('messages.cheqie_remove_interval_chose')</h4>
                        <select class="form-control" name="interval" required>
                            <!-- Print all possible currencies -->
                            @foreach($cheqies as $cheqie)
                                <option value="{!!$cheqie->id!!}">{!!decrypt($cheqie->name) . " - " . decrypt($cheqie->amount) . " " . $cheqie->currency . " - Interval: " . $interval_type[$cheqie->id]!!}</option>
                            @endforeach
                        </select>
                        <small id="emailHelp" class="form-text text-muted">@lang('messages.cheqie_remove_help')</small>
                    </div>
                </div>
                <div class="form-group">
                    <div class="create-buttons">
                        <a href="{{ LaravelLocalization::getLocalizedURL(LaravelLocalization::getCurrentLocale(), '/my-cheqie/interval', array()) }}"><button type="button" class="btn btn-primary">@lang('messages.back')</button></a>
                        <input type="submit"  value="@lang('messages.cheqie_remove')" class="btn btn-danger">
                    </div>
                </div>
            </div>
        </form>
    </div>
@endsection