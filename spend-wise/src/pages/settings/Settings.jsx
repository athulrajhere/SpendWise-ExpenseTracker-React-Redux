import { options } from "../../components/chart/Chart";
import "./setting.scss";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const Settings = () => {
  return (
    <div className="charts">
      <div className="bar-chart">
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>
    </div>
  );
};

export default Settings;
