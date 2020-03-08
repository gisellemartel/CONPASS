import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    position: 'absolute',
    top: 25,
    width:'95%',
    
    borderRadius: 10
  },
  view: {
    borderRadius: 15
  },
  Bar: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  Touch: {
    color: '#AFB9C4',
    borderWidth: 1,
    padding: 10,
    margin: 1,
    borderRadius: 5,
  },
  sug: {
    backgroundColor: '#F1F7FC',
    height: '100%',
  },
  suggestions: {
    color: 'black',
    padding: 5,
    width: '90%',
    borderWidth: 0.5,
    marginLeft: 5,
    marginRight: 5,
  },
  SearchBar: {
     
      
      height: 40,
      color:'#9CD3D7',
      backgroundColor:'#9CD3D7',
      borderColor: '#9CD3D7',
      borderWidth: 1,
      borderRadius:10,
      borderWidth:2
  },
  burger: {
    width: 20,
    resizeMode: 'contain',
  }
});

export default styles;
