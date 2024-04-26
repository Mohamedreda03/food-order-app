import Hero from "@/components/home/hero";
import MenuItems from "@/components/home/menu-items";
import NewItems from "@/components/home/new-items";

export default function Home() {
  return (
    <div className="md:px-5">
      <div className="wrapper my-6">
        <Hero />
        <MenuItems />
        <NewItems />
      </div>
    </div>
  );
}
