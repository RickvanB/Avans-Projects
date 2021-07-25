package com.example.limited.Fragment;

import android.content.SharedPreferences;
import android.os.Bundle;
import androidx.preference.PreferenceManager;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.Spinner;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;

import com.example.limited.Activity.MainActivity;
import com.example.limited.R;
import com.example.limited.Manager.StationManager;

import java.util.Objects;

public class MainHeaderFragment extends Fragment implements AdapterView.OnItemSelectedListener {

    private static final String SAVED_DEPARTURE_STATION = "SAVED_STATIONS";
    private StationManager stationManager;

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {

        final View returnView = inflater.inflate(R.layout.main_header_fragment, container, false);
        stationManager = new StationManager();

        // Create spinner for selection of the correct station
        Spinner spinner = (Spinner) returnView.findViewById(R.id.station_spinner);
        SharedPreferences preferences = PreferenceManager.getDefaultSharedPreferences(this.getContext());
        String value = preferences.getString("station", "");

        ArrayAdapter<CharSequence> adapter = ArrayAdapter.createFromResource(Objects.requireNonNull(this.getContext()),
                R.array.stations, android.R.layout.simple_spinner_item);
        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        spinner.setOnItemSelectedListener(this);
        spinner.setAdapter(adapter);

        // Check if Save state instance has departure stations
        if(savedInstanceState != null && savedInstanceState.get(SAVED_DEPARTURE_STATION) != null){
            // If found save variable
            spinner.setSelection(adapter.getPosition((String)savedInstanceState.get(SAVED_DEPARTURE_STATION)));
        } else {

            if(!value.isEmpty()) {
                spinner.setSelection(adapter.getPosition(value));
            }
        }

        // Set clicklistener for refresh button
        Button refresh = (Button) returnView.findViewById(R.id.refresh_content);
        if(refresh != null){
            refresh.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    // Get selected station
                    Spinner stations = (Spinner) returnView.findViewById(R.id.station_spinner);
                    String selectedStation = (String) stations.getSelectedItem();

                    // Call update method
                    ((MainActivity) Objects.requireNonNull(getActivity())).updateDepartures(stationManager.getStationShortCut(selectedStation));

                    Toast.makeText(getContext(), getResources().getString(R.string.refresh_message), Toast.LENGTH_SHORT).show();

                }
            });
        }

        return returnView;
    }

    @Override
    public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
        String clickedRow = (String)parent.getItemAtPosition(position);

        // Call update method
        ((MainActivity) Objects.requireNonNull(getActivity())).updateDepartures(stationManager.getStationShortCut(clickedRow));
    }

    /**
     * This method will save the instance before turning the phone to different layout
     * @param outState bundle
     */
    @Override
    public void onSaveInstanceState(@NonNull Bundle outState) {
        super.onSaveInstanceState(outState);
        Spinner stations = (Spinner) Objects.requireNonNull(getView()).findViewById(R.id.station_spinner);
        String selectedStation = (String) stations.getSelectedItem();
        
        if(selectedStation != null){
            outState.putSerializable(SAVED_DEPARTURE_STATION, selectedStation);
        }
    }

    @Override
    public void onNothingSelected(AdapterView<?> parent) {

    }
}
