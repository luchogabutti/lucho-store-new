import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './style.css'
import { getProducts } from "../../services/productService";
import { DataTable } from "./Layout";
import ContainedButtons from "../../components/AddButton/AddButton";
import GoBackButton from "../../components/GoBackButton";


const Products = () => {

    const [products, setProducts] = useState([]);
    const [skip, setSkip] = useState(0)
    const [pageState, setPageState] = useState({
        isLoading: false,
        data: [],
        total: 0,
        page: 1,
        pageSize: 10
      })

      useEffect(() => {
        const fetchData = async () => {
          console.log('ON')
          setPageState(old => ({ ...old, isLoading: true }))
          const skip = (pageState.page - 1) * pageState.pageSize;
          setSkip(skip);
          const response = await fetch(`https://dummyjson.com/products?page=${pageState.page}&limit=${pageState.pageSize}&skip=${skip}&select=title,price,rating,stock,brand,images,category`)
          const json = await response.json()
          setPageState(old => ({ ...old, isLoading: false, data: json.data, total: json.total }))
          setProducts(json.products)
        }
        fetchData()
      }, [pageState.page, pageState.pageSize])
    

    return (
        <div className="style">
            <h1>Product List</h1>
            <div className="little-container">
            <GoBackButton />
            <Link to='/new-product'><ContainedButtons /></Link>
            </div>
            <DataTable 
                products={products}
                currentPage={pageState.page}
                pageSize={pageState.pageSize}
                pageState={pageState}
                setPageState={setPageState}
            />
        </div>
    );
};

export default Products;
