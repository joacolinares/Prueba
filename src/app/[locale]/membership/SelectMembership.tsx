"use client";
import Image from "next/image";
import IconLogo from "@/assets/imgs/LogoTipoPeq.png";
import { useTranslations } from "next-intl";
import ButtonSecondary from "@/app/components/generals/ButtonSecondary";
import { PlansMembership } from "@/app/[locale]/membership/moskData";
import CheckIcon from "@/assets/icons/CheckIcon";
import { useState } from "react";
import ModalComponent from "@/app/components/generals/ModalComponent";
import ButtonPrimary from "@/app/components/generals/ButtonPrimary";
import { ThirdwebProvider, Web3Button } from "@thirdweb-dev/react";
import { ethers } from "ethers";
import abi from './abis/abi.json'
import abiToken from './abis/abiToken.json'
import Web3 from 'web3';
import { BinanceTestnet, PolygonAmoyTestnet } from "@thirdweb-dev/chains";
import './buttonStyle.css'
import { useRouter } from "next/navigation";
interface Props {
  dataPlans: PlansMembership[];
}

const SelectMembership = ({ dataPlans }: Props) => {
  const t = useTranslations();
  const [selectedPlan, setSelectedPlan] = useState<PlansMembership | null>(
    null
  );
  const [selectedPlanNumber, setSelectedPlanNumber] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSelectPlan = (plan: string): void => {
    let number = 4; // Por defecto, asignamos 1 para el plan BASIC
    if (plan) {
      const planSelect = dataPlans.find((p) => p.plan === plan);
      if (planSelect) {
        setSelectedPlan(planSelect);
        if (plan === "Essential") {
          number = 5;
        } else if (plan === "Premium") {
          number = 7;
        }
      }
    } else {
      setSelectedPlan(null);
    }
    setSelectedPlanNumber(number);
  };


  const router = useRouter();

  const [aprobado, setAprobado] = useState(false)

  return (
    <ThirdwebProvider
      // activeChain={BinanceTestnet}
      activeChain={BinanceTestnet}
      clientId="95347962d3e713129610a9c9f4dbce58"
    >
      <div className="container-Membership">
        <div className="header">
          <div className="header-logo">
            <Image src={IconLogo} alt="logo" width={28} height={24} />
          </div>
          <div className="header-title">
            <h1>{t("Select your Membership")}!</h1>
            <p>{t("textSelectMembership")}.</p>
          </div>
        </div>

        <div className="container-members">
          {dataPlans.map((plan) => (
            <div className="container-plan" key={plan.plan}>
              <div className="container-left">
                <h1 className="plan-title">{plan.plan}</h1>
                <div className="container-btn">
                  <ButtonSecondary
                    text={t("See more")}
                    classname="--btnMember"
                    onClickFn={() => {
                      handleSelectPlan(plan.plan);
                      setIsModalOpen(true);
                    }}
                  />
                </div>

                {plan.plan === "Essential" ? (
                  <p className="text-etiqueta">{t("MOST POPULAR")}</p>
                ) : plan.plan === "Premium" ? (
                  <p className="text-etiqueta">{t("BEST VALUE")}</p>
                ) : null}
              </div>
              <div className="container-right">
                <p className="plan-price">{plan.price}</p>
                <div
                  onClick={() => handleSelectPlan(plan.plan)}
                  className="container-check"
                >
                  {selectedPlan?.plan === plan.plan && <CheckIcon />}
                </div>
              </div>
            </div>
          ))}
          <ModalComponent
            isOpen={isModalOpen}
            setIsOpen={setIsModalOpen}
            classBody="bg-white w-[320px] h-auto rounded-xl"
          >
            <div className="container-modal">
              <div className="p-[24px] bg-[#7A2FF4] rounded-tl-xl rounded-tr-xl flex justify-center items-center text-[#FFFFFF]">
                <p className="font-bold text-[20px] mr-2">{selectedPlan?.plan}</p>
                <p className="text-[16px]">$ {selectedPlan?.price}</p>
              </div>
              <div className="p-[24px] ">
                <div className="rounded-[10px] bg-[#F2F3F8] flex justify-between items-center p-[8px]">
                  <p className="text-[#1E0E39] font-bold text-[14px]">{t("Personalized referral link")}</p>
                  <div className="container-check bg-[#7A2FF4] rounded-[10px] w-[48px] h-[34px] flex justify-center items-center">
                    <CheckIcon />
                  </div>
                </div>
                <div className="rounded-[10px] bg-[#F2F3F8] flex justify-between items-center p-[8px] my-[24px]">
                  <p className="text-[#1E0E39] font-bold text-[14px]">{t("Personalized referral link")}</p>
                  <div className="container-check bg-[#7A2FF4] rounded-[10px] w-[48px] h-[34px] flex justify-center items-center">
                    <span className="text-[14px] text-[#ffffff]">{selectedPlan?.profitReferralsMembership}</span>
                  </div>
                </div>
                <div className="rounded-[10px] bg-[#F2F3F8] flex justify-between items-center p-[8px]">
                  <p className="text-[#1E0E39] font-bold text-[14px]">{t("Personalized referral link")}</p>
                  <div className="container-check bg-[#7A2FF4] rounded-[10px] w-[48px] h-[34px] flex justify-center items-center">
                    <span className="text-[14px] text-[#ffffff]">{selectedPlan?.profitReferralsEarnings}</span>
                  </div>
                </div>
              </div>
            </div>
          </ModalComponent>
        </div>

        {/* <div onClick={() => callContract3(selectedPlan)} className="px-[24px] mb-6">
          <ButtonPrimary text={t("Confirm")} />
        </div> */}

      </div>


      {/* <Web3Button
        contractAddress="0x0cda7c31216405d997479f3e0219a5d9f3d9909c"
        contractAbi={abi}
        action={async (contract) => {
          console.log(contract)
          contract.call(
            "buyMembership",
            [1, "0x2306a5EFA31694d26a158d3085458F3513AB5a29"]
          );
        }}
      >
        Comprar la primera
      </Web3Button> */}

      <div className="w-full flex justify-center">

        {
          aprobado
          ?
          <Web3Button
          //  contractAddress="0x0cda7c31216405d997479f3e0219a5d9f3d9909c"
          contractAddress="0x0e07D1e7495aE9ACBf51CD960459127131C94898"
          contractAbi={abi}
          action={async (contract) => {

            const currentUrl = window.location.href;
            const queryStringIndex = currentUrl.indexOf("?");
            if (queryStringIndex !== -1) {
              const queryString = currentUrl.slice(queryStringIndex + 1);
              const params = new URLSearchParams(queryString);
              const referralWallet = params.get("refferalWallet");
              console.log(referralWallet)
              if (referralWallet) {
                await contract.call("buyMembership", [selectedPlanNumber, referralWallet])
              }else{
                await contract.call("buyMembership", [selectedPlanNumber, "0x0000000000000000000000000000000000000123"])
              }
            } 

          }}
          onSuccess={(result) => alert("Success!")}
          onError={(error) => alert(`Error --> ${error.message}`)}
          className="buyMembershipClass"
        >
          {t("Confirm")}
        </Web3Button>
          :
          <Web3Button
          //  contractAddress="0x0cda7c31216405d997479f3e0219a5d9f3d9909c"
          contractAddress="0x3157fF0829AC9F9be8a31129980e424638Bf390E"
          contractAbi={abiToken}
          action={async (contract) => {
            await contract.call("approve", ["0x0e07D1e7495aE9ACBf51CD960459127131C94898", ethers.constants.MaxUint256])
            setAprobado(true)
          }}
          onSuccess={(result) => alert("Success!")}
          onError={(error) => alert(`Error --> ${error.message}`)}
          className="buyMembershipClass"
        >
          {t("Approve expenses")}
        </Web3Button>
        }

 

<Web3Button
          //  contractAddress="0x0cda7c31216405d997479f3e0219a5d9f3d9909c"
          contractAddress="0x0e07D1e7495aE9ACBf51CD960459127131C94898"
          contractAbi={abi}
          action={async (contract) => {

            const currentUrl = window.location.href;
            const queryStringIndex = currentUrl.indexOf("?");
            if (queryStringIndex !== -1) {
              const queryString = currentUrl.slice(queryStringIndex + 1);
              const params = new URLSearchParams(queryString);
              const referralWallet = params.get("refferalWallet");
              console.log(referralWallet)
              if (referralWallet) {
                await contract.call("buyMembership", [selectedPlanNumber, referralWallet])
              }else{
                await contract.call("buyMembership", [selectedPlanNumber, "0x0000000000000000000000000000000000000123"])
              }
            } 

          }}
          onSuccess={(result) => alert("Success!")}
          onError={(error) => alert(`Error --> ${error.message}`)}
          className="buyMembershipClass"
        >
          {t("Confirm")}
        </Web3Button>
 

  



        
      </div>


    </ThirdwebProvider>


  );
};

export default SelectMembership;