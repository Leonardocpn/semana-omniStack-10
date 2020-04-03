import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";

import MapView, { Marker, Callout } from "react-native-maps";
import {
  requestPermissionsAsync,
  getCurrentPositionAsync,
} from "expo-location";

import { MaterialIcons } from "@expo/vector-icons";
import api from "../../services/api";
import {
  connect,
  disconnect,
  subscribeToNewDev,
} from "../../../src/services/socket";
import { Styles } from "./styles";

export default function Main({ navigation }) {
  const [currentRegion, setCurrentRegion] = useState(null);
  const [devs, setDevs] = useState([]);
  const [techs, setTechs] = useState("");

  useEffect(() => {
    async function loadInitialPosition() {
      const { granted } = await requestPermissionsAsync();
      if (granted) {
        const { coords } = await getCurrentPositionAsync({
          enableHighAccuracy: true,
        });

        const { latitude, longitude } = coords;

        setCurrentRegion({
          latitude,
          longitude,
          latitudeDelta: 0.04,
          longitudeDelta: 0.04,
        });
      }
    }
    loadInitialPosition();
  }, []);
  useEffect(() => {
    subscribeToNewDev((dev) => setDevs([...devs, dev]));
  }, [devs]);
  function setupWebsocket() {
    disconnect();
    const { latitude, longitude } = currentRegion;

    connect(latitude, longitude, techs);
  }

  async function loadDevs() {
    const { latitude, longitude } = currentRegion;

    const response = await api.get("/search", {
      params: {
        latitude,
        longitude,
        techs,
      },
    });
    setDevs(response.data.devs);
    setupWebsocket();
  }

  function handleRegionChanged(region) {
    setCurrentRegion(region);
  }

  if (!currentRegion) {
    return null;
  }

  return (
    <>
      <MapView
        onRegionChangeComplete={handleRegionChanged}
        style={Styles.map}
        initialRegion={currentRegion}
      >
        {devs.map((dev) => (
          <Marker
            key={dev.name}
            coordinate={{
              latitude: dev.location.coordinates[1],
              longitude: dev.location.coordinates[0],
            }}
          >
            <Image
              style={Styles.avatar}
              source={{
                uri: dev.avatar_url,
              }}
            />
            <Callout
              onPress={() => {
                navigation.navigate("Profile", {
                  github_username: dev.github_username,
                });
              }}
            >
              <View style={Styles.callout}>
                <Text style={Styles.devName}>{dev.name}</Text>
                <Text style={Styles.devBio}>{dev.bio}</Text>
                <Text style={Styles.devTechs}> {dev.techs.join(", ")}</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
      <View style={Styles.searchForm}>
        <TextInput
          style={Styles.searchInput}
          placeholder={"Buscar devs por techs..."}
          placeholderTextColor="#999"
          autoCapitalize="words"
          autoCorrect={false}
          value={techs}
          onChangeText={setTechs}
        />
        <TouchableOpacity
          style={Styles.loadButton}
          onPress={() => {
            loadDevs();
          }}
        >
          <MaterialIcons name="my-location" size={20} color="#FFF" />
        </TouchableOpacity>
      </View>
    </>
  );
}
