package com.example.limited.Activity;

import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;
import androidx.fragment.app.FragmentManager;

import android.os.Bundle;

import com.example.limited.Fragment.DepartureFragment;
import com.example.limited.Manager.FavoriteManager;
import com.example.limited.R;

import java.util.Objects;

public class SavedTravelsActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.saved_travels_activity);

        FavoriteManager favoriteManager = new FavoriteManager(getApplication());

        // Toolbar settings to insert back navigation
        Toolbar actionToolbar = (Toolbar) findViewById(R.id.main_toolbar);
        setSupportActionBar(actionToolbar);
        Objects.requireNonNull(getSupportActionBar()).setDisplayHomeAsUpEnabled(true);
        getSupportActionBar().setDisplayShowHomeEnabled(true);
        getSupportActionBar().setDisplayShowTitleEnabled(false);

        // Fill list with data
        FragmentManager fragmentManager = getSupportFragmentManager();
        DepartureFragment departureFragment = (DepartureFragment)fragmentManager.findFragmentById(R.id.departureFragment);
        if (departureFragment != null) {
            departureFragment.setAdapter(favoriteManager.getTravels().getFavoriteTravels());
        }

    }
}
