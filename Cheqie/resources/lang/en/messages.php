<?php

return [

	/*
    |--------------------------------------------------------------------------
    | Authentication Language Lines
    |--------------------------------------------------------------------------
    |
    | The following language lines are used during authentication for various
    | messages that we need to display to the user. You are free to modify
    | these language lines according to your application's requirements.
    |
    */

    'failed' => 'These credentials do not match our records.',
    'throttle' => 'Too many login attempts. Please try again in :seconds seconds.',

    /*
    |--------------------------------------------------------------------------
    | Pagination Language Lines
    |--------------------------------------------------------------------------
    |
    | The following language lines are used by the paginator library to build
    | the simple pagination links. You are free to change them to anything
    | you want to customize your views to better match your application.
    |
    */

    'previous' => '&laquo; Previous',
    'next' => 'Next &raquo;',

    /*
    |--------------------------------------------------------------------------
    | Password Reset Language Lines
    |--------------------------------------------------------------------------
    |
    | The following language lines are the default lines which match reasons
    | that are given by the password broker for a password update attempt
    | has failed, such as for an invalid token or invalid new password.
    |
    */

    'password' => 'Passwords must be at least six characters and match the confirmation.',
    'reset' => 'Your password has been reset!',
    'sent' => 'We have e-mailed your password reset link!',
    'token' => 'This password reset token is invalid.',
    'user' => "We can't find a user with that e-mail address.",

    /*
    |--------------------------------------------------------------------------
    | Validation Language Lines
    |--------------------------------------------------------------------------
    |
    | The following language lines contain the default error messages used by
    | the validator class. Some of these rules have multiple versions such
    | as the size rules. Feel free to tweak each of these messages here.
    |
    */

    'accepted' => 'The :attribute must be accepted.',
    'active_url' => 'The :attribute is not a valid URL.',
    'after' => 'The :attribute must be a date after :date.',
    'after_or_equal' => 'The :attribute must be a date after or equal to :date.',
    'alpha' => 'The :attribute may only contain letters.',
    'alpha_dash' => 'The :attribute may only contain letters, numbers, dashes and underscores.',
    'alpha_num' => 'The :attribute may only contain letters and numbers.',
    'array' => 'The :attribute must be an array.',
    'before' => 'The :attribute must be a date before :date.',
    'before_or_equal' => 'The :attribute must be a date before or equal to :date.',
    'between' => [
        'numeric' => 'The :attribute must be between :min and :max.',
        'file' => 'The :attribute must be between :min and :max kilobytes.',
        'string' => 'The :attribute must be between :min and :max characters.',
        'array' => 'The :attribute must have between :min and :max items.',
    ],
    'boolean' => 'The :attribute field must be true or false.',
    'confirmed' => 'The :attribute confirmation does not match.',
    'date' => 'The :attribute is not a valid date.',
    'date_equals' => 'The :attribute must be a date equal to :date.',
    'date_format' => 'The :attribute does not match the format :format.',
    'different' => 'The :attribute and :other must be different.',
    'digits' => 'The :attribute must be :digits digits.',
    'digits_between' => 'The :attribute must be between :min and :max digits.',
    'dimensions' => 'The :attribute has invalid image dimensions.',
    'distinct' => 'The :attribute field has a duplicate value.',
    'email' => 'The :attribute must be a valid email address.',
    'exists' => 'The selected :attribute is invalid.',
    'file' => 'The :attribute must be a file.',
    'filled' => 'The :attribute field must have a value.',
    'gt' => [
        'numeric' => 'The :attribute must be greater than :value.',
        'file' => 'The :attribute must be greater than :value kilobytes.',
        'string' => 'The :attribute must be greater than :value characters.',
        'array' => 'The :attribute must have more than :value items.',
    ],
    'gte' => [
        'numeric' => 'The :attribute must be greater than or equal :value.',
        'file' => 'The :attribute must be greater than or equal :value kilobytes.',
        'string' => 'The :attribute must be greater than or equal :value characters.',
        'array' => 'The :attribute must have :value items or more.',
    ],
    'image' => 'The :attribute must be an image.',
    'in' => 'The selected :attribute is invalid.',
    'in_array' => 'The :attribute field does not exist in :other.',
    'integer' => 'The :attribute must be an integer.',
    'ip' => 'The :attribute must be a valid IP address.',
    'ipv4' => 'The :attribute must be a valid IPv4 address.',
    'ipv6' => 'The :attribute must be a valid IPv6 address.',
    'json' => 'The :attribute must be a valid JSON string.',
    'lt' => [
        'numeric' => 'The :attribute must be less than :value.',
        'file' => 'The :attribute must be less than :value kilobytes.',
        'string' => 'The :attribute must be less than :value characters.',
        'array' => 'The :attribute must have less than :value items.',
    ],
    'lte' => [
        'numeric' => 'The :attribute must be less than or equal :value.',
        'file' => 'The :attribute must be less than or equal :value kilobytes.',
        'string' => 'The :attribute must be less than or equal :value characters.',
        'array' => 'The :attribute must not have more than :value items.',
    ],
    'max' => [
        'numeric' => 'The :attribute may not be greater than :max.',
        'file' => 'The :attribute may not be greater than :max kilobytes.',
        'string' => 'The :attribute may not be greater than :max characters.',
        'array' => 'The :attribute may not have more than :max items.',
    ],
    'mimes' => 'The :attribute must be a file of type: :values.',
    'mimetypes' => 'The :attribute must be a file of type: :values.',
    'min' => [
        'numeric' => 'The :attribute must be at least :min.',
        'file' => 'The :attribute must be at least :min kilobytes.',
        'string' => 'The :attribute must be at least :min characters.',
        'array' => 'The :attribute must have at least :min items.',
    ],
    'not_in' => 'The selected :attribute is invalid.',
    'not_regex' => 'The :attribute format is invalid.',
    'numeric' => 'The :attribute must be a number.',
    'present' => 'The :attribute field must be present.',
    'regex' => 'The :attribute format is invalid.',
    'required' => 'The :attribute field is required.',
    'required_if' => 'The :attribute field is required when :other is :value.',
    'required_unless' => 'The :attribute field is required unless :other is in :values.',
    'required_with' => 'The :attribute field is required when :values is present.',
    'required_with_all' => 'The :attribute field is required when :values are present.',
    'required_without' => 'The :attribute field is required when :values is not present.',
    'required_without_all' => 'The :attribute field is required when none of :values are present.',
    'same' => 'The :attribute and :other must match.',
    'size' => [
        'numeric' => 'The :attribute must be :size.',
        'file' => 'The :attribute must be :size kilobytes.',
        'string' => 'The :attribute must be :size characters.',
        'array' => 'The :attribute must contain :size items.',
    ],
    'starts_with' => 'The :attribute must start with one of the following: :values',
    'string' => 'The :attribute must be a string.',
    'timezone' => 'The :attribute must be a valid zone.',
    'unique' => 'The :attribute has already been taken.',
    'uploaded' => 'The :attribute failed to upload.',
    'url' => 'The :attribute format is invalid.',
    'uuid' => 'The :attribute must be a valid UUID.',

    /*
    |--------------------------------------------------------------------------
    | Custom Validation Language Lines
    |--------------------------------------------------------------------------
    |
    | Here you may specify custom validation messages for attributes using the
    | convention "attribute.rule" to name the lines. This makes it quick to
    | specify a specific custom language line for a given attribute rule.
    |
    */

    'custom' => [
        'attribute-name' => [
            'rule-name' => 'custom-message',
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Custom Validation Attributes
    |--------------------------------------------------------------------------
    |
    | The following language lines are used to swap our attribute placeholder
    | with something more reader friendly such as "E-Mail Address" instead
    | of "email". This simply helps us make our message more expressive.
    |
    */

    'attributes' => [],

    /* BANK ACCOUNTS */
    'bank_accounts' => 'My Bankaccounts',
    'bank_account' => 'Bankaccount',
    'bank_account_name' => 'Bankaccount-name',
    'new_bank_account' => 'New bankaccount',
    'iban_in_use' => 'The given IBAN is already used by another user',
    'no_results' => 'Unfortunately there are no results',
    'no_bank_account' => 'It seems like you have no bank account',
    'delete' => 'Delete',

    /* CHEQIE */
    'title' => 'Title',
    'amount' => 'Amount',
    'summary' => 'Summary',
    'created_at' => 'Created at',
    'currency' => 'Currency',
    'connected_bank_account' => 'Connected bankaccount',
    'sub_summary' => 'Sub-summary',
    'create_cheqie' => 'Create Cheqie',
    'my_cheqies' => "My Cheqie's",
    'name' => 'Name',
    'created_by' => 'Created by',
    'payers' => 'Not anonymous payers',
    'no_payments' => 'No payments yet',
    'paid_by' => 'Paid by',
    'persons' => 'Persons',
    'person' => 'Person',
    'cheqie_details' => 'More details',
    'paid_cheqies' => "Paid Cheqie's",
    'share_cheqie' => 'Share Cheqie with the group',
    'share_cheqie_email' => 'Share Cheqie by email',
    'cheqie_choose_amount' => 'Choose an amount',
    'cheqie_amount_perperson' => 'Amount per person',
    'cheqie_title_details' => 'This is the title that the receiver will see',
    'cheqie_choose_currency' => 'Choose a currency',
    'cheqie_currency_details' => 'Select in which currency you want to receive the money',
    'cheqie_choose_bankaccount' => 'Choose a bank account',
    'cheqie_choose_bankaccount_details' => 'This is the bank account where the money will be deposited',
    'cheqie_summary' => 'Summary',
    'cheqie_summary_details' => 'Extended summary',
    'cheqie_donation' => 'Donation',
    'cheqie_image' => 'Upload an image',
    'cheqie_planned_payment' => 'Planned Payments',
    'cheqie_payment_2' => 'Schedule new payment: Step 2',
    'cheqie_iban_reciever' => 'IBAN-Number reciever',
    'cheqie_iban_reciever_help' => 'By law we are not allowed to show the entire list of IBAN numbers',
    'cheqie_interval_payment_check' => 'This is an interval payment',
    'cheqie_interval_payment_execute' => 'Execute payment on',
    'cheqie_interval_payment_execute_help' => 'Date to pay the chosen amount',
    'cheqie_interval_payment_chose' => 'Chose an interval',
    'cheqie_interval_payment_chose_help' => 'The interval type of the payment',
    'cheqie_interval_payment_execute_amount' => 'Number of executions',
    'cheqie_interval_payment_execute_amount_help' => 'The number of execution for this payment. Leave empty for max value',
    'cheqie_interval_payment_start' => 'Start date:',
    'cheqie_interval_payment_start_help' => 'Start date of the interval',
    'create_payment' => 'Create payment',
    'cheqie_remove_interval' => 'Remove planned payment',
    'cheqie_remove_interval_chose' => 'Chose Cheqie with interval to remove',
    'cheqie_remove_help' => 'Select the Cheqie to remove the interval',
    'cheqie_remove' => 'Remove',
    'save' => 'Save',
    'select_user' => 'Select user',


    /* PAYMENTS */
    'payment_success' => 'The payment was successful. We will take care of payment to be addressed to the right person',
    'go_back' => 'Go back to the Cheqie overview',

    'payment_failed' => 'The payment was not successful unfortunately',
    'go_back_failed' => 'Go back to your Cheqie overview and try again',

    /* GROUPS */
    'group_username' => 'Username',
    'add' => 'Add',
    'back' => 'Back',
    'group' => 'Group',
    'group_no_shared_cheqies' => "There are no Cheqie's shared in this group",
    'last_shared' => 'Last shared Cheqie',
    'pay_cheqie' => 'Pay Cheqie',
    'users_in_group' => 'Users in this group',
    'leave_group' => 'Leave groep',
    'group_name' => 'Group name',
    'change_name' => 'Change name',
    'my_groups' => 'My groups',
    'not_in_a_group' => 'It seems like you are not in a group at the moment',
    'details' => 'Details',

    /* BASE TEMPLATE */
    'create_cheqie_nav' => 'Create Cheqie',
    'bank_accounts_nav' => 'Bankaccounts',
    'settings_nav'      => 'Settings',
    'languages_nav'     => 'Languages',
    'interval_nav'      => 'Interval payment',
    'settings_nav' => 'Settings',

    /* AUTHENTICATION VIEWS */
    'email_address' => 'Emailaddress',
    'password'      => 'Password',
    'remember_me'   => 'Remember me',
    'forgot_password' => 'Forgot password?',
    'register' => 'Register',
    'logout' => 'Logout',
    'confirm_password' => 'Wachtwoord bevestigen',
    'verify_email' => 'Verifieer uw emailadres',
    'verification_email_sent' => 'A fresh verification link has been sent to your email address',
    'check_email' => 'Voordat u verder gaat, check je email voor een verificatielink',
    'not_receive_email' => 'If you did not receive the email',
    'request_new_verification' => 'click here to request another',

    /* INTERVAL PAYMENTS */
    'plan_payment' => 'Plan payment',
    'delete_payment' => 'Delete payment',
    'new_plan_payment'  => 'Plan new payment: Step 1',
    'bank_account_money_left' => 'The account from which the payment is debited',
    'payment_payout' => 'Amount that will be payed out',
    'next_step' => 'Next step',

    /* SETTINGS TEMPLATE */
    'export_data' => 'Export data',
    'set_language' => 'Set language',
    'export_personal_data' => 'Export personal data and bankaccounts',
    'bank_default' => 'Choose default bank account',

    /* EMAIL */
    'dear_user' => 'Dear user,',
    'email_message' => 'Someone has sent you a payment request. You can pay for the request in the link below.', 
    'kind_regards' => 'Yours truly, Cheqie',
    'payment_request' => 'The payment request',
];

?>