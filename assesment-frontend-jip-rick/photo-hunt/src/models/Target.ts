import {Location} from './Location'
import {User} from './User'
import {Review} from './Review'
import {Score} from './Score'

export class Target {
    public _id: string;
    public name: string;
    public location: Location;
    public imagePath: string;
    public user: string;
    public reviews: Review[];
    public score: Score[];
    
    public thumpsUp: Number;
    public thumpsDown: Number;
}