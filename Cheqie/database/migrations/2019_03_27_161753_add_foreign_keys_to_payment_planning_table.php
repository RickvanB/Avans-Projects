<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToPaymentPlanningTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('payment_planning', function(Blueprint $table)
		{
			$table->foreign('pay_request', 'cheqie')->references('id')->on('pay_request')->onUpdate('NO ACTION')->onDelete('NO ACTION');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('payment_planning', function(Blueprint $table)
		{
			$table->dropForeign('cheqie');
		});
	}

}
