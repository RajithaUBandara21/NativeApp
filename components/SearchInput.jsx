import { View, Text, TextInput,TouchableOpacity,Image, Alert } from 'react-native'
import React, { useState } from 'react'
import {icons } from '../constants'
import { router, usePathname } from 'expo-router'
// import { usePathname } from 'expo-router'
const SearchInput = () => {
const pathname = usePathname();

const [query,setQuery] = useState(""); 

  return (
    <View className="w-full border-2 border-black-200 h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center flex-row space-x-4">
      <TextInput
        className="mt-0.5 flex-1 font-pregular text-white text-base"
        value={query}
        placeholder="Search for a video topic "
        placeholderTextColor="#CDCDE0 "
        onChangeText={(e) => setQuery(e)}
      />

      <TouchableOpacity
        onPress={() => {
          if (!query) return Alert.alert("Please enter a search query");

          if (pathname.startsWith("/search")) router.setParams({ query });
          else router.push(`/search/${query}`);
        }}
      >
        <Image
          source={icons.search}
          className="w-5 h-5 "
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
}

export default SearchInput;