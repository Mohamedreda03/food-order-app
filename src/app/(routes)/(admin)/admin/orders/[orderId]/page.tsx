import { getOrder } from "@/actions/orders/get-order";
import UpdateOrderActionButton from "@/components/update-order-action-button";
import { cn, fCurrency } from "@/lib/utils";

const OrderPage = async ({ params }: { params: { orderId: string } }) => {
  const order: any = await getOrder(params.orderId);

  return (
    <>
      <div className="wrapper py-20">
        <div className="flex flex-col items-center justify-center mx-auto max-w-[700px] w-full">
          <h1 className="text-2xl font-bold text-primary">Order Details</h1>
          {order && (
            <div className="flex gap-4 mt-4 w-full">
              <div className="flex flex-col gap-2 text-lg max-w-[700px] w-full">
                <UpdateOrderActionButton data={order} />
                <table className="w-full table-caption border border-gray-200">
                  <tbody>
                    <tr>
                      <td className="border-b border-gray-200 w-full py-2 px-4">
                        <label htmlFor="name" className="font-medium">
                          userId
                        </label>
                      </td>
                      <td className="border-b border-gray-200 w-full py-2 px-4">
                        <p>{order?.user?.id}</p>
                      </td>
                    </tr>
                    <tr>
                      <td className="border-b border-gray-200 w-full py-2 px-4">
                        <label htmlFor="name" className="font-medium">
                          Email
                        </label>
                      </td>
                      <td className="border-b border-gray-200 w-full py-2 px-4">
                        <p>{order?.user?.email}</p>
                      </td>
                    </tr>
                    <tr>
                      <td className="border-b border-gray-200 w-full py-2 px-4">
                        <label htmlFor="name" className="font-medium">
                          Status
                        </label>
                      </td>
                      <td
                        className={cn(
                          `whitespace-nowrap px-4 border-b border-gray-200`,

                          {
                            "text-green-600": order?.status === "PAID",
                            "text-red-600": order?.status === "FAILED",
                            "text-yellow-600": order?.status === "PENDING",
                            "text-blue-600": order?.status === "ON_THE_WAY",
                            "text-purple-600": order?.status === "DELIVERED",
                          }
                        )}
                      >
                        <div
                          className={cn(
                            `border w-fit text-sm rounded-full px-3`,
                            {
                              "border-green-600": order?.status === "PAID",
                              "border-red-600": order?.status === "FAILED",
                              "border-yellow-600": order?.status === "PENDING",
                              "border-blue-600": order?.status === "ON_THE_WAY",
                              "border-purple-600":
                                order?.status === "DELIVERED",
                            }
                          )}
                        >
                          {order?.status}
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="border-b border-gray-200 w-full py-2 px-4">
                        <label htmlFor="name" className="font-medium">
                          Country
                        </label>
                      </td>
                      <td className="border-b border-gray-200 w-full py-2 px-4">
                        <p>{order?.user?.country || "No Country"}</p>
                      </td>
                    </tr>
                    <tr>
                      <td className="border-b border-gray-200 w-full py-2 px-4">
                        <label htmlFor="name" className="font-medium">
                          City
                        </label>
                      </td>
                      <td className="border-b border-gray-200 w-full py-2 px-4">
                        <p>{order?.user?.city || "No City"}</p>
                      </td>
                    </tr>
                    <tr>
                      <td className="border-b border-gray-200 w-full py-2 px-4">
                        <label htmlFor="name" className="font-medium">
                          Post Code
                        </label>
                      </td>
                      <td className="border-b border-gray-200 w-full py-2 px-4">
                        <p>{order?.user?.post_code || "No Post Code"}</p>
                      </td>
                    </tr>
                    <tr>
                      <td className="border-b border-gray-200 w-full py-2 px-4">
                        <label htmlFor="name" className="font-medium">
                          Street Address
                        </label>
                      </td>
                      <td className="border-b border-gray-200 w-full py-2 px-4">
                        <p>
                          {order?.user?.street_address || "No Street Address"}
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td className="border-b border-gray-200 w-full py-2 px-4">
                        <label htmlFor="name" className="font-medium">
                          Phone
                        </label>
                      </td>
                      <td className="border-b border-gray-200 w-full py-2 px-4">
                        <p>{order?.user?.tel || "No Phone"}</p>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="my-6">
                  <h2 className="text-2xl font-bold mb-2 flex items-center justify-center text-primary">
                    Items
                  </h2>
                  <div className="flex flex-col gap-5">
                    {order?.items.map((item: any) => (
                      <div key={item.id} className="border p-4 rounded-lg">
                        <div className="flex items-center gap-4">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-20 h-20 object-cover rounded-md"
                          />
                          <div>
                            <div className="flex items-center gap-4">
                              <p>Name: {item.name}</p>|
                              <p>Price: {fCurrency.format(item.price)}</p>
                            </div>
                            <p>Size: {item.size}</p>
                            <p>Quantity: {item.quantity}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default OrderPage;
