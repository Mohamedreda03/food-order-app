"use client";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";
import {
  useGetAllProductsQuery,
  useGetProductsFilterQuery,
} from "@/rtk/features/products/productsApislice";
import { Product } from "@prisma/client";
import { MoveLeft, MoveRight } from "lucide-react";
import CardItem from "../card-item";
import LoadingCard from "../loading-card";

export default function BestSeller() {
  const { data } = useGetProductsFilterQuery({});

  return (
    <div className="py-8">
      <h4 className="text-xl text-gray-900 mb-4">Best Seller Items</h4>
      <div className="relative">
        <Swiper
          cssMode={true}
          navigation={{
            nextEl: ".image-swiper-button-next",
            prevEl: ".image-swiper-button-prev",
            disabledClass: "opacity-40",
          }}
          mousewheel={true}
          keyboard={true}
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            850: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1280: {
              slidesPerView: 4,
              spaceBetween: 30,
            },
          }}
          modules={[Navigation, Pagination, Mousewheel, Keyboard]}
        >
          {data ? (
            <>
              {data?.data?.map((product: Product) => (
                <SwiperSlide key={product?.id}>
                  <CardItem item={product} />
                </SwiperSlide>
              ))}
            </>
          ) : (
            <>
              <SwiperSlide>
                <LoadingCard />
              </SwiperSlide>
              <SwiperSlide>
                <LoadingCard />
              </SwiperSlide>
              <SwiperSlide>
                <LoadingCard />
              </SwiperSlide>
              <SwiperSlide>
                <LoadingCard />
              </SwiperSlide>
            </>
          )}
        </Swiper>
        <button className="image-swiper-button-next h-12 w-12 bg-primary/70 flex items-center justify-center rounded-full absolute -right-5 top-[40%] z-10">
          <MoveRight size={24} />
        </button>
        <button className="image-swiper-button-prev h-12 w-12 bg-primary/70 flex items-center justify-center rounded-full absolute -left-5 top-[40%] z-10">
          <MoveLeft size={24} />
        </button>
      </div>
    </div>
  );
}
