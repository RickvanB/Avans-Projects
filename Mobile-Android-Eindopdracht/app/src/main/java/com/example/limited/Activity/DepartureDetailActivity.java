package com.example.limited.Activity;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;
import androidx.core.content.ContextCompat;
import androidx.fragment.app.FragmentManager;

import android.Manifest;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.os.Bundle;
import android.widget.Toast;

import com.example.limited.Interface.ApiReceiver;
import com.example.limited.Model.DepartureListItem;
import com.example.limited.Fragment.DetailsHeaderFragment;
import com.example.limited.Fragment.DetailsProductDetailsFragment;
import com.example.limited.Manager.AgendaManager;
import com.example.limited.Manager.ContactManager;
import com.example.limited.API.NS_Api;
import com.example.limited.R;

import java.util.Objects;

public class DepartureDetailActivity extends AppCompatActivity implements ApiReceiver {

    private static final int REQUEST_FOR_WRITING_CONTACTS = 2;

    private DepartureListItem departureListItem;
    private DetailsHeaderFragment detailFragment;
    private DetailsProductDetailsFragment productDetailFragment;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.departure_detail_activity);

        // Toolbar settings to insert back navigation
        Toolbar actionToolbar = (Toolbar) findViewById(R.id.main_toolbar);
        setSupportActionBar(actionToolbar);
        Objects.requireNonNull(getSupportActionBar()).setDisplayHomeAsUpEnabled(true);
        getSupportActionBar().setDisplayShowHomeEnabled(true);
        getSupportActionBar().setDisplayShowTitleEnabled(false);

        departureListItem = (DepartureListItem) getIntent().getSerializableExtra("DepartureDetails");

        FragmentManager fragmentManager = getSupportFragmentManager();

        // Set content of header Element
         detailFragment = (DetailsHeaderFragment)fragmentManager.findFragmentById(R.id.detailsHeader);
        if(detailFragment != null){
            detailFragment.setContent(departureListItem);
        }

        // Set content of product detail Element
        productDetailFragment = (DetailsProductDetailsFragment)fragmentManager.findFragmentById(R.id.productDetails);
        if(productDetailFragment != null){
            productDetailFragment.setContent(departureListItem);
        }

        NS_Api api = new NS_Api(this.getApplication());
        api.GetAsyncRouteDetails(this, departureListItem);
    }

    /**
     * This message will send a agenda event
     */
    public void exportToAgenda(){

        final AgendaManager agendaManager = new AgendaManager();
        Intent result = agendaManager.createAgendaExport(departureListItem);

        // If creation has succeeded start activity
        if(result != null){
            startActivity(result);
        }
    }

    /**
     * This method should send a SMS to a contact with the departure time
     */
    public void addHelpdeskToContacts(){
        if(ContextCompat.checkSelfPermission(this, Manifest.permission.WRITE_CONTACTS) != PackageManager.PERMISSION_GRANTED){
            requestPermissions(new String[]{Manifest.permission.WRITE_CONTACTS}, REQUEST_FOR_WRITING_CONTACTS);
            // Permission denied or not asked yet so cancel operation
            return;
        }

        // Permission granted so create contact
        createContact();
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        // Check if request is the same request for contact request
        if(requestCode == REQUEST_FOR_WRITING_CONTACTS){
            if(grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED){
                // Permission granted so create contact
                createContact();
            }
        }
    }

    /**
     * This method will add a new contact to the phone if persmission is granted
     */
    private void createContact(){
        // Create contact manager if permission is granted
        final ContactManager manager = new ContactManager(getApplication());
        boolean result = manager.addHelpdeskContact();

        if(result){
            Toast.makeText(this, getResources().getString(R.string.helpdesk_succes), Toast.LENGTH_SHORT).show();
        } else{
            Toast.makeText(this, getResources().getString(R.string.helpdesk_error), Toast.LENGTH_SHORT).show();
        }
    }

    @Override
    public void receiveContent(DepartureListItem item) {
        if(detailFragment != null){
            detailFragment.setContent(item);
        }

        if(productDetailFragment != null){
            productDetailFragment.setContent(item);
        }
    }

    @Override
    public void reportFailure(String message) {
        if(message.equals("INTERNET")){
            Toast.makeText(this, R.string.no_internet, Toast.LENGTH_SHORT).show();
        }

    }
}
