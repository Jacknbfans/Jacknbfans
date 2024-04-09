//
//  ContentView.swift
//  FoodPicker
//
//  Created by 侯羽 on 2024/4/4.
//

import SwiftUI


struct ContentView: View {
    let food = Food.examples
    @State private var selectedFood: Food?
  
    var body: some View {
        ScrollView{
            VStack(spacing: 30) {
                Group {
                    if selectedFood != .none{
                        Text(selectedFood!.image)
                            .font(.system(size: 200))
                            .minimumScaleFactor(0.1)
                            .lineLimit(1)
                    } else {
                        Image("dinner")
                            .resizable()
                            .aspectRatio(contentMode: .fit)
                    }
                }.frame(height:250)
                
                Text("What are eating today?")
                    .bold()
                
                if selectedFood != .none {
                    HStack{
                        Text(selectedFood!.name)
                            .font(.largeTitle)
                            .bold()
                            .foregroundColor(.green)
                            .id(selectedFood!.name)
                            .transition(.asymmetric(
                                insertion: .opacity.animation(.easeInOut(duration: 0.5).delay(0.2)),
                                removal: .opacity.animation(.easeInOut(duration: 0.4))))
                        Image(systemName: "info.circle.fill")
                            .foregroundColor(.secondary)
                    }
                    
                    Text("Heat \(selectedFood!.calorie.formatted()) Kcal")
                        .font(.title2)
                    
                    HStack {
                        VStack(spacing: 12){
                            Text("Protein")
                            Text(selectedFood!.protein.formatted() + " g")
                        }
                        
                        Divider().frame(width: 1).padding(.horizontal)
                        
                        VStack(spacing: 12){
                            Text("Fat")
                            Text(selectedFood!.fat.formatted() + " g")
                        }
                        
                        Divider().frame(width: 1).padding(.horizontal)
                        
                        VStack(spacing: 12){
                            Text("Carb")
                            Text(selectedFood!.carb.formatted() + " g")
                        }
                    }
                    .font(.title3)
                    .padding(.horizontal)
                    .padding()
                    .background(RoundedRectangle(cornerRadius: 8).foregroundColor(Color(.systemBackground)))
                    
                    Grid(horizontalSpacing: 40, verticalSpacing: 12) {
                        GridRow {
                            Text("Protein")
                            Text("Fat")
                            Text("Carb")
                        }
                        
                        Divider()
                            .gridCellUnsizedAxes(.horizontal)
                            .padding(.horizontal, -10)
                        
                        GridRow {
                            Text(selectedFood!.protein.formatted() + " g")
                            Text(selectedFood!.fat.formatted() + " g")
                            Text(selectedFood!.carb.formatted() + " g")
                        }
                    }
                    .font(.title3)
                    .padding(.horizontal)
                    .padding()
                    .background(RoundedRectangle(cornerRadius: 8).foregroundColor(Color(.systemBackground)))
                    
                }
                
                Spacer().layoutPriority(1)
                
                Button{
                    selectedFood = food.shuffled().first {
                        $0 != selectedFood }
                } label: {
                    Text(selectedFood == .none ? "tell me!" : "another").frame(width: 200)
                        .animation(.none, value: selectedFood)
                        .transformEffect(.identity)
                }.padding(.bottom, -15)
                
                Button{
                    selectedFood = .none
                } label: {
                    Text("Reset").frame(width: 200)
                }.buttonStyle(.bordered)
            }
            .padding()
            .frame(maxWidth: .infinity, minHeight: UIScreen.main.bounds.height - 100)
            .font(.title)
            .buttonStyle(.borderedProminent)
            .buttonBorderShape(.capsule)
            .controlSize(.large)
            .animation(.easeOut(duration: 0.6), value: selectedFood)
        }.background(Color(.secondarySystemBackground))
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
        //ContentView(selecteFood: .examples.first!).previewDevice(.iPad)
        //ContentView(selecteFood: .examples.first!).previewDevice(.iPhoneSE)
    }
}
