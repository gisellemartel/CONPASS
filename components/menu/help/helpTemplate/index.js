import React, { Component } from 'react';
import {
View, Text, Image, TouchableOpacity, Animated
} from 'react-native';
import styles from './styles';
import arrow from '../../../../assets/icons/downarrow.png'

const titles = ['Guide to CONPASS', 'Accessibility'];

export default class HelpTemplate extends Component{
constructor (props) {
    super(props);
    this.state = {
        toggle: true,
        title: props.title
    }
}

pressToggle(){

}

render() {
    return (
    <View style={styles.container}>
        <View style = {styles.topicElement}>
            <Text style = {styles.TextStyle}> {this.state.title} </Text>
            <TouchableOpacity>
            <Image style={styles.arrowStyle} source={arrow} />
            </TouchableOpacity>
         </View>
         <View style = {styles.topicText}>
            {this.props.children}
         </View>
    </View>
);
}
}



/*        {<View style = {styles.topicElement}>
      //      {/* Temp styling fix */ 
       //     <Text style = {styles.TextStyle}> Accessibility {"            "} </Text>
        //    <TouchableOpacity >
         //   <Image style={styles.arrowStyle} source={arrow} />
          //  </TouchableOpacity>
       // </View>} */