@extends('layout.basetemplate')

@section('content')

    <div class="content-group">
        <div class="header-group">
            <h1>@lang('messages.bank_accounts')</h1>
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
            @if($uniqueIban === true)
                    <div class="alert alert-danger">
                        <ul>
                            <li>@lang('messages.iban_in_use')</li>
                        </ul>
                    </div>
                @endif
        </div>

        <!-- Get all groups of a user -->
        <div>
            @if(count($bankaccounts) == 0 || $bankaccounts == null )
                <div class="no_results">
                    <h1>@lang('messages.no_results')</h1>
                    <img class="no_result_image" src="/images/no_results.png">
                    <p>@lang('messages.no_bank_account')</p>
                </div>
            @else
                <table class="table">
                    <thead>
                    <tr>
                        <th scope="col" class="name_column">@lang('messages.bank_account'):</th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                    </tr>
                    </thead>
                    <tbody>
                    @foreach($bankaccounts as $bankaccount)
                        <tr>
                            <td>{!! decrypt($bankaccount->name) !!}</td>
                            <td>{!! decrypt($bankaccount->iban) !!}</td>
                            @if($bankaccount->saldo != null)
                                <td>{!! round(decrypt($bankaccount->saldo), 2) !!}
                            @else
                                <td>Geen Saldo </td>
                            @endif

                            <td><a href="{{ LaravelLocalization::getLocalizedURL(LaravelLocalization::getCurrentLocale(), '/my-cheqie/bank-accounts/remove/' . $bankaccount->id, array()) }}" ><button type="button" class="btn leave">@lang('messages.delete')</button></a></td>
                        </tr>
                    @endforeach
                    </tbody>
                </table>
            @endif
            <div>
                <!-- Submit form to create a new group -->
                <form class="new-bankAccount" method="POST" action="{{ LaravelLocalization::getLocalizedURL(LaravelLocalization::getCurrentLocale(), '/my-cheqie/bank-account/add/new', array()) }}">

                    <!-- Security token -->
                    {{ csrf_field() }}

                    <label for="account_name">@lang('messages.bank_account_name')</label>
                    <input type="text" name="account_name" required>

                    <label for="iban">IBAN:</label>
                    <input type="text" name="iban" required>

                    <input type="submit" class="btn details" value="@lang('messages.new_bank_account')">
                </form>
            </div>
        </div>

    </div>

@endsection
