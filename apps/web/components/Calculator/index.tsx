import React, { ChangeEvent, useState, useCallback, useEffect } from "react";
import {
  useGetPricesMutation,
  useGetTokensQuery,
} from "../../lib/services/exchanges";
import InputGroup from "../InputGroup";
import IconArrowUp from "../Icons/ArrowUpDown";

function Calculator(): JSX.Element {
  const { data: { data: tokens = [] } = {}, isLoading } = useGetTokensQuery({});
  const [getPrices] = useGetPricesMutation();

  const [baseCrypto, setBaseCrypto] = useState("bitcoin");
  const [targetCrypto, setTargetCrypto] = useState("ethereum");

  const [baseAmount, setBaseAmount] = useState<"" | number>("");
  const [targetAmount, setTargetAmount] = useState<"" | number>("");
  const [action, setAction] = useState<"base-crypto" | "target-crypto">(
    "base-crypto",
  );

  const [prices, setPrices] = useState(0);

  const onBaseAmountChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setBaseAmount(+e.target.value);
      if (action === "base-crypto") {
        setTargetAmount(+(+e.target.value * prices).toFixed(4));
      } else {
        setTargetAmount(+(+e.target.value / prices).toFixed(4));
      }
    },
    [prices, action],
  );

  const onTargetAmountChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setTargetAmount(+e.target.value);
      if (action === "base-crypto") {
        setBaseAmount(+(+e.target.value / prices).toFixed(4));
      } else {
        setBaseAmount(+(+e.target.value * prices).toFixed(4));
      }
    },
    [prices, action],
  );
  
  /* 
   * disable pooling feature to get latest crypto price each 30 seconds
   * we disable because facing too many request error on gecko api, since we are using free version 
  */
  // const updatePrices = useCallback(async () => {
  //   try {
  //     let ids, currency;
  //     if (action === "base-crypto") {
  //       ids = baseCrypto.toLowerCase();
  //       currency = tokens.find((t) => t.id === targetCrypto)?.symbol;
  //     } else {
  //       ids = targetCrypto.toLowerCase();
  //       currency = tokens.find((t) => t.id === baseCrypto)?.symbol;
  //     }
  
  //     if (currency) {
  //       const response = await getPrices({ ids, currency }).unwrap();
  //       const currPrice = response.data[ids][currency] as unknown as number;
  //       setPrices(currPrice);
  
  //       if (action === "base-crypto") {
  //         setTargetAmount(+(+baseAmount / currPrice).toFixed(4));
  //       } else {
  //         setBaseAmount(+(+targetAmount * currPrice).toFixed(4));
  //       }
  //     }
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }, [tokens, baseCrypto, targetCrypto, baseAmount, targetAmount, action, getPrices]);

  // useEffect(() => {
  //   updatePrices();

  //   const interval = setInterval(updatePrices, 30000);

  //   return () => clearInterval(interval);
  // }, [updatePrices]);

  useEffect(() => {
    (async () => {
      try {
        const currency = tokens.find((t) => t.id === targetCrypto);
        if (currency?.symbol) {
          const response = await getPrices({ ids: baseCrypto, currency: currency.symbol }).unwrap();
          setPrices(response.data[baseCrypto][currency.symbol] as unknown as number)
        }
      } catch (err) {
        alert(`error: ${JSON.stringify(err)}`)
        console.error(err);
      }
    })()
  }, [tokens])

  const onBaseCryptoChange = useCallback(
    async (e: ChangeEvent<HTMLSelectElement>) => {
      try {
        setBaseCrypto(e.target.value);
        setAction("base-crypto")
        const currency = tokens.find((t) => t.id === targetCrypto);
        if (currency?.symbol) {
          const response = await getPrices({ ids: e.target.value.toLowerCase(), currency: currency.symbol }).unwrap();
          const currPrice = response.data[e.target.value][currency.symbol] as unknown as number
          setPrices(currPrice);
          setBaseAmount(+(+targetAmount / currPrice).toFixed(4))
          
        }
      } catch (err) {
        alert(`error: ${JSON.stringify(err)}`)
        console.error(err);
      }
    },
    [targetCrypto, tokens, targetAmount],
  );

  const onTargetCryptoChange = useCallback(
    async (e: ChangeEvent<HTMLSelectElement>) => {
      try {
        setTargetCrypto(e.target.value);
        setAction("target-crypto")
        const currency = tokens.find((t) => t.id === baseCrypto);
        if (currency?.symbol) {
          const response = await getPrices({ ids: e.target.value.toLowerCase(), currency: currency.symbol }).unwrap();
          const currPrice = response.data[e.target.value][currency.symbol] as unknown as number;
          setPrices(currPrice);
          setTargetAmount(+(+baseAmount / currPrice).toFixed(4))
        }
      } catch (err) {
        alert(`error: ${JSON.stringify(err)}`)
        console.error(err);
      }
    },
    [baseCrypto, tokens, baseAmount],
  );

  const handleSwap = useCallback(() => {
    setBaseCrypto(targetCrypto);
    setTargetCrypto(baseCrypto);
    setBaseAmount(targetAmount);
    setTargetAmount(baseAmount);
    setAction(action === "base-crypto" ? "target-crypto" : "base-crypto");
  }, [baseCrypto, targetCrypto, baseAmount, targetAmount, action]);

  if (isLoading) {
    return (
      <div className="px-4 md:px-5 pt-7 pb-4 w-full mx-auto animate-pulse">
        <div className="space-y-4">
          <div className="h-10 bg-slate-700 rounded"></div>
          <div className="h-10 bg-slate-700 rounded"></div>
        </div>
        <div className="flex justify-between flex-row space-x-40 mt-4">
          <div className="h-5 bg-slate-700 rounded w-full"></div>
          <div className="h-5 bg-slate-700 rounded w-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 md:px-5 pt-7 pb-4">
      <div className="mb-4">
        <InputGroup
          name="baseAmount"
          selectName="baseCurrency"
          value={baseAmount}
          selectedCurrency={baseCrypto}
          onChange={onBaseAmountChange}
          onSelect={onBaseCryptoChange}
          tokens={tokens}
        />
      </div>

      <div onClick={handleSwap} className="mb-4 flex justify-center items-center cursor-pointer" >
        <IconArrowUp />
      </div>

      <div className="mb-4">
        <InputGroup
          name="targetAmount"
          selectName="targetCurrency"
          value={targetAmount}
          selectedCurrency={targetCrypto}
          onChange={onTargetAmountChange}
          onSelect={onTargetCryptoChange}
          tokens={tokens}
        />
      </div>

      <div className="flex flex-col md:flex-row md:justify-between items-center text-xs text-slate-500">
        <p>1 {baseCrypto} equals {action === "base-crypto" ? prices.toFixed(4) : (1 / prices).toFixed(4) } {targetCrypto}</p>
      </div>
    </div>
  );
}

export default Calculator;
