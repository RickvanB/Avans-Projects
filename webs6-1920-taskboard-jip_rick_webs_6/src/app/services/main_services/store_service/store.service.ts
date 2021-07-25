import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private storedValues : Map<string, any>;

  constructor() {
    this.storedValues = new Map();
  }

  /**
   * This method will add a value to the dictionary
   * @param value 
   */
  setValue(key, value){
    this.storedValues.set(key, value);
  }

    /**
   * This method will get a value from the dictionary
   * @param value 
   */
  getValue(key) : any{
    return this.storedValues.get(key);
  }

  /**
   * This method will delete an existing key
   * @param key 
   */
  removeValue(key){
    this.storedValues.delete(key);
  }
}
