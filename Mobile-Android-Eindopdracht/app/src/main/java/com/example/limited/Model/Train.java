package com.example.limited.Model;

import android.graphics.Bitmap;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

public class Train implements Serializable {

    private String type;
    private String ownerCompany;
    private String specifiedType;
    private String imageUrl;
    private String materialCodes;

    private int trainCode;
    private int length;
    private boolean shorter;
    private ArrayList<String> partTypes;

    private List<Bitmap> trainImages;

    public Train(String type, String ownerCompany, int trainCode, String specifiedType, boolean shorter, int length, List<Bitmap> trainImages, String materialCodes, ArrayList<String> partTypes) {
        this.type = type;
        this.ownerCompany = ownerCompany;
        this.trainCode = trainCode;
        this.specifiedType = specifiedType;
        this.shorter = shorter;
        this.length = length;
        this.trainImages = trainImages;
        this.materialCodes = materialCodes;
        this.partTypes = partTypes;
    }

    public String getType() {
        return type;
    }

    public String getOwnerCompany() {
        return ownerCompany;
    }

    public int getTrainCode() {
        return trainCode;
    }

    public String getSpecifiedType() {
        return specifiedType;
    }

    public boolean isShorter() {
        return shorter;
    }

    public int getLength() {
        return length;
    }

    public List<Bitmap> getTrainImages() {
        return trainImages;
    }

    public void setTrainImages(List<Bitmap> trainImages) {
        this.trainImages = trainImages;
    }

    public String getMaterialCodes() {
        if(materialCodes.isEmpty()){
            return "Onbekend";
        }
        return materialCodes;
    }

    public ArrayList<String> getPartTypes() {
        return partTypes;
    }
}
