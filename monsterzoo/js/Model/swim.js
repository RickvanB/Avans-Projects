export default class AbleToSwim {

    canSwimSrc(canSwim) {
        let src = "";

        switch (canSwim) {
            case "Ja":
                src = "/images/swim/canswim.jpg";
                break;
            case "Nee":
                src = "/images/swim/cantswim.png";
                break;
        }

        return src;
    }
}