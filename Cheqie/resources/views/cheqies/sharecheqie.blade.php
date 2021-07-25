@extends('layout.basetemplate')

@section('content')
	<div class="card" id="share-email">
	  	<div class="card-body">
			<form method="post" action="{{ LaravelLocalization::getLocalizedURL(LaravelLocalization::getCurrentLocale(), '/my-cheqie/share/' . $cheqie->id, array()) }}">

				{{ csrf_field() }}

				<div class="form-group">
					<label>@lang('messages.select_user')</label>
					<select class="form-control" name="user">
						@foreach($users as $user)
							<option value="{!! $user->email !!}">{!! decrypt($user->name) !!}</option>
						@endforeach
					</select>
				</div>
				<div class="form-group">
					<input type="submit" value="@lang('messages.share_cheqie_email')">
				</div>
				
			</form>
		</div>
	</div>

@endsection