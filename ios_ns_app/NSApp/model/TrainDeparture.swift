//
//  TrainDeparture.swift
//  NSApp
//
//  Created by Ruud on 14/03/2020.
//  Copyright © 2020 Rick van Beek. All rights reserved.
//

import Foundation

struct TrainDeparture : Codable {
    var payload : payload?
}

struct payload : Codable {
    var departures : [departures]
}

struct departures : Codable {
    var direction : String
    var name: String
    var plannedDateTime : String
    var actualDateTime : String
    var plannedTrack : String
    var actualTrack : String?
    var plannedTrain : String?
    var trainCategory : String
    var cancelled : Bool
    var routeStations : [routestations]?
    var departureStatus : String
    var product : product?
    var notifications : [messages]?
}

struct product : Codable {
    var number : String
    var categoryCode : String
    var shortCategoryName : String
    var longCategoryName : String
    var operatorCode : String
    var operatorName : String
    var type : String
}

struct routestations : Codable {
    var uicCode : String
    var mediumName : String
}

struct messages : Codable {
    var message : String
    var style : String
}
