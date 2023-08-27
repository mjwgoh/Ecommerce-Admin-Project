// [...XXX].js is a dynamic segment,
// also known as a catch all API route
// in this case, all paths, like /edit/iPhone
// or /edit/Mac would all be accessible

import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductForm from "@/components/ProductForm";

export default function EditProductPage() {
  const [productInfo, setProductInfo] = useState(null);

  const { id } = useRouter().query;

  useEffect(() => {
    if (!id) {
      return;
    }

    axios.get("/api/products?id=" + id).then((response) => {
      setProductInfo(response.data);
    });
  }, [id]);

  return (
    <Layout>
      <h1 className="">Edit Product</h1>
      {productInfo && ( // if productInfo is truthy (i.e. not empty / loaded), then XXX
        <ProductForm {...productInfo}></ProductForm> //* ...productInfo is a spread syntax. Equivalent to writing <ProductForm name={productInfo.name} price={productInfo.price} description={productInfo.description} />
      )}
    </Layout>
  );
}
