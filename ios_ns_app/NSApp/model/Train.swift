//
//  Train.swift
//  NSApp
//
//  Created by Ruud on 14/03/2020.
//  Copyright © 2020 Rick van Beek. All rights reserved.
//

import Foundation

struct Train : Codable {
    var type : String?
    var vervoerder : String?
    var spoor : String?
    var lengte : Int?
    var lengteInMeters : Int?
    var ritnummer : Int?
    var materieeldelen : [materialTypes]?
}

struct materialTypes : Codable {
    var materieelnummer : Int?
    var type : String?
    var faciliteiten : Array<String>?
    var afbeelding : String
    var breedte : Int?
    var hoogte : Int?
    var bakken : [bakken]
}

struct bakken : Codable {
    var afbeelding : afbeelding?
}

struct afbeelding : Codable {
    var url : String?
    var breedte : Int?
    var hoogte : Int?
}


