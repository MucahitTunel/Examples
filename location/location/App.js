import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  Dimensions,
  TouchableOpacity,
  PermissionsAndroid,
  Animated,
} from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import RNGooglePlaces from 'react-native-google-places';

import { getDistance, getPreciseDistance } from 'geolib';
import Geocoder from 'react-native-geocoding';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import DetailScreen from './src/detail';
const Stack = createStackNavigator();


const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;



var data = [
  {name: "Pizza Locale", address:"Kültür, 1390. Sk. No 5 D:B, 35220 Konak/İzmir", minsiparis:35, dist:"0", key:0},
  {name: "Alibaba Fırın Kebap",address:"Şemsitebrizi, Şeref Şirin Sk. 5-A, 42010 Karatay/Konya",  minsiparis:15, dist:"0", key:1},
  {name: "Urfalı Kebapçı",address:"Hacettepe, Dumlupınar Cd. No:8 D:B, 06230 Altındağ/İstanbul",  minsiparis:65, dist:"0", key:2},
  {name: "Hacıoğlu Pidecim",address:"Konuksever, 822. Sk. Kardelen Apt D:14/1, 07010 Muratpaşa/Antalya",  minsiparis:85, dist:"0", key:3},
]



class Home extends React.Component {
  constructor(props) {
    super(props);


    this.kontrol = 0;

    Geocoder.init("AIzaSyD9PtwyiNd3Oa8JmmI6q3ThcagO7PkUZGI"); // use a valid API key




    this.state = {
      location: null,
      datas: data,
      address: [],
      hereaddress: "",
      login: true,
    }
  }

  distance = async (here, v, k) => {

    console.log("distance");
    var BaseLocation = here;
    var TargetLocation = v.address;

    let ApiURL = "https://maps.googleapis.com/maps/api/distancematrix/json?";
    let params = `origins=${BaseLocation}&destinations=${TargetLocation}&key=AIzaSyD9PtwyiNd3Oa8JmmI6q3ThcagO7PkUZGI`;
    let finalApiURL = `${ApiURL}${encodeURI(params)}`;

    try {
        let response =  await fetch(finalApiURL);
        let responseJson = await response.json();
        var datas = this.state.datas;

        datas[k].dist = responseJson.rows[0].elements[0].distance.text;
        this.setState({
          datas: datas,
        })

    } catch(error) {
        console.error(error);
    }
  }


  componentDidMount(){

    this.loginpage = setTimeout(this.wait, 5000);
    this.getPlaces();


  }

  componentWillUnmount(){
    clearInterval(this.loginpage);
  }


  getPlaces = () => {
    var veri = this.state.datas;

    RNGooglePlaces.getCurrentPlace()
    .then((results) => {

      var adres = results[0].address

      veri.map((v,k) => {
        this.distance(adres, v,k)
      })
      console.log(results);
      this.setState({hereaddress:results[0].address})

    })
    .catch((error) => console.log(error));
  }




  wait = () => {
    this.setState({
      login: false,
    })
  }


  list = () => {
    console.log("verilerrrrrrrrrrrrr");

    var veriler = this.state.datas;
    console.log(veriler);

    console.log("************************************************");
    for(let i=0; i <veriler.length-1; i++){
      for(let j=i+1; j<veriler.length; j++){

        var ilk = veriler[i].dist.split(" ");
        ilk = parseInt(ilk[0]);


        var son = veriler[j].dist.split(" ");
        son = parseInt(son[0]);


        if(son < ilk){
          var temp = veriler[i];
          veriler[i] = veriler[j];
          veriler[j] = temp;
        }

        console.log(veriler);
      }
    }
    console.log("************************************************");

    console.log(veriler);

    var output = [];




    veriler.map((v,k)=> {


      var alladdress = v.address;
      var frmaddress=v.address.split(",");
      frmaddress = frmaddress[frmaddress.length-1]

      var listItem = (
        <View key={k} style={{marginTop:10,}}>
        <TouchableOpacity style={{height:200, width:'100%', backgroundColor:'lightblue'}}
          onPress={()=>this.props.navigation.navigate("Detail", {data:v, alladdress: alladdress, dist: v.dist})}
        >
          <Text style={{marginLeft:5, fontSize:14, fontWeight:'bold'}}>{v.name}</Text>
          <View style={{flex:1}}>

            <Image
              source={require('./src/images/meat-3.png')}
              style={{height:180, width:WIDTH, resizeMode:'stretch'}}
            />

          </View>
          <View style={{flexDirection:'row'}}>
            <Text style={{marginLeft:5, fontSize:14, fontWeight:'bold'}}>{frmaddress}</Text>
            <Text >, </Text>
            <Text style={{marginLeft:5, fontSize:14, fontWeight:'bold'}}>{v.dist}</Text>
          </View>

        </TouchableOpacity>
        </View>
      )

      output[k] = listItem
    })

    console.log("Output datassss");
    console.log(output);

    return output;
  }



  render(){


    if(this.state.login === true){
      return(
        <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
          <Text style={{fontSize:34, fontWeight:'bold'}}>Location</Text>
        </View>
      );
    }else {
      return(
        <View style={{flex:1}}>
          <View style={{width:'100%', height:60, elevation:2, justifyContent:'center'}}>
            <Text style={{fontSize:26, marginLeft:20, fontWeight:'bold'}}>Home</Text>
          </View>
          <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>


              {this.state.datas[this.state.datas.length-1].dist !== "0" ?

                <View style={{elevation:1, marginBottom:5}}>

                  {this.list()}

                </View>

                :

                null
              }

          </ScrollView>
        </View>
      );
    }


  }
}


class App extends React.Component{

  render(){
    return(

      <NavigationContainer>
        <Stack.Navigator
          headerMode= "none"
        >
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Detail" component={DetailScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}



const styles = StyleSheet.create({
  container:{
    flex:1,
    margin:10,
  }
});

export default App;
