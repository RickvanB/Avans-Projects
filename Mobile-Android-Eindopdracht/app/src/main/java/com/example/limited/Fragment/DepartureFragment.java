package com.example.limited.Fragment;


import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import android.widget.ProgressBar;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.example.limited.API.DepartureAdapter;
import com.example.limited.Interface.ApiReceiver;
import com.example.limited.Interface.DeparturesReceiver;
import com.example.limited.Model.DepartureListItem;
import com.example.limited.Manager.FavoriteManager;
import com.example.limited.Interface.DepartureListener;
import com.example.limited.Activity.MainActivity;
import com.example.limited.API.NS_Api;
import com.example.limited.R;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

public class DepartureFragment extends Fragment implements DepartureListener, DeparturesReceiver {

    private RecyclerView departureList;
    private FavoriteManager favoriteManager;
    private List<DepartureListItem> departureListItems;
    private final static String SAVED_INSTANCE_DEPARTURES = "SAVED_DEPARTURES";
    private ProgressBar loading;
    private View view;

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        view = inflater.inflate(R.layout.departure_fragment, container, false);

        // Set manager
        favoriteManager = new FavoriteManager(Objects.requireNonNull(getActivity()).getApplication());

        // Get Recycler view
        departureList = (RecyclerView) view.findViewById(R.id.departure_list);
        RecyclerView.LayoutManager layoutManager = new LinearLayoutManager(this.getContext());
        departureList.setLayoutManager(layoutManager);
        departureList.setAdapter(new DepartureAdapter());

        // Check if Save state instance has list of departures
        if(savedInstanceState != null &&savedInstanceState.get(SAVED_INSTANCE_DEPARTURES) != null){
            // If found load it to the recyclerView
            ArrayList<DepartureListItem> savedDepartures = (ArrayList<DepartureListItem>) savedInstanceState.get(SAVED_INSTANCE_DEPARTURES);

            this.setAdapter(savedDepartures);
        }

        // Set loading icon vissible
        loading = (ProgressBar) view.findViewById(R.id.loading);
        loading.setVisibility(View.VISIBLE);

        return view;
    }

    /**
     * This method will save the instance before turning the phone to different layout
     * @param outState
     */
    @Override
    public void onSaveInstanceState(@NonNull Bundle outState) {
        super.onSaveInstanceState(outState);
        if(departureListItems != null){
            outState.putSerializable(SAVED_INSTANCE_DEPARTURES, new ArrayList<>(departureListItems));
        }
    }

    /**
     * This method will set a new adpater to the recycler view
     * @param list
     */
    public void setAdapter(List<DepartureListItem> list) {
        // Save list in class
        departureListItems = list;

        // Add to recycler view
        final DepartureAdapter adapter = new DepartureAdapter();
        adapter.setDepartureList(list);

        // Set Onclick listener
        adapter.setOnItemClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v){
                RecyclerView.ViewHolder viewHolder = (RecyclerView.ViewHolder) v.getTag();
                DepartureListItem item = adapter.getItem(viewHolder.getAdapterPosition());

                onClickEvent(item);
            }
        });

        // Set on Long click listener
        adapter.setOnLongItemClickListener(new View.OnLongClickListener() {
            @Override
            public boolean onLongClick(View v) {

            if(favoriteManager != null){
                RecyclerView.ViewHolder viewHolder = (RecyclerView.ViewHolder) v.getTag();

                DepartureListItem item = adapter.getItem(viewHolder.getAdapterPosition());

                // Save new favorite if not already saved otherwise remove favorite
                if(!favoriteManager.addTravel(item)){
                    // Then remove
                    favoriteManager.removeTravel(item);

                    // Show message removed
                    Toast.makeText(getContext(), R.string.removed_from_favorite, Toast.LENGTH_SHORT).show();

                    // Update list
                    setAdapter(favoriteManager.getTravels().getFavoriteTravels());
                } else{
                    // Show message saved
                    Toast.makeText(getContext(), R.string.saved_to_favorite, Toast.LENGTH_SHORT).show();
                }
            }
                return true;
            }
        });

        departureList.setAdapter(adapter);

        // Hide loading window
        loading.setVisibility(View.GONE);
    }

    @Override
    public void updateDepartures(String stationShortCut) {
        loading.setVisibility(View.VISIBLE);
        NS_Api api = new NS_Api(Objects.requireNonNull(this.getActivity()).getApplication());
        api.GetAsyncDepartures(this, stationShortCut);
    }

    @Override
    public void onClickEvent(DepartureListItem item) {
        ((MainActivity) Objects.requireNonNull(getActivity())).onClickEvent(item);
    }

    @Override
    public void receiveContent(List<DepartureListItem> items) {
        this.setAdapter(items);
    }

    @Override
    public void reportFailure(String message) {
        if(message.equals("INTERNET")){
            loading.setVisibility(View.GONE);
            Toast.makeText(this.getContext(), R.string.no_internet, Toast.LENGTH_SHORT).show();
        }
    }
}

