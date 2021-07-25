package com.example.limited.Manager;

import android.content.res.Resources;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;

import com.example.limited.Model.Train;
import com.example.limited.R;

import java.util.ArrayList;
import java.util.List;

public class TrainTypeManager {

    // Main train types
    private static final String FLIRT = "Flirt";
    private static final String SNG = "SNG";
    private static final String SLT = "SLT";
    private static final String SGM = "SGMM";
    private static final String ICM = "ICM";
    private static final String DDZ = "DDZ";
    private static final String VIRM = "VIRM";
    private static final String ICD = "ICD";
    private static final String ICE = "ICE";
    private static final String THALYS = "THALYS";
    private static final String ARRIVA = "Arriva";
    private static final String NSI = "DB";
    private static final String PROTOS = "PROTOS";
    private static final String BRENG = "GTW";

    // Sub train Types with length
    private static final String FLIRT_3 = "Flirt 3 FFF";
    private static final String FLIRT_4 = "Flirt 4 FFF";
    private static final String FLIRT_2 = "Flirt 2 ARR";
    private static final String SNG_3 = "SNG 3";
    private static final String SNG_4 = "SNG 4";
    private static final String SLT_4 = "SLT 4";
    private static final String SLT_6 = "SLT 6";
    private static final String SGMM_2 = "SGMM 2";
    private static final String SGMM_3 = "SGMM 3";
    private static final String ICM_3 = "ICM 3";
    private static final String ICM_4 = "ICM 4";
    private static final String DDZ_4 = "DDZ 4";
    private static final String DDZ_6 = "DDZ 6";
    private static final String VIRM_4 = "VIRM IV";
    private static final String VIRM_4_M = "VIRMm1 IV";
    private static final String VIRM_6 = "VIRM VI";
    private static final String VIRM_6_M = "VIRMm1 VI";
    private static final String GWT_2_8 = "GTW 2/8 Breng";
    private static final String GWT_3 = "GTW 2/8 Arriva";

    private Resources resources;

    public TrainTypeManager(Resources resources){
        this.resources = resources;
    }


    /**
     * this method will return a list of correct train parts
     * @param train train object
     * @return list with images of the train
     */

