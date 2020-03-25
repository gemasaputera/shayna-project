<template>
    <!-- Breadcrumb Section Begin -->
    <div class="breacrumb-section">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <div class="breadcrumb-text product-more text-left">
                        <router-link to='/'><i class="fa fa-home"></i> Home</router-link>
                        <span>{{ position }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Breadcrumb Section Begin -->
</template>

<script>
export default {
  name: 'Breadcrumb',
  props: {
    position: String,
  }
};
</script>

<style>

</style>
