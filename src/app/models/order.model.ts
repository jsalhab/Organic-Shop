export class Order {
  datePlaced: number;
  items: any[];

  constructor(public userId: string, public shipping: any, shoppingCart: any) {
    this.datePlaced = new Date().getTime();

    this.items = Object.keys(shoppingCart).map(item => {
      return {
        product: {
          title: shoppingCart[item].product.title,
          imageUrl: shoppingCart[item].product.imageUrl,
          price: shoppingCart[item].product.price
        },
        quantity: shoppingCart[item].quantity,
        totalPrice:
          shoppingCart[item].product.price * shoppingCart[item].quantity
      };
    });
  }
}
