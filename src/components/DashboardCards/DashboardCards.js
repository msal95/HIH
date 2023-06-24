import React from "react";
import { ArrowRight, Layers } from "react-feather";
import { Link } from "react-router-dom";
import { Card, CardBody } from "reactstrap";
import Chart from "react-apexcharts";

import "./style.scss";

const options = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    labels: ["New", "Returning", "Referrals"],
    dataLabels: {
      enabled: false,
    },
    legend: { show: false },
    stroke: {
      width: 4,
    },
    colors: ["#28C76F", "#FF9F43", "#C11B1B"],
  },
  series = [690, 258, 149];

export default function DashboardCards(props) {
  const { color, title, total, icon } = props;
  const IconComponent = icon;

  return (
    <Card className="h-75">
      <CardBody>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h3 className="record-numbers" style={{ color }}>
              {total}
            </h3>
            <p className="link-style">{title}</p>
          </div>
          <IconComponent size={22} />
          {/* {!isRatio ? (
            <Chart
              options={options}
              series={series}
              type="pie"
              height={90}
              width={50}
            />
          ) : (
            <Chart
              options={ratioOptions}
              series={ratioSeries}
              type="radialBar"
              height={90}
              width={50}
              //   className="apexcharts-text"
              //   style={{ background: "red", height: "5rem" }}
            />
          )} */}
        </div>
      </CardBody>
    </Card>
  );
}
