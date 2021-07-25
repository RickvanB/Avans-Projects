package com.example.limited.Manager;

import android.app.Application;
import android.content.ContentProviderOperation;
import android.content.ContentProviderResult;
import android.provider.ContactsContract;

import java.util.ArrayList;
import java.util.List;

public class ContactManager {

    private final static String PHONENUMBER_NS = "0307515155";
    private static final String CONTACT_NAME_NS = "NS Helpdesk";
    private Application application;

    public ContactManager(Application application)
    {
        this.application = application;
    }


    /**
     * This method will insert a new contact into the contacts of the phone
     * @return true or false
     */
    public boolean addHelpdeskContact(){
        ArrayList<ContentProviderOperation> contactOperations = new ArrayList<>();

        int contactInsertPosition = contactOperations.size();

        // Create contact
        contactOperations.add(ContentProviderOperation.newInsert(ContactsContract.RawContacts.CONTENT_URI)
                .withValue(ContactsContract.RawContacts.ACCOUNT_NAME, null)
                .withValue(ContactsContract.RawContacts.ACCOUNT_TYPE, null)
                .build());

        // Set the name of the contact
        contactOperations.add(ContentProviderOperation.newInsert(ContactsContract.Data.CONTENT_URI)
                .withValueBackReference(ContactsContract.RawContacts.Data.RAW_CONTACT_ID, contactInsertPosition)
                .withValue(ContactsContract.RawContacts.Data.MIMETYPE, ContactsContract.CommonDataKinds.Phone.CONTENT_ITEM_TYPE)
                .withValue(ContactsContract.CommonDataKinds.StructuredName.DISPLAY_NAME, CONTACT_NAME_NS)
                .build());

        // Add phonenumber to contact
        contactOperations.add(ContentProviderOperation.newInsert(ContactsContract.Data.CONTENT_URI)
                .withValueBackReference(ContactsContract.Data.RAW_CONTACT_ID, contactInsertPosition)
                .withValue(ContactsContract.CommonDataKinds.Phone.TYPE, ContactsContract.CommonDataKinds.Phone.TYPE_HOME)
                .withValue(ContactsContract.CommonDataKinds.Phone.NUMBER, PHONENUMBER_NS)
                .withValue(ContactsContract.RawContacts.Data.MIMETYPE, ContactsContract.CommonDataKinds.Phone.CONTENT_ITEM_TYPE)
                .build());

        try {
            // Insert contact
            ContentProviderResult[] results = application.getApplicationContext().getContentResolver().applyBatch(ContactsContract.AUTHORITY, contactOperations);
            return true;
        } catch (Exception e){
            e.printStackTrace();
            return false;
        }
    }
}
