import { t } from "@lingui/macro";
import { Trans } from "@lingui/react";
import { Collapse } from "antd";
import { useObserver } from "mobx-react";
import styles from "./../../../pages/home/home.module.less";
import ReactECharts from "echarts-for-react";
import { useEffect, useRef } from "react";
import useStore from "../../../stores/useStore";
import { MarryStore } from "../../../stores/main/marry.store";
import { graphic } from "echarts";
import moment from "moment";
const AvagGas = 30;
export const GAS = (props: {}) => {
  const dom = useRef(null);
  const marryStore = useStore(MarryStore);
  const shichen = [
    "子时",
    "丑时",
    "寅时",
    "卯时",
    "辰时",
    "巳时",
    "午时",
    "未时",
    "申时",
    "酉时",
    "戌时",
    "亥时",
  ];
  const getOptions = () => {
    const option = {
      legend: {
        data: ["yestoday", "today"],
      },
      tooltip: {
        trigger: "axis",
        backgroundColor: "#1A161C",
        formatter: (d) => {
          const lastday = d[0];
          return `<div style="display:flex;align-items:center;color:#fff;">
          <div style="width:28px;height:28px;margin-right:15px;margin-left:5px;border-radius:19px;color:#fff;line-height:28px;text-align:center;background:${
            lastday.value > AvagGas ? "red" : "green"
          }">${lastday.value > AvagGas ? "忌" : "宜"}</div>
            <div><div>${lastday.axisValue} ${moment(d[0].name * 1).format(
            "HH:mm"
          )}</div>
          <div>Gas ${lastday.value}</div>
          </div>
          </div>`;
        },
      },

      grid: {
        left: "-1%",
        right: "-0%",
        bottom: "30%",
        top: "0%",
      },
      xAxis: {
        type: "category",
        boundaryGap: true,
        color: "#ffffff",
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        data: marryStore.lastdayGases.map((item) => {
          return shichen[Math.floor(moment(item.t).hour() / 2)];
        }),
      },
      yAxis: {
        type: "value",
        show: false,
      },
      series: [
        {
          name: "Last Day",
          type: "line",
          symbol: "none",
          color: "#A9DFD8",
          lineStyle: { width: 3 },
          areaStyle: {
            color: new graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "#A9DFD8",
              },
              {
                offset: 1,
                color: "#A9DFD800",
              },
            ]),
          },
          data: marryStore.lastdayGases.map((item) => {
            return { name: item.t, value: item.v };
          }),
        },
        {
          name: "Today",
          type: "line",
          symbol: "none",
          color: "#F41870",
          lineStyle: { width: 3 },
          endLabel: {
            show: true,
            backgroundColor: "#1A161C",
            color: "#fff",
            padding: [10, 20],
            borderRadius: 5,
            fontSize: 14,
            lineHeight: 20,
            formatter: (d) => {
              console.log(d);
              return `${
                shichen[Math.floor(moment(d.name * 1).hour() / 2)]
              } ${moment(d.name * 1).format("HH:mm")} ${
                d.value > AvagGas ? "忌婚嫁" : "宜婚嫁"
              }\nGas ${d.value} `;
            },
          },
          areaStyle: {
            color: new graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "#FFA3C8",
              },
              {
                offset: 1,
                color: "#FFA3C800",
              },
            ]),
          },
          data: marryStore.todayGases.map((item) => {
            return { name: item.t, value: item.v };
          }),
        },
      ],
    };
    return option;
  };

  return useObserver(() => (
    <div className={[styles.Page_gas, "shake-trigger"].join(" ")} ref={dom}>
      <ReactECharts
        option={getOptions()}
        notMerge={true}
        lazyUpdate={true}
        style={{ width: "100%", height: "110px" }}
      />
      <div className={styles.gas_anim}>
        <div className={styles.gas_anim_inner}>
          <div className={styles.gas_anim_item}>
            Last 1000 block avg Gas Fee: {marryStore.nowGas} gwei
          </div>
          <div className={styles.gas_anim_item}>
            Last 1000 block avg Gas Fee: {marryStore.nowGas} gwei
          </div>
          <div className={styles.gas_anim_item}>
            Last 1000 block avg Gas Fee: {marryStore.nowGas} gwei
          </div>
          <div className={styles.gas_anim_item}>
            Last 1000 block avg Gas Fee: {marryStore.nowGas} gwei
          </div>
          <div className={styles.gas_anim_item}>
            Last 1000 block avg Gas Fee: {marryStore.nowGas} gwei
          </div>
          <div className={styles.gas_anim_item}>
            Last 1000 block avg Gas Fee: {marryStore.nowGas} gwei
          </div>
          <div className={styles.gas_anim_item}>
            Last 1000 block avg Gas Fee: {marryStore.nowGas} gwei
          </div>
          <div className={styles.gas_anim_item}>
            Last 1000 block avg Gas Fee: {marryStore.nowGas} gwei
          </div>
          <div className={styles.gas_anim_item}>
            Last 1000 block avg Gas Fee: {marryStore.nowGas} gwei
          </div>
          <div className={styles.gas_anim_item}>
            Last 1000 block avg Gas Fee: {marryStore.nowGas} gwei
          </div>
          <div className={styles.gas_anim_item}>
            Last 1000 block avg Gas Fee: {marryStore.nowGas} gwei
          </div>
          <div className={styles.gas_anim_item}>
            Last 1000 block avg Gas Fee: {marryStore.nowGas} gwei
          </div>
          <div className={styles.gas_anim_item}>
            Last 1000 block avg Gas Fee: {marryStore.nowGas} gwei
          </div>
          <div className={styles.gas_anim_item}>
            Last 1000 block avg Gas Fee: {marryStore.nowGas} gwei
          </div>
          <div className={styles.gas_anim_item}>
            Last 1000 block avg Gas Fee: {marryStore.nowGas} gwei
          </div>
        </div>
      </div>
    </div>
  ));
};
