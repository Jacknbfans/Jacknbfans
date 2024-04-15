//
//  FoodListView.swift
//  FoodPicker
//
//  Created by 侯羽 on 2024/4/15.
//

import SwiftUI

struct FoodListView: View {
    @State private var food = Food.examples
    @State private var selectedFood = Set<Food.ID>()
    
    var body: some View {
        VStack(alignment: .leading){
            titleBar
            
            List($food, editActions: .all, selection: $selectedFood){ food in
                Text(food.wrappedValue.name)
            }
            .listStyle(.plain)
            .padding(.horizontal)
            
        }
        .background(.groupBg)
        .safeAreaInset(edge: .bottom) {
            Button { } label: {
                Image(systemName: "plus.circle.fill")
                    .font(.system(size: 50))
                    .padding()
                    .symbolRenderingMode(.palette)
                    .foregroundStyle(.white, Color.accentColor.gradient)
            }
        }
    }
}

private extension FoodListView {
    var titleBar: some View {
        HStack{
            Label("foodList", systemImage: "fork.knife")
                .font(.title.bold())
                .foregroundColor(.accentColor)
                .frame(maxWidth: .infinity, alignment: .leading)
            
            EditButton()
                .buttonStyle(.bordered)
        }.padding()
    }
}

struct FoodListView_Previews: PreviewProvider {
    static var previews: some View {
        FoodListView()
    }
}
