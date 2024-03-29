import { FC, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { IWeatherSwitchDay } from "../../types";
import {
  WEATHER_DATE_TABS_QUERY_KEY,
  WEATHER_DATE_TABS_TODAY,
  dateTabs,
} from "../../constants";

const WeatherSwitchDay: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const dateTab = useMemo(
    () => searchParams.get(WEATHER_DATE_TABS_QUERY_KEY),
    [searchParams]
  );

  const handleChangeDay = ({ field, value }: IWeatherSwitchDay): void => {
    if (!value || value === WEATHER_DATE_TABS_TODAY) {
      searchParams.delete(field);
    } else {
      searchParams.set(field, String(value));
    }
    setSearchParams(searchParams, { replace: true });
  };

  return (
    <div className="flex  items-center justify-center flex-auto pb-[7px] border- mt-4 md:mt-0  select-none">
      {dateTabs.map((tab, index) => (
        <div
          key={tab.id}
          className={`
      inline-flex px-4 items-center gap-4 flex-shrink-0 border-b-4 trasition-all duration-300
      ${
        (!dateTab && index === 0) || dateTab === tab.value.toString()
          ? "border-colorLightGreen text-colorLightGreen"
          : "border-colorLight text-colorLight"
      } 
    `}>
          <span
            className="font-medium font-roboto  text-xl md:text-[32px] uppercase leading-9 tracking-wider cursor-pointer"
            onClick={() =>
              handleChangeDay({
                field: WEATHER_DATE_TABS_QUERY_KEY,
                value: tab.value,
              })
            }>
            {tab.title}
          </span>
        </div>
      ))}
    </div>
  );
};

WeatherSwitchDay.displayName = "WeatherSwitchDay";
export default WeatherSwitchDay;
