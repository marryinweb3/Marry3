import { useRouter } from "next/router";
import { DatePickerProps, message } from "antd";
import { Input, DatePicker, Select, Button } from "antd";
import styles from "./wedding.module.less";

import { WeddingStore } from "../../../stores/main/wedding.store";
import useStore from "../../../stores/useStore";
import { useEffect, useRef, useState } from "react";
import { RangePickerProps } from "antd/lib/date-picker";
import moment from "moment";
import ClipboardJS from "clipboard";
export default function WeddingForm(props: any) {
  const weddingStore = useStore(WeddingStore);
  const [disabled, setDisabled] = useState(true);
  const [submiting, setSubmiting] = useState(false);
  const [created, setCreated] = useState(false);
  const [joined, setJoined] = useState(true);
  const copyRef = useRef(null);
  const { TextArea } = Input;
  const router = useRouter();
  const state = props.state;
  const textarea = `XXXX.ETH与 Ooooo.ETH 谨定于2022年11月11日11时在元宇宙世界举行结婚典礼。敬备喜筵，恭请光临！`;
  const back = () => {
    router.push("/town");
  };
  const onChangeDate: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
    weddingStore.createInfo.wedding_at = dateString;
    isAble();
  };
  const { Option } = Select;

  const onChange = (value: number) => {
    console.log(`selected ${value}`);
    weddingStore.createInfo.type = value;
    isAble();
  };
  const onChangeText = (value) => {
    console.log(`selected ${value}`);
    weddingStore.createInfo.comment = value.target.value;
    isAble();
  };
  const nftChange = (value: string) => {
    console.log(`selected ${value}`);
    weddingStore.joinInfo.name = value; //暂时没找到对应参数
  };
  const submitCreate = async () => {
    setSubmiting(true);
    console.log("提交并生成分享链接");
    console.log("创建婚礼submit", weddingStore);
    await weddingStore.createWedding({});
    setSubmiting(false);
    setCreated(true);
  };
  const submitJoin = async () => {
    setSubmiting(true);
    console.log("提交并生成分享链接");
    console.log("参加婚礼submit", weddingStore);
    await weddingStore.joinWedding({});
    setSubmiting(false);
    setJoined(true);
  };
  const isAble = () => {
    let a: any = false;
    if (state == "create") {
      a =
        weddingStore.createInfo.comment &&
        weddingStore.createInfo.wedding_at &&
        weddingStore.createInfo.type;
    } else {
      a =
        weddingStore.joinInfo.name &&
        weddingStore.joinInfo.address &&
        weddingStore.joinInfo.cover;
    }
    setDisabled(!Boolean(a));
  };
  useEffect(() => {
    isAble();
  }, [weddingStore]);
  let clip: any;
  useEffect(() => {
    if (copyRef.current && created) {
      if (!clip) {
        clip = new ClipboardJS(copyRef.current!, {
          text: () => weddingStore.wedding?.inviteLink,
        });
        clip.on("success", function () {
          message.success("copy success");
          weddingStore.shareClicked = true;
        });
        clip.on("error", () => {
          message.error("copy fail");
        });
      }
    }
  }, [copyRef.current]);
  const selectAfter = (
    <Select defaultValue="man" className="select-after">
      <Option value="man">男士</Option>
      <Option value="woman">女士</Option>
    </Select>
  );
  // eslint-disable-next-line arrow-body-style
  const disabledDate: RangePickerProps["disabledDate"] = (current) => {
    // Can not select days before today and today
    return current && current < moment().endOf("day");
  };
  return (
    <div className={styles.weddingForm}>
      <div className={styles.headPort}>
        <div className={styles.headPerson}>
          <div className={styles.head}>
            <div className={styles.headImg}>
              <img
                src={
                  state == "create"
                    ? weddingStore.wedding.Acover
                    : weddingStore.weddingDetail?.wedding?.coverA
                }
              />
            </div>
          </div>
          <div className={styles.name}>xxxxxxx.eth</div>
        </div>
        <div className={styles.headPerson}>
          <div className={styles.head}>
            <div className={styles.headImg}>
              <img
                src={
                  state == "create"
                    ? weddingStore.wedding.Bcover
                    : weddingStore.weddingDetail?.wedding?.coverB
                }
              />
            </div>
          </div>
          <div className={styles.name}>xxxxxxx.eth</div>
        </div>
      </div>
      {state == "create" ? (
        <div className={styles.formContent}>
          <div className={styles.item}>
            <div className={styles.label}>预约时间：</div>
            <DatePicker
              onChange={onChangeDate}
              className={styles.value}
              disabledDate={disabledDate}
            />
          </div>
          <div className={styles.item}>
            <div className={styles.label}>婚礼形式：</div>
            <Select
              showSearch
              placeholder="Select a person"
              optionFilterProp="children"
              onChange={onChange}
              filterOption={(input, option) =>
                (option!.children as unknown as string)
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              className={styles.value}
            >
              <Option value={1}>中式婚礼</Option>
              <Option value={2}>西式婚礼</Option>
            </Select>
          </div>
          <div className={styles.item}>
            <div className={styles.label}>请帖内容：</div>
            <div className={styles.value}>
              <TextArea
                placeholder={textarea}
                allowClear
                onChange={onChangeText}
              />
            </div>
          </div>
          <div className={styles.center}>
            {!created ? (
              <Button
                type="primary"
                danger
                onClick={submitCreate}
                disabled={disabled}
                loading={submiting}
              >
                <img src="/wedding/lock.svg" className={styles.lockIcon} />
                签名生成请帖连接
              </Button>
            ) : (
              <div className={styles.copyContent}>
                <div className={styles.copyText}>
                  {weddingStore.wedding.inviteLink}
                </div>
                <Button type="primary" danger ref={copyRef}>
                  复制
                </Button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className={styles.formContent}>
          {!joined ? (
            <div className={styles.joinform}>
              <div className={styles.item}>
                <div className={styles.label}>NFT PFP</div>
                <Select
                  defaultValue=""
                  style={{ width: "100%" }}
                  onChange={nftChange}
                >
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                  <Option value="disabled" disabled>
                    Disabled
                  </Option>
                  <Option value="Yiminghe">yiminghe</Option>
                </Select>
              </div>
              <div className={styles.item}>
                <div className={styles.label}>称呼</div>
                <Input
                  addonAfter={selectAfter}
                  defaultValue=""
                  placeholder="ENS或者昵称"
                  onChange={async (e) => {
                    weddingStore.joinInfo.name = e.target.value;
                  }}
                />
              </div>
              <div className={styles.line}></div>
              <div className={styles.btn}>apply</div>
            </div>
          ) : (
            <div className={styles.joinText}>
              <div>Xxxx.eth 与 Ooooo.eth</div>
              <div style={{ marginBottom: "32px" }}>
                谨定于2022年11月11日11时在元宇宙世界举行结婚典礼。
              </div>
              <div>敬备喜筵，恭请光临！</div>
            </div>
          )}
          <div className={styles.center}>
            <Button
              type="primary"
              danger
              onClick={submitJoin}
              disabled={disabled || joined}
            >
              <img src="/wedding/lock.svg" className={styles.lockIcon} />
              {joined ? "你已确认参加婚礼" : "签名确认参加婚礼"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
