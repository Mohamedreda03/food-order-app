"use client";

import { useParams, usePathname, useRouter } from "next/navigation";

const useNavegation = async () => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  return { router, pathname, params };
};

export default useNavegation;
