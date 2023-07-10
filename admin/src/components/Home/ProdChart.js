import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const ProdChart = ({ title, data, dataKey, grid }) => {
  return (
    <div className="col-xl col-lg-12" style={{ marginTop: "-100px" }}>
      <div className="card mb-4 shadow-xl">
        <div className="chart">
          <h3 className="chartTitle">{title}</h3>
          <ResponsiveContainer width="100%" aspect={4 / 1}>
            <LineChart data={data}>
              <XAxis dataKey="name" stroke="#5550bd" />
              <Line type="monotone" dataKey={dataKey} stroke="#5550bd" />
              <Tooltip />
              {grid && <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" />}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ProdChart;
