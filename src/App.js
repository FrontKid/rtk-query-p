import { useAddGoodsMutation, useDeleteProductMutation, useGetGoodsQuery } from './redux'
import './App.css';
import { useState } from 'react';

function App() {
  const [count, setCount] = useState('')
  const [newProduct, setNewProduct] = useState('')
  const { data = [], isLoading } = useGetGoodsQuery(count)
  const [addProduct] = useAddGoodsMutation()
  const [deleteProduct] = useDeleteProductMutation()

  const handleAddProduct = async () => {
    if (newProduct) {
      await addProduct({ name: newProduct }).unwrap()
      setNewProduct('')
    }
  }

  const handleDeleteProduct = async (id) => {
    await deleteProduct(id).unwrap()
  }

  if (isLoading) return <h1>Loading...</h1>

  return (
    <div className="App">
      <div>
        <input type="text" value={newProduct} onChange={(e) => setNewProduct(e.currentTarget.value)} />
        <button onClick={handleAddProduct}>Add product</button>
      </div>
      <div>
        <select value={count}
          onChange={(e) => setCount(e.currentTarget.value)}>
          <option value={''}>All</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
      </div>
      <ul className="">
        {data.map(item => <li key={item.id} onClick={() => handleDeleteProduct(item.id)}>{item.name}</li>)}
      </ul>
    </div>
  );
}

export default App;
