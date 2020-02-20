import { StyleSheet } from 'react-native';
import colors from 'app/globalStyles/colors.styles.js';//import not working

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    position: 'absolute',
    top:25,
    width:'95%',
    height: 40,
    borderRadius: 10
  },
  searchBar: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection:'row',
    alignItems:'center',    
  },
  burger: {
    resizeMode:'contain',
    width: 25,
    height:250,
    margin:10
  },
  searchBarText :{
    fontSize: 20,
    color: 'grey'
  },
});

export default styles;
