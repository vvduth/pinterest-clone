import React from "react";
import create from "zustand";
import {persist} from "zustand/middleware" 
import { IUserProfile } from "../container/Home";

const authStore = (set: any) => ({
    userProfile: null  , 
    allUsers: [] ,
    addUser: (user: IUserProfile) => set({userProfile: user}),
    removeUser: () => set({userProfile: null} ),

   
})

const useAuthStore = create(
    persist(authStore, {
        name: 'auth' , 
        
    })
)

export default useAuthStore 