@extends('layout.basetemplate')

@section('content')
    <div class="content-interval">
        <div class="header-interval">
            <h1>@lang('messages.new_plan_payment')</h1>
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
        <form action="{{ LaravelLocalization::getLocalizedURL(LaravelLocalization::getCurrentLocale(), '/my-cheqie/interval/create/save', array()) }}" method="POST">
            <!-- Security token -->
            {{ csrf_field() }}

            <div class="content-create">
                <div class="create-details">
                    <div class="form-group">
                        <h4>@lang('messages.cheqie_choose_amount')</h4>
                        <input class="form-control" placeholder="0,00" name="amount" id="amount" type="number" step="0.01" required>
                        <small id="emailHelp" class="form-text text-muted">@lang('messages.payment_payout')</small>
                    </div>
                    <div class="form-group">
                        <h4>@lang('messages.title')</h4>
                        <input class="form-control" name="title" id="title" type="text" required>
                        <small id="emailHelp" class="form-text text-muted">@lang('messages.cheqie_title_details')</small>
                    </div>
                    <div class="form-group">
                        <h4>@lang('messages.cheqie_choose_currency')</h4>
                        <select class="form-control" name="currency" required>
                            <!-- Print all possible currencies -->
                            @foreach($currency as $currencyObject)
                                <option value="{!!$currencyObject->name!!}">{!!$currencyObject->name!!}</option>
                            @endforeach
                        </select>
                        <small id="emailHelp" class="form-text text-muted">@lang('messages.cheqie_currency_details')</small>
                    </div>
                    <div class="form-group">
                        <h4>@lang('messages.cheqie_choose_bankaccount')</h4>
                        <select class="form-control" name="bank_acount" required>
                            <!-- Print all possible currencies -->
                            @foreach($bank_acounts as $bankAcount)
                                <option value="{!!$bankAcount->iban!!}">{!!  decrypt($bankAcount->name) . " - " .  decrypt($bankAcount->iban) !!}</option>
                            @endforeach
                        </select>
                        <small id="emailHelp" class="form-text text-muted">@lang('messages.bank_account_money_left')</small>

                    </div>
                </div>
                <div class="form-group">
                    <h4>@lang('messages.summary')</h4>
                    <textarea class="form-control" name="summary" rows="3" type="text"></textarea>
                    <small id="emailHelp" class="form-text text-muted">@lang('messages.cheqie_summary_details')</small>
                </div>
                <div class="form-group">
                    <div class="create-buttons">
                        <a href="{{ LaravelLocalization::getLocalizedURL(LaravelLocalization::getCurrentLocale(), '/my-cheqie/interval', array()) }}"><button type="button" class="btn btn-primary">@lang('messages.back')</button></a>
                        <input type="submit"  value="@lang('messages.next_step')" class="btn btn-primary">
                    </div>
                </div>
            </div>
        </form>
    </div>
@endsection