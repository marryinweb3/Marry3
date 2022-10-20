import { useRouter } from "next/router";
import type { DatePickerProps } from "antd";
import { Input, DatePicker, Select, Button } from "antd";
import styles from "./wedding.module.less";

import { WeddingStore } from "../../../stores/main/wedding.store";
import useStore from "../../../stores/useStore";
export default function WeddingForm(props: any) {
  const weddingStore = useStore(WeddingStore);
  const { TextArea } = Input;
  const router = useRouter();
  const state = props.state;
  const textarea = `XXXX.ETH与 Ooooo.eth 谨定于2022年11月11日11时在元宇宙世界举行结婚典礼。敬备喜筵，恭请光临！`;
  const back = () => {
    router.push("/town");
  };
  const onChangeDate: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
    weddingStore.createInfo.wedding_at = dateString;
  };
  const { Option } = Select;

  const onChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  const onChangeText = (value) => {
    console.log(`selected ${value}`);
    weddingStore.createInfo.comment = value;
  };
  const nftChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  const selectAfter = (
    <Select defaultValue="man" className="select-after">
      <Option value="man">男士</Option>
      <Option value="woman">女士</Option>
    </Select>
  );
  return (
    <div className={styles.weddingForm}>
      <div className={styles.headPort}>
        <div className={styles.headPerson}>
          <div className={styles.head}>
            <div className={styles.headImg}>
              <img src={weddingStore.wedding.Acover} />
            </div>
          </div>
          <div className={styles.name}>xxxxxxx.eth</div>
        </div>
        <div className={styles.headPerson}>
          <div className={styles.head}>
            <div className={styles.headImg}>
              <img src={weddingStore.wedding.Bcover} />
            </div>
          </div>
          <div className={styles.name}>xxxxxxx.eth</div>
        </div>
      </div>
      {state == "create" ? (
        <div className={styles.formContent}>
          <div className={styles.item}>
            <div className={styles.label}>预约时间：</div>
            <DatePicker onChange={onChangeDate} className={styles.value} />
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
              <Option value="jack">中式婚礼</Option>
              <Option value="lucy">西式婚礼</Option>
            </Select>
          </div>
          <div className={styles.item}>
            <div className={styles.label}>请帖内容：</div>
            <div className={styles.value}>
              <TextArea
                placeholder="textarea with clear icon"
                allowClear
                onChange={onChangeText}
              />
            </div>
          </div>
          <div className={styles.center}>
            <Button type="primary" danger>
              <img src="/wedding/lock.svg" className={styles.lockIcon} />
              签名生成请帖连接
            </Button>
          </div>
        </div>
      ) : (
        <div className={styles.formContent}>
          <div className={styles.joinform}>
            <div className={styles.item}>
              <div className={styles.label}>NFT PFP</div>
              <Select
                defaultValue="lucy"
                style={{ width: 120 }}
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
              <Input addonAfter={selectAfter} defaultValue="sex" />
            </div>
            <div className={styles.line}></div>
            <div className={styles.btn}>apply</div>
          </div>
          <div className={styles.center}>
            <Button type="primary" danger className={styles.disabled}>
              <img src="/wedding/lock.svg" className={styles.lockIcon} />
              签名确认参加婚礼
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
