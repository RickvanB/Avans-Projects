<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateUserPaymentTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('user_payment', function(Blueprint $table)
		{
			$table->integer('user_id');
			$table->integer('request_id')->index('request_idx');
			$table->timestamps();
			$table->boolean('anonymous')->default(0);
			$table->primary(['user_id','request_id']);
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('user_payment');
	}

}
