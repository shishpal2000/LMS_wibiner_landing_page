"use client";
import React, { useEffect } from "react";
import { show_notification } from "../../apiCollection/notification"

const PaymentFail = () => {


  useEffect(() => {

    show_notification("Payment Failed","error");
   
  }, []); 

  return (
    <div>
      <h1>Payment Fail</h1>
    </div>
  );
};

export default PaymentFail;
