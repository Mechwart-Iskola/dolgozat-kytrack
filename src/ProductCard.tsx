import React, { useEffect, useState } from 'react'

type Product={
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
}
// "id": 1,
// "name": "Laptop",
// "price": 1200,
// "category": "Electronics",
// "image": "/images/laptop.jpg"

const ProductCard = () => {
    const [products,setProducts]= useState<Product[]>([]);
    const [search,setSearch]= useState('');
    const [error,setError]=useState('');
    const [filteredProducts,setFilteredProducts]=useState<Product[]>([]);

    useEffect(()=>{
      fetch('./public/products.json')
      .then(r=>r.json())
      .then(x=>{
        
        setProducts(x.products);
          
        })
        .catch(e=>console.error('Nem sikerült betölteni az adataokat',e));
      },[]);


      const handleSearch=()=>{
        const filtered = products.filter(product =>
          product.name.toLowerCase()==(search.toLowerCase())
      );
      setFilteredProducts(filtered);

        filteredProducts.length===0 ? setError("") : setError("Nincs ilyen termék");

      };





  return (
    <div className='product-card'>
      <div className='search-section'>
        <h1>Enter product name:</h1>
        <input type='text' placeholder='keresés' onChange={(e)=>setSearch(e.target.value)} value={search}></input>
        <button onClick={handleSearch}>Search</button>
      </div>
      {error && <p>{error}</p>}
      {filteredProducts.length>0&&(
        <div className='results-section'>
          {filteredProducts.map(p=>(
               <div className='product-info' key={p.id} style={{ marginBottom: '30px' }}>
               <img className='product-image' src={p.image} alt={p.name} width={100} />
               <div className='product-details'>
                   <p>ID: {p.id}</p>
                   <p>Name: {p.name}</p>
                   <p>Ár: {p.price} Ft</p>
                   <p>Kategória: {p.category}</p>
               </div>  
               </div>
          )
          )}
        </div>
      )}

    </div>
  )
}

export default ProductCard