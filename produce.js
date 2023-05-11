import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const renderProducts = (products) => {
    console.log('Rendering products:', products);
    const productsTable = document.createElement('table');
    productsTable.classList.add('products-table');

    const headersRow = document.createElement('tr');
    headersRow.innerHTML = `
        <th>Products</th>
        <th>Name</th>
        <th>Price</th>
        <th>Weight</th>
        <th>Add to Cart</th>
    `;
    productsTable.appendChild(headersRow);

    products.forEach((product) => {
        const { product_id, produce_name, price_per_unit, weight_in_grams } = product;
        const imgSrc = `../img/${productType}/${product_id}.png`;

        // Check if the image exists before adding the product to the table
        const img = new Image();
        img.onload = () => {
        const productRow = document.createElement('tr');
        productRow.innerHTML = `
            <td><img src="${imgSrc}" alt="${produce_name}"></td>
            <td>${produce_name}</td>
            <td>$${price_per_unit}</td>
            <td>${weight_in_grams}g</td>
            <td><button class="add-to-cart" data-product-id="${product_id}">Add to Cart<input type="number" class="quantity-input" min="1" max="100" value="1" /></button></td>`;
        productsTable.appendChild(productRow);
        };
        img.onerror = () => {
        console.log(`Skipping product ${product_id} because image not found`);
        };
        img.src = imgSrc;
    });

    const productsContainer = document.querySelector('#products');
    productsContainer.innerHTML = '';
    productsContainer.appendChild(productsTable);

    const addToCartBtns = productsTable.querySelectorAll(".add-to-cart");
    addToCartBtns.forEach((btn) => btn.addEventListener("click", addToCart));

    };

const getProducts = async (supabase) => {
    let { data, error } = await supabase
    .from('inventory')
    .select('product_id', 'produce_name', 'price_per_unit', 'weight_in_grams');

    if (error) {
    console.error(error);
    return [];
    }

    return data;
}; 

    
const initSupabase = async () => {

    const supabaseUrl = "https://mrwuwcdszsikbbtibldn.supabase.co"
    const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1yd3V3Y2RzenNpa2JidGlibGRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODE3NzExNjksImV4cCI6MTk5NzM0NzE2OX0._kdxV_65w944tbi-QTanC_IEiMXbfYAhUgOPgyWd_98";
  
    const supabase = createClient(supabaseUrl, supabaseKey);
  
    const { data, error } = await supabase.from('inventory').select('*');
  
    if (error) {
      console.error(error);
      return;
    }
  
    const products = await getProducts(supabase);
  
    const menu = document.querySelector('#menu');
    const side_menu = document.querySelector('#side_menu');
  
    menu.addEventListener('click', () => {
      side_menu.classList.toggle('open');
    });
  
    renderProducts(data);
  };
  
  document.addEventListener('DOMContentLoaded', async () => {
    await initSupabase();
  });
