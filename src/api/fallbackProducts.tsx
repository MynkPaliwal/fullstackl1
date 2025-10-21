import axios from 'axios';

const productImages: { [key: string]: string } = {
  'IPHONE17PRO': 'https://www.apple.com/v/iphone/home/cf/images/overview/select/iphone_17pro__0s6piftg70ym_large_2x.jpg',
  'IPHONEAIR': 'https://www.apple.com/v/iphone/home/cf/images/overview/select/iphone_air__f0t56fef3oey_large_2x.jpg',
  'IPHONE17': 'https://www.apple.com/v/iphone/home/cf/images/overview/select/iphone_17__ck7zzemcw37m_large_2x.jpg',
  'IPHONE16': 'https://www.apple.com/v/iphone/home/cf/images/overview/select/iphone_16__drr03yfz644m_large_2x.jpg',
  'IPHONE16E_MAIN': 'https://www.apple.com/v/iphone/home/cf/images/overview/select/iphone_16e__dar81seif0cy_large_2x.jpg'
};

const staticProducts = [
  {
    id: 1,
    name: "iPhone 17 Pro",
    price: "MRP ₹134900.00",
    image: productImages['IPHONE17PRO']
  },
  {
    id: 2,
    name: "iPhone Air",
    price: "MRP ₹119900.00",
    image: productImages['IPHONEAIR']
  },
  {
    id: 3,
    name: "iPhone 17",
    price: "MRP ₹82900.00",
    image: productImages['IPHONE17']
  },
  {
    id: 4,
    name: "iPhone 16",
    price: "MRP ₹69900.00",
    image: productImages['IPHONE16']
  },
  {
    id: 5,
    name: "iPhone 16e",
    price: "MRP ₹59900.00",
    image: productImages['IPHONE16E_MAIN']
  }
];

export const fetchAppleProducts = async () => {
  try {
    const corsProxy = 'https://api.allorigins.win/raw?url=';
    const apiUrl = 'https://www.apple.com/in/shop/mcm/product-price?parts=IPHONE17PRO,IPHONEAIR,IPHONE17,IPHONE16,IPHONE16E_MAIN';
    
    const response = await axios.get(
      `${corsProxy}${encodeURIComponent(apiUrl)}`,
      {
        timeout: 5000,
        headers: {
          'Accept': 'application/json',
        }
      }
    );

    const apiData = response.data.items;
    let idCounter = 1;

    const products = Object.keys(apiData).map((key) => {
      const item = apiData[key];
      return {
        id: idCounter++,
        name: item.name,
        price: `MRP ${item.price.display.smart}`,
        image: productImages[key]
      };
    });

    return products;
  } catch (error) {
    console.warn('API fetch failed, using static products:', error.message);
    return staticProducts;
  }
};

const fallbackProducts: any[] = [];
export default fallbackProducts;