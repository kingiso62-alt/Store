'use client';
export default function PaymentMethodSelector(){
 return <div className="paymentMethods"><h3>Payment Method</h3>
  <label><input type="radio" name="paymentMethod" value="evc" defaultChecked/> EVC Plus</label>
  <label><input type="radio" name="paymentMethod" value="zaad"/> Zaad</label>
  <label><input type="radio" name="paymentMethod" value="edahab"/> eDahab</label>
  <label><input type="radio" name="paymentMethod" value="card"/> Visa / Mastercard</label>
 </div>
}
