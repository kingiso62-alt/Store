import CheckoutTrust from '../../components/order/CheckoutTrust';
import Header from '../../components/Header';import Footer from '../../components/Footer';import CheckoutClient from '../../components/CheckoutClient';
export default function Checkout(){return <><Header/><main className="wrap checkoutPage"><div className="checkoutSteps"><b>1 Cart</b><b className="active">2 Details</b><b>3 Payment</b><b>4 Confirm</b></div><CheckoutClient/><CheckoutTrust/></main><Footer/></>}
