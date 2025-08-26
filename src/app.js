document.addEventListener('alpine:init', () => {
  Alpine.data('products', () => ({
    items: [
      { id: 1, name: "Bunga Papan PFB-150", img: "PFB-150.jpeg", price: 1500000 },
      {
        id: 2,
        name: "Bunga Papan PLU-120",
        img: "PLU-120.jpg",
        price: 1200000,
      },
      {
        id: 3,
        name: "Bunga Papan PSS-100",
        img: "PSS-100.jpg",
        price: 1000000,
      },
      {
        id: 4,
        name: "Bunga Papan PAK-075",
        img: "PAK-075.jpeg",
        price: 750000,
      },
      {
        id: 5,
        name: "Bunga Papan PKK-065",
        img: "PKK-065.jpg",
        price: 650000,
      },
      {
        id: 6,
        name: "Bunga Papan PAB-050",
        img: "PAB-050.png",
        price: 500000,
      },
      {
        id: 7,
        name: "Bunga HB-020",
        img: "HB-020.jpg",
        price: 200000,
      },
      {
        id: 8,
        name: "Bunga VM-030",
        img: "VM-030.jpg",
        price: 300000,
      },
      {
        id: 9,
        name: "Bunga SU-040",
        img: "SU-040.jpg",
        price: 400000,
      },
    ],
  }));

  Alpine.store('cart', {
    items: [],
    total: 0,
    quantity: 0,
    add(newItem) {
      //Pengecekan Cart Product
      const cartItem = this.items.find((item) => item.id === newItem.id);

      //Cart Product Kosong
      if(!cartItem){
      this.items.push({...newItem, quantity: 1, total: newItem.price});
      this.quantity++;
      this.total += newItem.price;
      } else {
        this.items = this.items.map((item) => {
          if (item.id !== newItem.id) {
            return item;
          } else {
            item.quantity++;
            item.total = item.price * item.quantity;
            this.quantity++;
            this.total += item.price;
            return item;
          }
          });
        }
    },
    remove(id){
      const cartItem = this.items.find((item) => item.id === id);
      if(cartItem.quantity > 1){
        this.items = this.items.map((item) => {
          if(item.id !== id){
            return item;
          } else {
            item.quantity--;
            item.total = item.price * item.quantity;
            this.quantity--;
            this.total -= item.price;
            return item;
          }
        });
      } else if (cartItem.quantity === 1){
        this.items = this.items.filter((item) => item.id !== id);
        this.quantity--;
        this.total -= cartItem.price;
      }
    }
  });
});

//Konversi Rupiah
const rupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};