package com.example.limited.Fragment;


import android.annotation.SuppressLint;
import android.os.Bundle;

import androidx.fragment.app.Fragment;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.TextView;

import com.example.limited.Activity.DepartureDetailActivity;
import com.example.limited.Interface.ContentSetter;
import com.example.limited.Model.DepartureListItem;
import com.example.limited.R;

import java.util.Objects;

public class DetailsHeaderFragment extends Fragment implements ContentSetter {

    private View view;

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        view = inflater.inflate(R.layout.details_header_fragment, container, false);

        // Set onclick listener
        Button exportToAgenda = (Button) view.findViewById(R.id.export_to_agenda);

        if(exportToAgenda != null){
            exportToAgenda.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    // Call export method
                    ((DepartureDetailActivity) Objects.requireNonNull(getActivity())).exportToAgenda();
                }
            });
        }

        // Set onclick listener
        Button exportToSMS = (Button) view.findViewById(R.id.export_to_contact);

        if(exportToSMS != null){
            exportToSMS.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    // Call export method
                    ((DepartureDetailActivity) Objects.requireNonNull(getActivity())).addHelpdeskToContacts();
                }
            });
        }

        return view;
    }

    /*
        This method will set the content of this fragment
         */
    @SuppressLint("SetTextI18n")
    @Override
    public void setContent(DepartureListItem item) {
        if(item != null && item.getPlannedTrain() != null){
            TextView rideNumber = (TextView) view.findViewById(R.id.train_ride_number);
            rideNumber.setText("" + item.getPlannedTrain().getTrainCode());
        }

        if(item != null){
            TextView type = (TextView) view.findViewById(R.id.trainType);
            TextView trainDirection = (TextView) view.findViewById(R.id.direction);
            type.setText(item.getShort_train_type());
            trainDirection.setText(item.getDirection());
        }

    }
}
