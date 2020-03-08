import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    position: 'absolute', 
    top: 0, 
    backgroundColor: 'white', 
    width: '100%', 
    height: 160, 
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
  },

  startBar:{
    alignItems: 'center', 
    width:'500%'
  },
  
  destinationBar: {
    alignItems: 'center', 
    width:'500%'
  },

});

export default styles;
