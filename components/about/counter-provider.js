export default function CounterProvider() {
  return (
    <section className="block py-[60px] px-6 md:px-0">
      <div className="container mx-auto">
        <div className="block w-full">
          <ul className="flex flex-wrap gap-10 justify-center items-start w-full pb-10">
            <li className="countlist">
              <h3 className="countlist-h3">09</h3>
              <p className="countlist-p">HMO Plans</p>
            </li>
            <li className="countlist">
              <h3 className="countlist-h3">17</h3>
              <p className="countlist-p">PPO Plans</p>
            </li>
            <li className="countlist">
              <h3 className="countlist-h3">09</h3>
              <p className="countlist-p">Medicare Plans</p>
            </li>
            <li className="countlist">
              <h3 className="countlist-h3">02</h3>
              <p className="countlist-p">Medi-Cal Plans</p>
            </li>
            <li className="countlist">
              <h3 className="countlist-h3">30+</h3>
              <p className="countlist-p">Hospitals + Centers of Excellence</p>
            </li>
          </ul>

          <div className="w-full h-[1px] bg-[#00888980] mb-[85px]"></div>
        </div>
      </div>
    </section>
  );
}
