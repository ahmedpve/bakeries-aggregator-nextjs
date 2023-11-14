import { AuthContext } from "@/store/auth-context";
import { Center, Spinner, useBoolean } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";

const LoadingSpinner = () => (
  <Center mt="16">
    <Spinner color="primary.500" />
  </Center>
);

const usePageProtect = ({ allowed }: { allowed: "authenticated" | "unAuthenticated" }) => {
  const { authUserId } = useContext(AuthContext);
  const router = useRouter();
  const [isCheckingAuth, setIsCheckingAuth] = useBoolean(true);

  useEffect(() => {
    if (allowed === "authenticated" && !authUserId) {
      router.push("/auth?form=signin");
    } else if (allowed === "unAuthenticated" && authUserId) {
      router.push("/");
    } else {
      setIsCheckingAuth.off();
    }
  }, [allowed, authUserId, router, setIsCheckingAuth]);

  return { isCheckingAuth, LoadingSpinner };
};

export default usePageProtect;
