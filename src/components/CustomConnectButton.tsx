import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import { ButtonTheme } from "../types/Theme";

interface Props {
  username?: string;
  buttonTheme?: ButtonTheme;
}

export const CustomConnectButton = ({
  username = "",
  buttonTheme = ButtonTheme.LIGHT,
}: Props) => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");

        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button
                    onClick={openConnectModal}
                    type="button"
                    className={`flex items-center bg-main hover:bg-main-hover ${
                      buttonTheme === ButtonTheme.LIGHT
                        ? "text-light-theme"
                        : "text-dark-theme"
                    } rounded px-3 py-2 transition-all`}
                  >
                    <img src="/images/icons/wallet.svg" className="mr-1" />
                    <span>Connect Wallet</span>
                  </button>
                );
              }

              if (chain.unsupported) {
                return (
                  <button onClick={openChainModal} type="button">
                    Wrong network
                  </button>
                );
              }

              return (
                <div style={{ display: "flex", gap: 12 }}>
                  <button
                    onClick={openChainModal}
                    style={{ display: "flex", alignItems: "center" }}
                    type="button"
                    className={`bg-main px-3 py-2 rounded-md ${
                      buttonTheme === ButtonTheme.LIGHT
                        ? "text-light-theme"
                        : "text-dark-theme"
                    } gap-4 border border-main-hover hover:bg-main-hover`}
                  >
                    {chain.hasIcon && (
                      <div
                        style={{
                          background: chain.iconBackground,
                          backgroundSize: "cover",
                          width: 24,
                          height: 24,
                          borderRadius: 999,
                          overflow: "hidden",
                          marginRight: 4,
                        }}
                      >
                        {chain.iconUrl && (
                          <img
                            alt={chain.name ?? "Chain icon"}
                            src={chain.iconUrl}
                            style={{ width: 24, height: 24 }}
                          />
                        )}
                      </div>
                    )}
                    {chain.name}
                  </button>

                  <button
                    onClick={openAccountModal}
                    type="button"
                    className={`${
                      buttonTheme === ButtonTheme.LIGHT
                        ? "text-light-theme"
                        : "text-dark-theme"
                    } bg-main px-3 py-2 rounded-md gap-4 border border-main-hover hover:bg-main-hover`}
                  >
                    {username ? username : account.displayName}
                  </button>

                  <Link href={`/user/${account.address}`}>
                    <button
                      className={`${
                        buttonTheme === ButtonTheme.LIGHT
                          ? "text-light-theme"
                          : "text-dark-theme"
                      } bg-main px-3 py-2 rounded-md gap-4 border border-main-hover hover:bg-main-hover`}
                    >
                      <img src="/images/icons/person.svg" className=" invert" />
                    </button>
                  </Link>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};
