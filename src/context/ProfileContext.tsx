"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

type Profile = {
  name: string;
  image: string;
};

type ProfileContextType = {
  profile: Profile;
  updateProfile: (name?: string, image?: string) => Promise<void>;
  loading: boolean;
};

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const [profile, setProfile] = useState<Profile>({
    name: "Loading...",
    image: "", // fallback จะทำงาน
  });

  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const res = await fetch("/api/profile");
      if (!res.ok) throw new Error("Failed to fetch profile");
      const data = await res.json();
      if (data.profile) {
        setProfile(data.profile);
      }
    } catch (error) {
      console.error("❌ Failed to load profile:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const updateProfile = async (name?: string, image?: string) => {
    try {
      const updatedData: Partial<Profile> = {
        name: name ?? profile.name,
        image: image ?? profile.image,
      };

      const res = await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      if (!res.ok) throw new Error("Failed to update profile");

      const data = await res.json();
      if (data.profile) {
        setProfile(data.profile); // ✅ ใช้ข้อมูลจาก backend จริง
      } else {
        setProfile(updatedData as Profile); // fallback กรณี backend ไม่ส่งกลับ
      }
    } catch (error) {
      console.error("❌ Failed to update profile:", error);
    }
  };

  return (
    <ProfileContext.Provider value={{ profile, updateProfile, loading }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context)
    throw new Error("useProfile must be used inside ProfileProvider");
  return context;
};
