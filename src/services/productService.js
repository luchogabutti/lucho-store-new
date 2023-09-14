export const getProducts = async () => {
    const response = await fetch('https://dummyjson.com/products?limit=100&select=title,price,rating,stock,brand,images,category');
    const data = await response.json();
    return data;
  };
  
export const getCategories = async () => {
    const response = await fetch('https://dummyjson.com/products/categories');
    const data = await response.json();
    return data;
};

export const getProductDetail = async (productId) => {
  const response = await fetch(`https://dummyjson.com/products/${productId}`);
  const data = await response.json();
  return data;
};

  