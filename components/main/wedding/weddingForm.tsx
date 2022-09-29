import { useRouter } from "next/router";
import type { DatePickerProps } from "antd";
import { Input, DatePicker, Select, Button } from "antd";
import styles from "./wedding.module.less";
export default function WeddingForm() {
  const { TextArea } = Input;
  const router = useRouter();
  const textarea = `XXXX.ETH与 Ooooo.eth 谨定于2022年11月11日11时在元宇宙世界举行结婚典礼。敬备喜筵，恭请光临！`;
  const back = () => {
    router.push("/town");
  };
  const onChangeDate: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
  };
  const { Option } = Select;

  const onChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  const onChangeText = (
    value: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    console.log(`selected ${value}`);
  };
  return (
    <div className={styles.weddingForm}>
      <div className={styles.headPort}>
        <div className={styles.headPerson}>
          <div className={styles.head}></div>
          <div className={styles.name}>xxxxxxx.eth</div>
        </div>
        <div className={styles.headPerson}>
          <div className={styles.head}></div>
          <div className={styles.name}>xxxxxxx.eth</div>
        </div>
      </div>
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
    </div>
  );
}
