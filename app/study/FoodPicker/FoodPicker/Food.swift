//
//  Food.swift
//  FoodPicker
//
//  Created by 侯羽 on 2024/4/8.
//
import Foundation

struct Food: Equatable, Identifiable {
    let id = UUID()
    
    var name: String
    var image: String
    @Suffix("Kcal") var calorie: Double = .zero
    @Suffix("g") var carb: Double = .zero
    @Suffix("g") var fat: Double = .zero
    @Suffix("g") var protein: Double = .zero
    
    static let examples = [
        Food(name:"Hamburger", image:"🍔", calorie: 294, carb: 14, fat:24, protein: 17),
        Food(name:"salad",image:"🥗", calorie: 89, carb: 20, fat:0, protein: 1.8),
        Food(name:"Pizza",image:"🍝", calorie: 266, carb: 33, fat:10, protein: 11),
        Food(name:"spaghetti",image:"🥖", calorie: 339, carb: 74, fat:1.1, protein: 12),
        Food(name:"ChickenBento",image:"🍖🥟", calorie: 191, carb: 19, fat:8.1, protein: 11.7),
        Food(name:"SlicedNoodles",image:"🥣", calorie: 256, carb: 56, fat:1, protein: 8),
        Food(name:"hotPot",image:"🥩", calorie: 233, carb: 26.5, fat:17, protein: 22),
        Food(name:"beefNoodles",image:"🍱🍢", calorie: 219, carb: 33, fat:5, protein: 9),
        Food(name:"KantoCooking",image:"🍣", calorie: 84, carb: 4, fat:4, protein: 6)
    ]
}


