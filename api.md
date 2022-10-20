1. GET /api/offer-byaddress?address=0x.... 根据地址获取结婚记录

响应：

```ts
type Offers = {
  id: string;
  Aaddress: string;
  Baddress: string | null;
  Asignature: string;
  Bsignature: string | null;
  status: number;
  createdAt: Date;
  updatedAt: Date;
  Aname: string | null;
  Asex: number | null;
  Bname: string | null;
  Bsex: number | null;
  AtokenId: string | null;
  BtokenId: string | null;
  Acomment: string | null;
  Acover: string | null;
  Bcomment: string | null;
  Bcover: string | null;
  imageData: string | null;
  bgIndex: number | null;
  blockNo: string | null;
  mintedAt: Date | null;
  imageDataB: string | null;
  type: number;
};
```

2. POST /api/wedding/add 添加预约(必须是已经领证的，信息从上一个接口查询)

参数：

```ts
export type weddingCreateInput = {
  addressA?: string | null;
  addressB?: string | null;
  nameA?: string | null;
  nameB?: string | null;
  coverA?: string | null;
  coverB?: string | null;
  wedding_at: Date | string;
  type?: number | null;
  comment?: string | null;
};
```

3. GET /api/wedding/:id 获取某个 wedding 的详细信息

响应：

```ts
type Res = {
  message: "ok";
  wedding: wedding;
  joiners: wedding_join[];
};
```

```ts
export type wedding = {
  id: string;
  addressA: string | null;
  addressB: string | null;
  nameA: string | null;
  nameB: string | null;
  coverA: string | null;
  coverB: string | null;
  wedding_at: Date;
  type: number | null;
  comment: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type wedding_join = {
  id: string;
  weddingId: string | null;
  name: string | null;
  address: string | null;
  cover: string | null;
  createdAt: Date;
  updatedAt: Date;
};
```

4. POST /api/wedding/:id 参加某个 wedding

参数：

```ts
export type wedding_joinCreateInput = {
  weddingId?: string | null;
  name?: string | null;
  address?: string | null;
  cover?: string | null;
};
```

5. GET /api/wedding/list?pageIndex=1&pageSize=20 获取列表

```ts
type Res = {
  offers: wedding[];
  total: number;
};
```

6. GET /api/wedding/monthlist?year=2022&month=10 按月获取列表

```ts
type Res = {
  offers: wedding[];
};
```
