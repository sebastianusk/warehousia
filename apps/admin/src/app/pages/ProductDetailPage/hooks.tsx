import { useState, Dispatch, SetStateAction, useEffect } from 'react';
import { useParams } from 'react-router-dom';

interface ProductDetailState {
  productDetail: ProductDetailType;
  handleSearch(): Promise<boolean>;
  activitiesLog: ActivitiesType;
  openModal: () => void;
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}

type ProductDetailType = {
  id: string;
  productName: string;
  productCode: string;
  price: number;
  categories: string[];
  stock: number;
};

type ActivitiesType = {
  date: string;
  trx_id: string;
  action: string;
  amount: number;
  username: string;
}[];

type ProductDetailParam = {
  id: string;
};

export default function useProductDetailHooks(): ProductDetailState {
  const [activitiesLog, setActivitiesLog] = useState<ActivitiesType>([]);
  const [productDetail, setProductDetail] = useState<ProductDetailType>({
    id: '',
    productName: '',
    productCode: '',
    price: 0,
    categories: [],
    stock: 0,
  });
  const [showModal, setShowModal] = useState(false);

  const { id } = useParams<ProductDetailParam>();

  const getProductDetail = () => {
    setProductDetail({
      id,
      productName: 'Tas Cewek 1',
      productCode: id,
      price: 123588,
      categories: ['tas wanita', 'tas korea'],
      stock: 100,
    });
  };

  const getActivityLog = () => {
    setActivitiesLog([
      {
        date: '20 Aug 2021',
        trx_id: '12318d21dd',
        action: 'transaction',
        amount: 100,
        username: 'user1',
      },
      {
        date: '20 Aug 2021',
        trx_id: '12318d21d4',
        action: 'preparing',
        amount: 50,
        username: 'user1',
      },
      {
        date: '20 Aug 2021',
        trx_id: '12318d21d3',
        action: 'outbound',
        amount: 2000,
        username: 'user1',
      },
    ]);
  };

  useEffect(() => {
    getProductDetail();
    getActivityLog();
  }, []);

  const openModal = () => {
    setShowModal(true);
  };

  const handleSearch = async () => true;

  return {
    productDetail,
    handleSearch,
    activitiesLog,
    openModal,
    showModal,
    setShowModal,
  };
}
