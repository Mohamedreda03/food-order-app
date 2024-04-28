import Image from "next/image";
import UpdateRoleButton from "@/components/admin/update-role-button";
import { getUser } from "@/actions/users/get-user";

export default async function UserPage({
  params,
}: {
  params: { userId: string };
}) {
  const user = await getUser(params.userId);

  return (
    <>
      <div className="py-20 wrapper">
        <div className="flex gap-6 flex-col md:flex-row">
          <div className="flex-[0.4] flex flex-col items-center">
            {user?.data?.image ? (
              <Image
                src={user?.data?.image}
                priority={true}
                width={180}
                height={200}
                className="rounded-md object-cover w-[180px] h-[200px]"
                alt="profile"
              />
            ) : (
              <div className="h-[200px] w-[180px] bg-gray-200 rounded-md" />
            )}
          </div>
          <div className="flex flex-col gap-2 text-lg">
            <table className="w-[400px]">
              <tbody>
                <tr>
                  <td>
                    <label htmlFor="name" className="font-medium">
                      Name
                    </label>
                  </td>
                  <td>
                    <p>{user?.data?.name}</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="name" className="font-medium">
                      Email
                    </label>
                  </td>
                  <td>
                    <p>{user?.data?.email}</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="name" className="font-medium">
                      Country
                    </label>
                  </td>
                  <td>
                    <p>{user?.data?.country || "No Country"}</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="name" className="font-medium">
                      City
                    </label>
                  </td>
                  <td>
                    <p>{user?.data?.city || "No City"}</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="name" className="font-medium">
                      Post Code
                    </label>
                  </td>
                  <td>
                    <p>{user?.data?.post_code || "No Post Code"}</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="name" className="font-medium">
                      Street Address
                    </label>
                  </td>
                  <td>
                    <p>{user?.data?.street_address || "No Street Address"}</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="name" className="font-medium">
                      Phone
                    </label>
                  </td>
                  <td>
                    <p>{user?.data?.street_address || "No Phone"}</p>
                  </td>
                </tr>
              </tbody>
            </table>
            <UpdateRoleButton userId={params.userId} user={user?.data as any} />
          </div>
          <div className="flex-[1.6]"></div>
        </div>
      </div>
    </>
  );
}
