import { useAccount } from "wagmi";
import { NavBar } from "../components/NavBar";

export default function Home() {
  const { address, isDisconnected } = useAccount();

  return (
    <div className="flex flex-col items-center p-4 mx-auto min-h-screen justify-center relative">
      <NavBar />
      <main className="flex-col gap-10 flex"></main>
    </div>
  );
}
