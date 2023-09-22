import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './style.css'
import { getProducts, getCategories } from "../../services/productService";
import { Layout } from "./Layout";
import ContainedButtons from "../../components/AddButton/AddButton";
import GoBackButton from "../../components/GoBackButton";

const Products = () => {
  const [allProducts, setAllProducts] = useState([]); // Almacena todos los productos
  const [pageState, setPageState] = useState({
    isLoading: false,
    data: [],
    total: 0,
    page: 1,
    pageSize: 10,
  });
  const [productSearch, setProductSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setPageState(old => ({ ...old, isLoading: true }))
      const skip = (pageState.page - 1) * pageState.pageSize;
      try {
        const data = await getProducts(pageState, skip);
        setPageState(old => ({ ...old, isLoading: false, data: data.data, total: data.total }))
        setAllProducts(data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }
    fetchData();
    fetchCategories();
  }, [pageState.page, pageState.pageSize]);

  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      console.log("Error fetching categories:", error); 
    }
  };

  const filteredProducts = allProducts.filter(item => {
    const matchesSearch = productSearch.toLowerCase() === '' || item.title.toLowerCase().includes(productSearch.toLowerCase());
    const matchesCategory = selectedCategory === '' || item.category === selectedCategory;
  
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="style">
      <h1>Product List</h1>
      <div className="filter-section">
        <input
          type="text"
          className="filter"
          placeholder="Search Product"
          onChange={(e) => setProductSearch(e.target.value)}
        />
        <select
          className="filter"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">Todas las Categorías</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className="little-container">
        <GoBackButton />
        <Link to='/new-product'><ContainedButtons /></Link>
      </div>
      <Layout 
        products={filteredProducts}
        currentPage={pageState.page}
        pageSize={pageState.pageSize}
        pageState={pageState}
        onPageChange={(newPage) => {
          setPageState(old => ({ ...old, page: newPage + 1 }))
        }}
        onPageSizeChange={(newPageSize) => setPageState(old => ({ ...old, pageSize: newPageSize }))}
      />
    </div>
  );
};

export default Products;
