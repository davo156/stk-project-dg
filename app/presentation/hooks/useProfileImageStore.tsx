import AsyncStorage from '@react-native-async-storage/async-storage';
import { ImagePickerAsset } from 'expo-image-picker';
import { createJSONStorage, persist } from 'expo-zustand-persist';
import { create } from 'zustand';


interface IProfileImageStore {
    profileImage: ImagePickerAsset | null;
    addProfileImage: (image: ImagePickerAsset) => void;
    removeProfileImage: () => void;
}

export const useProfileImageStore = create<IProfileImageStore>()(
    persist((set) => ({
      profileImage: null,
      addProfileImage: (image) => set((state) => ({
        profileImage: image
      })),
      removeProfileImage: () => set((state) => ({
        profileImage: null
      }))
    }), {
        name: 'profile-image-storage',
        storage: createJSONStorage(() => AsyncStorage)
    })
);