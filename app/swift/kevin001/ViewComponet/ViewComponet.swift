//
//  ContentView.swift
//  kevin001
//
//  Created by 侯羽 on 2023/8/23.
//

import SwiftUI

struct ViewComponet: View {
    var body: some View {
        VStack {
            Image(systemName: "globe")
                .imageScale(.large)
                .foregroundColor(.accentColor)
            Text("Hello, kevin666")
        }
        .padding()
    }
}

struct ViewComponet_Previews: PreviewProvider {
    static var previews: some View {
        ViewComponet()
    }
}

