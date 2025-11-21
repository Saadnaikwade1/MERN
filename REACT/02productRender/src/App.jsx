import "./App.css"



let arr=[
  {
    "productId": "PRD001",
    "name": "Wireless Bluetooth Headphones",
    "brand": "SoundMax",
    "category": "Electronics",
    "price": 2499,
    "stock": 35,
    "rating": 4.5,
    "image": "https://picsum.photos/300/300?1"
  },
  {
    "productId": "PRD002",
    "name": "Smart Fitness Band",
    "brand": "FitPro",
    "category": "Wearables",
    "price": 1999,
    "stock": 50,
    "rating": 4.2,
    "image": "https://picsum.photos/300/300?2"
  },
  {
    "productId": "PRD003",
    "name": "LED Desk Lamp",
    "brand": "BrightLite",
    "category": "Home",
    "price": 699,
    "stock": 120,
    "rating": 4.0,
    "image": "https://picsum.photos/300/300?3"
  },
  {
    "productId": "PRD004",
    "name": "Mechanical Keyboard",
    "brand": "KeyMaster",
    "category": "Computers",
    "price": 3499,
    "stock": 20,
    "rating": 4.7,
    "image": "https://picsum.photos/300/300?4"
  },
  {
    "productId": "PRD005",
    "name": "Portable Power Bank 10000mAh",
    "brand": "ChargeX",
    "category": "Electronics",
    "price": 1199,
    "stock": 75,
    "rating": 4.4,
    "image": "https://picsum.photos/300/300?5"
  },
  {
    "productId": "PRD006",
    "name": "USB Type-C Cable",
    "brand": "WirePro",
    "category": "Accessories",
    "price": 199,
    "stock": 200,
    "rating": 4.1,
    "image": "https://picsum.photos/300/300?6"
  },
  {
    "productId": "PRD007",
    "name": "Smart LED Bulb",
    "brand": "GlowTech",
    "category": "Home",
    "price": 499,
    "stock": 90,
    "rating": 4.3,
    "image": "https://picsum.photos/300/300?7"
  },
  {
    "productId": "PRD008",
    "name": "Android Smartwatch",
    "brand": "TimeX",
    "category": "Wearables",
    "price": 3299,
    "stock": 40,
    "rating": 4.6,
    "image": "https://picsum.photos/300/300?8"
  },
  {
    "productId": "PRD009",
    "name": "Laptop Cooling Pad",
    "brand": "CoolMate",
    "category": "Computers",
    "price": 899,
    "stock": 65,
    "rating": 4.2,
    "image": "https://picsum.photos/300/300?9"
  },
  {
    "productId": "PRD010",
    "name": "Wireless Mouse",
    "brand": "ClickPro",
    "category": "Computers",
    "price": 499,
    "stock": 150,
    "rating": 4.3,
    "image": "https://picsum.photos/300/300?10"
  },
  {
    "productId": "PRD011",
    "name": "Bluetooth Speaker",
    "brand": "BeatBox",
    "category": "Electronics",
    "price": 1799,
    "stock": 45,
    "rating": 4.5,
    "image": "https://picsum.photos/300/300?11"
  },
  {
    "productId": "PRD012",
    "name": "Gaming Chair",
    "brand": "ProGamer",
    "category": "Furniture",
    "price": 7999,
    "stock": 15,
    "rating": 4.7,
    "image": "https://picsum.photos/300/300?12"
  },
  {
    "productId": "PRD013",
    "name": "Electric Kettle",
    "brand": "HeatWave",
    "category": "Home Appliances",
    "price": 999,
    "stock": 80,
    "rating": 4.1,
    "image": "https://picsum.photos/300/300?13"
  },
  {
    "productId": "PRD014",
    "name": "Smart TV 43 inch",
    "brand": "VisionPlus",
    "category": "Electronics",
    "price": 24999,
    "stock": 10,
    "rating": 4.8,
    "image": "https://picsum.photos/300/300?14"
  },
  {
    "productId": "PRD015",
    "name": "Air Fryer",
    "brand": "CrispyChef",
    "category": "Kitchen",
    "price": 4999,
    "stock": 22,
    "rating": 4.4,
    "image": "https://picsum.photos/300/300?15"
  },
  {
    "productId": "PRD016",
    "name": "Water Bottle Steel 1L",
    "brand": "AquaPro",
    "category": "Lifestyle",
    "price": 349,
    "stock": 130,
    "rating": 4.2,
    "image": "https://picsum.photos/300/300?16"
  },
  {
    "productId": "PRD017",
    "name": "Noise Cancelling Earphones",
    "brand": "SilentBeats",
    "category": "Electronics",
    "price": 1299,
    "stock": 55,
    "rating": 4.4,
    "image": "https://picsum.photos/300/300?17"
  },
  {
    "productId": "PRD018",
    "name": "Backpack 30L",
    "brand": "TravelMax",
    "category": "Bags",
    "price": 899,
    "stock": 70,
    "rating": 4.2,
    "image": "https://picsum.photos/300/300?18"
  },
  {
    "productId": "PRD019",
    "name": "Electric Toothbrush",
    "brand": "CleanSmile",
    "category": "Personal Care",
    "price": 1499,
    "stock": 30,
    "rating": 4.5,
    "image": "https://picsum.photos/300/300?19"
  },
  {
    "productId": "PRD020",
    "name": "Portable Tripod Stand",
    "brand": "SnapPro",
    "category": "Accessories",
    "price": 699,
    "stock": 85,
    "rating": 4.3,
    "image": "https://picsum.photos/300/300?20"
  }
]

function App(){
  return(
    <>
    <div className="con">
      { 
        arr.map((obj)=>{
          return(
            <div className="card">
              <img src={obj.image} />
              <p>ProdId:{obj.productId}</p>
              <p>Name:{obj.name}</p>
              <p>Brand:{obj.brand}</p>
              <p>Category:{obj.category}</p>
              <p>Price:{obj.price}</p>
              <p>Rating:{obj.price}</p>
              <p>Limited stock:{obj.stock}</p>
      </div>
          )
        })
        
        }
     
    </div>
    </>

  )
}
export default App