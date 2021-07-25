<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreatePaymentPlanningTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('payment_planning', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->string('title');
			$table->boolean('all_day')->default(0);
			$table->dateTime('start');
			$table->dateTime('end');
			$table->integer('pay_request')->index('cheqie_idx');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('payment_planning');
	}

}
