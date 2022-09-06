import { CustomConnectButton } from "./CustomConnectButton";

export const NavBar = () => {
  return (
    <nav className="absolute top-4 left-4 right-4 flex justify-end gap-4">
      <CustomConnectButton />
    </nav>
  );
};
