<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToPayRequestTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('pay_request', function(Blueprint $table)
		{
			$table->foreign('bank_id', 'bank_fk')->references('id')->on('bank_acount')->onUpdate('NO ACTION')->onDelete('NO ACTION');
			$table->foreign('currency', 'currency_fk')->references('name')->on('currency')->onUpdate('NO ACTION')->onDelete('NO ACTION');
			$table->foreign('interval', 'interval_fk')->references('id')->on('interval')->onUpdate('NO ACTION')->onDelete('NO ACTION');
			$table->foreign('user_id', 'user_fk')->references('id')->on('users')->onUpdate('NO ACTION')->onDelete('NO ACTION');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('pay_request', function(Blueprint $table)
		{
			$table->dropForeign('bank_fk');
			$table->dropForeign('currency_fk');
			$table->dropForeign('interval_fk');
			$table->dropForeign('user_fk');
		});
	}

}
