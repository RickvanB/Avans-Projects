@extends('layout.basetemplate')

@section('content')

    <div class="card">
        @if($cheqie->image != null)
            <img class="card-img-top detail_img" src="{!! decrypt($cheqie->image) !!}" alt="{!! decrypt($cheqie->name) !!}">
        @endif
        <div class="card-body">
            <h5 class="card-title"> <span id="sub-header-details">@lang('messages.title'): </span> {!! decrypt($cheqie->name) !!}</h5>
            <p class="card-text"><span id="sub-header-details">@lang('messages.amount'): </span>{!! decrypt($cheqie->amount) !!} {!! $cheqie->currency !!}</p>
            @if($cheqie->summary != null)
                <p class="card-text"><span id="sub-header-details">@lang('messages.summary'): </span>{!! decrypt($cheqie->summary) !!}</p>
            @else
                <p class="card-text"><span id="sub-header-details">@lang('messages.summary'): </span></p>
            @endif
            <p class="card-text"><span id="sub-header-details">@lang('messages.created_at'): </span>{!! $cheqie->time !!}</p>
            <p class="card-text"><span id="sub-header-details">@lang('messages.currency'): </span>{!!$cheqie->currency!!}</p>
            <p class="card-text"><span id="sub-header-details">@lang('messages.connected_bank_account'): </span>{!! decrypt($bank_account->name) . " - " .  decrypt($bank_account->iban)!!}</p>
            <h4>@lang('messages.payers')</h4>
            <section class="col-md scrollable">
                <table class="table">
                    <thead>
                    @if(count($users_payers) != 0)
                        <tr>
                            <th scope="col">Naam</th>
                        </tr>
                    @endif
                    </thead>
                    <tbody>
                    <!-- Display each meal this user is not present -->
                    @foreach($users_payers as $user)
                        <tr>
                            <td class="max-description">{{ decrypt($user->name) }}</td>
                        </tr>
                    @endforeach
                    <!-- If no meals where found print a message -->
                    @if(count($users_payers) == 0)
                        <p>@lang('messages.no_payments')</p>
                    @endif
                    </tbody>
                </table>
            </section>

            <form method="POST" action="{{ LaravelLocalization::getLocalizedURL(LaravelLocalization::getCurrentLocale(), '/my-cheqie/cheqies/remove/' . $cheqie->id, array()) }}">

                <!-- Security token -->
                {{ csrf_field() }}

                @if(count($payments) == 0 && $cheqie->user_id == $userId)
                    <input type="submit"  class="btn btn-primary" value="@lang('messages.delete')">
                @else
                    <input type="submit"  class="btn btn-primary" disabled value="@lang('messages.delete')">
                @endif

                <!-- Back button -->
                <a class="btn btn-primary" href="{{ url(LaravelLocalization::getLocalizedURL(LaravelLocalization::getCurrentLocale(), '/my-cheqie/cheqies', array())) }}">@lang('messages.back')</a>
            </form>
        </div>
    </div>

@endsection