package com.example.limited.Fragment;


import android.annotation.SuppressLint;
import android.graphics.Bitmap;
import android.os.Bundle;

import androidx.fragment.app.Fragment;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;

import com.example.limited.Interface.ContentSetter;
import com.example.limited.Model.DepartureListItem;
import com.example.limited.R;
import com.example.limited.Manager.TrainTypeManager;

import java.util.Objects;


/**
 * A simple {@link Fragment} subclass.
 */
public class DetailsProductDetailsFragment extends Fragment  implements ContentSetter {

    private View view;
    private TrainTypeManager trainTypeManager;

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        view = inflater.inflate(R.layout.details_product_details_fragment, container, false);

        return view;
    }

    @SuppressLint("SetTextI18n")
    @Override
    public void setContent(DepartureListItem item) {
        if(item != null && item.getPlannedTrain() != null){
            TextView type = (TextView) view.findViewById(R.id.product_type);
            TextView productNumber = (TextView) view.findViewById(R.id.product_number);
            TextView length = (TextView) view.findViewById(R.id.length);


            type.setText(item.getPlannedTrain().getType());
            productNumber.setText("" + item.getPlannedTrain().getMaterialCodes());
            length.setText("" + item.getPlannedTrain().getLength());

            // Create new managers instance
            if(trainTypeManager == null){
                trainTypeManager = new TrainTypeManager(Objects.requireNonNull(getContext()).getResources());
            }

            // Get train images
            item.getPlannedTrain().setTrainImages(trainTypeManager.getTrainImages(item.getPlannedTrain()));

            // Set train Images
            if(item.getPlannedTrain().getTrainImages() != null){
                for(int i = 0; i < item.getPlannedTrain().getTrainImages().size(); i++){
                    ImageView trainView = new ImageView(getContext());
                    trainView.setLayoutParams(new ViewGroup.LayoutParams(ViewGroup.LayoutParams.WRAP_CONTENT, ViewGroup.LayoutParams.WRAP_CONTENT));
                    trainView.setImageBitmap(Bitmap.createScaledBitmap(item.getPlannedTrain().getTrainImages().get(i), item.getPlannedTrain().getTrainImages().get(i).getWidth() /3 , item.getPlannedTrain().getTrainImages().get(i).getHeight() / 3, false));
                    trainView.setScaleType(ImageView.ScaleType.FIT_START);

                    LinearLayout imageViewer = (LinearLayout)view.findViewById(R.id.imageViewer);

                    if(imageViewer != null){
                        imageViewer.addView(trainView);
                    }
                }
            }

        }
    }
}
