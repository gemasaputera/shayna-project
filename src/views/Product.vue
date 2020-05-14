<template>
  <div class="product" >
    <Header mail="csgionshop@gmail.com" noTelp="0812-8960-105" />
    <Breadcrumb position="Detail"/>
    <!-- Product Shop Section Begin -->
    <section class="product-shop spad page-details">
        <div class="container">
            <div class="row" v-if="!loading">
                <div class="col-lg-12">
                    <div class="row">
                        <div class="col-lg-6">
                            <div class="product-pic-zoom">
                                <img class="product-big-img" v-bind:src="defaultImage" alt="" />
                            </div>
                            <div class="product-thumbs" v-if="itemDetail.galleries.length > 0">
                                <Carousel
                                  :autoplay=true
                                  :dots=false
                                  :nav=false
                                  :margin=10
                                  class="product-thumbs-track ps-slider">
                                    <div
                                      v-for="(item,index) in thumbs"
                                      :key="index"
                                      :class="item===defaultImage?'active':null"
                                      class="pt" 
                                      @click="changeImage(item)">
                                        <img :src="item" alt="" />
                                    </div>
                                </Carousel>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="product-details text-left">
                                <div class="pd-title">
                                    <span>{{itemDetail.type}}</span>
                                    <h3>{{itemDetail.name}}</h3>
                                </div>
                                <div class="pd-desc">
                                    <div v-html="itemDetail.description"></div>
                                    <h4>{{price(itemDetail)}}</h4>
                                </div>
                                <div class="quantity">
                                    <router-link
                                    to='/shopping-cart' class="primary-btn pd-cart">
                                    <a
                                      class="primary-btn pd-cart"
                                      @click="addCart(itemDetail)">
                                      Add To Cart
                                    </a>
                                    </router-link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="spinner" v-else></div>
        </div>
    </section>
    <!-- Product Shop Section End -->
    <RelatedProduct />
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import currencyFormat from './../utils/currencyFormat';
import Header from '@/components/layouts/Header.vue';
import Footer from '@/components/layouts/Footer.vue';
import Breadcrumb from '@/components/elements/Breadcrumb.vue';
import RelatedProduct from '@/components/elements/RelatedProduct.vue';
import Carousel from 'vue-owl-carousel';
import axios from 'axios';

export default {
  name: 'Product',
  components: {
    Header,
    Footer,
    Carousel,
    Breadcrumb,
    RelatedProduct
  },
  data() {
    return {
      defaultImage: '',
      thumbs: [],
      loading: false,
      idProduct: this.$route.params.id,
      itemDetail:{},
      carts: []
    };
  },
  methods: {
    price(item) {
      return(
        currencyFormat(item.price, 'IDR ')
      );
    },
    changeImage(urlImage) {
      this.defaultImage = urlImage;
    },
    setLoading(data) {
      this.loading = data;
    },
    setImage(data) {
      if(data.length===0) {
        this.defaultImage = '';
        this.thumbs = [];
      }
      let defaultImg = data.filter(obj => {
        return obj.is_default === 1;
      });
      this.defaultImage = defaultImg[0].photo;
      data.map((item)=>{
        this.thumbs.push(item.photo);
      });
    },
    addCart(item) {
      const nItem = {...item,img:this.defaultImage};
      this.carts.push(nItem);
      this.saveCart();
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
    const idProduct= this.$route.params.id;
    this.setLoading(true);
    axios
      .get("https://shayna.gionshop.xyz/api/products",{
        params: {
          id: idProduct
        }
      })
      .then(res=>{
        this.itemDetail = res.data.data;
        this.setImage(this.itemDetail.galleries);
        this.setLoading(false);
      })
      .catch(this.setLoading(false));
  },
};
</script>

<style scoped>
div.product-pic-zoom > img.product-big-img {
  min-width: 100%;
  height: auto;
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
