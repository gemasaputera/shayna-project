<template>
    <section class="women-banner spad">
        <div class="container-fluid">
            <div class="row" v-if="!loading">
                <div class="col-lg-12 mt-5" v-if="products.length>0">
                    <carousel class="product-slider" :nav=false :autoplay=true :margin=10>
                        <div class="product-item" v-for="item in products" v-bind:key="item.id">
                            <div class="pi-pic">
                                <img v-bind:src="item.galleries.length>0?
                                    item.galleries[0].photo:'img/products/women-1.jpg'" alt="" />
                                <ul>
                                    <li class="w-icon active">
                                        <a 
                                          class="add-bag"
                                          @click="addCart(item)">
                                            <i class="icon_bag_alt"></i>
                                        </a>
                                    </li>
                                    <li class="quick-view">
                                        <router-link :to="'/product/'+item.id">
                                            + Quick View</router-link>
                                    </li>
                                </ul>
                            </div>
                            <div class="pi-text">
                                <div class="catagory-name">{{ item.type }}</div>
                                <router-link :to="'/product/'+item.id">
                                    <h5>{{ item.name }}</h5>
                                </router-link>
                                <div class="product-price">
                                    IDR {{ item.price }}
                                </div>
                            </div>
                        </div>
                    </carousel>
                </div>
                <div class="col-lg-12 mt-5" v-else>
                    <p> Produk terlbaru belum tersedia </p>
                </div>
            </div>
            <div class="spinner" v-else></div>
        </div>
    </section>
</template>

<script>
import carousel from 'vue-owl-carousel';
import axios from 'axios';

export default {
  name: 'HomeProduct',
  components: {
    carousel
  },
  data(){
    return {
      products:[],
      loading: false,
      er: '',
      carts: []
    };
  },
  methods: {
    setLoading(data) {
      this.loading = data;
    },
    addCart(item) {
      const nItem = {...item,img:item.galleries[0].photo};
      this.carts.push(nItem);
      this.saveCart();
      this.$forceUpdate();
    },
    saveCart() {
      const parsed = JSON.stringify(this.carts);
      localStorage.setItem('tart', parsed);
      window.location.reload();
    }
  },
  mounted() {
    if(localStorage.getItem('tart')){
      try{
        this.carts = JSON.parse(localStorage.getItem('tart'));
      } catch(e) {
        localStorage.removeItem('tart');
      }
    }
    this.setLoading(true);
    axios
      .get("http://shayna.gionshop.xyz/api/products")
      .then(res=>{
        this.products = res.data.data.data;
        this.setLoading(false);
      })
      .catch(err=> {
        this.er = err;
        this.setLoading(false);
      });
  }
};
</script>

<style scope>
.owl-theme .owl-dots .owl-dot span {
    display: none;
}

.add-bag {
  cursor: pointer;
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
