"use client";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";
import IconLogo from "@/assets/imgs/LogoTipoPeq.png";
import ButtonSecondary from "@/app/components/generals/ButtonSecondary";
import ButtonPrimary from "@/app/components/generals/ButtonPrimary";
import Link from "next/link";
import { useRouter } from "next/navigation";

const KnowOurTerms = () => {
  const t = useTranslations();
  const router = useRouter();

  const sendToMembers = () =>{
    const currentUrl = window.location.href;
    const queryStringIndex = currentUrl.indexOf("?");
    if (queryStringIndex !== -1) {
      const queryString = currentUrl.slice(queryStringIndex + 1);
      const params = new URLSearchParams(queryString);
      const referralWallet = params.get("refferalWallet");
      console.log(referralWallet)
      if (referralWallet) {
        router.push(`/membership?refferalWallet=${referralWallet}`)
      } 
    } 
  }


  return (
    <div className="container-knowOurTerms">
      <div className="header">
        <div className="header-logo">
          <Image src={IconLogo} alt="logo" width={28} height={24} />
        </div>
        <div className="header-title">
          <h1>{t("Know our Terms")}!</h1>
          <p>
            {t("By using any of our products and services, you agree to the")}{" "}
            <span>{t("Terms of Use")}</span> {t("and")}{" "}
            <span>{t("Privacy Policy")}.</span>{" "}
            {t("You hereby agree, represent and undertake to")}:
          </p>
        </div>
      </div>

      <div className="flex flex-col justify-evenly h-[calc(100vh-250px)]">
            <div className="container-list-conditions">
              <ol>
        <li>{t("condition1")}.</li>
        <li>{t("condition2")}.</li>
        <li>{t("condition3")}.</li>
        <li>{t("condition4")}.</li>
        <li>{t("condition5")}.</li>
      </ol>
      </div>
      <div className="container-btns">
        <Link href={"/register"} className="container-btnClose">
          <ButtonSecondary text={t("Close")}/>
        </Link>

          <ButtonPrimary onClickFn={sendToMembers} text={t("I Agree")}/>
      </div>
      </div>
  
    </div>
  );
};

export default KnowOurTerms;
