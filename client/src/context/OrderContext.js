import { useEffect } from 'react';
import { createContext, useMemo, useState } from 'react';

export const OrderContext = createContext();

const pricePerItem = {
  products: 1000,
  options: 500,
};

function calculateSubtotal(orderType, orderCounts) {
  let optionCount = 0;
  for (const count of orderCounts[orderType].values()) {
    optionCount += count;
  }
  return optionCount * pricePerItem[orderType];
}

export function OrderContextProvider(props) {
  const [orderCounts, setOrderCounts] = useState({
    products: new Map(),
    options: new Map(),
  });

  const [totals, setTotals] = useState({
    products: 0,
    options: 0,
    total: 0,
  });

  useEffect(() => {
    const productsTotal = calculateSubtotal('products', orderCounts);
    const optionsTotal = calculateSubtotal('options', orderCounts);
    const total = productsTotal + optionsTotal;
    setTotals({
      products: productsTotal,
      options: optionsTotal,
      total,
    });
  }, [orderCounts]);

  const value = useMemo(() => {
    function updateItemCount(itemName, newItemCount, optionType) {
      const oldOrderMap = orderCounts[optionType];
      const newOrderMap = new Map(oldOrderMap);
      newOrderMap.set(itemName, parseInt(newItemCount));

      const newOrderCounts = { ...orderCounts };
      newOrderCounts[optionType] = newOrderMap;
      setOrderCounts(newOrderCounts);
    }
    return [{ ...orderCounts, totals }, updateItemCount];
  }, [orderCounts, totals]);

  return <OrderContext.Provider value={value} {...props} />;
}
