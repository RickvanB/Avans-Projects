package com.example.limited.Fragment;

import android.content.Intent;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;

import androidx.fragment.app.Fragment;

import com.example.limited.Activity.MainActivity;
import com.example.limited.R;
import com.example.limited.Activity.SavedTravelsActivity;

public class NavigationFragment extends Fragment implements View.OnClickListener{

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        View view = inflater.inflate(R.layout.navigation_fragment, container, false);

        final Button savedTravels = (Button)view.findViewById(R.id.saved_travels);
        if(savedTravels != null){
            savedTravels.setOnClickListener(this);
        }

        return view;

    }

    @Override
    public void onClick(View v) {
        Intent viewDetails = new Intent(((MainActivity)getActivity()), SavedTravelsActivity.class);
        startActivity(viewDetails);
    }
}
