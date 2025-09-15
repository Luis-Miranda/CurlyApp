// lib/getBlockedDaysByProfessional.ts
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

export async function getBlockedDaysByProfessional() {
  const snapshot = await getDocs(collection(db, "blockedDaysByProfessional"));
  const blockedDays: Record<string, number[]> = {};

  snapshot.forEach((doc) => {
    blockedDays[doc.id] = doc.data().days;
  });

  return blockedDays;
}