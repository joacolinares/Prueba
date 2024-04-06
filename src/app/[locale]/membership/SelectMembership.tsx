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
import Web3 from 'web3';
import { BinanceTestnet } from "@thirdweb-dev/chains";
interface Props {
  dataPlans: PlansMembership[];
}

const SelectMembership = ({ dataPlans }: Props) => {
  const t = useTranslations();
  const [selectedPlan, setSelectedPlan] = useState<PlansMembership | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSelectPlan = (plan: string): void => {
    if (plan) {
      const planSelect = dataPlans.find((p) => p.plan === plan);
      if (planSelect) {
        setSelectedPlan(planSelect);
        console.log(planSelect);
      }
    } else {
      setSelectedPlan(null);
    }
  };

const callContract = async(selectedPlan : any) =>{
  console.log(selectedPlan.plan)
  console.log("test")
  const ethereum = (window as any).ethereum;
  const accounts = await ethereum.request({
    method: "eth_requestAccounts",
  });

  const provider = new ethers.providers.Web3Provider(ethereum)
  const walletAddress = accounts[0]   
  const signer = provider.getSigner(walletAddress)
  const contractAddress = "0x0cda7c31216405d997479f3e0219a5d9f3d9909c"; 
  const contract = new ethers.Contract(contractAddress, abi, signer);
  console.log(walletAddress)
  console.log(contract)
  const balance = await contract.totalPercentage();
  console.log(balance)
  try {
    //const transaction = await contract.buyMembership(1,"0x0271f837f08395f0d1fb0005d99F9A0B957eb72b");
  //  await transaction.wait();
  } catch (error) {
    console.error("Error al ejecutar la función del contrato:", error);
  }

}

const callContract2 = async(selectedPlan : any) =>{
  console.log(selectedPlan.plan)
  const contractAddress = "0x0cda7c31216405d997479f3e0219a5d9f3d9909c"; 
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  console.log("asd",provider)
  const contract = new ethers.Contract(contractAddress, abi, provider);
  const totalPercentage2 =  contract
  console.log(totalPercentage2)
 const totalPercentage = await contract.totalPercentage()
 console.log(totalPercentage)
}

const callContract3 = async (selectedPlan : any) => {
  try {
    // Crear una instancia de Web3 usando MetaMask u otro proveedor de Web3
    if (!window.ethereum) {
      throw new Error('MetaMask u otro proveedor de Web3 no detectado');
    }
    const web3 = new Web3(window.ethereum);

    // Obtener las cuentas del usuario conectado
    const accounts = await web3.eth.requestAccounts();
    const walletAddress = accounts[0];

    // Dirección y ABI del contrato
    const contractAddress = "0x0cda7c31216405d997479f3e0219a5d9f3d9909c";

    // Crear una instancia del contrato
    const contract = new web3.eth.Contract(abi, contractAddress);
    console.log(contract)
    // Llamar a la función 'totalPercentage()' del contrato
    const balance = await contract.methods.totalPercentage().call();
    console.log("Saldo:", balance);
  } catch (error) {
    console.error("Error al llamar al contrato:", error);
  }
};

  return (
    <ThirdwebProvider
    activeChain={BinanceTestnet}
    clientId="your-client-id"
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

      <div onClick={() => callContract3(selectedPlan)} className="px-[24px] mb-6">
        <ButtonPrimary text={t("Confirm")} />
        <Web3Button
      contractAddress="0x0cda7c31216405d997479f3e0219a5d9f3d9909c"
      contractAbi={abi}
      action={async (contract) => {
        contract.call(
          "buyMembership", 
          [1,"0x2306a5EFA31694d26a158d3085458F3513AB5a29"]
        );
      }}
    >
     Comprar la primera
    </Web3Button>


    <Web3Button
                 contractAddress="0x0cda7c31216405d997479f3e0219a5d9f3d9909c"
                 contractAbi={abi}
                  action={async (contract) => {
                    contract.call(
                      "buyMembership", 
                      [1,"0x2306a5EFA31694d26a158d3085458F3513AB5a29"]
                    );
                  }}
                >
                  Prueba
              </Web3Button>

      </div>
      


    </div>
    </ThirdwebProvider>
    
  );
};

export default SelectMembership;
