@extends('layout.basetemplate')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">@lang('messages.verify_email')</div>

                <div class="card-body">
                    @if (session('resent'))
                        <div class="alert alert-success" role="alert">
                            @lang('messages.verification_email_sent')
                        </div>
                    @endif

                    @lang('messages.check_email')
                    @lang('messages.not_receive_email'), <a href="{{ route('verification.resend') }}">@lang('messages.request_new_verification')</a>.
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
