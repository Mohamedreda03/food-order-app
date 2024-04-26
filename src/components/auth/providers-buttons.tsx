import { FcGoogle } from "react-icons/fc";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const ProvidersButtons = ({ isPanding }: { isPanding: boolean }) => {
  const router = useRouter();
  const onClick = async () => {
    try {
      await signIn("google", { callbackUrl: "/" });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Button
        disabled={isPanding}
        onClick={onClick}
        variant="outline"
        className="h-11 w-full"
      >
        <FcGoogle className="h-6 w-6 mr-2" />
        <p>Continue With Google</p>
      </Button>
    </div>
  );
};

export default ProvidersButtons;