    public List<Bitmap> getTrainImages(Train train){

        List<Bitmap> trainImages = new ArrayList<>();

        int l = train.getLength();
        ArrayList<String> t = train.getPartTypes();

        switch(train.getType()){
            case FLIRT:
                if(train.getOwnerCompany().equals(ARRIVA)){
                    for(int i = 0; i < t.size(); i++) {
                        if (t.get(i).equals(FLIRT_2)) {
                            trainImages.add(BitmapFactory.decodeResource(resources, R.drawable.flirt_a_2));
                        }
                    }
                } else{
                    for(int i = 0; i < t.size(); i++){
                        if(t.get(i).equals(FLIRT_3)){
                            trainImages.add(BitmapFactory.decodeResource(resources, R.drawable.flirt_3));
                        } else if(t.get(i).equals(FLIRT_4)){
                            trainImages.add(BitmapFactory.decodeResource(resources, R.drawable.flirt_4));
                        }
                    }
                }
                break;
            case SNG:
                for(int i = 0; i < t.size(); i++){
                    if(t.get(i).equals(SNG_3)){
                        trainImages.add(BitmapFactory.decodeResource(resources, R.drawable.sng_3));
                    } else if(t.get(i).equals(SNG_4)){
                        trainImages.add(BitmapFactory.decodeResource(resources, R.drawable.sng_4));
                    }
                }
                break;
            case SLT:
                for(int i = 0; i < t.size(); i++){
                    if(t.get(i).equals(SLT_4)){
                        trainImages.add(BitmapFactory.decodeResource(resources, R.drawable.slt_4));
                    } else if(t.get(i).equals(SLT_6)){
                        trainImages.add(BitmapFactory.decodeResource(resources, R.drawable.slt_6));
                    }
                }
                break;
            case SGM:
                for(int i = 0; i < t.size(); i++){
                    if(t.get(i).equals(SGMM_2)){
                        trainImages.add(BitmapFactory.decodeResource(resources, R.drawable.sgmm_2));
                    } else if(t.get(i).equals(SGMM_3)){
                        trainImages.add(BitmapFactory.decodeResource(resources, R.drawable.sgmm_3));
                    }
                }
                break;
            case ICM:
                for(int i = 0; i < t.size(); i++){
                    if(t.get(i).equals(ICM_3)){
                        trainImages.add(BitmapFactory.decodeResource(resources, R.drawable.icm_3));
                    } else if(t.get(i).equals(ICM_4)){
                        trainImages.add(BitmapFactory.decodeResource(resources, R.drawable.icm_4));
                    }
                }
                break;
            case DDZ:
                for(int i = 0; i < t.size(); i++){
                    if(t.get(i).equals(DDZ_4)){
                        trainImages.add(BitmapFactory.decodeResource(resources, R.drawable.ddz_4));
                    } else if(t.get(i).equals(DDZ_6)){
                        trainImages.add(BitmapFactory.decodeResource(resources, R.drawable.ddz_6));
                    }
                }
                break;
            case VIRM:
                for(int i = 0; i < t.size(); i++){
                    if(t.get(i).equals(VIRM_4)){
                        trainImages.add(BitmapFactory.decodeResource(resources, R.drawable.virm_4));
                    } else if(t.get(i).equals(VIRM_4_M)){
                        trainImages.add(BitmapFactory.decodeResource(resources, R.drawable.virmm_4));
                    }
                    else if(t.get(i).equals(VIRM_6)){
                        trainImages.add(BitmapFactory.decodeResource(resources, R.drawable.virm_6));
                    }
                    else if(t.get(i).equals(VIRM_6_M)){
                        trainImages.add(BitmapFactory.decodeResource(resources, R.drawable.virmm_6));
                    }
                }
                break;
            case BRENG:
                for(int i = 0; i < t.size(); i++){
                    if(t.get(i).equals(GWT_2_8)){
                        trainImages.add(BitmapFactory.decodeResource(resources, R.drawable.breng_3));
                    } else if (t.get(i).equals(GWT_3)){
                        trainImages.add(BitmapFactory.decodeResource(resources, R.drawable.gtw_2));
                    }
                }
                break;
            case ICD:
                if(l == 7){
                    trainImages.add(BitmapFactory.decodeResource(resources, R.drawable.traxx));
                    trainImages.add(BitmapFactory.decodeResource(resources, R.drawable.icd_7));
                    trainImages.add(BitmapFactory.decodeResource(resources, R.drawable.traxx));
                } else if(l == 9){
                    trainImages.add(BitmapFactory.decodeResource(resources, R.drawable.traxx));
                    trainImages.add(BitmapFactory.decodeResource(resources, R.drawable.icd_9));
                    trainImages.add(BitmapFactory.decodeResource(resources, R.drawable.traxx));
                }
                break;
                case ICE:
                    if(l == 8){
                        trainImages.add(BitmapFactory.decodeResource(resources, R.drawable.ice));
                    } else if(l == 16){
                        trainImages.add(BitmapFactory.decodeResource(resources, R.drawable.ice));
                        trainImages.add(BitmapFactory.decodeResource(resources, R.drawable.ice));
                    }
                    break;
            case THALYS:
                if(l == 8){
                    trainImages.add(BitmapFactory.decodeResource(resources, R.drawable.thalys));
                } else if(l == 16){
                    trainImages.add(BitmapFactory.decodeResource(resources, R.drawable.thalys));
                    trainImages.add(BitmapFactory.decodeResource(resources, R.drawable.thalys));
                }
                break;
            case NSI:
                trainImages.add(BitmapFactory.decodeResource(resources, R.drawable.ns1700));
                trainImages.add(BitmapFactory.decodeResource(resources, R.drawable.nsi));
                break;
            case PROTOS:
                if(l == 2){
                    trainImages.add(BitmapFactory.decodeResource(resources, R.drawable.cprotos));
                } else if(l == 4){
                    trainImages.add(BitmapFactory.decodeResource(resources, R.drawable.cprotos));
                    trainImages.add(BitmapFactory.decodeResource(resources, R.drawable.cprotos));
                }
                break;
            default:
                break;
        }

        return trainImages;
    }
}
