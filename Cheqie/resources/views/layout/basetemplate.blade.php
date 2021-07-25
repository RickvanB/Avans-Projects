<html lang="{{ LaravelLocalization::getCurrentLocale() }}">
    <head>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
        <link rel="stylesheet" href="{{ asset('css/basetemplate.css') }}">
        <link rel="stylesheet" href="{{ asset('css/groupoverview.css') }}">
        <link rel="stylesheet" href="{{ asset('css/cheqieOverview.css') }}">
        <link rel="stylesheet" href="{{ asset('css/interval.css') }}">
        <link rel="stylesheet" href="{{ asset('css/createCheqie.css') }}">
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossorigin="anonymous">
        <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/fullcalendar/2.2.7/fullcalendar.min.css"/>

        <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
    
        <script src="//cdnjs.cloudflare.com/ajax/libs/moment.js/2.9.0/moment.min.js"></script>
        <script src="{{ asset('js/fullcalendar.js')}}"></script>

        <link rel="icon" href="/images/Logo_Cheqie_small.png">
        <title>Cheqie</title>
    </head>
    <body>
        <!-- navigation -->
        <nav class="navbar navbar-expand-lg">
            <a class="navbar-brand" href="{{url('/')}}" id="exclude_hover">Cheqie</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div class="navbar-nav">
                    <a class="nav-item nav-link" href="{{ url('/')}}">Home</a>
                    @if(Auth::check())
                        <a class="nav-item nav-link" href="{{ LaravelLocalization::getLocalizedURL(LaravelLocalization::getCurrentLocale(), '/my-cheqie/cheqies', array()) }}">@lang('messages.my_cheqies')</a>
                        <a class="nav-item nav-link" href="{{ LaravelLocalization::getLocalizedURL(LaravelLocalization::getCurrentLocale(), '/my-cheqie/group/user', array()) }}">@lang('messages.my_groups')</a>
                        <a class="nav-item nav-link" href="{{ LaravelLocalization::getLocalizedURL(LaravelLocalization::getCurrentLocale(), 'my-cheqie/cheqies/create/new', array()) }}">@lang('messages.create_cheqie_nav')</a>
                        <a class="nav-item nav-link" href="{{ LaravelLocalization::getLocalizedURL(LaravelLocalization::getCurrentLocale(), 'my-cheqie/bank-accounts', array()) }}">@lang('messages.bank_accounts_nav')</a>
                        <a class="nav-item nav-link" href="{{ LaravelLocalization::getLocalizedURL(LaravelLocalization::getCurrentLocale(), 'my-cheqie/interval', array()) }}">@lang('messages.interval_nav')</a>
                        <a class="nav-item nav-link" href="{{ LaravelLocalization::getLocalizedURL(LaravelLocalization::getCurrentLocale(), 'my-cheqie/settings', array()) }}">@lang('messages.settings_nav')</a>
                    @endif
                    @guest
                        <li class="nav-item">
                            <a class="nav-link" href="{{ route('login') }}">{{ __('Login') }}</a>
                        </li>
                        @if (Route::has('register'))
                            <li class="nav-item">
                                <a class="nav-link" href="{{ route('register') }}">@lang('messages.register')</a>
                            </li>
                        @endif
                    @else
                        <li class="nav-item dropdown">
                            @if(Auth::user() != null)
                                <a id="navbarDropdown" class="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" v-pre>
                                {!! decrypt(Auth::user()->name) !!} <span class="caret"></span>
                                </a>
                            @endif

                            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                                <a class="dropdown-item" href="{{ route('logout') }}"
                                   onclick="event.preventDefault();
                                                 document.getElementById('logout-form').submit();">
                                    @lang('messages.logout')
                                </a>

                                <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                                    @csrf
                                </form>
                            </div>
                        </li>
                    @endguest
                </div>
            </div>
        </nav>
        <div class="placeholder_logo">
            <a class="navbar-brand" href="{{ url('/')}}"><img src="/images/Logo_Cheqie.png" class="logo"></a>
        </div>

        <div class="content_section">
            <!-- Web content -->
            @yield('content')
        </div>

        <div class="footer-block">
            <footer class="footer-copyright text-center py-3">© 2019 - Jip van Heugten & Rick van Beek
            </footer>
        </div>
        <script src="{{ asset('js/translations/locale-all.js') }}"></script>
    </body>
</html>

