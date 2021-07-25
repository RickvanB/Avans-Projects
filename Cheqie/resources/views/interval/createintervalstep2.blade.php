@extends('layout.basetemplate')

@section('content')
    <div class="content-interval">
        <div class="header-interval">
            <h1>@lang('messages.cheqie_payment_2')</h1>
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
        <form onsubmit="return check_input()" action="{{ LaravelLocalization::getLocalizedURL(LaravelLocalization::getCurrentLocale(), '/my-cheqie/interval/create/set-interval', array()) }}" name="interval-form" method="POST">
            <!-- Security token -->
            <input type="hidden" name="_token" value="{{ csrf_token() }}">

            <!-- Cheqie id to save the payment -->
            <input type="hidden" name="cheqie_id" value="{!! $cheqie_id !!}">

            <div class="content-create">
                <div class="form-group">
                    <h4>@lang('messages.cheqie_iban_reciever')</h4>
                    <input class="form-control" placeholder="INGB 00 0000 0000" name="iban-reciever" id="iban-reciever" type="text" required>
                    <small id="emailHelp" class="form-text text-muted">@lang('messages.cheqie_iban_reciever_help')</small>
                </div>
                <div class="create-details">
                    <div class="form-group">
                        <h4> @lang('messages.cheqie_interval_payment_check')</h4>
                        <input name="interval" class="interval-payment" id="interval-payment-check" onclick="activate()" value="on" type="checkbox">
                    </div>
                    <div class="form-group" id="no-interval">
                        <h4>@lang('messages.cheqie_interval_payment_execute')</h4>
                        <input class="form-control" placeholder="dd-mm-jjjj" value="{{date('Y-m-d')}}" name="date" id="date" type="date">
                        <small id="emailHelp" class="form-text text-muted">@lang('messages.cheqie_interval_payment_execute_help')</small>
                    </div>
                    <div id="interval-border">
                        <div class="form-group">
                            <h4>@lang('messages.cheqie_interval_payment_chose')</h4>
                            <select class="form-control disabled-if" id="interval-payment-dropdown" name="interval_type" required>
                                <!-- Print all possible currencies -->
                                @foreach($interval as $interval_object)
                                    <option value="{!!$interval_object->id!!}">
                                        {!! $interval_object->name !!}</option>
                                @endforeach
                            </select>
                            <small id="emailHelp" class="form-text text-muted">@lang('messages.cheqie_interval_payment_chose_help')</small>
                        </div>
                        <div class="form-group">
                            <h4>@lang('messages.cheqie_interval_payment_execute_amount')</h4>
                            <input class="form-control disabled-if" placeholder="5" name="amount_interval" id="amount_interval" type="number">
                            <small id="emailHelp" class="form-text text-muted">@lang('messages.cheqie_interval_payment_execute_amount_help')</small>
                        </div>
                        <div class="form-group">
                            <h4>@lang('messages.cheqie_interval_payment_start')</h4>
                            <input class="form-control disabled-if" placeholder="dd-mm-jjjj" value="{{date('Y-m-d')}}" name="start_date" id="start_date" type="date">
                            <small id="emailHelp" class="form-text text-muted">@lang('messages.cheqie_interval_payment_start_help')</small>
                        </div>
                    </div>
                    <!-- Save interval payment -->
                    <div class="form-group">
                        <div class="create-buttons">
                            <a href="{{ LaravelLocalization::getLocalizedURL(LaravelLocalization::getCurrentLocale(), '/my-cheqie/interval', array()) }}"><button type="button" class="btn btn-primary">@lang('messages.back')</button></a>
                            <input type="submit"  value="@lang('messages.create_payment')" class="btn btn-primary">
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
    <script src="{{ asset('js/interval.js') }}"></script>
@endsection