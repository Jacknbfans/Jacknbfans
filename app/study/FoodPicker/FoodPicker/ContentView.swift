//
//  ContentView.swift
//  FoodPicker
//
//  Created by 侯羽 on 2024/4/4.
//

import SwiftUI

struct ContentView: View {
    @State private var selectedFood: Food?
    @State private var shouldShowInfo: Bool = false
    
    let food = Food.examples
    
    var body: some View {
        ScrollView{
            VStack(spacing: 30) {
                foodImage
                
                Text("What are eating today?").bold()
                
                selectedFoodInfoView
                
                Spacer().layoutPriority(1)
                
                selectedFoodButton
                
                cancelButton
            }
            .padding()
            .frame(maxWidth: .infinity, minHeight: UIScreen.main.bounds.height - 100)
            .font(.title)
            .mainButtonStyle()
            .animation(.mySpring, value: shouldShowInfo)
            .animation(.myEase, value: selectedFood)
        }.background(Color.bg2)
    }
}

//MARK:Subviews
private extension ContentView {
    var foodImage: some View {
        Group {
            if let selectedFood {
                Text(selectedFood.image)
                    .font(.system(size: 200))
                    .minimumScaleFactor(0.1)
                    .lineLimit(1)
            } else {
                Image("dinner")
                    .resizable()
                    .aspectRatio(contentMode: .fit)
            }
        }.frame(height:250)
    }
    
    var foodNameView: some View {
        HStack{
            Text(selectedFood!.name)
                .font(.largeTitle)
                .bold()
                .foregroundColor(.green)
                .id(selectedFood!.name)
                .transition(.delayInsertionOpacity)
            Button {
                shouldShowInfo.toggle()
            } label : {
                Image(systemName: "info.circle.fill").foregroundColor(.secondary)
            }.buttonStyle(.plain)
        }
    }
    
    var foodDetailView: some View {
        VStack{
            if shouldShowInfo {
                Grid(horizontalSpacing: 12, verticalSpacing: 12) {
                    GridRow {
                        Text("Protein")
                        Text("Fat")
                        Text("Carb")
                    }.frame(minWidth: 60)
                    
                    Divider()
                        .gridCellUnsizedAxes(.horizontal)
                        .padding(.horizontal, -10)
                    
                    GridRow {
                        Text(selectedFood!.$protein)
                        Text(selectedFood!.$fat)
                        Text(selectedFood!.$carb)
                    }
                }
                .font(.title3)
                .padding(.horizontal)
                .padding()
                .roundedRectBackground()
                .transition(.moveUpWithOpacity)
            }
        }
        .frame(maxWidth: .infinity)
        .clipped()
    }
    
    @ViewBuilder var selectedFoodInfoView: some View {
        if let selectedFood {
            foodNameView
            
            Text("Heat \(selectedFood.$calorie)").font(.title2)
            
            foodDetailView
        }
    }
    
    var selectedFoodButton: some View {
        Button{
            selectedFood = food.shuffled().first {
                $0 != selectedFood }
        } label: {
            Text(selectedFood == .none ? "tell me!" : "another").frame(width: 200)
                .animation(.none, value: selectedFood)
                .transformEffect(.identity)
        }.padding(.bottom, -15)
    }
    
    var cancelButton: some View {
        Button{
            selectedFood = .none
            shouldShowInfo = false
        } label: {
            Text("Reset").frame(width: 200)
        }.buttonStyle(.bordered)
    }
}

extension ContentView {
    init(selecteFood: Food){
        _selectedFood = State(wrappedValue: selecteFood)
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView(selecteFood: .examples.first!)
        ContentView(selecteFood: .examples.first!).previewDevice(.iPad)
        //ContentView(selecteFood: .examples.first!).previewDevice(.iPhoneSE)
    }
}
