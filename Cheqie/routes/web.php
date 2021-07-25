<?php

/* POST requests */
Route::post('/pay/{cheqieId}/{uniqid}', 'PaymentController@pay');
Route::post('/group/create/{user_id}', 'GroupController@createGroup');
Route::post('/group/change_name/{group_id}/{user_id}', 'GroupController@changeGroupName');

/** Localized routes **/
Route::group(
[
	'prefix' => LaravelLocalization::setLocale(),
	'middleware' => [ 'localeSessionRedirect', 'localizationRedirect', 'localeViewPath' ]
],
function()
{

	Auth::routes();
	Route::get('/', 'HomeController@index');


	Route::group(['prefix' => 'my-cheqie', 'middleware' => 'auth'], function() {
	    Route::get('/group/user', 'GroupController@getGroups');
	    Route::get('/group/leave/{group_id}', 'GroupController@leaveGroup');
	    Route::get('/group/details/{group_id}', 'GroupController@showDetails');
	    Route::get('/group/create/add_remove/{group_id}/{owner_id}/{userId}', 'GroupController@addOrRemove');
	    Route::get('/cheqies', 'CheqieController@overview');
	    Route::get('/cheqies/create/new', 'CheqieController@create');
	    Route::get('/cheqies/details/{cheqie_id}', 'CheqieController@details');
	    Route::get('/cheqies/couple/group/{cheqie_id}', 'CheqieController@coupleToGroup');
	    Route::get('/share/{cheqie_id}', 'CheqieController@share');
	    Route::get('/cheqies/couple/group/{group_id}/{cheqie_id}', 'CheqieController@shareWithGroup');
	    Route::get('/bank-accounts', 'BankAccountController@getAccounts');
	    Route::get('/bank-accounts/remove/{bank_id}', 'BankAccountController@removeBankAccount');
        Route::get('/interval', 'IntervalController@calendar');
        Route::get('/interval/create', 'IntervalController@create');
        Route::get('/interval/delete', 'IntervalController@delete');
        Route::get('/settings', 'SettingsController@index');

	    Route::post('/cheqies/create/save', 'CheqieController@saveCheqie');
	    Route::post('/cheqies/remove/{cheqie_id}', 'CheqieController@remove');
	    Route::post('/group/create', 'GroupController@createGroup');
	    Route::post('/group/change_name/{group_id}', 'GroupController@changeGroupName');
	    Route::post('/share/{cheqie_id}', 'CheqieController@shareByEmail');

	    Route::post('/bank-account/add/new', 'BankAccountController@saveNewBankAccount');
	    Route::post('/interval/create/save', 'IntervalController@createStep2');
        Route::post('/interval/create/set-interval', 'IntervalController@saveInterval');
        Route::post('/interval/delete/confirmed', 'IntervalController@deleteInterval');
        Route::post('/settings/updatedefault', 'SettingsController@setDefault');
	});

	Route::group(['middleware' => 'auth'], function () {
	    Route::get('/data', 'DataExportController@getDataAndConvert');
	});

    Route::get('/cheqie/{cheqieId}/{uniqid}', 'PaymentController@detailAndPay');
    Route::get('/cheqie/{uniqid}/payment/success', 'PaymentController@paymentSuccess');
});
