import type { NextPage } from "next"
import { useEffect, useState, FormEvent } from "react"
import { isUnionTypeNode } from "typescript"
import { Item } from "../types"

const Home: NextPage = () => {
  const [name, setName] = useState("")
  const [brand, setBrand] = useState("Apple")
  const [price, setPrice] = useState("")
  const [isActive, setIsActive] = useState("Yes")
  const [items, setItems] = useState<Item[]>([])
  const [isUpdate, setIsUpdate] = useState(false)
  const [selectedItem, setSelectedItem] = useState("")

  useEffect(() => {
    fetchItems()
  }, [brand, isActive])

  const fetchItems = async () => {
    const response = await fetch("/api/items")
    const fetchedData = await response.json()
    setItems(fetchedData)
  }

  const createItem = async () => {
    if (name === "" || price === "") return
    const body = {
      name,
      brand,
      price,
      isActive
    }
    await fetch("/api/items", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" }
    })
  }

  const deleteItem = async (id: string) => {
    await fetch(`/api/items/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" }
    })
  }

  const updateItem = async () => {
    const body = {
      name,
      brand,
      price,
      isActive
    }
    await fetch(`/api/items/${selectedItem}`, {
      method: "PUT",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" }
    })
    setIsUpdate(false)
  }

  return (
    <div className="min-h-screen bg-gray-600 flex justify-center text-white">
      <div>
        <div className="text-center font-bold text-3xl my-10">STARMOBILE</div>
        <div className="flex flex-col">
          <div className="flex justify-around my-2">
            <label className="w-32" htmlFor="name-input">
              Name:
            </label>
            <input
              className="w-64 bg-gray-500 pl-1 text-xl focus:ring-white focus:ring-1 focus:outline-none"
              onChange={(e) => setName(e.target.value)}
              id="name-input"
              placeholder="Enter the name"
              value={name}
            />
          </div>
          <div className="flex justify-around my-2">
            <label className="w-32" htmlFor="brand-input">
              Brand:
            </label>
            <select
              className="w-64 bg-gray-500 pl-1 text-xl focus:ring-white focus:ring-1 focus:outline-none"
              onChange={(e) => setBrand(e.target.value)}
              id="brand-input">
              <option value="Apple">Apple</option>
              <option value="Samsung">Samsung</option>
            </select>
          </div>
          <div className="flex justify-around my-2">
            <label className="w-32" htmlFor="price-input">
              Price:
            </label>
            <input
              className="w-64 bg-gray-500 pl-1 text-xl focus:ring-white focus:ring-1 focus:outline-none"
              onChange={(e) => setPrice(e.target.value)}
              id="price-input"
              placeholder="Enter the price"
              value={price}
            />
          </div>
          <div className="flex justify-around my-2">
            <p className="w-32">Active:</p>
            <div className="w-64">
              <input
                onChange={(e) => setIsActive(e.target.value)}
                type="radio"
                id="yes-radio"
                name="active"
                value="Yes"
                defaultChecked
              />
              <label className="ml-1" htmlFor="html">
                Yes
              </label>
              <input
                className="ml-2"
                onChange={(e) => setIsActive(e.target.value)}
                type="radio"
                id="no-radio"
                name="active"
                value="No"
              />
              <label className="ml-1" htmlFor="css">
                No
              </label>
            </div>
          </div>
          {isUpdate ? (
            <div className="flex justify-around">
              <button className="px-3 py-1 bg-gray-500 hover:bg-gray-400 my-2" onClick={updateItem}>
                Update Item
              </button>
              <button
                className="px-3 py-1 bg-gray-500 hover:bg-gray-400 my-2"
                onClick={() => {
                  setIsUpdate(false)
                  setSelectedItem("")
                  setName("")
                  setBrand("")
                  setPrice("")
                  setIsActive("Yes")
                }}>
                Cancel
              </button>
            </div>
          ) : (
            <div className="flex justify-center">
              <button className="px-3 py-1 bg-gray-500 hover:bg-gray-400 my-2" onClick={createItem}>
                Create new Item
              </button>
            </div>
          )}
        </div>
        <table className="text-left">
          <thead className="">
            <tr>
              <th className="p-5">Name</th>
              <th className="p-5">Brand</th>
              <th className="p-5">Price</th>
              <th className="p-5">Active</th>
              <th className="p-5">Edit</th>
              <th className="p-5">Delete</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => {
              return (
                <tr key={item._id}>
                  <th className="px-5">{item.name}</th>
                  <th className="px-5">{item.brand}</th>
                  <th className="px-5">{item.price}</th>
                  <th className="px-5">{item.isActive}</th>
                  <th className="px-5">
                    <button
                      className="px-3 bg-gray-500 hover:bg-gray-400 my-2 py-1"
                      onClick={() => {
                        setSelectedItem(item._id)
                        setName(item.name)
                        setBrand(item.brand)
                        setPrice(item.price)
                        setIsActive(item.isActive)
                        setIsUpdate(true)
                      }}>
                      Edit
                    </button>
                  </th>
                  <th className="px-5">
                    <button
                      className="px-3 py-1 bg-gray-500 hover:bg-gray-400 my-2"
                      onClick={() => deleteItem(item._id)}>
                      Delete
                    </button>
                  </th>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Home
