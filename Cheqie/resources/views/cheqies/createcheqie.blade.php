@extends('layout.basetemplate')

@section('content')

    <div class="create_container">
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
        
        <form action="{{ LaravelLocalization::getLocalizedURL(LaravelLocalization::getCurrentLocale(), '/my-cheqie/cheqies/create/save', array()) }}" method="POST" enctype="multipart/form-data">
                <!-- Security token -->
                {{ csrf_field() }}

                <div class="content-create">
                    <div class="create-details">
                        <div class="form-group">
                            <h4>@lang('messages.cheqie_choose_amount')</h4>
                            <input class="form-control" placeholder="0,00" name="amount" id="amount" type="number" step="0.01" required>
                            <small id="emailHelp" class="form-text text-muted">@lang('messages.cheqie_amount_perperson')</small>
                        </div>
                        <div class="form-group">
                            <h4>@lang('messages.title')</h4>
                            <input class="form-control" placeholder="" name="title" id="title" type="text" required>
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
                            <small id="emailHelp" class="form-text text-muted">@lang('messages.cheqie_choose_bankaccount_details')</small>

                        </div>
                    </div>
                    <div class="form-group">
                        <h4>@lang('messages.cheqie_summary')</h4>
                        <textarea class="form-control" name="summary" id="exampleFormControlTextarea1" rows="3" type="text"></textarea>
                        <small id="emailHelp" class="form-text text-muted">@lang('messages.cheqie_summary_details')</small>
                    </div>
                    <div class="form-group">
                        <div class="donation">
                            <h4>@lang('messages.cheqie_donation')</h4>
                            <input name="donation" type="checkbox">
                        </div>
                    </div>
                    <div class="form-group">
                        <h4>@lang('messages.cheqie_image')</h4>
                        <input type="file" name="image">
                    </div>
                    <div class="form-group">
                        <div class="create-buttons">
                            <input type="submit"  value="@lang('messages.save')" class="btn btn-primary">
                        </div>
                    </div>
                </div>
        </form>
    </div>

@endsection