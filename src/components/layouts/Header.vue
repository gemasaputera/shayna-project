<template>
    <header class="header-section">
        <div class="header-top">
            <div class="container">
                <div class="ht-left">
                    <div class="mail-service">
                        <i class=" fa fa-envelope"></i>{{mail}}
                    </div>
                    <div class="phone-service">
                        <i class=" fa fa-phone"></i>{{noTelp}}
                    </div>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="inner-header">
                <div class="row">
                    <div class="col-lg-2 col-md-2">
                        <div class="logo">
                            <router-link to='/'>
                                <img src="img/logo_website_shayna.png" alt="" />
                            </router-link>
                        </div>
                    </div>
                    <div class="col-lg-7 col-md-7"></div>
                    <div class="col-lg-3 text-right col-md-3">
                        <ul class="nav-right">
                            <li class="cart-icon">
                                Keranjang Belanja &nbsp;
                                <a href="#">
                                    <i class="icon_bag_alt"></i>
                                    <span>{{ cartTotal }}</span>
                                </a>
                                <div class="cart-hover">
                                    <div class="select-items">
                                        <table  v-if="carts.length>0">
                                            <tbody v-for="(item, index) in samplCarts" :key="index">
                                                <tr>
                                                    <td class="si-pic">
                                                        <img 
                                                            class="sm-pic"
                                                            :src="item.img" 
                                                            alt="" />
                                                    </td>
                                                    <td class="si-text">
                                                        <div class="product-selected">
                                                            <p>IDR {{ item.price }} x 
                                                                {{ item.slug.length }}</p>
                                                            <h6>{{ item.name }}</h6>
                                                        </div>
                                                    </td>
                                                    <td class="si-close">
                                                        <i class="ti-close"
                                                            @click="removeCart(index)" ></i>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <table v-else>
                                            <tbody>
                                                <tr>
                                                    <td>Oops, keranjangmu kosong:(</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div class="select-total">
                                        <span>total:</span>
                                        <h5>$120.00</h5>
                                    </div>
                                    <div class="select-button">
                                        <a href="#" class="primary-btn view-card">VIEW CARD</a>
                                        <a href="#" class="primary-btn checkout-btn">CHECK OUT</a>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </header>
    <!-- Header End -->
</template>

<script>
export default {
  name: 'Header',
  props: {
    mail: String,
    noTelp: String
  },
  data() {
    return {
      carts:[],
      samplCarts:[],
      cartTotal: 0,
      priceTotal: 0
    };
  },
  methods: {
    removeCart(x) {
      this.carts.splice(x, 1);
      this.cartTotal -= 1;
      this.updateCart();
      this.saveCart();
    },
    updateCart(){
      let seen = {};
      this.samplCarts = this.carts.filter(function(entry) {
        let prev;
        // eslint-disable-next-line no-prototype-builtins
        if (seen.hasOwnProperty(entry.id)) {
          prev = seen[entry.id];
          prev.slug.push(entry.slug);
          return false;
        }
        if (!Array.isArray(entry.slug)) {
          entry.slug = [entry.slug];
        }
        seen[entry.id] = entry;
        return true;      
      });
    },
    saveCart() {
      const parsed = JSON.stringify(this.carts);
      localStorage.setItem('tart', parsed);
    }
  },
  mounted(){
    if(localStorage.getItem('tart')){
      try{
        this.carts = JSON.parse(localStorage.getItem('tart'));
      } catch(e) {
        localStorage.removeItem('tart');
      }
    }
    this.cartTotal = this.carts.length;
    let seen = {};
    this.samplCarts = this.carts.filter(function(entry) {
      let prev;
      // eslint-disable-next-line no-prototype-builtins
      if (seen.hasOwnProperty(entry.id)) {
        prev = seen[entry.id];
        prev.slug.push(entry.slug);
        return false;
      }
      if (!Array.isArray(entry.slug)) {
        entry.slug = [entry.slug];
      }
      seen[entry.id] = entry;
      return true;      
    });
  },
  update() {
    this.$nextTick(() => {
      // Okay, now that everything is destroyed, lets build it up again
      this.cartTotal = this.carts.length;
    });
  }
};
</script>

<style scoped>
.sm-pic {
    width: 5rem;
    height: auto;
}
</style>
