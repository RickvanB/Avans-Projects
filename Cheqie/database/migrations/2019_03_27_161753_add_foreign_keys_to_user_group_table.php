<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToUserGroupTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('user_group', function(Blueprint $table)
		{
			$table->foreign('group_id', 'group_fk_usergroup')->references('id')->on('group')->onUpdate('NO ACTION')->onDelete('NO ACTION');
			$table->foreign('user_id', 'user_fk_usergroup')->references('id')->on('users')->onUpdate('NO ACTION')->onDelete('NO ACTION');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('user_group', function(Blueprint $table)
		{
			$table->dropForeign('group_fk_usergroup');
			$table->dropForeign('user_fk_usergroup');
		});
	}

}
