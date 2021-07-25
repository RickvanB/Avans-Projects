<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateBankAcountTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('bank_acount', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->integer('user_id')->index('user_idx');
			$table->string('iban');
			$table->string('name');
			$table->string('saldo')->nullable();
			$table->boolean('default')->default(0);
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('bank_acount');
	}

}
