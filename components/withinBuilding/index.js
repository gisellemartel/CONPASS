import React, { Component } from 'react';
import {
  View, Keyboard, TouchableOpacity, Text
} from 'react-native';
import { render } from 'react-dom';
import GeoFencing from 'react-native-geo-fencing';

export default class WithinBuilding extends Component {

    constructor(props) {
        super(props);
        this.state = {
            xCoordinates: [-73.578062,-73.578638, -73.577702, -73.577063],
            yCoordinates: [45.497284,45.496698, 45.496227, 45.496862],
            xPoint: -73.58906809999999,
            yPoint: 45.4969778,
        }
    }

  
    pnpoly(nvert, vertx, verty, testx, testy)
    {
        var i, j, c = 0;
        for (i = 0, j = nvert-1; i < nvert; j = i++) {
            if ( ((verty[i]>testy) != (verty[j]>testy)) &&
            (testx < (vertx[j]-vertx[i]) * (testy-verty[i]) / (verty[j]-verty[i]) + vertx[i]) )
            c = !c;
        }
        console.log('--->'+c);
    }

  render(){
      //this.state

    this.pnpoly(4, this.state.xCoordinates, this.state.yCoordinates, this.state.xPoint, this.state.yPoint);
    return(
      <View>
        
      </View>
    );
  }
}
