import { Platform } from "react-native";

import { Account, Avatars, Client, Databases, ID, Query } from 'react-native-appwrite';
export const appwriteConfig={
    endpoint: "https://cloud.appwrite.io/v1",
    Platform:'com.jsm.aora',
    projectId:"66cfdb6700392899d38f",
    databaseId:"66cfde2900141ffb714c",
    userCollectionId:"66cfde66001a2d3425a6",
    videoCollectionId:"66cfdf3500086f9db96f",
    storageId:"66cfe198001ab221a60f",
     


    
}
// Init your React Native SDK
const client = new Client();
const avatars=new Avatars(client);
const databases = new Databases(client);

client
    .setEndpoint(appwriteConfig.endpoint) // Your Appwrite Endpoint
    .setProject(appwriteConfig.projectId) // Your project ID
    .setPlatform(appwriteConfig.Platform) // Your application ID or bundle ID.
;

const account = new Account(client);

export const createUser= async (email, password, username)=>{
try{
 const newAccount = await account.create(ID.unique(), email, password, username);

 if(!newAccount){
     throw new Error("Account not created");

 }

 const avatarUrl= avatars.getInitials(username);

 await signIn(email, password);


 const newUser= await  databases.createDocument(

    appwriteConfig.databaseId,
    appwriteConfig.userCollectionId,    
    ID.unique(), {
        accountId:newAccount.$id,
        email,
        username,   
        avatar:avatarUrl,
    }  
 )

 return newUser
}catch(error){
    console.log(error);
    throw new Error(error);

}
}


export const signIn = async (email, password)=>{
    try{
        account.deleteSessions();
      const session = await account.createEmailSession(email, password);
      
      return session;
    }catch(error){
        console.log(error);
        throw new Error(error);
    }
}


export const getCurrentUser= async ()=>{
    try{
        const currentAccount = await account.get();
        if(!currentAccount){
            throw new Error("No user found");
        }
// console.log(currentAccount);
      
        const currentUser = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
         [   Query.equal("accountId", currentAccount.$id)
        ]
      
          
        );
    //    console.log(currentUser);
        if (!currentUser){
            throw new Error("No user found");
        }
        return currentUser.documents[0];
      
    }catch(error){
        console.log(error);
        throw new Error( "Current User Getting error",error);
    }
}