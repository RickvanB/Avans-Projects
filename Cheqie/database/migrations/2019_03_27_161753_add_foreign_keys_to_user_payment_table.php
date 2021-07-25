<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToUserPaymentTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('user_payment', function(Blueprint $table)
		{
			$table->foreign('request_id', 'request_fk_usergroup')->references('id')->on('pay_request')->onUpdate('NO ACTION')->onDelete('NO ACTION');
			$table->foreign('user_id', 'user_payment_fk_usergroup')->references('id')->on('users')->onUpdate('NO ACTION')->onDelete('NO ACTION');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('user_payment', function(Blueprint $table)
		{
			$table->dropForeign('request_fk_usergroup');
			$table->dropForeign('user_payment_fk_usergroup');
		});
	}

}
