// import { useState, Dispatch, SetStateAction, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import {GET_PRODUCT_STOCK} from '../../graph';

// interface ProductDetailState {
  // productDetail: ProductDetailType;
  // handleSearch(): Promise<boolean>;
  // activitiesLog: ActivitiesType;
  // openModal: () => void;
  // showModal: boolean;
  // setShowModal: Dispatch<SetStateAction<boolean>>;
// }

// type ProductDetailType = {
  // id: string;
  // productName: string;
  // productCode: string;
  // price: number;
  // categories: string[];
  // stocks: { warehouseId: string; amount: number }[];
// };

// type ActivitiesType = {
  // date: string;
  // trx_id: string;
  // action: string;
  // amount: number;
  // username: string;
// }[];

// type ProductDetailParam = {
  // id: string;
// };

// export default function useProductDetailHooks(): ProductDetailState {
  // const { id } = useParams<ProductDetailParam>();
  // const [showModal, setShowModal] = useState(false);

  // const openModal = () => {
    // setShowModal(true);
  // };

  // const handleSearch = async () => true;

  // return {
    // productDetail,
    // handleSearch,
    // activitiesLog,
    // openModal,
    // showModal,
    // setShowModal,
  // };
// }
