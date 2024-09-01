import { View, Text, Image } from 'react-native'
import React from 'react'
import{Images, images} from '../constants'
import CustomButton from './CustomButton'

const EmptyState =  ( {title,subtitle}) => {
  return (
    <View  className="justify-center items-center px-4 ">
        <Image source={images.empty} className="w-[270px] h-[215px] " resizeMode="contain"/>

        <Text className="font-pmedium text-xl text-center  text-white mt-2">
                 {title}
                </Text>
        <Text className="font-pmedium text-sm text-gray-100">
                  {subtitle}
                </Text>
                <CustomButton title={"Create video"}
                handlePress={()=>router.push('/create')}
                containerStyles="w-full my-5"
                textStyles={"text-center"}
                />

             
    </View>
  )
}

export default    EmptyState 