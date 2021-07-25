<?php

return [

	'register' => 'Registreren',
	

	/* BANK ACCOUNTS */
	'bank_accounts' => 'Mijn Bankrekeningen',
	'bank_account' => 'Bankrekening',
	'new_bank_account' => 'Nieuwe bankrekening',
	'bank_account_name' => 'Rekening-naam:',
	'iban_in_use' => 'Het opgegeven IBAN-nummer is helaas al gekoppeld aan een andere gebruiker',
	'no_results' => 'Er zijn helaas geen resultaten',
	'no_bank_account' => 'Het lijkt erop dat je geen bankrekening gekoppeld hebt',
	'delete' => 'Verwijder',

	/* CHEQIE */
	'title' => 'Titel',
	'amount' => 'Bedrag',
	'summary' => 'Omschrijving',
	'created_at' => 'Aangemaakt op',
	'currency' => 'Valuta',
	'connected_bank_account' => 'Gekoppelde rekening',
	'sub_summary' => 'Sub-omschrijving',
	'create_cheqie' => 'Maak Cheqie',
	'my_cheqies' => "Mijn Cheqie's",
	'name' => 'Naam',
	'created_by' => 'Gemaakt door',
    'payers' => 'Niet anonieme betalers',
    'no_payments' => 'Er zijn nog geen betalingen',
	'paid_by' => 'Betaald door',
	'persons' => 'Personen',
	'person' => 'Persoon',
	'cheqie_details' => 'Bekijk details',
	'paid_cheqies' => "Betaalde Cheqie's",
	'share_cheqie' => 'Deel Cheqie met groep',
	'share_cheqie_email' => 'Deel Cheqie via email',
	'cheqie_choose_amount' => 'Kies een bedrag',
	'cheqie_amount_perperson' => 'Bedrag per persoon',
	'cheqie_title_details' => 'Dit is de titel die de ontvanger te zien krijgt',
	'cheqie_choose_currency' => 'Kies een valuta',
	'cheqie_currency_details' => 'Selecteer in welke valuta u het geld wilt ontvangen',
	'cheqie_choose_bankaccount' => 'Kies een bankrekening',
	'cheqie_choose_bankaccount_details' => 'Dit is de rekening waarop het bedrag gestort wordt',
	'cheqie_summary' => 'Omschrijving',
	'cheqie_summary_details' => 'Uitgebreide omschrijving',
	'cheqie_donation' => 'Donatie',
	'cheqie_image' => 'Upload een afbeelding',
    'cheqie_planned_payment' => 'Geplande betalingen',
    'cheqie_payment_2' => 'Plan nieuwe betaling: Stap 2',
    'cheqie_iban_reciever' => 'IBAN-Nummer ontvanger',
    'cheqie_iban_reciever_help' => 'In het kader van de AVG is het niet mogelijk om een lijst te tonen',
    'cheqie_interval_payment_check' => 'Dit is een interval betaling',
    'cheqie_interval_payment_execute' => 'Betaling uitvoeren op',
    'cheqie_interval_payment_execute_help' => 'Datum waarop de betaling wordt voldaan',
    'cheqie_interval_payment_chose' => 'Kies een interval',
    'cheqie_interval_payment_chose_help' => 'Het interval waarin de betaling wordt voldaan',
    'cheqie_interval_payment_execute_amount_help' => 'Aantal keer dat de betaling wordt voldaan. Laat leeg voor maximaal aantal keer',
    'cheqie_interval_payment_execute_amount' => 'Aantal keer uitvoeren',
    'cheqie_interval_payment_start' => 'Start datum:',
    'cheqie_interval_payment_start_help' => 'Datum waarop de te zetten interval start',
    'create_payment' => 'Betaling aanmaken',
    'cheqie_remove_interval' => 'Geplande betalingen verwijderen:',
    'cheqie_remove_interval_chose' => 'Kies een Cheqie waarvan het interval moet worden verwijderd',
    'cheqie_remove_help' => 'Selecteer de Cheqie waarvan u het interval wilt verwijderen',
    'cheqie_remove' => 'Verwijder',
	'save' => 'Opslaan',
	'select_user' => 'Selecteer gebruiker',

	/* PAYMENTS */
	'payment_success' => 'De betaling is gelukt! Wij zorgen dat het bedrag bij de juiste persoon terecht komt',
	'go_back' => 'Ga terug naar je Cheqie overzicht',

	'payment_failed' => 'De betaling is helaas niet gelukt!',
	'go_back_failed' => 'Ga terug naar je Cheqie overzicht en probeer het opnieuw',

	/* GROUPS */
	'group_username' => 'Gebruikersnaam',
	'add' => 'Voeg toe',
	'back' => 'Terug',
	'group' => 'Groep',
	'group_no_shared_cheqies' => "Er zijn nog geen Cheqie's gedeeld in deze groep",
	'last_shared' => 'Laatst gedeelde Cheqie',
	'pay_cheqie' => 'Betaal Cheqie',
	'users_in_group' => 'Deelnemers in deze groep',
	'leave_group' => 'Verlaat groep',
	'group_name' => 'Groepsnaam',
	'change_name' => 'Verander naam',
	'my_groups' => 'Mijn groepen',
	'not_in_a_group' => 'Het lijkt er op of je nog niet in een groep zit',
	'details' => 'Details',

	/* BASE TEMPLATE */
	'create_cheqie_nav' => 'Cheqie aanmaken',
	'bank_accounts_nav' => 'Bankrekeningen',
	'settings_nav'		=> 'Instellingen',
	'languages_nav'		=> 'Talen',
    'interval_nav'      => 'Interval betaling',

	/* AUTHENTICATION VIEWS */
	'email_address' => 'Emailadres',
	'password'		=> 'Wachtwoord',
	'remember_me'	=> 'Onthoudt mij',
	'forgot_password' => 'Wachtwoord vergeten?',
	'register' => 'Registreren',
	'logout' => 'Uitloggen',
	'confirm_password' => 'Wachtwoord bevestigen',
	'verify_email' => 'Verifieer uw emailadres',
	'verification_email_sent' => 'Een nieuwe activatielink is naar uw emailadres verstuurt',
	'check_email' => 'Voordat u verder gaat, check je email voor een verificatielink',
	'not_receive_email' => 'Als je geen email gehad hebt',
    'request_new_verification' => 'klik hier om een nieuwe verificatie-email te versturen',

    /* INTERVAL PAYMENTS */
    'plan_payment' => 'Plan betaling',
    'delete_payment' => 'Verwijder betaling',
    'new_plan_payment'  => 'Plan nieuwe betaling: Stap 1',
    'bank_account_money_left' => 'De rekening waarvan de betaling wordt afgeschreven',
    'payment_payout' => 'Uit te betalen bedrag',
    'next_step' => 'Volgende stap',

    /* SETTINGS TEMPLATE */
    'export_data' => 'Exporteren gegevens',
    'set_language' => 'Taal selecteren',
    'export_personal_data' => 'Export persoonlijke gegevens en bankrekeningen',
    'bank_default' => 'Kies een standaard bankrekening',

    /* EMAIL */
    'dear_user' => 'Beste gebruiker,',
    'email_message' => 'Iemand heeft u een betaalverzoek gestuurd. In onderstaande link kunt u het verzoek betalen.', 
    'kind_regards' => 'Met vriendelijke groet, Cheqie',
    'payment_request' => 'Het betaalverzoek',

];

?>