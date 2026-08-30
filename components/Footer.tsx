import Link from 'next/link';
import { 
  Phone, Mail, MapPin, Zap, ShieldCheck, Clock, 
  ArrowRight, CreditCard, Send, CheckCircle2,
  KeyRound, HelpCircle, FileText
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="luxuryFooter">
      {/* 1. TOP NEWSLETTER & VIP SUPPORT BANNER */}
      <div className="footerTopBanner">
        <div className="wrap footerTopInner">
          <div className="footerTopLeft">
            <div className="vipClubIcon">
              <Zap size={22} />
            </div>
            <div>
              <h3>JOIN THE TOKIYO GAMING CLUB</h3>
              <p>Get exclusive flash discounts, weekly UC giveaways &amp; priority recharge speed.</p>
            </div>
          </div>

          <div className="footerTopRight">
            <div className="footerNewsletterBox">
              <input 
                type="email" 
                placeholder="Enter your email address..." 
                aria-label="Email address for newsletter"
              />
              <button type="button" aria-label="Subscribe">
                <span>Subscribe</span>
                <Send size={15} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN FOOTER GRID */}
      <div className="footerMainBody">
        <div className="wrap footerMainGrid">
          {/* Column 1: Brand & Contact Info */}
          <div className="footerCol brandCol">
            <Link href="/" className="footerLogoLink">
              <img src="/images/tokiyo-logo.png" alt="TOKIYO STORE" className="footerLogoImg" />
            </Link>
            <p className="footerBrandBio">
              Somalia&apos;s #1 Premier Destination for 24/7 Automated Game Recharges &amp; Esports Top-Ups. 100% official publisher partner and 30-second Player ID delivery.
            </p>

            <div className="footerContactList">
              <a href="https://wa.me/252613667676" target="_blank" rel="noopener noreferrer" className="contactItem">
                <div className="contactIconWrap">
                  <Phone size={15} />
                </div>
                <div>
                  <small>WhatsApp Support 24/7</small>
                  <b>+252 61 366 7676</b>
                </div>
              </a>

              <a href="mailto:info@tokiyostore.com" className="contactItem">
                <div className="contactIconWrap">
                  <Mail size={15} />
                </div>
                <div>
                  <small>Official Support Email</small>
                  <b>info@tokiyostore.com</b>
                </div>
              </a>

              <div className="contactItem">
                <div className="contactIconWrap">
                  <MapPin size={15} />
                </div>
                <div>
                  <small>Location &amp; Delivery</small>
                  <b>Mogadishu, Somalia (Instant Digital Delivery)</b>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Popular Game Recharges */}
          <div className="footerCol">
            <h4 className="footerColHeading">
              <span>Game Top-Up</span>
              <i></i>
            </h4>
            <ul className="footerLinksList">
              <li>
                <Link href="/topup/order?game=pubg">
                  <ArrowRight size={13} className="linkArrow" />
                  <span>PUBG Mobile UC</span>
                </Link>
              </li>
              <li>
                <Link href="/topup/order?game=freefire">
                  <ArrowRight size={13} className="linkArrow" />
                  <span>Free Fire Diamonds</span>
                </Link>
              </li>
              <li>
                <Link href="/topup/order?game=efootball_android">
                  <ArrowRight size={13} className="linkArrow" />
                  <span>eFootball Android Coins</span>
                </Link>
              </li>
              <li>
                <Link href="/topup/order?game=efootball_ios">
                  <ArrowRight size={13} className="linkArrow" />
                  <span>eFootball iOS Coins</span>
                </Link>
              </li>
              <li>
                <Link href="/topup/order?game=roblox">
                  <ArrowRight size={13} className="linkArrow" />
                  <span>Roblox Gift Cards</span>
                </Link>
              </li>
              <li>
                <Link href="/topup/order?game=mobilelegends">
                  <ArrowRight size={13} className="linkArrow" />
                  <span>Mobile Legends (MLBB)</span>
                </Link>
              </li>
              <li>
                <Link href="/topup/order?game=brawlstars">
                  <ArrowRight size={13} className="linkArrow" />
                  <span>Brawl Stars Gems</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Special Services & Recharges */}
          <div className="footerCol">
            <h4 className="footerColHeading">
              <span>Special Services</span>
              <i></i>
            </h4>
            <ul className="footerLinksList">
              <li>
                <Link href="/topup/order?service=xsuits">
                  <ArrowRight size={13} className="linkArrow" />
                  <span>Mythic X-Suits (7-Star)</span>
                </Link>
              </li>
              <li>
                <Link href="/topup/order?service=cars">
                  <ArrowRight size={13} className="linkArrow" />
                  <span>Official Supercars</span>
                </Link>
              </li>
              <li>
                <Link href="/topup/order?service=popularity">
                  <ArrowRight size={13} className="linkArrow" />
                  <span>Popularity Battle (PK)</span>
                </Link>
              </li>
              <li>
                <Link href="/redeem">
                  <ArrowRight size={13} className="linkArrow" />
                  <span>Code Checker &amp; Redeem</span>
                </Link>
              </li>
              <li>
                <Link href="/topup">
                  <ArrowRight size={13} className="linkArrow" />
                  <span>Cashback Rewards</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Customer Care & Info */}
          <div className="footerCol">
            <h4 className="footerColHeading">
              <span>Customer Care</span>
              <i></i>
            </h4>
            <ul className="footerLinksList">
              <li>
                <Link href="/track-order">
                  <ArrowRight size={13} className="linkArrow" />
                  <span>Track Your Order</span>
                </Link>
              </li>
              <li>
                <Link href="/terms">
                  <ArrowRight size={13} className="linkArrow" />
                  <span>Shuruudaha (Terms)</span>
                </Link>
              </li>
              <li>
                <Link href="/faq">
                  <ArrowRight size={13} className="linkArrow" />
                  <span>FAQ (Su&apos;aalaha)</span>
                </Link>
              </li>
              <li>
                <Link href="/account">
                  <ArrowRight size={13} className="linkArrow" />
                  <span>My Account &amp; History</span>
                </Link>
              </li>
            </ul>

            {/* Trust Assurance Pills */}
            <div className="footerTrustBox">
              <div className="trustPillItem">
                <CheckCircle2 size={15} className="trustGreen" />
                <span>100% Official Game Publisher</span>
              </div>
              <div className="trustPillItem">
                <Clock size={15} className="trustYellow" />
                <span>30-Second Instant Delivery</span>
              </div>
              <div className="trustPillItem">
                <ShieldCheck size={15} className="trustGreen" />
                <span>24/7 Security Guaranteed</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3. ACCEPTED PAYMENT METHODS BAR */}
        <div className="wrap footerPaymentsBar">
          <div className="paymentsLabel">
            <CreditCard size={17} />
            <span>Supported Payment Methods:</span>
          </div>
          <div className="paymentsTagsList">
            <span className="payTag">EVC PLUS (*770#)</span>
            <span className="payTag">ZAAD SERVICE</span>
            <span className="payTag">SAHAL</span>
            <span className="payTag">PREMIER BANK</span>
            <span className="payTag">E-DAHAB</span>
            <span className="payTag">MASTERCARD / VISA</span>
          </div>
        </div>
      </div>

      {/* 4. BOTTOM COPYRIGHT & STATUS BAR */}
      <div className="footerBottomBar">
        <div className="wrap footerBottomInner">
          <p className="copyrightText">
            © {new Date().getFullYear()} <b>TOKIYO STORE</b>. All Rights Reserved. Pure Esports &amp; Game Recharges.
          </p>

          <div className="systemStatusPill">
            <span className="statusDotLive"></span>
            <span>24/7 Top-Up Server: <b>Online &amp; Instant Delivery</b></span>
          </div>
        </div>
      </div>
    </footer>
  );
}