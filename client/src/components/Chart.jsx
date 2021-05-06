import React from "react";
import { Bar } from "react-chartjs-2";
import styled from "styled-components/macro";

const Chart = ({ title, data, labels }) => {
  return (
    <Wrapper>
      <Title>{title}</Title>
      <ChartWrapper>
        <Bar
          data={{
            labels: labels,
            datasets: [
              {
                label: "Waiting Time",
                data: data,
                backgroundColor: "rgba(153, 102, 255, 0.2)",
                borderColor: "rgb(153, 102, 255)",
                borderWidth: 1,
              },
            ],
          }}
          options={({ maintainAspectRatio: false }, { responsive: true })}
          // options={{ maintainAspectRatio: false }}
          // height={400}
          // width={600}
        />
      </ChartWrapper>
    </Wrapper>
  );
};

export default Chart;

const Wrapper = styled.div`
  margin-bottom: 40px;
`;

const ChartWrapper = styled.div``;

const Title = styled.div`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 20px;
`;
