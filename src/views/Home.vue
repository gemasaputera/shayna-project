<template>
  <div class="home" >
    <Header mail="csgionshop@gmail.com" noTelp="0812-8960-105" />
    <Slider />
    <HomeProduct />
    <InstagramPost />
    <LogoPartner />
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/layouts/Header.vue';
import Footer from '@/components/layouts/Footer.vue';
import Slider from '@/components/elements/Slider.vue';
import HomeProduct from '@/components/elements/HomeProducts.vue';
import InstagramPost from '@/components/elements/InstagramPost.vue';
import LogoPartner from '@/components/elements/LogoPartner.vue';

export default {
  name: 'Home',
  components: {
    Header,
    Slider,
    HomeProduct,
    InstagramPost,
    LogoPartner,
    Footer
  }
};
</script>
