<template>
    <div class="slider">
        <carousel class="hero-items" :items=1 :dots=true :autoplay=true :nav=false>
            <div class="single-hero-items set-bg" style="background-image: url('/img/hero-4.jpg')">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-5">
                            <span>Bag,kids</span>
                            <h1>Black friday</h1>
                            <p class="slide">
                                Lorem ipsum dolor sit amet,
                                consectetur adipisicing elit,
                                sed do eiusmod tempor incididunt ut labore et
                                dolore
                            </p>
                            <a href="#" class="primary-btn">Shop Now</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="single-hero-items set-bg" style="background-image: url('/img/hero-5.jpg')">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-5">
                            <span>Bag,kids</span>
                            <h1>Black friday</h1>
                            <p class="slide">
                                Lorem ipsum dolor sit amet,
                                consectetur adipisicing elit,
                                sed do eiusmod tempor incididunt ut labore
                                et dolore
                            </p>
                            <a href="#" class="primary-btn">Shop Now</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="single-hero-items set-bg" style="background-image: url('/img/hero-6.jpg')">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-5">
                            <span>Bag,kids</span>
                            <h1>Black friday</h1>
                            <p class="slide">
                                Lorem ipsum dolor sit amet,
                                consectetur adipisicing elit,
                                sed do eiusmod tempor incididunt ut 
                                abore et dolore
                            </p>
                            <a href="#" class="primary-btn">Shop Now</a>
                        </div>
                    </div>
                </div>
            </div>
        </carousel>
    </div>
</template>

<script>
import carousel from 'vue-owl-carousel';
export default {
  name: 'Slider',
  components: {
    carousel
  }
};
</script>

<style scope>
p.slide {
    color: #fff;
}

</style>
