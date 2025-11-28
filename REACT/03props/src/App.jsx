import Btn from "./components/Btn.jsx";
import Card from "./components/Card.jsx";
import Cmp1 from "./components/Cmp1";
import Cmp2 from "./components/Cmp2.jsx";
import Counter from "./components/Counter.jsx";
let App = () => {
  let marks = 93;

  const products = [
    {
      img: "https://picsum.photos/300?random=1",
      title: "Wireless Headphones",
      desc: "High-quality over-ear wireless headphones with noise cancellation.",
       sty:{color:"red"}
    },
    {
      img: "https://picsum.photos/300?random=2",
      title: "Smart Watch",
      desc: "Fitness-focused smartwatch with heart-rate monitor and sleep tracking.",
       sty:{color:"red"}
    },
    {
      img: "https://picsum.photos/300?random=3",
      title: "Bluetooth Speaker",
      desc: "Portable speaker with deep bass and 12-hour battery backup.",
       sty:{color:"red"}
    },
    {
      img: "https://picsum.photos/300?random=4",
      title: "Gaming Mouse",
      desc: "Ergonomic gaming mouse with RGB lighting and 6 customizable buttons.",
       sty:{color:"red"}
    },
    {
      img: "https://picsum.photos/300?random=5",
      title: "Laptop Stand",
      desc: "Adjustable metal laptop stand for comfortable working posture.",
      sty:{color:"red"}
    },
    {
      img: "https://picsum.photos/300?random=6",
      title: "Mechanical Keyboard",
      desc: "RGB backlit mechanical keyboard with tactile switches.",
       sty:{color:"red"}
    },
    {
      img: "https://picsum.photos/300?random=7",
      title: "USB-C Charger",
      desc: "Fast 30W USB-C charger suitable for phones, tablets, and laptops.",
       sty:{color:"red"}
    },
    {
      img: "https://picsum.photos/300?random=8",
      title: "Power Bank 20000mAh",
      desc: "High-capacity power bank with dual USB output and fast charging.",
    },
    {
      img: "https://picsum.photos/300?random=9",
      title: "4K Action Camera",
      desc: "Waterproof action camera with 4K recording and wide-angle lens.",
    },
    {
      img: "https://picsum.photos/300?random=10",
      title: "Wireless Keyboard & Mouse Combo",
      desc: "Slim wireless combo set with silent keys and long battery life.",
    },
  ];

  return (
    <div style={{display:"flex",flexDirection:"column",gap:"5px",justifyContent:"center",alignItems:"center"}}>
      <Cmp1 name="Arun" age="20" phno="9538084070" marks={marks} />
      <Cmp2 name="samuel" age="21" phno="9538084074" marks={marks} />
      <h3>Rendering cards using props</h3>
      <div
        style={{
          width: "100%",
          background: "#ccc",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
        }}
      >
        {products.map((obj) => (
          <Card title={obj.title} img={obj.img} desc={obj.desc}>
            <Btn sty={obj.sty} />
           
          </Card>
        ))}
      </div>
      <h1>Counter</h1>
      <Counter/>
    </div>
  );
};

export default App;
