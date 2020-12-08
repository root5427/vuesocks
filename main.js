Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true,
        }
    },
    template: `
        <div class="product">
            <div class="product-image">
                <img :src="image" :alt="altText">
            </div>

            <div class="product-info">
                <h1>{{title}}</h1>
                <p v-if="inStock">In Stock</p>
                <p v-else :class="{ outOfStock: !inStock}">Out of stock</p>
                <p>{{sale}}</p>
                <p>Shipping: {{shipping}}</p>

                <product-details :details="details"></product-details>

                <div class="color-box" :style="{ backgroundColor:variant.variantColor }"
                    v-for="(variant, index) in variants" :key="variant.variantId" @mouseover="updateProduct(index)">
                </div>

                <button v-on:click="addToCart" :disabled="!inStock" :class="{ disabledButton: !inStock }">Add to
                    cart</button>

                <div class="cart">
                    <p>Cart {{cart}}</p>
                </div>
            </div>

            <a :href="link" target="_blank">More products like this</a>
        </div>
    `,
    data() {
        return {
            product: "Socks",
            brand: 'Vue Mastery',
            description: "A pair of warm, fuzzy socks.",
            selectedVariant: 0,
            altText: "A pair of socks",
            link: "https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks",
            details: ['80% cotton', '20% polyester', 'Gender-neutral'],
            variants: [
                {
                    variantId: 2234,
                    variantColor: 'green',
                    variantImage: "./assets/vmSocks-green-onWhite.jpg",
                    variantQuantity: 0,
                },
                {
                    variantId: 2235,
                    variantColor: 'blue',
                    variantImage: "./assets/vmSocks-blue-onWhite.jpg",
                    variantQuantity: 383,
                }
            ],
            cart: 0,
        }
    },
    methods: {
        addToCart() {
            this.cart += 1;
        },
        removeFromCart() {
            if (this.cart > 0)
                this.cart -= 1;
        },
        updateProduct(index) {
            this.selectedVariant = index
        }
    },
    computed: {
        title() {
            return this.brand + ' ' + this.product;
        },
        inStock() {
            return this.variants[this.selectedVariant].variantQuantity;
        },
        sale() {
            return this.brand + ' ' + this.product + (['are not', 'are'])[this.onSale | 0] + ' on sale';
        },
        image() {
            return this.variants[this.selectedVariant].variantImage;
        },
        shipping() {
            return this.premium ? "free" : 2.99
        }
    }
})

Vue.component('product-details', {
    props: {
        details: {
            type: Array,
            required: true,
        }
    },
    template: `
        <ul>
            <li v-for="detail in details">{{detail}}</li>
        </ul>
    `,
})

var app = new Vue({
    el: '#app',
    data: {
        premium: true,
    }
})