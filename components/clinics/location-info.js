import Link from "next/link";

export default function LocationInfo() {
  return (
    <div className="block">
      <div className="container mx-auto">
        <div className="block w-full pt-9 pb-[65px] border-b border-lightPrimary">
          <div className="max-w-full md:max-w-[743px] mx-auto flex flex-col gap-6 content-typography">
            <div className="block">
              <h2>Our Location</h2>
              <p>
                535 E. Romie Ln., Suite 2<br />
                Salinas, CA 93901
                <br />
                <Link href="/#"><u>Get Directions</u></Link> <br />
                Phone: <Link href="tel:831-652-8150"><u>831-652-8150</u></Link>
              </p>
            </div>
            <div className="block">
              <h2>Convenient Appointment Booking</h2>
              <p>
                Scheduling your appointment with us is easy. You can book online
                or call us directly. We accept a range of insurance plans to
                ensure you have access to the care you need.
              </p>
            </div>
            <div className="block">
              <h2>Office Hours</h2>
              <p>Mon & Fri: 8:00 AM – 12:00 PM, 1:00 PM – 7:00 PM <br /> Tues. – Thurs.: 8:00 AM – 12:00 PM, 1:00 PM – 5:00 PM</p>
            </div>
            <div className="block">
                <button type="button" className="btn-md btn-gradient w-full md:w-[350px]">Book your appointment with us</button>
            </div>
            <div className="block">
              <h2>Insurance Information</h2>
              <p>At Altais Medical Group, we accept a wide variety of insurance plans to ensure you receive the care you need without the hassle. To ensure your visit is covered, please verify your insurance coverage with our office.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
