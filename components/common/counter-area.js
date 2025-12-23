import CountBar from "./count-bar";


export default function CounterArea({ frontPageData, statBoxes }) {
  // Use ACF data if available, otherwise fallback to hardcoded data
  const data = statBoxes?.length > 0 
    ? statBoxes.map((item, index, array) => ({
        value: item.stateValues,
        label: item.statHeadlines,
        suffix: index === array.length - 1 ? "+" : undefined
      }))
    : frontPageData?.ticker?.counter?.length > 0 
    ? frontPageData.ticker.counter.map((item, index, array) => ({
        value: item.counterValue,
        label: item.label,
        suffix: index === array.length - 1 ? "+" : undefined
      }))
    : [
        { value: 9, label: "HMO Plans" },
        { value: 17, label: "PPO Plans" },
        { value: 9, label: "Medicare Plans" },
        { value: 2, label: "Medi-Cal Plans" },
        { value: 30, label: "Hospitals + Centers of Excellence", suffix: "+" }
      ];

  return (
    <ul className="flex flex-wrap gap-10 justify-center items-start w-full pb-10">
      {data.map((item, idx) => (
        <li
          key={idx}
          className={`countlist ${idx === 4 ? "px-5 md:px-0" : ""}`}
        >
          <div className="flex items-center justify-center">
            <CountBar end={item.value} />
            {item.suffix && <span className="countlist-h3">{item.suffix}</span>}
          </div>
          <p className="countlist-p">{item.label}</p>
        </li>
      ))}
    </ul>
  );
}
