import { getUserProfile } from "@/actions/profile/get-user-profile";
import ProfileForm from "./_components/profile-form";
import { auth } from "@/auth";
import { ProfileFormTypes } from "@/types/schema";

export default async function ProfilePage() {
  const session = await auth();
  const data = await getUserProfile();

  return (
    <>
      <div className="py-20 wrapper">
        {!session?.user.isAdmin && (
          <h2 className="flex items-center justify-center text-5xl font-medium text-primary mb-6">
            Profile
          </h2>
        )}

        <ProfileForm data={data?.data as ProfileFormTypes} />
      </div>
    </>
  );
}
