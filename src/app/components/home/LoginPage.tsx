"use client";
import React from "react";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Logo from "@/assets/imgs/Logo.png";
import { useTranslations } from "next-intl";
import ButtonPrimary from "../generals/ButtonPrimary";
import ButtonSecondary from "../generals/ButtonSecondary";
import {
  ThirdwebProvider,
  metamaskWallet,
  coinbaseWallet,
  walletConnect,
  ConnectWallet,
} from "@thirdweb-dev/react";

import './buttonStyle.css'





const LoginPage = () => {
  const t = useTranslations();
  const router = useRouter();

  const btnRedirect = (): void => {
    const currentUrl = window.location.href;
    const queryStringIndex = currentUrl.indexOf("?");
    if (queryStringIndex !== -1) {
      const queryString = currentUrl.slice(queryStringIndex + 1);
      const params = new URLSearchParams(queryString);
      const referralWallet = params.get("refferalWallet");
      console.log(referralWallet)
      if (referralWallet) {
        window.location.href = `/register?refferalWallet=${referralWallet}`;
      } else {
        window.location.href = "/register?refferalWallet=$0x0000000000000000000000000000000000000123";
      }
    } else {
      window.location.href = "/register?refferalWallet=$0x0000000000000000000000000000000000000123";
    }
  };
  return (
    <ThirdwebProvider
    supportedWallets={[
      metamaskWallet({
        recommended: true,
      }),
      coinbaseWallet(),
      walletConnect(),
     
    ]}
    clientId="95347962d3e713129610a9c9f4dbce58"
  >
    <div className="welcome">
      <div className="container-up">
        <div className="container-text">
          <Image src={Logo} alt="logo" width={160} height={40} />
          <h1 className="title">
            {t("Welcome to")} <span>Defily</span>!
          </h1>
          <span className="text-span">
            {t("Please connect to enter the system")}
          </span>
        </div>
      </div>
      <div className="container-center">
        <div onClick={btnRedirect} className="container-btn-primary">
          {/*<ButtonPrimary
            text={t("Connect your Wallet")}
            onClickFn={btnRedirect}
             />*/}
          <ConnectWallet className="buyMembershipClass" />
      

          
        </div>
        <div className="container-btn-secondary">
          <ButtonSecondary text={t("Connect with Email")} />
        </div>
      </div>
      <div className="container-down"></div>
    </div>
    </ThirdwebProvider>
  );
};

export default LoginPage;
