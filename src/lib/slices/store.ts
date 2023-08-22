import { create } from "zustand";
import { User, UserStore } from "./userStore";

type store = UserStore;

export const useAppStore = create<UserStore>()((set, get) => ({
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
}));
// export const useAppStore = create<store>((...a) => ({
//   ...userStore.createUserState(...a),
// }));
