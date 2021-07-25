<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreatePayRequestTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('pay_request', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->integer('bank_id')->index('bank_idx');
			$table->string('name');
			$table->string('link', 45)->nullable();
			$table->string('currency', 45)->index('currency_idx');
			$table->integer('amount_interval')->nullable();
			$table->integer('interval')->nullable()->index('interval_idx');
			$table->text('summary', 65535)->nullable();
			$table->dateTime('time');
			$table->integer('user_id')->index('user_idx');
			$table->text('image', 65535)->nullable();
			$table->string('amount');
			$table->string('sub_description')->nullable();
			$table->boolean('donation')->nullable()->default(0);
			$table->string('donation_amount')->nullable();
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('pay_request');
	}

}
