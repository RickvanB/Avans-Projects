package com.example.limited.Activity;

import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;
import androidx.fragment.app.FragmentManager;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

import com.example.limited.Fragment.DepartureFragment;
import com.example.limited.Interface.DepartureListener;
import com.example.limited.Model.DepartureListItem;
import com.example.limited.R;

import java.io.Serializable;
import java.util.Objects;

public class MainActivity extends AppCompatActivity implements DepartureListener {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        Toolbar actionToolbar = (Toolbar) findViewById(R.id.main_toolbar);
        setSupportActionBar(actionToolbar);
        Objects.requireNonNull(getSupportActionBar()).setDisplayShowTitleEnabled(false);

        Button settings = this.findViewById(R.id.settings_button);
        final Intent intent = new Intent(this, SettingsActivity.class);
        settings.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                startActivity(intent);
            }
        });
    }

    @Override
    public void updateDepartures(String stationShortCut) {
        if(stationShortCut == null || stationShortCut.isEmpty()){
            stationShortCut = "UT";
        }

        FragmentManager fragmentManager = getSupportFragmentManager();
        DepartureFragment departureFragment = (DepartureFragment)fragmentManager.findFragmentById(R.id.departureFragment);
        if (departureFragment != null) {
            departureFragment.updateDepartures(stationShortCut);
        }
        Objects.requireNonNull(getSupportActionBar()).setElevation(0);

    }

    @Override
    public void onClickEvent(DepartureListItem item) {
        Intent viewDetails = new Intent(MainActivity.this, DepartureDetailActivity.class);
        viewDetails.putExtra("DepartureDetails", (Serializable) item);
        startActivity(viewDetails);

    }
}
