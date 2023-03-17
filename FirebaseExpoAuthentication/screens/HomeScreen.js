import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet,FlatList, Text, TouchableOpacity, View, ScrollView, Image } from 'react-native';
import { auth } from '../firebase'
import { getDatabase, ref, onValue} from "firebase/database";

// import { getDatabase, ref, onValue } from "firebase/database";
// import { getDatabase, } from "firebase";
// import { firebase } from "@firebase/app";
import firebase from '@firebase/app';



const HomeScreen = () => {
  const [reading, setReading] = useState([])
  const navigation = useNavigation()
  var [item, setItem] = useState([]) 
  item = [
    {
      "name" : "Customer Number",
      "code" : "Customer",
      "value" : 0,
    },
    {
      "name" : "MDI (KWhr)",
      "code" : "MDI (KWhr)",
      "value" : 0,
    },
    {
      "name" : "Time(hr)",
      "code" : "Time(hr)",
      "value" : 0,
    },
    {
      "name" : "Time(min)",
      "code" : "Time(min)",
      "value" : 0,
    },
    {
      "name" : "Current(A)",
      "code" : "Current(A)",
      "value" : 0,
    },
    {
      "name" : "Frequency(Hz)",
      "code" : "Frequency(Hz)",
      "value" : 0,
    },
    {
      "name" : "Off-Peak Energy (KWhr)",
      "code" : "Off-Peak Energy (KWhr)",
      "value" : 0,
    },
    {
      "name" : "On-Peak Energy (KWhr)",
      "code" : "On-Peak Energy (KWhr)",
      "value" : 0,
    },
    {
      "name" : "Power(W)",
      "code" : "Power(W)",
      "value" : 0,
    },
    {
      "name" : "Voltage(V)",
      "code" : "Voltage(V)",
      "value" : 0,
    },
    {
      "name" : "Relay",
      "code" : "relay",
      "value" : 0,
    },
  ]
  for(var i=0;i<10;i++)
  {
    item[i]['value'] = reading[item[i]['code']] 
  }
  useEffect(() => {
    var str = auth.currentUser?.email.split('@');
    var userNo = str[0].substr(str[0].length-1);
    console.log(userNo);

    firebase
    .database() 
    .ref('meter'+ userNo +'/')
    .on('value', (snapshot) => {
      setReading(snapshot.val());
      console.log(reading);
    });
    // console.log(item);
    setItem(item); 

    // const dbRef = firebase.ref(firebase.getDatabase());
    // get(child(dbRef, 'meter1/')).then((snapshot) => {
    //   if (snapshot.exists()) {
    //     console.log(snapshot.val());
    //   } else {
    //     console.log("No data available");
    //   }
    // }).catch((error) => {
    //   console.error(error);
    // });

  }, []);
  

// renderItem = ({item, index}) => {
//   // console.log(item);
//   return (      
//     <View >
//       <Text style={styles.card}> {item.name}: {item.value} </Text> 
//     </View>
//   )
// }

const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login")
      })
      .catch(error => alert(error.message))
  }


  return (
    <ScrollView>
      <View style={styles.container}>
          {/* <Text>Customer Email: {auth.currentUser?.email}</Text>
          <Text>Customer Number: {reading['Customer Number']}</Text>
          <Text>MDI: {reading['MDI']}</Text>
          <Text>Current: {reading['current']}</Text>
          <Text>Time: {reading['TIME']}</Text>
          <Text>Frequency: {reading['frequency']}</Text>
          <Text>Off-Peak Energy: {reading['offpeakenergy']}</Text>
          <Text>On-Peak Energy: {reading['onpeakenergy']}</Text>
          <Text>Power: {reading['power']}</Text>
          <Text>Voltage: {reading['voltage']}</Text> */}
          
        <Image
            style={styles.image}
            source={require('C:/Users/ANC/Desktop/FirebaseExpoAuthentication/assets/logo.png')}
        />
        <Text style={styles.emailCard}>Customer Email: {auth.currentUser?.email}</Text>
        <FlatList 
          numColumns={2}
          data = {item}
          renderItem = {({item, index}) => {
            // console.log(item);
            return (      
              <View >
                <Text style={styles.card}> {item.name}: {item.value} </Text> 
              </View>
            )
          }}
          keyExtractor = { item => `key-${Math.random().toString()}`}
        />
        <TouchableOpacity
          onPress={handleSignOut}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Sign out</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
   button: {
    backgroundColor: '#0782F9',
    width: '60%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    margin:20,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  card: {
    width: 150,
    height: 70,
    margin: 10,
    padding: 10,
    borderRadius: 4,
    borderColor: 'black',
    borderWidth: 0.2,
    backgroundColor: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  emailCard: {
    width: 300,
    height: 70,
    margin: 10,
    padding: 10,
    borderRadius: 4,
    borderColor: 'black',
    borderWidth: 0.2,
    backgroundColor: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  image: {
    height: 180,
    width: 180,
  },
})
