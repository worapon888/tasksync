import { signIn } from "next-auth/react";
import { Session } from "next-auth";

export default function useHandleAddTask(
  session: Session | null,
  openForNew: () => void
) {
  return () => {
    if (!session?.user) {
      signIn(undefined, { callbackUrl: "/dashboard/board" });
    } else {
      openForNew();
    }
  };
}
