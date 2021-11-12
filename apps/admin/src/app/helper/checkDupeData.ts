type DataList = Data[] | [];

type Data = {
  id: string;
  name: string;
  amount: number;
};

export default function checkDupeData(data: Data, prev: DataList) {
  const indexDupeData = prev.findIndex((el) => el.id === data.id);
  if (indexDupeData === -1 || prev.length === 0) return [...prev, data];
  const items = [...prev];
  const item = { ...items[indexDupeData] };
  item.amount += data.amount;
  items[indexDupeData] = item;
  return items;
}
