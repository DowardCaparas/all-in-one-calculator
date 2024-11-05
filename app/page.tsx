import BasicCalculator from "@/components/BasicCalculator";
import CustomButton from "@/components/CustomButton";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="overflow-hidden container_padding">
        <nav className="py-5">
          <span className="text-4xl font-bold">CalcHub</span>
        </nav>
        <section className="flex max-md:flex-col justify-between items-center gap-10 mt-8 mb-16">
          <div className="md:w-1/2 inline-grid gap-5 max-md:place-items-center max-md:text-center">
            <span className="font-bold text-7xl max-md:text-6xl">
              All in One Calculator
            </span>
            <p>
              Discover a world of simplicity with our all-in-one calculator.
              Whether you need basic arithmetic or complex calculations,
              everything you need is just a click away.
            </p>
            <CustomButton label="Get Started" />
          </div>

          <BasicCalculator />
        </section>
      </div>
      <footer className="text-center bg-gray-300 py-8">
        Copyright &copy; 2024 Dounhuward B. Caparas
      </footer>
    </>
  );
}
