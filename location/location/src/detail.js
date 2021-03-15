import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  Dimensions,
  ImageBackground,
} from 'react-native';
import Geocoder from 'react-native-geocoding';

import MapView, { Marker, PROVIDER_GOOGLE} from 'react-native-maps';


const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;


class DetailScreen extends Component {
  constructor(props){
    super(props);

    this.state = {
      data: this.props.route.params.data,
      address: this.props.route.params.alladdress,
      dist: this.props.route.params.dist,
      location: {"lat": 0, "lng":0},

    }

  }


  componentDidMount(){
    Geocoder.from(this.state.address)
        .then(json => {
            var location = json.results[0].geometry.location;
            this.setState({
              location:location,
            })
            console.log(location);
        })
        .catch(error => console.warn(error));
  }

  render(){

    console.log(this.state.data);
    console.log(this.state.address);

    var frmaddress=this.state.address.split(",");
    frmaddress = frmaddress[frmaddress.length-1]

    return(
      <View style={{flex:1}}>

        <View style={{width:'100%', height:60, elevation:2, justifyContent:'center', backgroundColor:'lightblue'}}>
          <Text style={{fontSize:26, marginLeft:20, fontWeight:'bold'}}>Detail</Text>
        </View>

        <ScrollView>
          <ImageBackground
            source={require('./images/meat-3.png')}
            style={{width:'100%', height:300, resizeMode:'stretch'}}
          >


              <View style={{flex:1}}></View>
              <View style={{width:'100%', height:80, backgroundColor:"rgba(0,0,0,0.5)", flexDirection:'row'}}>
                <View style={{flex:1}}>
                  <Text style={{fontSize:18, color:'#fff', fontWeight:'bold', marginTop:10, marginLeft:10}}>{this.state.data.name}</Text>
                  <Text style={{fontSize:14, color:'#fff', fontWeight:'bold', marginTop:10, marginLeft:10}}>{frmaddress}</Text>
                </View>
                <View style={{marginRight:10, justifyContent:'center'}}>
                  <Text style={{fontSize:18, color:'#fff', fontWeight:'bold', marginTop:10, marginLeft:10}}>{this.state.dist}</Text>
                </View>

              </View>

          </ImageBackground>

          <View style={{marginLeft:10, marginTop:10, flexDirection:'row'}}>
            <Text style={{fontSize:12, fontWeight:'bold', marginTop:10, marginLeft:10}}>Adres:</Text>
            <Text style={{fontSize:12, marginTop:10, marginLeft:10}}>{this.state.address}</Text>
          </View>

          <View style={{marginLeft:10, marginTop:10, flexDirection:'row'}}>
            <Text style={{fontSize:12, fontWeight:'bold', marginTop:10, marginLeft:10}}>Min sipariş:</Text>
            <Text style={{fontSize:12, marginTop:10, marginLeft:10}}>{this.state.data.minsiparis} TL</Text>
          </View>

          {this.state.location.lat !== 0 && this.state.location.lng !== 0 ?
            <View style={{width:WIDTH-20, height:WIDTH-20, margin:10}}>
            <MapView
              style={{flex:1}}
              provider={PROVIDER_GOOGLE}
              region={{
                latitude: this.state.location.lat,
                longitude: this.state.location.lng,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              >
                <Marker
                  coordinate={{latitude:this.state.location.lat, longitude: this.state.location.lng}}
                  title="Nokta"
                  description="Nokta"
                />
              </MapView>
            </View>

            :

            null
          }


        </ScrollView>
      </View>

    );
  }
}


export default DetailScreen;
