import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import Error from '../../components/Error';
import { OrderContext } from '../../context/OrderContext';

const CompletePage = ({ setStep }) => {
  const [orderDatas, , resetOrderCounts] = useContext(OrderContext);
  const [orderHistory, setOrderHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    orderCompleted(orderDatas);
  }, [orderDatas]);

  const orderCompleted = async (orderDatas) => {
    setLoading(true);
    try {
      let response = await axios.post(`http://localhost:4000/order`, orderDatas);
      setOrderHistory(response.data);
      setLoading(false);
    } catch (error) {
      setError(error);
    }
  };

  const orderTable = orderHistory.map((item) => (
    <tr key={item.orderNumber}>
      <td>{item.orderNumber}</td>
      <td>{item.price}</td>
    </tr>
  ));

  if (error) {
    return <Error message='에러가 발생하였습니다.' />;
  }

  const handleClick = () => {
    resetOrderCounts();
    setStep(0);
  };

  if (loading) {
    return <div>loading</div>;
  } else {
    return (
      <div style={{ textAlign: 'center' }}>
        <h2>주문이 완료되었습니다.</h2>
        <h3>전체 주문 내역</h3>
        <table style={{ margin: 'auto' }}>
          <tbody>
            <tr>
              <th>number</th>
              <th>price</th>
            </tr>
            {orderTable}
          </tbody>
        </table>
        <button className='rainbow rainbow-1' onClick={handleClick}>
          메인 페이지로 이동
        </button>
      </div>
    );
  }
};

export default CompletePage;
