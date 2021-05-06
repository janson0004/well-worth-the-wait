import React from "react";
import { Bar } from "react-chartjs-2";
import styled from "styled-components/macro";

const Chart = () => {
  return (
    <Wrapper>
      <Title>Waiting Time in the past 10 hours</Title>
      <ChartWrapper>
        <Bar
          data={{
            labels: "hihi",
            datasets: [
              {
                label: "My First Dataset",
                data: [65, 59, 80, 81, 56, 55, 40],
                backgroundColor: [
                  "rgba(255, 99, 132, 0.2)",
                  "rgba(255, 159, 64, 0.2)",
                  "rgba(255, 205, 86, 0.2)",
                  "rgba(75, 192, 192, 0.2)",
                  "rgba(54, 162, 235, 0.2)",
                  "rgba(153, 102, 255, 0.2)",
                  "rgba(201, 203, 207, 0.2)",
                ],
                borderColor: [
                  "rgb(255, 99, 132)",
                  "rgb(255, 159, 64)",
                  "rgb(255, 205, 86)",
                  "rgb(75, 192, 192)",
                  "rgb(54, 162, 235)",
                  "rgb(153, 102, 255)",
                  "rgb(201, 203, 207)",
                ],
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

const Wrapper = styled.div``;

const ChartWrapper = styled.div`
  height: 100%;
  width: 100%;
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 20px;
`;
