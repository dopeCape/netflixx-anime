"use client";
import React, { useEffect, useState } from "react";
import { User } from "../slices/userStore";
import { useSession } from "next-auth/react";
import { api } from "@/utils/api";
import { useAppStore } from "../slices/store";

export default function GetUserData() {
  const userr = useAppStore((state) => state.user);
  const [user, setUser] = useState<User>(userr);
  const { data, status } = useSession();
  const query = api.user.getUser.useQuery(undefined, {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
  const persistUser = useAppStore((state) => state.setUser);
  useEffect(() => {
    if (status == "authenticated") {
      if (userr?.id.length == 0) {
        if (query.data == undefined) {
          return;
        }
        setUser(query.data.user);
        persistUser(query.data.user);
      }
    }
  }, [status, query]);

  return user;
}
