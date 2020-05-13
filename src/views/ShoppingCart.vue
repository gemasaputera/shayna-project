<template>
  <div>
    <Header mail="csgionshop@gmail.com" noTelp="0812-8960-105" />
    <Breadcrumb position="Shopping Cart"/>
        <!-- Shopping Cart Section Begin -->
    <section class="shopping-cart spad">
        <div class="container">
            <div class="row">
                <div class="col-lg-8">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="cart-table">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Image</th>
                                            <th class="p-name text-center">Product Name</th>
                                            <th>Price</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody v-if="samplCarts.length>0">
                                        <tr v-for="(item,index) in samplCarts" :key="item.id">
                                            <td class="cart-pic first-row">
                                                <img :src="item.img" />
                                            </td>
                                            <td class="cart-title first-row text-center">
                                                <h5>{{ item.name }}</h5>
                                            </td>
                                            <td class="p-price first-row">
                                                {{ price(item) }} x 
                                                {{ item.slug.length }}
                                            </td>
                                            <td class="delete-item">
                                                <a 
                                                @click="removeCart(index)"
                                                ><i class="material-icons">
                                              close
                                              </i></a></td>
                                        </tr>
                                    </tbody>
                                    <tbody v-else>
                                      <tr>
                                        <td colspan="4">Oops sepertinya kamu
                                          belum memasukan barang dikeranjang belanja</td>
                                      </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="col-lg-8">
                            <h4 class="mb-4 text-left">
                                Informasi Pembeli:
                            </h4>
                            <div class="user-checkout text-left">
                                <form>
                                    <div class="form-group">
                                        <label for="namaLengkap">Nama lengkap</label>
                                        <input
                                            type="text"
                                            class="form-control"
                                            id="namaLengkap"
                                            aria-describedby="namaHelp"
                                            placeholder="Masukan Nama"
                                            required
                                            v-model="customerInfo.name">
                                    </div>
                                    <div class="form-group">
                                        <label for="namaLengkap">Email Address</label>
                                        <input
                                            type="email"
                                            class="form-control"
                                            id="emailAddress"
                                            aria-describedby="emailHelp"
                                            placeholder="Masukan Email"
                                            required
                                            v-model="customerInfo.email">
                                    </div>
                                    <div class="form-group">
                                        <label for="namaLengkap">No. HP</label>
                                        <input
                                            type="text"
                                            class="form-control"
                                            id="noHP"
                                            aria-describedby="noHPHelp"
                                            placeholder="Masukan No. HP"
                                            required
                                            v-model="customerInfo.number">
                                    </div>
                                    <div class="form-group">
                                        <label for="alamatLengkap">Alamat Lengkap</label>
                                        <textarea
                                            class="form-control"
                                            required
                                            id="alamatLengkap" rows="3"
                                            v-model="customerInfo.address">
                                        </textarea>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="proceed-checkout text-left">
                                <ul>
                                    <li class="subtotal mt-3">
                                        Subtotal <span> {{ subT(subTotal) }}</span></li>
                                    <li class="subtotal mt-3">
                                        Pajak <span> {{subT(subTotal*10/100)}} (10%)</span></li>
                                    <li class="subtotal mt-3">
                                        Total Biaya 
                                        <span>
                                           {{subT(subTotal*(10/100)+subTotal)}}
                                        </span>
                                    </li>
                                    <li class="subtotal mt-3">
                                        Bank Transfer <span>BCA</span></li>
                                    <li class="subtotal mt-3">
                                        No. Rekening <span>6830 588 009</span></li>
                                    <li class="subtotal mt-3">
                                        Nama Penerima <span>Gema Saputera</span></li>
                                </ul>
                                <!-- <router-link to="/success" class="proceed-btn"> -->
                                <a 
                                  v-if="!loading"
                                  @click="checkout"
                                  class="proceed-btn">
                                CHECKOUT
                                </a>
                                <div class="spinner" v-else></div>
                                <!-- </router-link> -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- Shopping Cart Section End -->
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';
import currencyFormat from './../utils/currencyFormat';
import Header from '@/components/layouts/Header.vue';
import Footer from '@/components/layouts/Footer.vue';
import Breadcrumb from '@/components/elements/Breadcrumb.vue';

export default {
  name: 'ShoppingCart',
  components: {
    Header,
    Footer,
    Breadcrumb
  },
  data() {
    return{
      carts: [],
      samplCarts: [],
      cartTotal: 0,
      loading:false,
      customerInfo:
        {
          name:'',
          email:'',
          number:'',
          address:'',
          transaction_total:0,
          transaction_status:'PENDING',
          transaction_details: []
        }
    };
  },
  computed:{
    subTotal() {
      return(
        this.carts.reduce((a, b) => a + (b.price || 0), 0)
      );
    },
    
  },
  methods: {
    price(item) {
      return(
        currencyFormat(item.price, 'IDR ')
      );
    },
    subT(item) {
      return(
        currencyFormat(item, 'IDR ')
      );
    },
    removeCart(x) {
      this.carts.splice(x, 1);
      this.cartTotal -= 1;
      this.updateCart();
      this.saveCart();
      window.location.reload();
    },
    updateCart(){
      let seen = {};
      this.samplCarts = this.carts.filter(function(entry) {
        let prev;
        // eslint-disable-next-line no-prototype-builtins
        if (seen.hasOwnProperty(entry.id)) {
          prev = seen[entry.id];
          prev.slug.splice(entry.slug,1);
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
    },
    setLoading(data) {
      this.loading = data;
    },
    checkout(){
      let product = this.carts.map((item)=>{
        return item.id;
      });
      let payload = {
        name:this.customerInfo.name,
        email:this.customerInfo.email,
        number:this.customerInfo.number,
        address:this.customerInfo.address,
        transaction_total: this.subTotal*(10/100)+this.subTotal,
        transaction_status:'PENDING',
        transaction_details: product
      };
      this.setLoading(true);
      axios
        .post("http://shayna.gionshop.xyz/api/checkout", payload)
        .then(res=>{
          this.products = res.data.data.data;
          this.setLoading(false);
          localStorage.removeItem('tart');
          this.$router.push({ path: '/success' });
        })
        .catch(err=> {
          this.er = err;
          this.setLoading(false);
        });
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
    this.cartTotal = this.carts.reduce((a, b) => a + (b.price || 0), 0);
    this.grandTotal = (this.cartTotal*(10/100)+this.cartTotal);
  }
};
</script>

<style scope>
.proceed-btn {
  text-decoration: none;
  cursor: pointer;
}

.delete-item > a {
  cursor: pointer;
}

a.proceed-btn:hover {
  color: #FFF;
}
.spinner {
  position: relative;
  margin: 10% auto;
  width: 80px;
  height: 80px;
  border-radius: 40px;
  -webkit-box-sizing: border-box;
  border: solid 10px rgba(255, 103, 0, 0.2);
  border-top-color: #FF6700;
  -webkit-animation: spin 1s infinite linear;
}

@-webkit-keyframes spin {
  100% {
    -webkit-transform: rotate(360deg);
  }
}
</style>
