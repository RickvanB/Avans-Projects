@extends('layout.basetemplate')

@section('content')

    <div class="cheqie-container extra-margin ">

        @if (Session::has('flash_message'))
            <div class="alert alert-success alert-dismissible">{!! Session::get('flash_message') !!}</div>
        @endif

        <div class="my-cheqies-title">
            <p>@lang('messages.my_cheqies')</p>
        </div>
        <div class="my-cheqies-list">
        @foreach($cheqies as $cheqie)
                <!-- Cheqie block -->
                <div class="my-cheqies-cheqie">
                    <!-- Information about the cheqie LEFT -->
                    <div class="my-cheqies-details_left">
                        <div class="my-cheqies-name">
                            <h4>@lang('messages.name'):</h4>
                            <p>{!! decrypt($cheqie->name) !!}</p>
                        </div>
                        <div class="my-cheqies-paid_by">
                            <!-- Number of people who has paid the Cheqie -->
                            <h4>@lang('messages.paid_by'): </h4>
                            <!-- If there is more then one person who paid show the plural -->
                            @if(count($payments[$cheqie->id]) > 1)
                                <p>{!!count($payments[$cheqie->id])!!} @lang('messages.persons')</p>
                            @else
                                <p>{!!count($payments[$cheqie->id])!!} @lang('messages.person')</p>
                            @endif
                        </div>
                        <div class="my-cheqies-show_details">
                            <a href="{!! url('/my-cheqie/cheqies/details/' . $cheqie->id) !!}}"><p>@lang('messages.cheqie_details')</p></a>
                        </div>
                    </div>

                    <!-- Amount to pay RIGHT -->
                    <div class="my-cheqies-details_right">
                        <div class="my-cheqies-amount">
                            @if($cheqie->donation_amount != null)
                                <h2>{!! decrypt($cheqie->donation_amount) !!}</h2>
                            @elseif(strpos( decrypt($cheqie->amount), '.') !== false || strpos( decrypt($cheqie->amount), ',') !== false)
                                <h2>{!! decrypt($cheqie->amount) !!}</h2>
                            @else
                                @if (LaravelLocalization::getCurrentLocale() == 'nl')
                                    <h2>{!! decrypt($cheqie->amount) !!},00</h2>
                                @else
                                    <h2><h2>{!! decrypt($cheqie->amount) !!}.00</h2></h2>
                                @endif
                            @endif
                            <p>{!!$cheqie->currency!!}</p>
                        </div>
                        <div class="my-cheqies-experience_date">
                            <h4>@lang('messages.created_at'):</h4>
                            <p>{!!substr($cheqie->time, 0 , 16)!!}</p>
                        </div>
                    </div>
                    <div class="paid_or_requested">
                        <!-- Display + or - depending on the cheqie type -->
                        <i class="fas fa-plus plusIcon"></i>
                        <a href="{{ url('/my-cheqie/cheqies/couple/group/' . $cheqie->id) }}"><i class="fas fa-share plusIcon"></i></a>
                        @if(!$user->paid_requests->contains($cheqie->id))
                            <a href="{{ url('/cheqie/' . $cheqie->id . '/' . $cheqie->link) }}" target="_blank"><i class="fas fa-share-alt-square" id="shareIcon"></i></a>
                        @endif
                        <a href="{{ LaravelLocalization::getLocalizedURL(LaravelLocalization::getCurrentLocale(), '/my-cheqie/share/' . $cheqie->id, array()) }}"><i class="far fa-envelope" id="shareEmailIcon"></i></a>
                    </div>
                </div>

        @endforeach
        </div>
    </div>

    <div class="cheqie-container">
        <div class="my-cheqies-title">
            <p>@lang('messages.paid_cheqies')</p>
        </div>
        <div class="my-cheqies-list">

        @foreach($paid_cheqies as $cheqie->requests)
            <!-- Cheqie block -->
                <div class="my-cheqies-cheqie">
                    <!-- Information about the cheqie LEFT -->
                    <div class="my-cheqies-details_left">
                        <div class="my-cheqies-name">
                            <h4>@lang('messages.name'):</h4>
                            <p>{!! decrypt($cheqie->name) !!}</p>
                        </div>
                        <div class="my-cheqies-paid_by">
                            <!-- Number of people who has paid the Cheqie -->
                            <h4>@lang('messages.paid_by'): </h4>
                            <!-- If there is more then one person who paid show the plural -->
                            @if(count($payments[$cheqie->id]) > 1 || count($payments[$cheqie->id]) == 0 )
                                <p>{!!count($payments[$cheqie->id])!!} @lang('messages.persons')</p>
                            @else
                                <p>{!!count($payments[$cheqie->id])!!} @lang('messages.person')</p>
                            @endif
                        </div>
                        <div class="my-cheqies-show_details">
                            <a href="{{url('/my-cheqie/cheqies/details/' . $cheqie->id)}}"><p>@lang('messages.cheqie_details')</p></a>
                        </div>
                    </div>

                    <!-- Amount to pay RIGHT -->
                    <div class="my-cheqies-details_right">
                        <div class="my-cheqies-amount">
                            @if($cheqie->donation_amount != null)
                                <h2>{!! decrypt($cheqie->donation_amount) !!}</h2>
                            @elseif(strpos( decrypt($cheqie->amount), '.') !== false || strpos( decrypt($cheqie->amount), ',') !== false)
                                <h2>{!! decrypt($cheqie->amount) !!}</h2>
                            @else
                                @if (LaravelLocalization::getCurrentLocale() == 'nl')
                                    <h2>{!! decrypt($cheqie->amount) !!},00</h2>
                                @else
                                    <h2><h2>{!! decrypt($cheqie->amount) !!}.00</h2></h2>
                                @endif
                            @endif
                            <p>{!!$cheqie->currency!!}</p>
                        </div>
                        <div class="my-cheqies-experience_date">
                            <h4>@lang('messages.created_at'):</h4>
                            <p>{!!substr($cheqie->time, 0 , 16)!!}</p>
                        </div>
                    </div>
                    <div class="paid_or_requested">
                        <!-- Display + or - depending on the cheqie type -->
                        <i class="fas fa-window-minimize minIcon"></i>
                    </div>
                </div>

            @endforeach
        </div>
    </div>

@endsection