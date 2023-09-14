import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './style.css'
import { getCategories } from "../../services/productService";
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

    const [productSearch, setProductSearch] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('');
    const [categories, setCategories] = useState([])

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
      fetchCategories()

      }, [pageState.page, pageState.pageSize])

      const fetchCategories = async () => {
        try {
            const data = await getCategories(); 
            console.log(data)
            setCategories(data);
        } catch (error) {
            console.log("Error fetching categories:", error);
        }
    };
    

      const filteredProducts = products.filter(item => {
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
                onChange={(e) => setProductSearch(e.target.value)} />
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
            
            <DataTable 
                products={filteredProducts}
                currentPage={pageState.page}
                pageSize={pageState.pageSize}
                pageState={pageState}
                setPageState={setPageState}
            />
        </div>
    );
};

export default Products;
