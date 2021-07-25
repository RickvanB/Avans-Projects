@extends('layout.basetemplate')

@section('content')

    <div class="card">
        @if($cheqie->image != null)
            <img class="card-img-top detail_img" src="{!! decrypt($cheqie->image) !!}" alt="{!! decrypt($cheqie->name) !!}">
        @endif
        <div class="card-body">
            <h5 class="card-title"> <span id="sub-header-details">@lang('messages.title'): </span> {!!  decrypt($cheqie->name) !!}</h5>
            <p class="card-text"><span id="sub-header-details">@lang('messages.created_by'): </span>{!!  decrypt($user->name) !!}</p>
            <p class="card-text"><span id="sub-header-details">@lang('messages.amount'): </span>{!!  decrypt($cheqie->amount) !!} {!! $cheqie->currency !!}</p>

            @if($cheqie->summary != null)
                <p class="card-text"><span id="sub-header-details">@lang('messages.summary'): </span>{!! decrypt($cheqie->summary) !!}</p>
            @else
                <p class="card-text"><span id="sub-header-details">@lang('messages.summary'): </span></p>
            @endif

            <p class="card-text"><span id="sub-header-details">@lang('messages.created_at'): </span>{!!$cheqie->time!!}</p>
            <p class="card-text"><span id="sub-header-details">@lang('messages.currency'): </span>{!!$cheqie->currency!!}</p>
            <p class="card-text"><span id="sub-header-details">@lang('messages.connected_bank_account'): </span>{!! decrypt($bank_account->name) . " - " .  decrypt($bank_account->iban)!!}</p>
            <form method="POST" action="/pay/{!! $cheqie->id !!}/{!! $cheqie->link !!}">

                <!-- Security token -->
                {{ csrf_field() }}
                <!-- Donate fields -->
                @if($cheqie->donation)
                    <label id="sub-header-details">@lang('messages.cheqie_donation'): </label>
                    <input type="number" name="donation_amount" id="donation_amount">
                @endif

                <!-- Hidden fields -->
                @if(!$cheqie->donation)
                    <input type="hidden" name="amount" value="{!!  decrypt($cheqie->amount) !!}">
                @endif
                <input type="hidden" name="title" value="{!!  decrypt($cheqie->name) !!}">
                <input type="hidden" name="summary" value="{!!  decrypt($cheqie->summary) !!}">
                <input type="hidden" name="link" value="{!! $cheqie->link !!}">
                <input type="hidden" name="currency" value="{!! $cheqie->currency !!}">

                <input type="submit"  class="btn btn-primary" value="@lang('messages.pay_cheqie')">
            </form>
        </div>
    </div>

@endsection