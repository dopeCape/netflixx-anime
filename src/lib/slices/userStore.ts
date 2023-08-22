import { api } from "@/utils/api";
import { StateCreator } from "zustand";

interface Profile {
  id: string;
  DisplayPisc: string;
  name: string;
}

interface User {
  name: string;
  id: string;
  email: string;
  profiles: Profile[];
}

interface UserStore {
  user: User;
  setUser: (user: User) => void;
  addProfiles: (profile: Profile) => void;
  getUser: () => User;
}

const createUserState: StateCreator<UserStore> = (set, get) => ({
  user: {
    name: "",
    id: "",
    email: "",
    profiles: [],
  },

  setUser: (user: User) => {
    set({ user: user });
  },
  addProfiles: (profile: Profile) => {
    const user = get().user;
    user.profiles.push(profile);
    set({ user: user });
  },

  getUser() {
    // if (get().user.id == "") {
    //   const query = api.user.getUser.useQuery();
    //   if (query.data == undefined) {
    //     throw "";
    //   }
    //   return query?.data.user;
    // }
    return get().user;
  },
});

export { User, Profile, UserStore, createUserState };
