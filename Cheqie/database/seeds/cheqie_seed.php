<?php

use App\Model\Bank_account;
use App\Model\Currency;
use App\Model\Group;
use App\Model\Pay_request;
use App\Model\User;
use Illuminate\Database\Seeder;

class cheqie_seed extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::insert([
            'name' => encrypt('Bernard Havens'),
            'email' => 'Bernard@gmail.com',
            'password' => bcrypt('secret'),
            'created_at' => date("Y-m-d H:i:s"),
        ]);

        User::insert([
            'name' => encrypt('Henry ver Eick'),
            'email' => 'Henry@gmail.com',
            'password' => bcrypt('secret'),
            'created_at' => date("Y-m-d H:i:s"),
        ]);

        User::insert([
            'name' => encrypt('Gerry ten Dam'),
            'email' => 'Gerry@gmail.com',
            'password' => bcrypt('secret'),
        ]);

        Bank_account::insert([
            'user_id' => User::all()->where('name', 'Bernard Havens')->first()->id,
            'iban' => encrypt('NL85 000 000 0120'),
            'name' => encrypt('Betaalrekening'),
        ]);

        Bank_account::insert([
            'user_id' => User::all()->where('name', 'Henry ver Eick')->first()->id,
            'iban' => encrypt('NL85 000 000 5220'),
            'name' => encrypt('Betaalrekening'),
        ]);

        Bank_account::insert([
            'user_id' => User::all()->where('name', 'Gerry ten Dam')->first()->id,
            'iban' => encrypt('NL85 000 000 0038'),
            'name' => encrypt('Zilvervloot'),
        ]);

        Currency::insert([
            'name' => 'Euro',
        ]);


        Currency::insert([
            'name' => 'Dollar',
        ]);


        Group::insert([
            'name' => encrypt('Sushi etentje'),
        ]);

        Group::insert([
            'name' => encrypt('Terrasje pikken'),
        ]);

        Group::insert([
            'name' => encrypt('18+ pakket voor Gerry'),
        ]);

        Group::all()->where('name', 'Sushi etentje')->first()->users()->attach(User::all()->where('name', 'Henry ver Eick')->first());
        Group::all()->where('name', 'Sushi etentje')->first()->users()->attach(User::all()->where('name', 'Bernard Havens')->first());
        Group::all()->where('name', 'Terrasje pikken')->first()->users()->attach(User::all()->where('name', 'Gerry ten Dam')->first());
        Group::all()->where('name', 'Terrasje pikken')->first()->users()->attach(User::all()->where('name', 'Bernard Havens')->first());
        Group::all()->where('name', '18+ pakket voor Gerry')->first()->users()->attach(User::all()->where('name', 'Henry ver Eick')->first());
        Group::all()->where('name', '18+ pakket voor Gerry')->first()->users()->attach(User::all()->where('name', 'Gerry ten Dam')->first());


        Pay_request::insert([
            'bank_id' => Bank_account::all()->where('iban' , 'NL85 000 000 5220')->first()->id,
            'currency' => 'Euro',
            'time' => '2019-02-28 10:00:00',
            'user_id' => User::all()->where('name', 'Henry ver Eick')->first()->id,
            'amount' => encrypt('20'),
            'summary' => encrypt('18+ pakket voor Gerry'),
            'name' => encrypt('18+ pakket'),
        ]);

        Pay_request::insert([
            'bank_id' => Bank_account::all()->where('iban' , 'NL85 000 000 0038')->first()->id,
            'currency' => 'Euro',
            'time' => '2019-02-28 12:00:00',
            'user_id' => User::all()->where('name', 'Gerry ten Dam')->first()->id,
            'amount' => encrypt('5.20'),
            'summary' => encrypt('Etentje'),
            'name' => encrypt('Etentje'),
        ]);

    }
}
