<template>
  <div class="product" >
    <Header mail="csgionshop@gmail.com" noTelp="0812-8960-105" />
    <Breadcrumb position="Detail"/>
    <!-- Product Shop Section Begin -->
    <section class="product-shop spad page-details">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <div class="row">
                        <div class="col-lg-6">
                            <div class="product-pic-zoom">
                                <img class="product-big-img" v-bind:src="defaultImage" alt="" />
                            </div>
                            <div class="product-thumbs">
                                <Carousel
                                  :autoplay=true
                                  :dots=false
                                  :nav=false
                                  :margin=10
                                  class="product-thumbs-track ps-slider">
                                    <div 
                                      :class="thumbs[0]===defaultImage?'active':null"
                                      class="pt" 
                                      @click="changeImage(thumbs[0])">
                                        <img src="img/mickey1.jpg" alt="" />
                                    </div>

                                    <div
                                      :class="thumbs[1]===defaultImage?'active':null"
                                      class="pt" 
                                      @click="changeImage(thumbs[1])">
                                        <img src="img/mickey2.jpg" alt="" />
                                    </div>

                                    <div 
                                      :class="thumbs[2]===defaultImage?'active':null"
                                      class="pt" 
                                      @click="changeImage(thumbs[2])">
                                        <img src="img/mickey3.jpg" alt="" />
                                    </div>

                                    <div
                                      :class="thumbs[3]===defaultImage?'active':null"
                                      class="pt"
                                      @click="changeImage(thumbs[3])">
                                        <img src="img/mickey4.jpg" alt="" />
                                    </div>
                                </Carousel>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="product-details text-left">
                                <div class="pd-title">
                                    <span>oranges</span>
                                    <h3>Pure Pineapple</h3>
                                </div>
                                <div class="pd-desc">
                                    <p>
                                        Lorem ipsum dolor sit
                                        amet consectetur adipisicing elit.
                                        Corporis, error officia. Rem aperiam
                                        laborum voluptatum vel, pariatur modi hic
                                        provident eum iure natus quos non a sequi,
                                        id accusantium! Autem.
                                    </p>
                                    <p>
                                        Lorem ipsum dolor sit, amet consectetur
                                        adipisicing elit. Quam possimus quisquam
                                        animi, commodi, nihil voluptate nostrum
                                        neque architecto illo officiis doloremque
                                        et corrupti cupiditate voluptatibus error
                                        lllum. Commodi expedita animi nulla aspernatur.
                                        Id asperiores blanditiis, omnis repudiandae
                                        iste inventore cum, quam sint molestiae
                                        accusamus voluptates ex tempora illum sit
                                        perspiciatis. Nostrum dolor tenetur amet,
                                        illo natus magni veniam quia sit nihil dolores.
                                        Commodi ratione distinctio harum voluptatum
                                        velit facilis voluptas animi non laudantium,
                                        id dolorem atque perferendis enim ducimus? A
                                        exercitationem recusandae aliquam quod. Itaque
                                        inventore obcaecati, unde quam
                                        impedit praesentium veritatis quis beatae
                                        ea atque perferendis voluptates velit
                                        architecto?
                                    </p>
                                    <h4>$495.00</h4>
                                </div>
                                <div class="quantity">
                                    <router-link to='/shopping-cart' class="primary-btn pd-cart">
                                      Add To Cart
                                    </router-link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- Product Shop Section End -->
    <RelatedProduct />
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/layouts/Header.vue';
import Footer from '@/components/layouts/Footer.vue';
import Breadcrumb from '@/components/elements/Breadcrumb.vue';
import RelatedProduct from '@/components/elements/RelatedProduct.vue';
import Carousel from 'vue-owl-carousel';

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
      defaultImage: 'img/mickey1.jpg',
      thumbs: [
        'img/mickey1.jpg',
        'img/mickey2.jpg',
        'img/mickey3.jpg',
        'img/mickey4.jpg',
      ]
    };
  },
  methods: {
    changeImage(urlImage) {
      this.defaultImage = urlImage;
    }
  }
};
</script>
