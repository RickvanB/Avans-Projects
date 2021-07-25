@extends('layout.basetemplate')

@section('content')
<div class="messages">
    @if (Session::has('success'))
        <div class="alert alert-success">{{ Session::get('success') }}</div>
    @endif


    @if(Session::has('error'))
        <div class="alert alert-danger">{{ Session::get('error') }}</div>
    @endif
</div>
<div class="content-group">
    <div class="header-group">
        <h1>@lang('messages.settings_nav')</h1>
    </div>

    <div>
        <form method="POST" action="{{ LaravelLocalization::getLocalizedURL(LaravelLocalization::getCurrentLocale(), '/my-cheqie/settings/updatedefault', array()) }}">

            <!-- Security token -->
            {{ csrf_field() }}

            <div class="form-group">

                <h4>@lang('messages.bank_default')</h4>
                <select class="form-control" name="selectedDefault" required>
                    <!-- Print all possible currencies -->
                    @foreach($bank_acounts as $bankAcount)
                        @if($bankAcount->default != 1)
                            <option value="{!! $bankAcount->id !!}"> {!!  decrypt($bankAcount->name) . " - " .  decrypt($bankAcount->iban) !!}</option>
                        @else
                            <option selected="selected" value="{!! $bankAcount->id !!}"> {!!  decrypt($bankAcount->name) . " - " .  decrypt($bankAcount->iban) !!}</option>
                        @endif
                    @endforeach
                </select>
                <small id="emailHelp" class="form-text text-muted">@lang('messages.cheqie_choose_bankaccount_details')</small>
            </div>
            <input type="submit" value="@lang('messages.save')" class="btn btn-primary">
        </form>
    	<h4>@lang('messages.export_data')</h4>
    	<a class="btn btn-primary" href="{{ url('/data') }}">@lang('messages.export_personal_data')</a>
    	<h4>@lang('messages.set_language')</h4>
    	@foreach(LaravelLocalization::getSupportedLocales() as $localeCode => $properties)
            <a class="btn btn-primary" href="{{ LaravelLocalization::getLocalizedURL($localeCode, null, [], true) }}">
                {{ $properties['native'] }}
            </a>
        @endforeach
    </div>
</div>

@endsection

